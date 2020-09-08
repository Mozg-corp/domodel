export default{
	token: localStorage.getItem('user-token') || '',
	status: '',
	errorMsg: '',
	admin: localStorage.getItem('user-isAdmin') || false,
	username: localStorage.getItem('user-username') || '',
	profile: {
		"accounts": [
			{
				"id": null,
				"address": "",
				"houseNumber": "",
				"acresAmount": null
			}
		],
		"user": {
			"username": "",
			"firstName": "",
			"lastName": "",
			"patronymic": "",
			"email": "",
			"photoLink": "",
			"address": ""
		}
	},
}