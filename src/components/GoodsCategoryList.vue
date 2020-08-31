<template>

    <div class="GoodsCategoryListContainer">
        <GoodsCategoryListItem class="GoodsCategoryListItem"
            v-for="(category) in categories"
            :key="category.title"
            :category="category"
        ></GoodsCategoryListItem>
    </div>
</template>

<script>
    import GoodsCategoryListItem from './GoodsCategoryListItem'

    export default {
        name: "GoodsCategoryList",
        components: {
            GoodsCategoryListItem,
        },
        data: () => {
            return {
                categories: [
                    {
                        color: '#1F7087',
                        title: 'Молочка',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Хлебобулки',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Консервы',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Конфеты',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Чай',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Специи',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Макароны',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                    {
                        color: '#1F7087',
                        title: 'Овощи',
                        subtitle: 'Какое-то описание категории',
                        src: 'https://via.placeholder.com/80',
                    },
                ],
                selectedItem: 0,
                disabled: false,
                dense: false,
                twoLine: false,
                threeLine: false,
                shaped: false,
                flat: false,
                subheader: false,
                inactive: false,
                subGroup: false,
                nav: false,
                src: false,
                rounded: false,
            };
        },
    }
</script>

<style scoped lang="sass">
    .GoodsCategoryListItem
        padding: 0 0 5px 0
</style>