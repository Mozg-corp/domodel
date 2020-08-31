<template>
    <v-container>
        <v-layout
                text-center
                wrap
        >
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Авторизоваться</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                v-model="valid"
                                ref="form"
                                validation
                                >
                                    <v-text-field
                                            label="Пользователь"
                                            name="username"
                                            type="text"
                                            v-model="username"
                                            :counter="50"
                                            required
                                            :rules="usernameRules"
                                    />
                                    <v-text-field
                                            id="password_auth"
                                            label="Пароль"
                                            name="password"
                                            type="password"
                                            v-model="password"
                                            :counter="8"
                                            required
                                            :rules="passwordRule"
                                    />
                                    <p
                                            class="error-p"
                                            v-show="error" >
                                        {{msg}}
                                    </p>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                        color="primary"
                                        @click="signIn"
                                        :disabled="!valid"
                                >Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    // const service = axios.create({
    //     baseURL: 'http://ibuypro.inshop.online/',
    //     timeout: 5000
    // })
    export default {
        name: 'AuthComponent',

        data: () => ({
            username:'',
            password:'',
            valid: false,
            error: false,
            msg:'',
            usernameRules:[
                v => !!v || 'Необходимое поле',
                v => v.length <= 50 || 'Имя максимально 50 символов',
            ],
            passwordRule:[
                v => !!v || 'Необходимое поле',
                v => (v&&v.length >= 8) || 'Пароль больше 8 символов',
            ]
        }),
        methods:{
            signIn(){
                console.group('Авторизация');
                console.log(this.$refs.form.validate());
                if (this.$refs.form.validate()) {

                    let bodyFormData = new FormData();
                    bodyFormData.set('Users[username]', this.username);
                    bodyFormData.set('Users[password]', this.password);

                    this.$store.dispatch('signIn', bodyFormData)
                        .then(()=>{
                        // console.log(this.$store.getters.authStatus);
                        if(this.$store.getters.authStatus === 'success'){
                            this.error = false;
                            this.$router.push('/')
                        }else if(this.$store.getters.authStatus === 'error'){
                            this.error = true;
                            this.msg = this.$store.getters.getErrorMsg;
                            // console.log(this)
                        }
                        })
                        .catch();
                    // axios({
                    //     method: 'post',
                    //     url: '/auth/sign-in',
                    //     data: bodyFormData,
                    //     headers: {'Content-Type': 'multipart/form-data' }
                    // // }).then(response => console.log(response.data))
                    // }).then(response => {
                    //     console.log(response);
                    //     if (response.data !== ''){
                    //         // let data = response.data;
                    //         let data = JSON.parse(response.data);
                    //         console.log(data.status);
                    //         if(data.status === 'OK'){
                    //             console.log(data);
                    //             this.error = false;
                    //             this.$router.push('/');
                    //         }else if(data.status === 'deny'){
                    //             console.log(data.msg);
                    //             this.msg = data.msg;
                    //             this.error = true;
                    //         }
                    //     }
                    // }).catch(e =>{
                    //        console.log(e.message);
                    // });
                    console.groupEnd();
                }
            },

        }
    };
</script>
<style scoped lang="sass">
    .error-p
        color: red
</style>
