<template>
  <div id="foodItem" @click="countClicks">
    <h2>
      {{ foodName }}
      <img src="../assets/RewardBadge.svg" alt="RewardBadge" v-show="isFavorite" />
    </h2>
    <p>{{ foodDesc }}</p>
    <button id="favFoodButton" @click="toggleFavorite">Favorite</button>
    <button @click="removeItem">Remove</button>
    <p id="red">Clicked {{ clicks }} times.</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clicks: 0,
      };
    },
    props: {
      foodName: {
        type: String,
        required: true,
      },
      foodDesc: {
        type: String,
        required: false,
        default: 'No description provided.',
        validator: function (value) {
          return value.length > 10 && value.length < 70;
        },
      },
      isFavorite: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      countClicks() {
        this.clicks += 1;
      },
      toggleFavorite() {
        // this.foodIsFavorite = !this.foodIsFavorite;
        this.$emit('toggle-favorite', this.foodName);
      },
      removeItem() {
        this.$emit('remove-food', this.foodName);
      },
    },
  };
</script>

<style>
  #red {
    font-weight: bold;
    color: rgb(144, 12, 122);
  }
  img {
    height: 1.5em;
    float: right;
  }
  #favFoodButton {
    background-color: hsla(300, 50%, 80%);
    color: hsla(0, 0%, 0%);
    border: none;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    border-radius: 45%;
  }
</style>
