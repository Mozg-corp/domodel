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
						СНТ "Юбилейный" МО, Ногинский район поселок им. Воровского, участок №28
					</p>
				</div>
			</article>
			<!--<CounterItemValue v-for="counters"/>-->
		</div>
	</div>
</template>
<script>
export default{
	name: 'CounterItem',
	props: [
		'house'
	],
	data: ()=>({
		newValue: null
	}),
	mounted(){
		console.log(this.house)
	}
}
</script>
<style scooped lang="sass">
	.counter_box
		padding: 22px 60px 0 60px
</style>