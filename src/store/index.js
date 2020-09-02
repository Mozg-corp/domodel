import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import axios from 'axios';
import router from "../router";

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
        errorMsg: '',
        admin: localStorage.getItem('user-isAdmin') || false,
        username: localStorage.getItem('user-username') || '',
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        getErrorMsg: state => state.errorMsg,
        isAdmin: state => state.admin,
        getToken: state => `Bearer ${state.token}`,
        getUsername: state => state.username,
    },
    mutations: {
        AUTH_REQUEST: (state) => {

            state.status = 'loading'
        },

        AUTH_SUCCESS: (state, {token, isAdmin, username}) => {
            state.admin = isAdmin;
            state.status = 'success';
            state.token = token;
            state.token = username;

        },

        AUTH_ERROR: (state, msg) => {

            state.status = 'error';
            state.errorMsg = msg;
            state.token = '';

        },

        LOGOUT: (state) => {

            state.status = '';
            state.token = '';
            state.username = '';
            state.admin = false;

        },
    },
    actions: {
        signIn: ({commit, dispatch, getters}, body)=>{
            return  axios({
                    method: 'post',
                    url: '/api/v1/auth/login',
                    data: body,
                    // headers: {'Content-Type': 'multipart/form-data' }
                    headers: {'Content-Type': 'Application/json' }
                }).then(response => {
                    // console.log(response);
                    if (response.data !== ''){
                        // let data = JSON.parse(response.data);
                        let data = response.data;
                        // console.log('data', data);
                        // if(data.status === 'OK'){
                            let token = data.token,
                                isAdmin = data.admin,
                                username = data.username;
                            localStorage.setItem('user-token', token); // store the token in localstorage
                            localStorage.setItem('user-isAdmin', isAdmin);
                            localStorage.setItem('user-username', username);
                            // console.log(axios.defaults.headers.common);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                            commit('AUTH_SUCCESS', {token, isAdmin, username});

                        // }else if(data.status === 'deny'){
                            // console.log(data.msg);
                            // let msg = data.msg;
                            // commit('AUTH_ERROR', msg);
                            // localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                            // localStorage.removeItem('user-isAdmin');
                            // localStorage.removeItem('user-username');
                        // }
                    }
                }).catch(e =>{
                    console.log(e);
					commit('AUTH_ERROR', ',eh ,eh');
					localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
					localStorage.removeItem('user-isAdmin');
					localStorage.removeItem('user-username');
                });
        },
        logout({commit, dispatch}) {
            return new Promise((resolve, reject)=>{
                commit('LOGOUT');
                localStorage.removeItem('user-token');
                localStorage.removeItem('user-isAdmin');
                localStorage.removeItem('user-username');
                // remove the axios default header;
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        }
    },
    modules: {}
});
