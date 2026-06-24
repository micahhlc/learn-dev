<script setup>
  import { ref, reactive } from 'vue';

  const emit = defineEmits(['review-submitted']);

  const review = reactive({
    name: '',
    content: '',
    rating: null,
    recommendScore: null,
  });

  let alertMsg = ref('');
  let alertTimer = 2000;

  const onSubmit = () => {
    if (review.name === '' || review.content === '' || review.rating === null || review.recommendScore === null) {
      alertMsg.value = 'Please fill out all the fields';
      console.log(alertMsg.value);
      setTimeout(() => {
        alertMsg.value = '';
      }, 5000);
      console.log('after 5s: ', alertMsg.value);
      console.log(review);
      return;
    }
    const productReview = {
      name: review.name,
      content: review.content,
      rating: review.rating,
      recommendScore: review.recommendScore,
    };
    emit('review-submitted', productReview);
    alertMsg.value = '';
    review.name = '';
    review.content = '';
    review.rating = null;
    review.recommendScore = null;
  };
</script>

<template>
  <!-- <form class="review-form" @submit.prevent="onSubmit" oninput="x.value=parseInt(recommend.value)"> -->
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <!-- <p :class="{ 'alert-msg': alertMsg.length > 0 }">{{ alertMsg }}</p> -->
    <transition name="fade">
      <p v-if="alertMsg.length" class="alert-msg">{{ alertMsg }}</p>
    </transition>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="review.name" />
    </div>
    <div>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review.content"></textarea>
    </div>

    <div>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="review.rating" size="5">
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
    </div>

    <div class="recommend-area">
      <label for="recommend">Recommend: (Do you recommend this product?)</label>
      <span>
        <input type="range" id="recommend" v-model.number="review.recommendScore" min="0" max="10" />
        <output name="x" for="a">{{ review.recommendScore }}</output>
      </span>
    </div>

    <input class="button" type="submit" value="Submit" />
  </form>
</template>
