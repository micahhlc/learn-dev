<template>
  <div>
    <img :src="imgSrc" :class="{ animate: isAnimating }" />
    <h2>Component One</h2>
    <p>Choose food.</p>
    <label>
      <input
        type="radio"
        name="rbgFood"
        v-model="imgSrc"
        :value="appleImg"
        @change="triggerAnimation"
      />
      Apple
    </label>
    <label>
      <input
        type="radio"
        name="rbgFood"
        v-model="imgSrc"
        :value="cakeImg"
        @change="triggerAnimation"
      />
      Cake
    </label>
  </div>
</template>

<script>
import appleImg from "../assets/img_apple.svg";
import cakeImg from "../assets/img_cake.svg";

export default {
  name: "CompOne",
  data() {
    return {
      imgSrc: "./img_question.svg",
      appleImg,
      cakeImg,
      isAnimating: false,
    };
  },
  methods: {
    triggerAnimation() {
      this.isAnimating = false;
      setTimeout(() => {
        this.isAnimating = true;
      }, 10);
    },
  },
  activated() {
    this.isAnimating = false;
    // this.imgSrc = this.defaultImgSrc; // Reset the image to the default
  },
};
</script>

<style scoped>
div {
  background-color: lightgreen;
}
img {
  float: right;
  height: 100px;
  margin-top: 20px;
  transition: transform 1s ease;
}
img:hover {
  transform: rotate(360deg);
}
label:hover {
  cursor: pointer;
}

/* Animation class */
.animate {
  animation: zoom-in 0.5s ease;
}

@keyframes zoom-in {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes zoom-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
