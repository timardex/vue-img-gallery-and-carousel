<template>
  <section>
    <div v-for="(img, index) in imageList" :key="index" class="img-container">
      <b-img
        :src="img.path"
        :title="img.name"
        :id="`thumb-${img.id}`"
        @click="
          changeModalContent(img);
          scrollToPos(img.id);
        "
        v-lazy="img.path"
        fluid
      />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentCategory: String,
    imageList: Array,
    changeModalContent: Function,
    scrollToPos: Function
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";

section {
  line-height: 0;
  column-count: 4;
  column-gap: 0;
  @media (max-width: 992px) {
    column-count: 3;
  }
  @media (max-width: 768px) {
    column-count: 2;
  }
  @media (max-width: 500px) {
    column-count: 1;
  }
  .img-container {
    width: 100%;

    img {
      display: block;
      cursor: pointer;
      height: auto !important;
      &[lazy="loading"] {
        width: 50px;
        margin: 1rem auto;
      }
      &[lazy="loaded"] {
        width: 100% !important;
        margin: auto;
      }
    }
  }
}
</style>
