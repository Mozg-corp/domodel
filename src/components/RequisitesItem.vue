<template>
	<div class="requisites_details  r-flex">
		<label :for="name" class="requisites__name">
			{{fieldsNames[name]}}:
		</label>
		<input :disabled="disabled" type="text" :name="name" :value="value" @change="changeRequisitesHandler($event)"/>
	</div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
export default{
	name: 'RequisitesItem',
	props: ['value', 'name', 'disabled'],
	data: ()=>({
		fieldsNames: {
			companyName: "Организация",
			companyAddress: "Адресс",
			inn: "ИННЭ",
			kpp: "КПП",
			ogrn: "ОГРН",
			bankAccount: "Р/С",
			bankName: "Банк",
			bik: "БИК",
			correspondentAccount: "К/С"
		}
	}),
	computed: {
		...mapState(['requisites'])
	},
	methods: {
		...mapActions(['changeRequisites']),
		changeRequisitesHandler($event){
			let fieldText = $event.target.value;
			let fieldName = $event.target.name;
			let newRequisites;
			newRequisites = {...this.requisites, [fieldName]: fieldText};
			//**//
			this.changeRequisites(newRequisites)
				.then(
					(updatedRequisites) => {
						console.log(updatedRequisites)
					}
				)
			//*/
		}
	},
	mounted(){
		//console.log(this.value)
		//console.log(this.name)
	}
}
</script>
<style scoped lang="sass">
	.requisites__name
		flex-basis: 261px
	input, textarea
		background-color: rgba(239, 239, 239, 0.3)
	input:disabled, textarea:disabled
		border: 1px solid #FFF
		background-color:  #FFF	
	.requisites_details
		margin: 12px 0 0 145px
</style>
0: Array(2)
0: "companyName"
1: "Название СНТ"
length: 2
__proto__: Array(0)
1: (2) ["companyAddress", "Адрес СНТ"]
2: (2) ["inn", 13331]
3: (2) ["kpp", 23332]
4: (2) ["ogrn", 53335]
5: (2) ["bankAccount", "66666"]
6: (2) ["bankName", "Банк"]
7: (2) ["bik", 13311]
8: (2) ["correspondentAccount", "555555555"]