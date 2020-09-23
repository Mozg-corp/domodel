export default{
	token: localStorage.getItem('user-token') || '',
	status: '',
	errorMsg: '',
	admin: localStorage.getItem('user-isAdmin') || false,
	username: localStorage.getItem('user-username') || '',
	contact: [],
	requisites: {
		bankAccount: "",
		bankName: "",
		bik: "",
		companyAddress: "",
		companyName: "",
		correspondentAccount: "",
		id: "",
		inn: "",
		kpp: "",
		ogrn: ""
	},
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
	counters: [
		{
			accountId: null,
			checkDate: "",
			currentMeterData: null,
			houseNumber: "",
			id: null,
			model: "",
			serialNumber: "",
			tariffDescription: "",
			typeDescription: "",
		}
	],
	news: [],
	claims: []
}