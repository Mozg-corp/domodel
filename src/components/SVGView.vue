<template>
  <div class="d-flex  align-center flex-column">
    <div class="cv-container ma-5">

    </div>

<!--    <button id="find_btn" @click.prevent="findPath">-->
<!--      Найти путь-->
<!--    </button>-->
    <!--    <p>Выберите категории для поиска</p>-->
    <label class="typo__label">Выберите категории для поиска пути обхода ниже:</label>
    <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false"
                 :preserve-search="true" placeholder="Начните вводить название категории" label="name" track-by="name"
                 :preselect-first="true"
                  class="sct_categories"
                 style="min-width: 500px; margin:17px"
                  >
      <template
                slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                               v-if="values.length &amp;&amp; !isOpen"> Вы выбрали: {{ values.map(x=>x.name) }} </span>
      </template>
    </multiselect>
    <v-btn large color="primary"
                         id="find_btn" @click.prevent="findPath"
                         max-width="200"
                         min-height="30"
  > Найти путь</v-btn>
  </div>
</template>

<script>
    import {SVG} from '@svgdotjs/svg.js';
    import {getData, postData} from '../lib/utils/rest-api/api-request';
    import {buildMap} from "../lib/utils/build-svg/build-map";
    import Multiselect from 'vue-multiselect'
    import {buildTails} from "../lib/utils/tails";

    // let body = {"Categories": ["Макароны"]};
    let body = ["Макароны", "Шашлык", "Вода"];

    export default {
        name: "SVGView",
        props: ['id'],
        components: {
            Multiselect
        },
        data: () => ({
            draw: '',
            racks: '',
            pathTops: '',
            value: null,
            options: [/*{ name: 'Vue.js', language: 'JavaScript' },
                { name: 'Adonis', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP' },
                { name: 'Phoenix', language: 'Elixir' }*/]
        }),
        methods: {
            async findPath() {
                if(this.value){
                    let res = await postData('/find-path/'+this.id, {'Categories': this.value.map(x => {
                            return x.name;
                        })});
                    console.group('Нахождение пути');
                    console.log(res.data);
                    console.groupEnd('Нахождение пути');
                    this.pathTops = res.data;
                    // console.log('ddtheh');
                    // console.log(Object.keys(this.pathTops));
                    this.drawPath();
                }

            },
            drawPath() {
                if (this.pathTops.length) {
                    let pathTops = [];
                    this.pathTops.forEach(s => {
                        s.forEach(t => {
                            this.racks.forEach((r) => {
                                if (t === r.top) {
                                    pathTops.push(r);
                                }
                            })
                        })
                    });
                    console.log(pathTops);
                    for (let i = 0; i + 1 < pathTops.length; i++) {
                        let x1 = pathTops[i]['x'];
                        let y1 = pathTops[i]['y'];
                        let x2 = pathTops[i + 1]['x'];
                        let y2 = pathTops[i + 1]['y'];
                        let w1 = pathTops[i].width,
                            h1 = pathTops[i].height,
                            w2 = pathTops[i + 1].width,
                            h2 = pathTops[i + 1].height;
                        // console.group('coordinates');
                        // console.log(x1);
                        // console.log(y1);
                        // console.log(x2);
                        // console.log(y2);
                        // console.groupEnd();

                        let line = null;
                        let switch_case = null;

                        if (pathTops[i].label === '' && pathTops[i + 1].label === '') {
                            switch_case = '1';
                        } else if (pathTops[i].label === '' && pathTops[i + 1].label !== '') {
                            switch_case = '2';

                        } else if (pathTops[i].label !== '' && pathTops[i + 1].label === '') {
                            switch_case = '3';
                        }
                        // console.log(switch_case);

                        switch (switch_case) {
                            case '1': {
                                this.draw.line(x1+w1*0.2 / 2, y1+ h1*0.2 / 2, x2 +w2*0.2 / 2, y2+ h2*0.2 / 2).stroke({
                                    width: 3,
                                    color: 'black'
                                });
                                break;
                            }
                            case '2': {
                                this.draw.line(x1 , y1, x2 + w2 / 2, y2 + h2 / 2).stroke({
                                    width: 3,
                                    color: 'black'
                                });
                                break;
                            }
                            case '3': {
                                this.draw.line(x1 + w1 / 2, y1 + h1 / 2, x2+w2*0.2 / 2, y2 + h2*0.2 / 2).stroke({
                                    width: 3,
                                    color: 'black'
                                });
                                break;
                            }

                        }
                        // this.draw.line(x1+w1/2, y1+h1/2, x2+w2/2, y2+h2/2).stroke({ width: 3,color: 'black' });

                    }
                }
            },
        },
        async mounted() {
            console.group('mounted');

            let res = await getData('/maps/'+this.id);
            this.racks = res.data;
            this.options = this.racks.filter(x => x.label != '').map(r => {
                return {name: r.label};
            });

            console.group('Полученные данные');
            console.log(res);
            console.log(this.racks);
            console.groupEnd('getData');

            this.draw = SVG().addTo('.cv-container').size(600, 400);
            buildMap(this.racks, this.draw);
            // buildMap(this.racks.filter(x => x.label != ''), this.draw);

            console.groupEnd('mounted');

            // console.log(JSON.stringify(body));
        }
    }
</script>

<style scoped lang="sass">
  #find_btn
    width: 100%
    height: 22px
    background-color: forestgreen
    border: 1px solid black
    margin-top: 50px
  .typo__label
    color: #880000
    /*margin-top: 33px*/
  .sct_categories
    border: #00BFFF 1px solid
    color: forestgreen
    padding: 7px
</style>