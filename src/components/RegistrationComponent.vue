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
                                <v-toolbar-title>Зарегистрироваться</v-toolbar-title>
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
                                    <p
                                            :class="[usernameError?'error-p':'']"
                                            v-show="usernameError" >
                                        {{errorMsg.username}}
                                    </p>
                                    <v-text-field
                                            label="Email"
                                            name="email"
                                            type="text"
                                            v-model="email"
                                            :counter="255"
                                            required
                                            :rules="emailRule"
                                    />
                                    <p
                                            :class="{'error-p': emailError}"
                                            v-show="emailError" >
                                        {{errorMsg.email}}
                                    </p>
                                    <v-text-field
                                            label="Ещё раз email"
                                            name="emailConfirm"
                                            type="text"
                                            v-model="emailConfirm"
                                            :counter="255"
                                            required
                                            :rules="emailConfirmRule"
                                    />
                                    <v-text-field
                                            id="password_registration"
                                            label="Пароль"
                                            name="password"
                                            type="password"
                                            v-model="password"
                                            :counter="8"
                                            required
                                            :rules="passwordRule"
                                    />
                                    <v-text-field
                                            id="passwordConfirm_registration"
                                            label="Ещё раз пароль"
                                            name="password-confirm"
                                            type="password"
                                            v-model="passwordConfirm"
                                            :counter="8"
                                            required
                                            :rules="passwordConfirmRule"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn
                                        color="primary"
                                        @click="signUp"
                                        :disabled="!valid"
                                >Сделать</v-btn>
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

    export default {
        name: 'AuthComponent',

        data: () => ({
            username:'',
            email:'',
            emailConfirm:'',
            password:'',
            passwordConfirm:'',
            usernameError: false,
            emailError: false,
            valid: false,
            errorMsg: {
              username: '',
              email: '',
            },
            usernameRules:[
                v => !!v || 'Необходимое поле',
                v => v.length <= 50 || 'Имя максимально 50 символов',
            ],
            passwordRule:[
                v => !!v || 'Необходимое поле',
                v => (v&&v.length >= 8) || 'Пароль больше 8 символов',
            ],
            passwordConfirmRule: [
                // v => (v&&!!v) || 'Надо повторить пароль',
                // v => (v && v === password) || 'Пароли не совпадают'
            ],
            emailRule:[
                v => !!v || 'Необходимое поле',
                v => /.+@.+\..+/.test(v) || 'Email должен быть правильным',
            ],
            emailConfirmRule: [
                // v => (v&&!!v) || 'Надо повторить email',
                // v => (v && v === password) || 'Пароли не совпадают'
            ]
        }),
        methods:{
            signUp(){
                if (this.$refs.form.validate()) {
                    let bodyFormData = new FormData();
                    bodyFormData.set('Users[username]', this.username);
                    bodyFormData.set('Users[email]', this.email);
                    bodyFormData.set('Users[password]', this.password);

                    axios({
                        method: 'post',
                        url: '/auth/sign-up',
                        data: bodyFormData,
                        headers: {'Content-Type': 'multipart/form-data' }
                    }).then(response => {
                            console.log(response);
                            let data = JSON.parse(response.data);
                            if(data.status === 'registered'){
                                this.emailError = false;
                                this.usernameError = false;
                                this.$router.push('/');
                                // this.error = false;
                            }else if(data.status === 'rejected'){
                                if(data.error.email){
                                   this.errorMsg.email = data.error.email;
                                   this.emailError = true;
                                }else{
                                    this.errorMsg.email = '';
                                    this.emailError = false
                                }
                                if(data.error.username){
                                   this.errorMsg.username = data.error.username;
                                   this.usernameError = true;
                                }else {

                                    this.errorMsg.username = '';
                                    this.usernameError = false;
                                }
                        }
                    }).catch(e =>{
                        console.log(e.message);
                    });
                }
            },

        }
    };
</script>
<style scoped lang="sass">
    .error-p
        color: red

</style>