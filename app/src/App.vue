<template>
  <div id="app">
    <GoogleMap />
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap.vue";
export default {
  name: "App",
  components: { GoogleMap },
  computed: {},
};
</script>
<style lang="scss">
@import "~normalize.css";
#app {
  width: 100%;
  height: 100vh;
}
</style>
