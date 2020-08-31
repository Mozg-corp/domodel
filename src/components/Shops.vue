<template>
<!--  <v-card-->
<!--      class="mx-auto"-->
<!--      max-width="500"-->
<!--  >-->
  <v-container>
    <v-row dense>
      <v-col cols="12"
             v-for="card in shops"
                   :key="card.id">
                <v-card
                    color="#E1F5FE"
                >
                  <router-link :to="{name:'shop', params: {id: card.id}}">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                          class="headline"
                          v-text="card.ShopName"
                      ></v-card-title>
                      <v-card-subtitle v-text="card.ShopAddress"></v-card-subtitle>
                    </div>

                    <v-avatar
                        class="ma-3"
                        size="125"
                        tile
                    >
                      <v-img :src="img"></v-img>
                    </v-avatar>
                  </div>
                  </router-link>
<!--                  <v-card-actions>-->
<!--                    <v-btn text>Listen Now</v-btn>-->
<!--                  </v-card-actions>-->
                </v-card>
              </v-col>


            </v-row>
          </v-container>
        <!--    <v-container >-->

<!--      <v-row dense-->
<!--             >-->
<!--        <v-col-->
<!--            v-for="card in shops"-->
<!--            :key="card.id"-->
<!--            cols="12"-->
<!--            sm-6-->
<!--        >-->
<!--          <v-card-->
<!--              max-width="400"-->
<!--              class="mx-auto">-->
<!--            <router-link :to="{name:'shop', params: {id: card.id}}">-->
<!--              <v-img-->
<!--                  src="https://via.placeholder.com/400x200"-->
<!--                  class="white&#45;&#45;text align-end"-->
<!--                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"-->
<!--                  height="200px"-->
<!--                  width="400px"-->
<!--              >-->
<!--                <v-card-title v-text="card.ShopName+' ' +card.ShopAddress"></v-card-title>-->
<!--              </v-img>-->
<!--            </router-link>-->
<!--            <v-card-actions>-->
<!--&lt;!&ndash;              <v-spacer></v-spacer>&ndash;&gt;-->

<!--&lt;!&ndash;              <v-btn icon>&ndash;&gt;-->
<!--&lt;!&ndash;                <v-icon>mdi-heart</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;              </v-btn>&ndash;&gt;-->

<!--&lt;!&ndash;              <v-btn icon>&ndash;&gt;-->
<!--&lt;!&ndash;                <v-icon>mdi-bookmark</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;              </v-btn>&ndash;&gt;-->

<!--&lt;!&ndash;              <v-btn icon>&ndash;&gt;-->
<!--&lt;!&ndash;                <v-icon>mdi-share-variant</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;              </v-btn>&ndash;&gt;-->
<!--            </v-card-actions>-->

<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      <router-link-->
<!--          :to="{ name: 'shopAdd', parapms:{id:null}}"-->
<!--          v-if="$store.getters.isAdmin">-->
<!--        <v-btn-->
<!--            bottom-->
<!--            color="pink"-->
<!--            dark-->
<!--            fab-->
<!--            fixed-->
<!--            right-->
<!--        >-->
<!--          <v-icon>add</v-icon>-->
<!--        </v-btn>-->
<!--      </router-link>-->
<!--    </v-container>-->
<!--  </v-card>-->
</template>

<script>
    import {getData} from '../lib/utils/rest-api/api-request'
    export default {
        // name: "Shops",
        data: () => ({
            shops: [],
            img: "https://via.placeholder.com/60x60"
        }),

        created() {
            this.getAllPosts();

        },

        methods: {
            getImgUrl(pic) {
                //return require('../assets/home/' + pic);
            },

            getAllPosts() {

                getData('/shops').then(res=>{
                    console.log(res.data);
                    this.shops = res.data
                });
                // var self = this
                // axios.get(this.endpoint)
                //     .then(response => {
                //         this.shops = response.data.Shops;
                //         console.log(this.shops[0]);
                //         console.log(this.shops[0].Src);
                //     })
                //     .catch(error => {
                //         console.log('-----error-------');
                //         console.log(error);
                //     })
            }
        }
    };
</script>

<style scoped lang="sass">
  a
    text-decoration: none
</style>