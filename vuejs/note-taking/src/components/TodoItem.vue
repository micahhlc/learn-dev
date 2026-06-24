<template>
  <li> {{ itemName }} <button @click="removeItem">Remove</button> </li>
</template>

<script>
  export default {
    props: ['itemName', 'id'],
    methods: {
      removeItem() {
        this.$emit('remove-item', this.id);
      },
    },
  };
</script>
<style>
  li {
    margin: 1em;
  }
  button {
    color: red;
    background-color: hsl(120, 50%, 80%);
    border-radius: 1em;
    font-size: 0.6em;
    float: right;
  }
</style>
