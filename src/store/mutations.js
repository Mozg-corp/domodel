export default {
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
		state.profile = profile;
	},
	SET_USER: (state, user) => {
		state.profile.user = user;
	},
	SET_COUNTERS: (state, counters) => {
		state.counters = counters;
	}
}