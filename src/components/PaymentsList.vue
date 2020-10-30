<template>
	<div>
		<h2>
			ПОКАЗАНИЯ ПРИБОРОВ УЧЕТА
		</h2>
		<div class="cabinet_personal_line"></div>
		<div class="payments_container">
			<article>
				<div class="r-flex">
					<h3 class="payment_header">
						Объект:
					</h3>
					<p class="payment_subject">
						<!--<b>участок №{{house.houseNumber}}</b>    ({{house.address}})-->
					</p>
				</div>
			</article>
			<!--<CounterItemValue v-for="meter in house.meters" :meter="meter"/>-->
		</div>
	</div>
</template>
<script>
import PaymentsListItem from '@/components/PaymentsListItem';
export default{
	name: 'PaymentsLIst',
	components: {
		PaymentsListItem
	},
	props: [
	],
	data: ()=>({
		newValue: null
	}),
	mounted(){
		//console.log(this.house)
	}
}
</script>
<style scooped lang="sass">
	.counter_box
		padding: 22px 60px 0 60px
</style>