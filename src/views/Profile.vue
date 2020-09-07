<template>
	<div>
		<div class="container_my">
			<div v-if="loading" class="profile_container r-flex">
				Loading...
			</div><!--profile_container-->
			<div v-else class="cabinet_container profile_container r-flex">
				<section class="cabinet_personal">
						<h2>
							ЛИЧНЫЙ КАБИНЕТ
						</h2>
						<div class="cabinet_personal_line"></div>
						<article>
							<div class="cabinet_top r-flex">
								<img src="" alt="user foto">
								<div class="cabinet_fio">
									<p>
										{{profile.user.firstName}}
									</p>
									<p>
										{{profile.user.lastName}}
									</p>
									<p class="cabinet_phone">
										{{profile.user.username}}
									</p>
								</div>
							</div>
							<!-- Tab links -->
							<div class="cabinet_bottom">
								<button class="" >Профиль</button>
								<button class="tablinks active" data-id="payments">Счета и взносы</button>
								<button class="tablinks" data-id="meters">Показания приборов <br/>учета</button>
							</div>
						</article>
					</section>
				<main class="r-flex">
					<h1 class="cabinet_header">
						ПРОФИЛЬ
					</h1>
					<div class="profile_top r-flex">
						<div class="profile_top_left">
							<img src="" alt="avatar" />
							<h2>
								{{profile.user.firstName}} {{profile.user.lastName}}
							</h2>
						</div>
						<aside class="">
						<a href="#">
							<i class="fas fa-pencil-alt"></i> 
							Фото
						</a>
						<a href="#" id="fio_link" @click.prevent="FIO_show=!FIO_show">
							<i class="fas fa-pencil-alt"></i>
							Фамилия и Имя
						</a>
						<a href="#">
							<i class="fas fa-pencil-alt"></i>
							Телефон
						</a>
						<a href="#">
							<i class="fas fa-pencil-alt"></i>
							Электронная почта
						</a>
						<a href="#">
							<i class="fas fa-pencil-alt"></i>
							Почтовый адрес
						</a>
						<a href="#">
							<i class="fas fa-pencil-alt"></i>
							Сменить пароль
						</a>
					</aside>
					</div>
					
					<div class="profile_content r-flex">
						<section class="contacts_data">
							<h3>
								Контактные данные:
							</h3>
							<form name="contacts" method="post" action="#">
								<div class="r-flex">
									<label for="phone">Телефон:</label>
									<input type="tel" name="phone" v-model="profile.user.username" disabled/>
								</div>
								<div class="r-flex">
									<label for="email" >Электронная почта:</label>
									<input type="email" name="email" v-model="profile.user.email" disabled/>
								</div>
								<div class="r-flex">
									<label for="address" >Почтовый адрес:</label>
									<textarea name="address" disabled v-model="profile.user.address"></textarea>
								</div>
							</form>
						</section>
						<section class="profile_address">
							<h3>
								Мои адреса:
							</h3>
							<p v-for="(account, i) in profile.accounts" :key="account.id">
								{{i+1}}. {{account.address}}, <b>участок № {{account.houseNumber}}</b>
								<br/>
								<span>
									- площадь участка: <b>{{account.acresAmount}} соток</b>.
								</span>
							</p>
						</section>
					</div>
				</main>
				
			</div><!--profile_container-->
		</div><!--container-->
		<div v-show="FIO_show" id="profile_fio" :class="[modal, FIO_show? pointer_events_on : '']">
			<div class="r-flex">
				<p id="close_modal fio" class="modal_close">
					<a href="#" class="close_X" id="fio_close_X" @click.prevent="FIO_show=!FIO_show">
						X
					</a>
				</p>
				<h2>
					Фамилия и Имя
				</h2>
				<form name="profile_fio" id="profile_form" action="#" method="post" class="r-flex">
					<input type="text" id="firstname" name="firstname" :value="profile.user.firstName"/>
					<input type="text" id="lastname" name="lastname" :value="profile.user.lastName"/>
					<div class="login_controls r-flex">
						<input type="button" name="cancel" id="cancel_fio" @click.prevent="FIO_show=!FIO_show" value="Отменить"></input>
						<input type="submit" name="submit" id="submit_fio" value="Сохранить" @click.prevent="changeFIO"></input>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
//import Posts from '../components/Posts.vue'
import axios from 'axios';

export default {
  name: 'profile',
  components: {
    //Posts
  },
  data: () => ({
		profile: {
			"accounts": [
				{
					"id": null,
					"address": "",
					"houseNumber": "",
					"acresAmount": null
				}
			],
			"user": {
				"username": "",
				"firstName": "",
				"lastName": "",
				"patronymic": "",
				"email": "",
				"photoLink": "",
				"address": ""
			}
		},
		loading: false,
		FIO_show: false,
		modal: 'modal_profile',
		pointer_events_on: 'pointer_events_on',
  }),
  methods: {
	changeFIO(){
		let firstname = document.getElementById('firstname').value;
		let lastname = document.getElementById('lastname').value;
		this.$store.dispatch('updateProfile', {"firstName": firstname, "lastName": lastname})
			.then(updatedProfile => {
				this.profile = updatedProfile;
				this.FIO_show = false;
			})
		
	}
  },
  mounted() {
  this.loading = true;
	this.$store.dispatch('fetchProfile')
	.then( profile => {
		this.profile = profile;
		this.loading = false;
	})
  }
}
</script>
