<template>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["src"],
  mounted() {
   let element = this.$element;
    var img = new Image();
    img.style.display = "none";
    img.src = this.src;
    element.appendChild(img);
  }
};
</script>
