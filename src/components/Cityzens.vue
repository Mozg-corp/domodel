<template>
	<div v-if="loading" class="profile_container r-flex">
			Loading...
	</div>
	<div v-else id="cityzens" class="profile_container__main cityzens">
		<h2 class="cabinet_header">
			ЖИТЕЛИ
		</h2>	
		<div class="cityzens_box r-flex">
			<div class="cityzens_box__item r-flex">
				<div class="cityzen_item__col1">
					<p>
						Адрес:
					</p>
				</div>
				<div class="cityzen_item__col3 mg-l40">
					<p>
						ФИО:
					</p>
				</div>
				<div class="cityzen_item__col4 mg-l40">
					<p>
						Телефон\Username:
					</p>
				</div>
			</div><!--cityzen_box_item-->
			<div v-if="paginator">
				<CityzenItem v-for="cityzen in paginator.getPage(currentPage)" :key="cityzen.id" :cityzen="cityzen"/>
			</div>
		</div><!--cityzen_box-->
		<div>
			<div v-if="paginator">
				<a href="#" v-for="page in paginator.getPaginationArray(currentPage)" @click.prevent="currentPage=page">
					{{page}}
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapActions, mapState} from 'vuex';
	import CityzenItem from '@/components/CityzenItem';
	import {Pagination} from '@/utiles/pagination';
	export default{
		name: 'Cityzens',
		components: {
			CityzenItem
		},
		data: ()=>({
			loading: false,
			paginator: null,
			currentPage: 1
			
		}),
		computed: {
			...mapState(['cityzens'])
		},
		methods: {
			...mapActions(['fetchCityzens'])
		},
		mounted(){
			this.loading = true;
			this.fetchCityzens()
					.then(
						cityzens => {
							this.loading = false;
							this.paginator = new Pagination(cityzens);
							//console.log(this.paginator.getPage(1))
						}
					)
		}
	}
</script>
<style lang="sass">
	.cityzens
		width: 100%
	.cabinet_header
		width: 100%
	.cityzens_box
		flex-direction: column
		font-size: 18px
		line-height: 22px
		color: #000000
		justify-content: space-beetween
	.cityzens_box__item
		flex-wrap: nowrap
		margin: 8px 0
	.cityzen_item__col1
		flex-grow: 1
		flex-basis: 150px
	.cityzen_item__col2
		flex-grow: 1
		flex-basis: 100px
	.cityzen_item__col3
		flex-grow: 9
		flex-basis: 0
	.cityzen_item__col4
		flex-grow: 1
		font-size: 18px
		line-height: 22px
		color: #000000
	.sendClaim
		font-weight: 500
		font-size: 18px
		line-height: 40px
		text-align: center	
		color: #000000
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
		background-color: #C0BFFF
		border-radius: 10px
		padding: 8px 34px
	.sendClaim_container
		margin: 44px 0 0 0
		width: 100%
		text-align: center
	.mg-l40
		margin-left: 40px
</style>