<template>
  <div style="width: 100%">
    <section>
      <div
        v-for="(img, index) in initialList"
        :key="index"
        :style="'background: url(' + img.path + ')'"
        v-lazy:background-image="img.path"
        class="img-container col"
      >
        <div
          @click="
            changeModalContent(img);
            modalToggle();
            scrollToPos(img.id);
          "
          class="info-overlay"
        >
          <span>{{ img.name }}</span>
        </div>
      </div>
    </section>
    <div
      v-if="initialItem < imageList.length || imageList.length > initialItem"
      class="mt-4 mb-4 load-more"
    >
      <div>
        <b-button
          @click="loadMore"
          variant="warning"
          aria-label="Load more"
          title="Load more"
          >{{ imageLeftToLoad }} <small>left to load</small></b-button
        >

        <b-spinner
          v-if="showSpinner"
          variant="warning"
          type="grow"
          label="Spinning"
        ></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      default: null
    },
    initialList: {
      type: Array,
      default: null
    },
    changeModalContent: {
      type: Function,
      default: null
    },
    modalToggle: {
      type: Function,
      default: null
    },
    loadMore: {
      type: Function,
      default: null
    },
    initialItem: {
      type: Number,
      default: 12
    },
    imageLeftToLoad: {
      type: Number,
      default: 12
    },
    showSpinner: {
      type: Boolean,
      default: false
    }
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
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    position: relative;

    .spinner-grow {
      position: absolute;
      right: -3rem;
      top: 0.1rem;
    }
  }
}

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
    height: 250px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-in;
    backface-visibility: hidden;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center center !important;

    &:hover {
      .info-overlay {
        opacity: 1;
      }
    }
    .info-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.3;
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
        background: rgba(0, 0, 0, 0.8);
        z-index: 1;
      }
    }
  }
}
</style>
