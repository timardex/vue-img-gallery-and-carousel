<template>
  <section class="col">
    <div
      v-for="(img, index) in imageList"
      :key="index"
      :style="'background: url(' + img.path + ')'"
      v-lazy:background-image="img.path"
      class="img-container col-sm-6 col-md-4"
    >
      <div
        @click="
          changeModalContent(img);
          scrollToPos(img.id);
        "
        class="info-overlay"
      >
        <span>{{ img.name }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    imageList: Array,
    changeModalContent: Function
  },
  methods: {
    scrollToPos(id) {
      setTimeout(() => {
        const modalThumbs = document.getElementById("modal-thumbs");
        let scrollPos = id * 50;
        modalThumbs.scrollLeft += scrollPos;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .img-container {
    height: 250px;
    position: relative;
    margin-top: -6px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-in;
    backface-visibility: hidden;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center center !important;

    &:hover {
      transform: scale(1.05);
      z-index: 2;
      .info-overlay {
        opacity: 1;
      }
    }
    .info-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 2;
      transition: all 0.3s ease-in;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      span {
        z-index: 2;
        color: #fff;
        font-size: 1.5rem;
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }
    }
  }
}
</style>
