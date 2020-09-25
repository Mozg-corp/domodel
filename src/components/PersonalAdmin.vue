<template>
		<div v-if="loading" class="profile_container r-flex">
				Loading...
		</div>
		<div v-else class="profile_container__main">
			<h1 class="cabinet_header">
				ПРОФИЛЬ ЖИТЕЛЯ
			</h1>
			<div class="profile_content r-flex">
				<section class="contacts">
					<h3>
						{{profile.lastName}} {{profile.firstName}} {{profile.patronymic}} <router-link to="">Редактировать</router-link>
					</h3>
					<form name="contacts" method="post" action="#">
						<div class="r-flex">
							<label for="account">Лицевой счет №:</label>
							<input type="text" name="account"  disabled/>
						</div>
						<div class="r-flex">
							<label for="house">Участок №, площадь:</label>
							<input type="text" name="house"  disabled/>
						</div>
						<div class="r-flex">
							<label for="phone">Телефон:</label>
							<input type="tel" name="phone" v-model="profile.phoneNumber" disabled/>
						</div>
						<div class="r-flex">
							<label for="email" >Электронная почта:</label>
							<input type="email" name="email" v-model="profile.email" disabled/>
						</div>
						<div class="r-flex">
							<label for="registration_date" >Дата регистрации:</label>
							<input type="email" name="registration_date" v-model="profile.email" disabled/>
						</div>
						<div class="r-flex">
							<label for="last_activity" >Последняя активность:</label>
							<input type="email" name="last_activity" v-model="profile.email" disabled/>
						</div>
						<div class="r-flex">
							<label for="address" >Почтовый адрес:</label>
							<textarea name="address" disabled v-model="profile.address"></textarea>
						</div>
					</form>
					<div class="controls_box">
						<router-link to="" class="toBills_btn">Перейти к счетчикам</router-link> <router-link to="" class="toCounters_btn">Перейти к неоплаченным счетам</router-link>
					</div>
				</section>
			</div>
			
		</div>

</template>

<script>
   // @ is an alias to /src
	import {mapState, mapActions} from 'vuex';
	export default {
	  name: 'personalAdmin',
	  props: ['id'],
	  components: {
	  },
	  data: () => ({
		loading: false,
	  }),
	  computed: {
		...mapState(['profile'])
	  },
	  methods: {
		...mapActions(['fetchProfile'])
	  },
	  mounted() {
		this.fetchProfile(+this.id)
			.then(
				profile => console.log(profile)
				//console.log(this.profile)
			)
	  }
	}
</script>

<style scoped lang="sass">
	.profile_container__main
		width: 100%
	.profile_content,
	.contacts
		width: 100%
	.toCounters_btn,
	.toBills_btn
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
		background: #C0BFFF
		border-radius: 10px
		padding: 5px 30px
		font-weight: 500
		font-size: 18px
		line-height: 22px
	label
		min-width: 200px
</style>