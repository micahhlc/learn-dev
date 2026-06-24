# Camera Project

## Goal
Rebuild / improve the backend software running inside or alongside an IP camera.
Primary motivations: privacy, control, custom features.

## Target Hardware
- WTW 塚本無線 WTW-W5065Y (or similar)
- TP-Link Tapo C260
- Both are embedded Linux devices with a Chinese SoC underneath

## Desired Features
- 2x / 5x video playback speed (likely client-side — see notes)
- Remove cloud dependency (privacy)
- Full control over data leaving the device

---

## What's Inside These Cameras

```
Hardware
├── SoC (System on Chip) — CPU + video encoding in one chip
├── Flash storage — 8–16 MB
└── RAM — 64–128 MB

Software (burned into flash)
├── Embedded Linux kernel
├── Video encoding daemon (talks to HW chip directly)
├── RTSP server (streams video)
├── Web UI server (local admin page)
└── Cloud agent  ← privacy concern
```

## Privacy Concern
TP-Link Tapo cameras confirmed to send telemetry to Chinese servers
even when cloud features are disabled.
WTW is a Japanese reseller but underlying hardware is often a Chinese
SoC (Hisilicon, Ingenic) running Chinese firmware underneath.

---

## Playback Speed — Clarification

2x/5x speed is almost certainly a **client-side** feature, not camera-side.

```
Camera streams RTSP at 30fps → your player receives → plays at 1x/2x/5x
```

The camera just streams. Speed control lives in the viewer (VLC, custom app).

**Exception — time-lapse recording:**
Capture 1 frame every N frames on the camera side so 1 hour plays back
in 12 minutes. This IS a camera-side feature if that's the intent.

---

## Two Approaches

### Approach A — Non-invasive (recommended starting point)

```
[Camera] → [your local server on Pi/Mac] → [your app]
            ├── intercepts RTSP stream
            ├── blocks cloud traffic at router
            └── adds custom features on top
```

- Camera firmware completely untouched
- Build the proxy/BE server in Go or Swift
- Privacy: block the camera's cloud IPs at router level
- Risk: zero — camera still works if your server goes down
- Stack: Go (recommended) or Swift

### Approach B — Replace Firmware

Flash OpenIPC (open source camera OS) onto the device.

```
OpenIPC replaces everything
├── removes cloud agent entirely
├── you own the full software stack
├── supports many Hisilicon / Ingenic SoCs
└── risk: could brick the camera if SoC not supported
```

Resources:
- https://openipc.org
- Requires knowing the exact SoC model before attempting

---

## Difficulty Map

| Task                              | Difficulty | Notes                                  |
|-----------------------------------|------------|----------------------------------------|
| Block cloud IPs at router         | Easy       | Firewall rules, no code needed         |
| Identify SoC / Chinese servers    | Easy–Med   | Wireshark / router logs                |
| SSH into camera                   | Medium     | May need serial port access to enable  |
| Read RTSP + build proxy server    | Medium     | Standard protocols, Go or Swift        |
| Build client with speed control   | Medium     | Standard video player (ffmpeg, AVKit)  |
| Replace firmware with OpenIPC     | Hard       | SoC-specific, risk of brick            |

---

## Phase 1 — Current Step: Network Investigation

Goal: identify what the camera is actually sending and where.

### Tools to use

**On Mac (no extra install):**
```bash
# See all active connections from camera's IP
# First find camera IP on your router admin page, then:
arp -a | grep <camera-mac>
```

**Wireshark (recommended):**
```bash
brew install --cask wireshark
# Filter by camera IP:
# ip.addr == 192.168.x.x
# Look for connections to non-local IPs
```

**Block at router:**
- Most home routers (ASUS, Synology) support per-device firewall rules
- Block all outbound traffic from camera IP except your local network
- Verify camera still streams locally after blocking

### What to look for
- DNS queries to Chinese domains (baidu, hicloud, iot.*.cn)
- Regular heartbeat connections (phone-home every N seconds)
- Any traffic on port 443 to non-Japanese/non-local IPs
- UDP traffic (often used to punch through NAT for remote access)

---

## Phase 2 — Proxy Server (Approach A)

Once cloud IPs are identified and blocked, build a local server that:
1. Pulls RTSP stream from camera
2. Serves it to your devices on the local network
3. Adds features (recording, speed control, motion events)

**Likely stack:** Go — low memory, fast startup, good ffmpeg bindings

---

## Phase 3 — Client App

- macOS / iOS app (Swift + AVKit) for playback with speed control
- Or web-based player (ffmpeg.wasm) for simplicity

---

## Background Reference
- RTSP is the protocol cameras use to stream video locally
- H.264 / H.265 encoding is handled by hardware chip — no need to touch this
- ffmpeg can transcode, record, restream RTSP with one command
- OpenIPC community: https://openipc.org/supported-hardware

---

## Notes
- User has basic C and Linux knowledge, no embedded experience yet
- Start with network investigation before any code
- Approach A first — only move to firmware replacement if needed
