<template>
  <div id="modal">
    <p class="title">
      <span>{{ selectedImgTitle }}</span>
    </p>
    <div class="close-modal">
      <i class="fas fa-times-circle" @click="modalToggle"></i>
    </div>
    <div class="modal-inner">
      <div
        class="modal-image background-img"
        :style="'background: url(' + selectedImgSrc + ')'"
        :key="selectedImgId"
      ></div>
      <div class="actions">
        <span
          v-if="selectedImgId > 1"
          @click="nextPrevImg('prev')"
          class="prev"
        >
          <i class="fas fa-chevron-left"></i>
        </span>
        <span
          v-if="selectedImgId < imageList.length"
          @click="nextPrevImg('next')"
          class="next"
        >
          <i class="fas fa-chevron-right"></i>
        </span>
      </div>
    </div>
    <div class="footer">
      <div id="modal-thumbs">
        <div v-for="(img, index) in imageList" :key="index">
          <div
            :style="'background: url(' + img.path + ')'"
            :title="img.name"
            :id="`thumb-${img.id}`"
            :class="['thumbs-img background-img', { active: img.active }]"
            @click="changeModalContent(img)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedImgSrc: {
      type: String,
      default: ""
    },
    selectedImgTitle: {
      type: String,
      default: ""
    },
    selectedImgId: {
      type: Number,
      default: null
    },
    imageList: {
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
    nextPrevImg: {
      type: Function,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_variables.scss";

#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    position: absolute;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    text-align: center;
    background: $color1;
    color: $color2;
    z-index: 2;
  }
  .close-modal {
    position: absolute;
    top: 0.2rem;
    right: 0.4rem;
    margin: auto;
    font-size: 1.5rem;
    z-index: 3;
    color: $color3;
    .fas {
      cursor: pointer;
    }
  }
  .background-img {
    background-repeat: no-repeat !important;
    background-position: center center !important;
  }
  .modal-inner {
    position: relative;
    width: 100%;
    max-width: 992px;
    height: 100%;
    max-height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-image {
      width: 100%;
      height: 100%;
      background-size: contain !important;
    }
    .actions {
      position: absolute;
      width: 105%;
      top: 0;
      bottom: 0;
      height: 30px;
      margin: auto;
      span {
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background: $color1;
        color: $color2;
        border: 2px solid $color3;
        &.next {
          right: 0;
        }
        &.prev {
          left: 0;
        }
        &:hover {
          color: $color1;
          background: $color3;
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 1rem;
    width: 500px;
    overflow: hidden;
    @media (max-width: 768px) {
      width: 230px;
    }
  }
  #modal-thumbs {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
    .thumbs-img {
      width: 50px;
      height: 50px;
      cursor: pointer;
      opacity: 0.5;
      margin: 2px;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      background-size: cover !important;
      &:hover,
      &.active {
        border: 2px solid $color3;
        opacity: 1;
      }
    }
  }
}
</style>
