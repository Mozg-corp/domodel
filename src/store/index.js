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
		profile: '',
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        getErrorMsg: state => state.errorMsg,
        isAdmin: state => state.admin,
        getToken: state => `Bearer_${state.token}`,
        getUsername: state => state.username,
		getProfile: state => state.profile,
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
		SET_PROFILE: (state, profile) => {
			state.profile = profile
		},
		SET_USER: (state, user) => {
			state.profile.user = user
		}
    },
    actions: {
        signIn: ({commit, dispatch, getters}, body)=>{
			dispatch('logout');
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
                            // console.log(`Bearer_${token}`);
                            axios.defaults.headers.common['Authorization'] = `Bearer_${token}`;
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
        },
		fetchProfile: ({commit, dispatch,getters}) => {
			return new Promise(
				async (resolve, reject) => {
					// console.log(`${getters.getToken}`);
					// axios.defaults.headers.common['Authorization']=''
					let response =  await axios({
						method: 'get',
						url: '/api/v1/profile',
						headers: {
							'Content-Type': 'Application/json',
							// 'Authorization': `${getters.getToken}`
						}
					})
					let profile = response.data;
					commit('SET_PROFILE', profile);
					resolve(profile);
				}
			)
		},
		updateProfile: ({commit, dispatch, getters}, newUserData) => {
			return new Promise(
				async (resolve, rejected) => {
					let response = await axios ({
						method: 'post',
						url: 'https://localhost:8081/api/v1/profile/update',
						data: newUserData
					});
					
					let updatedUserData= response.data;
					commit('SET_USER', updatedUserData);
					resolve(getters.getProfile);
				}
			);
		}
    },
    modules: {}
});
