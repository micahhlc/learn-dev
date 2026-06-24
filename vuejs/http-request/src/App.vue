<template>
  <div>
    <h1>HTTP Request Test</h1>
    <p> This page tests HTTP requests under Vue.js with Promise and async/await. </p>
    <button @click="nextComponent">Next component</button>
    <KeepAlive>
      <component :is="activeComp"></component>
    </KeepAlive>
  </div>
</template>

<script>
  // Static array defined outside the component definition.
  const compList = ['async-promise', 'async-await', 'test-component'];

  export default {
    data() {
      return {
        compNbr: 1,
      };
    },
    computed: {
      activeComp() {
        // Calculate the index dynamically using modular arithmetic.
        const index = (this.compNbr - 1) % compList.length;
        return compList[index];
      },
    },
    methods: {
      nextComponent() {
        this.compNbr++;
      },
    },
  };
</script>

<style>
  #app {
    width: 350px;
    margin: 10px;
  }
  #app > div {
    border: solid black 2px;
    padding: 10px;
    margin-top: 10px;
  }
  h2 {
    text-decoration: underline;
  }
</style>
