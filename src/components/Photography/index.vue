<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group class="btn-filter text-center mt-3">
          <b-form-radio-group
            id="radio-group-1"
            v-model="currentCategory"
            name="radio-options"
            button-variant="warning"
            buttons
          >
            <b-form-radio
              v-for="(item, index) in getCategories()"
              :key="index"
              :name="item"
              :value="item"
              >{{ item }}</b-form-radio
            >
          </b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <Grid
        :imageList="filteredCategory"
        :changeModalContent="changeModalContent"
        :scrollToPos="scrollToPos"
      />

      <transition name="fade">
        <Modal
          v-if="showModal"
          :selectedImgSrc="selectedImgSrc"
          :selectedImgTitle="selectedImgTitle"
          :selectedImgId="selectedImgId"
          :imageList="filteredCategory"
          :changeModalContent="changeModalContent"
          :modalToggle="modalToggle"
          :nextPrevImg="nextPrevImg"
        />
      </transition>
    </b-row>
  </div>
</template>

<script>
import Grid from "@/components/Photography/Grid";
import Modal from "@/components/Photography/Modal";
import { categoryFilter, getCat } from "./helpers.js";

export default {
  props: {
    imageList: Array
  },
  components: {
    Grid,
    Modal
  },
  computed: {
    filteredCategory() {
      return categoryFilter(this.currentCategory, this.imageList);
    }
  },
  data: () => ({
    currentCategory: "All",
    showModal: false,
    selectedImgSrc: "",
    selectedImgTitle: "",
    selectedImgId: null,
    selectedCategory: "",
    activeThumb: false
  }),
  methods: {
    getCategories() {
      return getCat(this.imageList);
    },
    modalToggle() {
      this.showModal = !this.showModal;
    },
    changeModalContent(item) {
      this.showModal = true;
      this.filteredCategory.map(value => (value.active = false));
      item.active = true;
      this.selectedImgSrc = item.path;
      this.selectedImgTitle = item.name;
      this.selectedImgId = item.id;
    },
    scrollToPos(id) {
      setTimeout(() => {
        const modalThumbs = document.getElementById("modal-thumbs");
        let scrollPos = id * 50;
        modalThumbs.scrollLeft += scrollPos;
      }, 1000);
    },
    getNextImgIndex(idImg = this.selectedImgId, direction) {
      switch (direction) {
        case "next":
          return idImg + 1;
        case "prev":
          return idImg - 1;
        default:
          return idImg;
      }
    },
    nextPrevImg(direction) {
      let idImg = this.getNextImgIndex(idImg, direction);
      let newImg = this.filteredCategory.find(item => item.id === idImg);
      this.filteredCategory.map(value => (value.active = false));
      newImg.active = true;
      const modalThumbs = document.getElementById("modal-thumbs");
      direction === "next"
        ? (modalThumbs.scrollLeft += 50)
        : (modalThumbs.scrollLeft -= 50);
      this.selectedImgSrc = newImg.path;
      this.selectedImgId = newImg.id;
      this.selectedImgTitle = newImg.name;
      this.selectedCategory = newImg.category;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
