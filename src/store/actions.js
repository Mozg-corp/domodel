import axios from 'axios';
import router from "../router";
export default {
	signIn: ({commit, dispatch, getters}, body)=>{
		dispatch('logout');
		return  axios({
				method: 'post',
				url: '/api/v1/auth/login',
				data: body,
				// headers: {'Content-Type': 'multipart/form-data' }
				// headers: {'Content-Type': 'Application/json' }
			}).then(response => {
				// console.log(response);
				if (response.data !== ''){
					// let data = JSON.parse(response.data);
					let data = response.data;
					//console.log('data', data);
					// if(data.status === 'OK'){
						let token = data.token,
							username = data.username;
						localStorage.setItem('user-token', token); // store the token in localstorage
						localStorage.setItem('user-username', username);
						// console.log(`Bearer_${token}`);
						let adminRole = data.roles.findIndex((el)=>{
							//console.log(el.authority ===  "ROLE_ADMIN")
								return  el.authority ===  "ROLE_ADMIN";
							});
						let isAdmin =  adminRole !== -1;
						localStorage.setItem('user-isAdmin', isAdmin);
						//console.log('auth_action',isAdmin);						
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
	fetchProfile: ({commit, dispatch,getters}, id) => {
		
			return new Promise(
				async (resolve, reject) => {
					let url = typeof(id) == "undefined"? '/api/v1/profile' : `/api/v1/profile/${id}`;
					console.log(url)
					let response =  await axios({
						method: 'get',
						url
					})
					let profile = response.data;
					commit('SET_PROFILE', profile);
					resolve(profile);
				}
			)
	},
	fetchUser: ({commit, dispatch,getters}, id) => {
		
			return new Promise(
				async (resolve, reject) => {
					let url = `/api/v1/management/users/${id}`;
					//console.log(url)
					let response =  await axios({
						method: 'get',
						url
					})
					let profile = response.data;
					commit('SET_PROFILE', profile);
					resolve(profile);
				}
			)
	},
	updateUser: ({commit}, updatedProfile) => {
			//console.log(updatedProfile)
			//console.log(`/api/v1/management/users/${updatedProfile.id}`)
		return new Promise(
			
			async (resolve, rejected) => {
				let response = await axios({
					method: 'post',
					url: `/api/v1/management/users/${updatedProfile.id}`,
					data: updatedProfile
				})
				if(response.status === 200){
					let profile = response.data;
					commit('SET_PROFILE', profile);
					resolve(profile);
				}else{
					rejected(response);
				}
			}
		)
	},
	fetchAllClaims: ({commit, dispatch,getters}) => {
			return new Promise(
				async (resolve, reject) => {
					let url = `/api/v1/appeals/all`;
					//console.log(url)
					let response =  await axios({
						method: 'get',
						url
					})
					let claims = response.data;
					console.log(response);
					commit('SET_CLAIMS', claims);
					resolve(claims);
				}
			)
	},
	updateProfile: ({commit, dispatch, getters}, newUserData) => {
		console.log(newUserData)
		return new Promise(
			async (resolve, rejected) => {
				let response = await axios ({
					method: 'post',
					url: '/api/v1/profile/update',
					data: newUserData
				});
				
				let updatedUserData= response.data;
				commit('SET_USER', updatedUserData);
				resolve(getters.getProfile);
			}
		);
	},
	fetchCounters: ({commit, dispatch, getters}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/meters',
				})
				let counters = response.data;
				commit('SET_COUNTERS', counters);
				resolve(counters);
			}
		);
	},
	fetchContact: ({commit, dispatch, getters}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/information/contacts'
				})
				let contact = response.data;
				commit('SET_CONTACT', contact);
				resolve(contact);
			}
		)
	},
	fetchNews: ({commit, dispatch, getters}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/news/relevant'
				})
				let news = response.data;
				commit('SET_NEWS', news);
				resolve(news);
			}
		)
	},
	createNews: ({commit, dispatch, getters}, news) => {
		return new Promise(
			async (resolve, reject) => {
					let response = await axios({
						method: 'post',
						url: '/api/v1/news',
						data: news
					})
					let addedNews = response.data;
					dispatch('fetchNews');
					resolve(addedNews);
			}
		)
	},
	updateNews: ({commit, dispatch, getters}, news) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: `/api/v1/news/${news.id}`,
					data: news
				})
				let updatedNews = response.data;
				dispatch('fetchNews');
				resolve(updatedNews);
			}
		)
	},
	fetchClaims: ({commit, dispatch, getters}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/appeals'
				})
				let claims = response.data;
				commit('SET_CLAIMS', claims);
				resolve(claims);
			}
		)
	},
	createClaim: ({commit, dispatch, getters}, newClaim) =>{
		return new Promise(
			async (resolve,reject) => {
				let response;
				try{
					response = await axios({
						method: 'post',
						url: '/api/v1/appeals',
						data: newClaim
					})
				}catch(e){
					reject(e);
				}
				if(response.status === 200){
					resolve();
				}else{
					reject(response)
				}
			}
		)
	},
	sendIndication: ({commit, dispatch, getters}, {id, value, isAdmin = false}) => {
		//console.log(id, value)
		// console.log(isAdmin)
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: `/api/v1/meters/${id}/data`,
					params: {
					  submitData: value
					}
				})
				if(response.status === 200){
					if(isAdmin){
						// dispatch('fetchAllMeters')
							// .then(
								// d => resolve(d)
							// )
					}else{
						dispatch('fetchCounters')
						.then(
							d => resolve(d)					
						)
					}
				}else{
					reject(response)
				}
			}
		)
	},
	createNewContactField: ({commit, dispatch}, newField) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: '/api/v1/information/contacts',
					data: newField
				})
				if(response.status === 200){
					dispatch('fetchContact')
						.then(
							d => resolve()					
						)
				}else{
					reject(response)
				}
			}
		)
	},
	fetchRequisites: ({commit, dispatch}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/management/requisites'
				})
				console.log(response)
				if(response.status === 200){
					let requisites = response.data;
					commit('SET_REQUISITES', requisites);
					resolve(requisites)
				}else{
					reject(response)
				}
			}
		)
	},
	fetchCityzens: ({commit, dispatch}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/management/users'
				})
				if(response.status === 200){
					let cityzens = response.data;
					commit('SET_CITYZENS', cityzens);
					resolve(cityzens)
				}else{
					reject(response)
				}
			}
		)
	},
	fetchAllMeters: ({commit, dispatch}) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: '/api/v1/meters/all'
				})
				if(response.status === 200){
					let meters = response.data;
					commit('SET_METERS', meters);
					resolve(meters);
				}else{
					reject(response)
				}
				
			}
		)
	},
	fetchSingleMeter: ({commit, dispatch}, id) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: `/api/v1/meters/${id}`
				})
				if(response.status === 200){
					let meter = response.data
					commit('SET_SINGLE_METER', meter);
					resolve(meter);
				}else{
					reject(response)
				}
			}
		)
	},
	fetchAllSingleMeterIndications: ({commit, dispatch}, id) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'get',
					url: `/api/v1/meters/${id}/data`
				})
				if(response.status === 200){
					let data = response.data;
					commit('SET_ALL_SINGLE_METER_INDICATION', data);
					resolve(data)
				}else{
					reject(response)
				}
			}
		)
	},
	updateClaim: ({commit, dispatch}, updatedClaim) => {
		//commit('UPDATE_CLAIM', updatedClaim);
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: `/api/v1/appeals/${updatedClaim.id}`,
					data: updatedClaim
				})
				if(response.status === 200){
					let claim = response.data;
					commit('UPDATE_CLAIM', claim);
					resolve(claim);
				}else{
					reject(response);
				}
			}
			
		)
	},
	updateMetersBatch: ({commit, dispatch}, metersData) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: '/api/v1/meters/all/data',
					data: metersData
				})
				if(response.status === 200){
					dispatch('fetchAllMeters')
						.then(
							r => resolve(r)
						)
					
				}else{
					reject(response)
				}
			}
		)
	},
	createNewCounter: ({commit, dispatch}, newCounter) => {
		console.log(newCounter)
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: '/api/v1/meters',
					data: newCounter
				})
				console.log(response)
				if(response.status === 200){
					let counter = response.data;
					commit('ADD_NEW_COUNTER', counter);
					resolve(counter);
				}else{
					reject(response)
				}
			}
		)
	},
	updateCounterDescription: ({commit, dispatch}, updatedCounter) =>{
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'put',
					url: '/api/v1/meters',
					data: updatedCounter,
				})
				if(response.status === 200){
					let meter = response.data;
					commit('SET_SINGLE_METER', meter);
					resolve(meter);
				}else{
					reject(response);
				}
			}
		)
	},
	changePassword: ({commit, dispatch}, auth) => {
		//console.log(auth);
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: '/api/v1/profile/update/password',
					data: auth
				})
				if(response.status === 200){
					resolve()
				}else{
					reject(response)
				}
			}
		)
	},
	changeContactField: ({commit, dispatch}, field) => {
		return new Promise(
			async (resolve, reject) => {
				let response = await axios({
					method: 'post',
					url: `/api/v1/information/contacts/${field.id}`,
					data: field
				})
				if(response.status === 200){
					let updatedField = response.data;
					commit('UPDATE_CONTACT_FIELD', updatedField);
					resolve(updatedField)
				}else{
					reject(response)
				}
			}
		)
	},
	changeRequisites: ({commit} , requisites) => {
		return new Promise(
			async (resolve, reject) => {
				try{
					let response = await axios({
						method: 'post',
						url: '/api/v1/management/requisites',
						data: requisites
					})
					console.log(response)
					if(response.status === 200){
						let updatedRequisites = response.data;
						commit('UPDATE_REQUISITES', updatedRequisites);
						resolve(updatedRequisites)
					}else{
						reject(response)
					}
				}catch(e){
					reject(e.response);
				}
			}
		)
	},
	fetchPayments: ({commit}) => {
		return new Promise(
			async (resolve, reject) => {
				try{
					let response = await axios({
						method: 'get',
						url: '/api/v1/bills'
					})
					if(response && response.status === 200){
						let payments = response.data;
						console.log(payments);
						commit('SET_PAYMENTS', payments)
						resolve(payments);
					}
				}catch(e){
					reject(e.response)
				}
			}
		)
	}
}