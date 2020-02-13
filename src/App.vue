<template>
  <div id="app">
    <b-container fluid>
      <Photography :imageList="imageList" v-if="imageList.length" />
      <h4 v-else class="no-images">No image inserted in assets/img folder</h4>
    </b-container>
  </div>
</template>

<script>
import Photography from "@/components/Photography";
export default {
  components: {
    Photography
  },
  data: () => ({
    imageList: []
  }),
  mounted() {
    this.importAll(require.context("./assets/img/", true, /\.jpg$/));
  },
  methods: {
    importAll(r) {
      r.keys().forEach((key, id) => {
        this.imageList.push({
          path: r(key),
          name: key
            .replace("./", "")
            .replace(".jpg", "")
            .replace(/-/g, " ")
            .substr(key.indexOf("-") - 1), // remove './', '.jpg', '-' and first word
          category: key
            .replace("./", "")
            .replace(".jpg", "")
            .replace(/-/g, " ")
            .replace(/ .*/, ""), // remove './', '.jpg', '-' and get first word as category
          id: id + 1,
          active: false
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import "./src/assets/styles/_variables.scss";
html,
body {
  height: 100%;
  background-color: $color1 !important;
  color: #fff !important;
}

#app {
  .no-images {
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
