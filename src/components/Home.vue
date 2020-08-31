<template>

        <v-banner
            single-line
            max-width="800px"
            class="mt-8"
        >
            <p><strong>Пользователи</strong>: <br><br>
              Гость и user/12345678 - чтение,<br>
              admin/12345678 - редактирование<br></p>

          <template v-slot:actions>
            <v-btn
                text
                color="deep-purple accent-4"
                @click="$router.push({name:'shops'})"
            >Построить маршрут</v-btn>
          </template>
        </v-banner>
</template>

<script>

    // import axios from 'axios';
    import {getData} from '../lib/utils/rest-api/api-request'

    export default {
        name: 'Home',
    };
</script>