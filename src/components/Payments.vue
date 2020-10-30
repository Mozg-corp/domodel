<template>
	<div v-if="loading" class="profile_container r-flex">
			Loading...
	</div>
	<div v-else id="payments" class="tabcontent" style="display: block;">
	
			<!--<CounterItem v-for="house in payments" :house="house"/>-->
			
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PaymentsList from '@/components/PaymentsList.vue';
export default{
	name: 'Counter',
	data: ()=>({
		loading: false,
		data: []
	}),
	components: {
		PaymentsList
	},
	computed: {
		...mapState(['payments'])
	},
	methods: {
		...mapActions(['fetchPayments'])
	},
	mounted(){
		this.loading = true;
		this.fetchPayments()
			.then(
				payments => this.loading = false
			)
	}
}
</script>

<style scoped lang="sass">

	
</style>