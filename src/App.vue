<template>
  <div id="app">
    <Photography :imageList="imageList" />
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
    console.log(this.imageList);
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
          id: id,
          active: false
        });
      });
    }
  }
};
</script>
