<template>
        <div>
            <v-card
                    :color="category.color"
                    dark
            >
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title
                                class="headline"
                                v-text="category.title"
                        ></v-card-title>
                        <v-card-subtitle
                        v-text="category.subtitle">
                        </v-card-subtitle>
                    </div>

                    <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                    >
                        <v-img :src="category.src"></v-img>
                    </v-avatar>
                </div>
            </v-card>
        </div>
</template>

<script>
    export default {
        name: "GoodsCategoryListItem",
        props: {
            category: {
                required: true,
                type: Object,
            }
        },
    }
</script>

<style scoped>

</style>




