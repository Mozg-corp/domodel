export default{
	token: '',
	status: '',
	errorMsg: '',
	admin: false,
	username: '',
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
	cityzens: [],
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
	claims: [],
	meters: [],
	singleMeter: {},
	singleMeterAllIndications: [],
	payments: []
}