<template>
	<div v-if="loading" class="profile_container r-flex">
			Loading...
	</div>
	<div v-else id="claims" class="profile_container__main claims">
		<h2 class="cabinet_header">
			ОБРАЩЕНИЯ
		</h2>	
		<div class="claims_box r-flex">
			<div class="claims_box__item r-flex">
				<div class="claim_item__col1">
					<p>
						Дата:
					</p>
				</div>
				<div class="claim_item__col2 mg-l40">
					<p>
						Номер:
					</p>
				</div><div class="claim_item__col3 mg-l40">
					<p>
						Тема:
					</p>
				</div>
				<div class="claim_item__col4 mg-l40">
					<span>
						Статус:
					</span>
					<select @change="selectStatusHandler($event)">
						<option v-for="(status, i) in statuses" :key="i">
							{{status}}
						</option>
					</select>
				</div>
			</div><!--claim_box_item-->
			<div  v-if="orderer">
				<ClaimItemAdmin v-for="claim in orderer.order({'status': statusFilter})" :key="claim.id" :claim="claim"/>
			</div>
		</div><!--claim_box-->
		<!--<div class="sendClaim_container">-->
		<!--	<router-link href="#" class="sendClaim" :to="{name: 'CreateClaim'}">-->
		<!--		Подать новое обращение-->
		<!--	</router-link>-->
		</div>
	</div>
</template>
<script>
	import {mapActions, mapState} from 'vuex';
	import ClaimItemAdmin from '@/components/ClaimItemAdmin';
	import {ClaimsOrderer} from '@/utiles/claimsorderer';
	export default{
		name: 'ClaimsAdmin',
		components: {
			ClaimItemAdmin
		},
		data: ()=>({
			loading: false,
			orderer: null,
			statusFilter: 'Все',
			statuses: [
				'Все',
				'Направлено',
				'В работе',
				'Отменено',
				'Выполнено',
				'Получено'
			],
		}),
		computed: {
			...mapState(['claims'])
		},
		methods: {
			...mapActions(['fetchAllClaims']),
			selectStatusHandler($event){
				this.statusFilter = $event.target.value
			}
		},
		mounted(){
		this.loading = true;
			this.fetchAllClaims()
				.then(
					claims => {
						this.loading = false;
						this.orderer = new ClaimsOrderer(claims)
					}
				)
		}
	}
</script>
<style lang="sass">
	.claims
		width: 100%
	.cabinet_header
		width: 100%
	.claims_box
		flex-direction: column
		font-size: 18px
		line-height: 22px
		color: #000000
		justify-content: space-beetween
	.claims_box__item
		flex-wrap: nowrap
		margin: 8px 0
	.claim_item__col1
		flex-grow: 1
	.claim_item__col2
		flex-grow: 1
		flex-basis: 100px
	.claim_item__col3
		flex-grow: 9
		flex-basis: 0
	.claim_item__col4
		flex-grow: 1
		flex-basis: 100px
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