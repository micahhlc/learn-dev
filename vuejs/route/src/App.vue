<template>
  <p>Click below to show the page</p>
  <router-link to="/food">Food</router-link>
  <router-link to="/animals">Animals</router-link>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  a {
    display: inline-block;
    background-color: black;
    border: solid 1px black;
    color: white;
    padding: 16dvh;
    margin: 10px;
  }
  a:hover,
  a.router-link-active {
    background-color: darkblue;
    border-radius: 16px;
    padding: 16px;
  }
  div {
    border: dashed black 1px;
    padding: 20px;
    margin: 10px;
    display: inline-block;
  }
</style>               