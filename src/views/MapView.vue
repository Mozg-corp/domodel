<template>
  <div>
    <SVGComponent :id="id"></SVGComponent>
  </div>
</template>

<script>
  import SVGComponent from "../components/SVGView"
    export default {
        name: "MapView",
        props: ['id'],
        components: {
            SVGComponent
        }
    }
</script>

<style scoped>

</style>