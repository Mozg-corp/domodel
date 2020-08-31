<template lang="html">
  <v-container id="inspire">
    <v-card class="pa-6"  min-width="800">
<!--      <v-toolbar flat>-->

<!--        <v-app-bar-nav-icon v-on:click="refreshCategories(); setHidden();"></v-app-bar-nav-icon>-->

<!--        <v-text-field-->
<!--            flat-->
<!--            solo-inverted-->
<!--            hide-details-->
<!--            prepend-inner-icon="search"-->
<!--            label="Search"-->
<!--            class="hidden-sm-and-down"-->
<!--            v-model="search"-->
<!--            id="search"-->
<!--            @change="refreshCategories"-->
<!--        ></v-text-field>-->
<!--        <v-spacer></v-spacer>-->

<!--        <v-spacer></v-spacer>-->
<!--        <template v-slot:extension>-->
          <v-tabs
              v-model="tabs"
              fixed-tabs
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab
                href="#mobile-tabs-5-1"
                class="primary--text"
            >
              <v-icon>map</v-icon>
            </v-tab>

<!--            <v-tab-->
<!--                href="#mobile-tabs-5-2"-->
<!--                class="primary&#45;&#45;text"-->
<!--            >-->
<!--              <v-icon>mdi-heart</v-icon>-->
<!--            </v-tab>-->

            <v-tab
                href="#mobile-tabs-5-3"
                class="primary--text"
            >
              <v-icon>info</v-icon>
            </v-tab>
          </v-tabs>
<!--        </template>-->
<!--      </v-toolbar>-->

      <v-tabs-items v-model="tabs"  >
        <v-tab-item
            :value="'mobile-tabs-5-1'"
        >
          <v-card flat pa-8 mt-4 min-height="800">

<!--              <router-link-->
<!--                  :to="{name: 'mapdraw', params:{id: id}}"-->
<!--                  v-if = "$store.getters.isAdmin"-->
<!--              >Нарисовать\редактировать карту</router-link>-->
            <v-btn text small class="mt-8" color="info"
                   v-if = "$store.getters.isAdmin"
                    @click="draw">
              Нарисовать\редактировать карту
            </v-btn>

            <SVGView :id="id" ></SVGView>
          </v-card>
<!--          <v-list >-->
<!--            <v-list-group-->
<!--                v-for="item in categories"-->
<!--                :key="item.name"-->
<!--                :prepend-icon="item.img"-->
<!--                no-action-->
<!--            >-->
<!--              <template v-slot:activator>-->
<!--                <v-list-item-content :data-parent="item.id">-->
<!--                  <v-list-item-title v-text="item.name"></v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </template>-->
<!--            </v-list-group>-->
<!--          </v-list>-->
        </v-tab-item>
        <v-tab-item
            :value="'mobile-tabs-5-3'"
        >
          <v-card flat
                  min-width="800"
                  max-width="1980"
                  min-height="800">
<!--            <router-link-->
<!--                :to="{name: 'shopAdd', params:{shop:shop}}"-->
<!--                v-if="$store.getters.isAdmin"-->
<!--            >редактировать данные</router-link>-->
            <v-btn text small class="mt-8" color="info"
                   v-if = "$store.getters.isAdmin"
                   @click="editDescription">
              редактировать данные
            </v-btn>
            <v-card-text style="max-width: 800px; margin-top: 50px">
              <h2>{{shop.ShopName}}</h2>
              <h3>{{shop.ShopAddress}}</h3>
              <p>
                <strong>{{shop.ShopEmail}}</strong>
                <br>
                <strong>{{shop.ShopPhone}}</strong>
              </p>
              <p><strong>{{shop.description}}</strong></p>
            </v-card-text>
            <v-img
                src="https://via.placeholder.com/800x400"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                style="margin: 20px auto"
            ></v-img>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-card>

  </v-container>

</template>

<script>
    // import axios from 'axios';
    import {getData} from "../lib/utils/rest-api/api-request";
    import SVGView from "../components/SVGView"

    export default {
        name: 'Shop',
        props: ['id'],
        components: {SVGView},
        data: () => ({
            shop: {ShopName: '', ShopAddress: '', ShopEmail: '', ShopPhone: '', description: ''},
            post: null,
            categories: null,
            categoriesId: 0,
            endpoint: '/shops/',
            isHidden: true,
            tabs: 'mobile-tabs-5-1',
            text: ['Здесь будет карта!!!', 'Здесь будут избранные маршруты', 'Здесь будет информация'],
            search: ''
        }),
        methods: {
            editDescription(){
                this.$router.push({name: 'shopAdd', params:{shop:this.shop}});
            },
            draw(){
                this.$router.push({name: 'mapdraw', params:{id: this.id}});
            },
            getPost() {
                getData('/shops/' + this.id).then(res => {
                    // console.log(res.data);
                    this.shop = res.data;
                })
                // axios(this.endpoint)
                //     .then(response => {
                //         console.log("axios");
                //         this.post = response.data;
                //         let shops = this.post.Shops;
                //         this.shop = shops.find(shop => shop.Id === id);
                //         this.categories = this.getCategories();
                //     })
                //     .catch( error => {
                //         console.log('-----errorShop-------');
                //         console.log(error)
                //     })
            },
            setCategories(event) {
                console.log("setCategories");

                this.categoriesId = event.target.getAttribute("data-parent");
                // this.categories = this.getCategories();
            },
            getCategories() {
                console.log("getCategories");
                // let categoriesShops = this.post.Categories;
                let categoriesShops = '';
                getData('/maps/' + this.id).then(res => {
                    // console.log(res.data);

                    this.categories = res.data.filter(x => x.label != '').map(r => {
                        return {name: r.label};
                    });
                });
                // return categoriesShops;
                // let categoriesFilter = categoriesShops.filter(item => item.ParentId == this.categoriesId);
                // if (categoriesFilter.length === 0) {
                //     this.isHidden = false;
                //     this.refreshCategories();
                //     this.getRoute();
                // } else return categoriesFilter;
            },
            refreshCategories() {
                console.log("refreshCategories");
                this.categoriesId = 0;
                this.isHidden = this.isHidden?!this.isHidden:this.isHidden;
                // document.getElementById("search").value = "";
                let categories = this.categories.slice();
                // console.log(categories);
                // console.log(categories.filter(x=>{
                //     return (x.name.toLowerCase()).indexOf(this.search.toLowerCase()) !== -1
                // }));
                this.categories = categories.filter(x=>{
                    // console.log(x.name.toLowerCase());
                    // console.log(x.name.toLowerCase()).indexOf(this.search.toLowerCase() !== -1);
                    return (x.name.toLowerCase()).indexOf(this.search.toLowerCase()) !== -1
                }).map(x=>{return x.name});
            },
            setHidden() {
                this.isHidden = !this.isHidden;
            },
            getRoute() {
                console.log("Строим маршрут");
            },
            searcher() {
                console.log("search");
                this.isHidden = true;
                this.categories = this.post.Categories.filter(item => item.Name.indexOf(this.search) !== -1);
                console.log(this.categories);
            }
        },

        created() {
            console.log("created");
            // console.log(this.id);
            this.getPost();
            this.getCategories();
        },

        watch: {
            // search(after, before) {
            //     this.searcher();
            // }
        }
    }
</script>

<style scoped lang="sass">
  h2,h3, p
    margin: 5px 0

</style>