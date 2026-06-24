import Foundation

// MARK: - Config
let port: UInt16 = 8080
let publicDir = CommandLine.arguments.count > 1
    ? CommandLine.arguments[1]
    : FileManager.default.currentDirectoryPath

// MARK: - MIME types
func mimeType(for path: String) -> String {
    switch URL(fileURLWithPath: path).pathExtension.lowercased() {
    case "html": return "text/html; charset=utf-8"
    case "js", "jsx", "mjs": return "application/javascript; charset=utf-8"
    case "css": return "text/css; charset=utf-8"
    case "json": return "application/json; charset=utf-8"
    case "png": return "image/png"
    case "jpg", "jpeg": return "image/jpeg"
    case "svg": return "image/svg+xml"
    case "ico": return "image/x-icon"
    default: return "application/octet-stream"
    }
}

// MARK: - Response helpers
func httpResponse(status: Int, statusText: String, contentType: String, body: Data) -> Data {
    let header = """
    HTTP/1.1 \(status) \(statusText)\r
    Content-Type: \(contentType)\r
    Content-Length: \(body.count)\r
    Connection: close\r
    \r

    """
    var response = header.data(using: .utf8)!
    response.append(body)
    return response
}

func notFound() -> Data {
    let body = "<h1>404 Not Found</h1>".data(using: .utf8)!
    return httpResponse(status: 404, statusText: "Not Found", contentType: "text/html", body: body)
}

// MARK: - Request handler
func handle(request: String) -> Data {
    // Parse first line: "GET /path HTTP/1.1"
    let firstLine = request.components(separatedBy: "\r\n").first ?? ""
    let parts = firstLine.components(separatedBy: " ")
    guard parts.count >= 2 else { return notFound() }

    var urlPath = parts[1]

    // Strip query string
    if let q = urlPath.firstIndex(of: "?") {
        urlPath = String(urlPath[urlPath.startIndex..<q])
    }

    // Default to index.html
    if urlPath == "/" { urlPath = "/index.html" }

    // Resolve file path — prevent directory traversal
    let resolved = URL(fileURLWithPath: publicDir)
        .appendingPathComponent(urlPath)
        .standardized
    let rootURL = URL(fileURLWithPath: publicDir).standardized

    guard resolved.path.hasPrefix(rootURL.path) else { return notFound() }

    guard FileManager.default.fileExists(atPath: resolved.path),
          let data = try? Data(contentsOf: resolved) else {
        return notFound()
    }

    return httpResponse(
        status: 200,
        statusText: "OK",
        contentType: mimeType(for: resolved.path),
        body: data
    )
}

// MARK: - Socket server
func run() {
    let serverFd = socket(AF_INET, SOCK_STREAM, 0)
    guard serverFd >= 0 else { fatalError("socket() failed") }

    var yes: Int32 = 1
    setsockopt(serverFd, SOL_SOCKET, SO_REUSEADDR, &yes, socklen_t(MemoryLayout<Int32>.size))

    var addr = sockaddr_in()
    addr.sin_family = sa_family_t(AF_INET)
    addr.sin_port = port.bigEndian
    addr.sin_addr.s_addr = INADDR_ANY

    let bindResult = withUnsafePointer(to: &addr) {
        $0.withMemoryRebound(to: sockaddr.self, capacity: 1) {
            bind(serverFd, $0, socklen_t(MemoryLayout<sockaddr_in>.size))
        }
    }
    guard bindResult == 0 else { fatalError("bind() failed — port \(port) in use?") }

    listen(serverFd, 10)
    print("Serving \(publicDir) at http://localhost:\(port)")

    while true {
        let clientFd = accept(serverFd, nil, nil)
        guard clientFd >= 0 else { continue }

        DispatchQueue.global().async {
            var buffer = [UInt8](repeating: 0, count: 4096)
            let bytesRead = recv(clientFd, &buffer, buffer.count, 0)
            let request = bytesRead > 0
                ? String(bytes: buffer[0..<bytesRead], encoding: .utf8) ?? ""
                : ""

            let response = handle(request: request)
            _ = response.withUnsafeBytes { ptr in
                send(clientFd, ptr.baseAddress!, response.count, 0)
            }

            close(clientFd)
        }
    }
}

run()
