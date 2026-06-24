<template>
  <h2>Async Await</h2>
  <div>
    <input type="text" v-model="fileName" @keyup.enter="fetchData" />
    <button @click="fetchData">Fetch Data</button>
    <pre v-if="data">{{ data }}</pre>
  </div>
  <div>
    <button @click="testAsyncAwait">Test AsyncAwait</button>
    <p id="showResult"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      fileName: "",
    };
  },
  methods: {
    async testAsyncAwait() {
      let myPromise = new Promise((resolve, reject) => {
        resolve("Promise resolved. yeah!");
      });
      let result = await myPromise;
      console.log("result:", result);
      document.getElementById("showResult").innerHTML = result;
    },
    async fetchData() {
      try {
        let x = (!this.fileName || this.fileName.trim() === "") ? "0.txt" : this.fileName.trim() + ".txt";
        console.log("x:", x);
        const response = await fetch(x);
        if (!response.ok) {
          throw new Error(`HTTP error! status: \${response.status}`);
        }
        this.data = await response.text();
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  }
};
</script>

<style></style>
