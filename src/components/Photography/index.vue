<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group data-aos="fade-left" data-aos-easing="ease" data-aos-once="true" data-aos-duration="2000" class="btn-filter text-center mt-3">
          <b-form-radio-group id="radio-group-1" v-model="currentCategory" name="radio-options" button-variant="warning" buttons>
            <b-form-radio v-for="(item, index) in getCategories()" :key="index" :name="item" :value="item">{{ item }}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <Grid
        :currentCategory="currentCategory"
        :imageList="imageList"
        :changeModalContent="changeModalContent"
        :scrollToPos="scrollToPos" />

      <transition name="fade">
        <Modal
          v-if="showModal"
          :currentCategory="currentCategory"
          :selectedImgSrc="selectedImgSrc"
          :selectedImgTitle="selectedImgTitle"
          :selectedImgId="selectedImgId"
          :imageList="imageList"
          :changeModalContent="changeModalContent"
          :modalToggle="modalToggle"
          :nextPrevImg="nextPrevImg" />
      </transition>
    </b-row>
  </div>
</template>

<script>
import Grid from '@/components/Photography/Grid'
import Modal from '@/components/Photography/Modal'
export default {
  props: {
    imageList: Array
  },
  components: {
    Grid,
    Modal
  },
  computed: {
    filteredCategory () {
      if (this.currentCategory === 'All') {
        return this.imageList
      } else {
        return this.imageList.filter(value => value.category === this.currentCategory)
      }
    }
  },
  data: () => ({
    currentCategory: 'All',
    showModal: false,
    selectedImgSrc: '',
    selectedImgTitle: '',
    selectedImgId: '',
    selectedCategory: '',
    activeThumb: false
  }),
  methods: {
    getCategories () {
      let array = this.imageList.map(val => val.category)
      let unique = [...new Set(array)]
      unique.unshift('All')
      return unique
    },
    modalToggle () {
      this.showModal = !this.showModal;
      this.$store.dispatch('modalToggle', this.showModal)
    },
    changeModalContent (item) {
      this.showModal = true
      this.imageList.map(value => value.active = false)
      item.active = true
      this.selectedImgSrc = item.path
      this.selectedImgTitle = item.name
      this.selectedImgId = item.id
      this.$store.dispatch('modalToggle', this.showModal)
    },
    scrollToPos (id) {
      setTimeout(() => {
        const modalThumbs = document.getElementById('modal-thumbs')
        let scrollPos = id * 50
        modalThumbs.scrollLeft += scrollPos
      }, 1000)
    },
    getNextImgIndex (idImg = this.selectedImgId, direction) {
      switch (direction) {
        case 'next': return idImg + 1
        case 'prev': return idImg - 1
        default: return idImg
      }
    },
    nextPrevImg (direction) {
      let idImg = this.getNextImgIndex(idImg, direction)
      let newImg = this.imageList.find(item => item.id === idImg)
      this.selectedImgSrc = newImg.path
      this.selectedImgId = newImg.id
      this.selectedImgTitle = newImg.name
      this.imageList.map(value => value.active = false)
      newImg.active = true
      const modalThumbs = document.getElementById('modal-thumbs')
      let scrollPos = 50
      direction === 'next' ? modalThumbs.scrollLeft += scrollPos : modalThumbs.scrollLeft -= scrollPos
    }
  }
}
</script>
