const Pagination = class{
	constructor(array, limit = 20){
		this.array = array;
		this.perPage = limit;
	}
	getTotal(){
		return this.array.length;
	}
	getPagesNumber(){
		let number = this.getTotal() % this.perPage;
		return ++number;
	}
	getPaginationArray(currentPage){
		let paginationArray = [];
		paginationArray.push(1);
		let pagesNumber = this.getPagesNumber();
		for(let i=2; i<pagesNumber;++i){
			if(i>currentPage-2 || i<currentPage+2 || i>pagesNumber-2){
				paginationArray.push(i);
			}
		}
		paginationArray.push(pagesNumber);
		return paginationArray;
	}
	getPage(pageNumber){
		let res = [];
		let start = --pageNumber * this.perPage;
		let end = start + this.perPage;
		end = end > this.getTotal() ? this.getTotal() : end;
		for(let i = start; i<end; ++i){
			res.push(this.array[i]);
			//console.log(this.array[i])
		}
		return res;
	}
}
export {Pagination};