<template>
	<div>
		<article class="member_meters r-flex">
				<h2>
					Счетчик, {{counter.model}}  № {{counter.serialNumber}}
				</h2>
			</article>
			<form class="counter_box r-flex" method="post" action="#" name="electricity_form">
				<div class="previos_numbers r-flex">
					<p>
						Предыдущие показания от 13.08.20
					</p>
					<p>
						<b>{{counter.currentMeterData}}</b>
					</p>
				</div>
				<div class="current_numbers r-flex">
					<p>
						Текущие показания
					</p>
					<input type="text" name="electricity_value" placeholder="13984+N" v-model="newValue"/>
				</div>
				<div>
					<input type="submit" name="send_electricity" value="Отправить" class="send_value"/>
				</div>
			</form>
	</div>
</template>
<script>
export default{
	name: 'CounterItem',
	props: [
		'counter'
	],
	data: ()=>({
		newValue: null
	}),
	mounted(){
		console.log(this.counter)
	}
}
</script>
<style scooped lang="sass">
	.counter_box
		padding: 22px 60px 0 60px
</style>