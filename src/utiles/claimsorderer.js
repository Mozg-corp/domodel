const ClaimsOrderer = class {
	constructor(claims){
		this.claims = claims
	}
	order(params){
		let res = [];
		if(params && params.status){
			res = this.orderByStatus(params.status)
		}
		return res;
	}
	orderByStatus(status){
		switch(status){
			case 'Все': 
				return this.claims;
				break
			default: 
				return this.filterStatus(status)
		}
	}
	filterStatus(status){
		return this.claims.filter(el => el.status === status)
	}
}
export {ClaimsOrderer};