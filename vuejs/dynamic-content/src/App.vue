<template>
  <h1>Dynamic Components</h1>
  <p>With &lt;KeepAlive include="CompOne,CompThree"&gt; only the "CompOne" and "CompThree" components will remember the user input.</p>
  <button @click="compNbr++">Next component</button>
  <KeepAlive include="CompOne, CompThree">
    <component :is="activeComp"></component>
  </KeepAlive>
</template>

<script>
  export default {
    data () {
      return {
        compNbr: 1
      }
    },
    watch: {
      compNbr(val) {
        if(val>4) {
          this.compNbr = 1;
        }
      }
    },
    computed: {
      activeComp() {
        if(this.compNbr === 1) {
          return 'comp-one'
        }
        else if(this.compNbr === 2) {
          return 'comp-two'
        }
        else if(this.compNbr === 3) {
          return 'comp-three'
        }
        else {
          return 'color-hex'
        }
      }
    }
  }
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