<template>
    <div>
        <SVGComponent :id="id"></SVGComponent>
    </div>
</template>

<script>
    import SVGComponent from "../components/SVGDraw";
    export default {
        name: "Map",
        props: ['id'],
        components: {
            SVGComponent
        }
    }
</script>

<style scoped>

</style>