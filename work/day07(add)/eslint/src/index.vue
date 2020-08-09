<template>
    <div></div>
</template>

<script>
export default {
  name: 'index',
  mounted () {
    var a = 'a'
    console.log(a)

    var b = "b";

    /* eslint-disable */
      var c = "c";
      var d = "d";
    /* eslint-enable */
  }
}
</script>

<style scoped>

</style>
