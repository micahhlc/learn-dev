<template>
  <h2>Async Promise</h2>
  <div>
    <input type="text" v-model="fileName" @keyup.enter="fetchData(fileName)" />
    <button @click="fetchData(fileName)">Fetch Data</button>
    <pre v-if="data">{{ data }}</pre>
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
    fetchData(name) {
      let x = (!name || name.trim() === "") ? "0.txt" : name.trim() + ".txt";
      console.log("x:", x);
      fetch(x)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: \${response.status}`);
          }
          return res.text();
        })
        .then((data) => {
          this.data = data;
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    },
  },
};
</script>

<style></style>
