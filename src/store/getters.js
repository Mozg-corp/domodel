export default {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
	getErrorMsg: state => state.errorMsg,
	isAdmin: state => state.admin,
	getToken: state => `Bearer_${state.token}`,
	getUsername: state => state.username,
	getProfile: state => state.profile,
}