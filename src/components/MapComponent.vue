<template>
    <div>
        <SVGDraw>

        </SVGDraw>
    </div>
</template>

<script>
    import SVGDraw from "./SVGDraw";

    export default {
        name: "MapComponent",
        components: {
            SVGDraw,
        },
        methods:{

        }
    }
</script>

<style scoped lang="sass">
    #addRect
        background-color: greenyellow
        /*border: #0d47a1 solid 1px*/
        padding: 20px 20px
        &>span
            border: #0d47a1 solid 1px
            padding: 0 10px
            line-height: 0
</style>