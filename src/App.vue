<template>
  <div class="wrapper">
		<div class="top">
			<header>
				<div class="container_my r-flex">
					<div class="header_left">
						<p class="logo_text">
							 СНТ "4ПЗМЗ"
						</p>
					</div>
					<div class="header_center r-flex">
						<nav id="nav-menu-container_my">
							<ul class="menu r-flex">
								<router-link :to="{name: 'home'}">
									<li >
											главная
									</li>
								</router-link>
								<router-link :to="{name: 'about'}">
									<li>
											о нас
									</li>
								</router-link>
								<!--<a href="./pages/foto.html">-->
								<!--	<li>-->
								<!--			фото-->
								<!--	</li>-->
								<!--</a>-->
								<!--<a href="#">-->
								<!--	<li>-->
								<!--		документы-->
								<!--	</li>-->
								<!--</a>-->
								<!--<router-link :to="{name: 'claims'}">-->
								<!--	<li>-->
								<!--			обращения-->
								<!--	</li>-->
								</router-link>
								<!--<a href="#">-->
								<!--	<li>-->
								<!--		голосования-->
								<!--	</li>-->
								<!--</a>-->
								<router-link :to="{name: 'contacts'}">
									<li>
											контакты
									</li>
								</router-link>
								<router-link v-show="isLogined" :to="{name: 'personal'}">
									<li>
											личный кабинет
									</li>
								</router-link>
								<router-link v-show="isAdmin===true" :to="{name: 'cityzens'}">
									<li>
											управление снт
									</li>
								</router-link>
							</ul>
						</nav>
					</div>
					<div class="header_right">
						<div v-show="!isLogined" class="notlogged">
							<a href="#" id="login" @click.prevent="showModal = !showModal">
								войти
							</a>
						</div>
						<div v-show="isLogined" class="logged">
							<router-link v-if="isAdmin!==true" :to="{name: 'personal'}">
								{{username}}
							</router-link>
							<router-link v-else :to="{name: 'cityzens'}">
								{{username}}
							</router-link>
							<a href="#" @click.prevent="logout">
								выход
							</a>
						</div>
					</div>
				</div>
			</header><!--header-->
			<router-view></router-view>
			<div id="loginForm" :class="[modal, showModal? login_show : '']" >
				<div class="r-flex">
					<p id="close_modal" class="modal_close">
						<a href="#" class="close_X" id="close_X" @click.prevent="showModal=!showModal">
							X
						</a>
					</p>
					<h2>
						АВТОРИЗАЦИЯ
					</h2>
					<form name="login" id="login" action="#" method="post" class="r-flex">
						<input type="text" name="username" placeholder="ЛОГИН(№ участка)" v-model="login"/>
						<input type="password" name="username" placeholder="ПАРОЛЬ" v-model="password"/>
						<div class="login_controls r-flex">
							<input type="submit" name="submit" value="вход" @click.prevent="signIn"></input>
							<input type="button" name="cancel" value="отмена" @click.prevent="showModal=!showModal"></input>
						</div>
					</form>
				</div>
			</div>
		</div> <!--top-->
		<footer>
			<div class="container_my_my">
			</div>
		</footer> <!--footer-->
	</div> <!--wrapper-->
</template>

<script>
    import store from './store/index';
	import {mapState, mapGetters} from 'vuex';
    export default {
		name: 'Layout',
        components: {
        },
        data: () => ({
			showModal: false,
			modal: 'modal',
			login_show: 'login_active',
			password: '',
			login: '',
        }),
		computed: {
			isLogined(){
				return this.$store.getters.isAuthenticated;
			},
			...mapState(['username']),
			...mapGetters(['isAdmin']),
			
		},
        methods: {
            logout(){
              this.$store.dispatch('logout')
                  .then(()=>{
					if(window.location.pathname !== '/') this.$router.push('/');
                  })
            },
            signIn(){
                    this.$store.dispatch('signIn', {username: this.login, password: this.password})
                        .then(()=>{
							if(this.$store.getters.authStatus === 'success'){
								this.showModal = false;
							}else if(this.$store.getters.authStatus === 'error'){
								//this.msg = this.$store.getters.getErrorMsg;
							}
							this.password = '';
                        })
                        .catch();
            },
            signUp(){
                
            }

        },
        mounted() {
			//this.username = this.$store.getters.getUsername;
			//this.isLogined = this.$store.getters.isAuthenticated;
        },
		updated(){
		
		}

    };
</script>
<style scoped lang="sass">
	.login_active
		display: block
		pointer-events: auto
	.logged > a:first-child
		font-size: 14px
		line-height: 17px
		display: block

</style>