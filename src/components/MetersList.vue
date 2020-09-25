<template>
	<div v-if="loading" class="profile_container">
			Loading...
	</div>
	<div v-else id="meters" class="profile_container__main meters">
		<h2 class="cabinet_header">
			Счетчики
		</h2>
		<h3 class="sub_header">
			Передача показаний приборов учета электроэнергии:
		</h3>
		<div class="meters_box r-flex">
			<div class="meters_box__item r-flex thead">
				<div class="meter_item__col">
					<p>
						№ участка:
					</p>
				</div>
				<div class="meter_item__col">
					<p>
						№ лицевого счета:
					</p>
				</div>
				<div class="meter_item__col">
					<p>
						Серийный № счетчика:
					</p>
				</div>
				<div class="meter_item__col">
					<p>
						Тип счетчика:
					</p>
				</div>
				<div class="meter_item__col">
					<p>
						Последние показания:
					</p>
				</div>
				<div class="meter_item__col">
					<p>
						Ввести текущие показания:
					</p>
				</div>
			</div><!--meter_box_item-->
			<MeterItem v-for="meter in meters" :key="meter.id" :meter="meter"/>
		</div><!--meter_box-->
		<div class="controls_container">
			<a href="#" class="saveMeterIndication_btn" @click.prevent="saveBtnHandler">
				Сохранить показания
			</a>
			<a href="#" class="addNewMeter">
				Добавить новый счётчик
			</a>
		</div>
	</div>
</template>
<script>
	import {mapActions, mapState} from 'vuex';
	import MeterItem from '@/components/MeterItem';
	export default{
		name: 'meters',
		components: {
			MeterItem
		},
		data: ()=>({
			loading: false
		}),
		computed: {
			...mapState(['meters'])
		},
		methods: {
			saveBtnHandler(){
				console.log('fdsfd')
				//let i = this.$children.values()
				//for(i.next();i.done;i.next())	console.log(el)
				for(let el of this.$children.values()){
					console.log(el.value)
				}
				
			},
			...mapActions(['fetchAllMeters'])
		},
		mounted(){
			this.loading = true;
			this.fetchAllMeters()
					.then(
						meters => {
							this.loading = false;
							console.log(meters)
						}
					)
			//console.log(this.$children.values())
		}
	}
</script>
<style lang="sass">
	.meters
		width: 100%
	.cabinet_header
		width: 100%
	.meters_box
		/*flex-direction: column*/
		display: table
		font-size: 18px
		line-height: 22px
		color: #000000
		justify-content: space-beetween
	.meters_box__item
		/*flex-wrap: nowrap*/
		display: table-row
		margin: 8px 0
	.meter_item__col
		display: table-cell
		padding: 3px 0
	.meter_item__col1
		flex-grow: 1
		flex-basis: 150px
		display: table-cell
	.meter_item__col2
		flex-grow: 1
		flex-basis: 100px
		display: table-cell
	.meter_item__col3
		flex-grow: 9
		flex-basis: 0
		display: table-cell
	.meter_item__col4
		flex-grow: 1
		font-size: 18px
		line-height: 22px
		color: #000000
		display: table-cell
	.meter_item__col5
		flex-grow: 1
		font-size: 18px
		line-height: 22px
		color: #000000
		display: table-cell
	.meter_item__col6
		flex-grow: 1
		font-size: 18px
		line-height: 22px
		color: #000000
		display: table-cell
	.mg-l40
		margin-left: 40px
	.thead
		display: table-header-group 
		margin: 0 0 30px 0
	.saveMeterIndication_btn,
	.addNewMeter
		font-weight: 600
		font-size: 22px
		line-height: 27px
		text-align: center
		color: #000000
		padding: 5px 40px
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
		background-color: #A1DC92
		border-radius: 10px
	.addNewMeter
		background-color: #A99
		margin-left: 50px
	.sub_header
		margin: 20px 0 30px 0
	.controls_container
		margin: 150px auto 0 auto
		width: 100%
		text-align: center
</style>