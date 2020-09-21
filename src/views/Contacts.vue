<template>
	<main >
		<div class="container">
			<div class="contacts_container">
				<h1>
					ООО “ДОМОДЕЛ” <a href="#" v-show="!editable" @click.prevent="editable=!editable">Редактировать</a> <a href="#" v-show="editable" @click.prevent="editable=!editable">Сохранить</a><a href="#" v-show="editable" @click.prevent="editable=!editable">Отменить</a>
				</h1>
				<form name="contacts" method="post" action="#">
					<section class="contacts_section">
						<h2 class="contact_header">
							Контакты
						</h2>
						<ContactItem v-for="item in contact" :key="item.id" :title="item.title" :text="item.text" :disabled="!editable"/>
					</section>
					<section class="requisites_section">
						<h2 class="requisites_header">
							Реквизиты
						</h2>
						<article>
							<h3 class="company_name">
								ООО “ДОМОДЕЛ”
							</h3>
							<div class="requisites_details  r-flex">
								
								<label for="inn" class="inn">
									ИНН:
								</label>
								<input :disabled="!editable" type="number" name="inn" value="000000000001"/>
							</div>
						</article>
						<article>
							<div class="requisites_details  r-flex">
								
								<label for="kpp" class="kpp">
									КПП:
								</label>
								<input :disabled="!editable" type="number" name="kpp" value="000000000000">
							</div>
						</article>
						<article>
							<div class="requisites_details  r-flex">
								
								<label for="ogrn" class="ogrn">
									ОГРН:
								</label>
								<input :disabled="!editable" type="number" name="ogrn" value="0000000000000"/>
							</div>
						</article>
						<article>
							<div class="requisites_details  r-flex">
								
								<label for="account" class="account">
									Р/С:
								</label>
								<input :disabled="!editable" type="number" name="account" value="324493100000000024578"/>
							</div>
						</article>
						<article>
							<div class="requisites_details  r-flex">
								
								<label for="kc" class="kc">
									К/С:
								</label>
								<input :disabled="!editable" type="number" name="kc" value="89993100000000024578"/>
							</div>
						</article>
						<article>
							<div class="requisites_details r-flex">
								
								<label for="bic" class="bic">
									БИК:
								</label>
								<input :disabled="!editable" type="number" name="bic" value="000000000"/>
							</div>
						</article>
					</section>
				</form>
			</div><!--contacts_container-->
		</div><!--container-->
	</main> <!--main-->
</template>
<script>
	import {mapActions} from 'vuex';
	import ContactItem from '@/components/ContactItem.vue';
	export default{
		name: "Contacts",
		components: {ContactItem},
		data: ()=>({
			editable: false,
			loading: false,
		}),
		computed: {
			contact: {
				get(){
					return this.$store.getters.getContact
				},
				set(){
					
				}
			}
		},
		methods: {
			...mapActions(['fetchContact'])		
		},
		mounted(){
			this.loading = true;
			this.fetchContact()
				.then(
					contact => {
						this.loading = false;
						console.log(contact.filter((el)=> {
							el.title === 'Текст раздела 1 (например контактные данные)'
							console.log(el)
						}))
					}
				)
			//contact.filter((el)=>{el.title === "описание раздела 1"}
			
		}		
	}
</script>
<style scoped lang="sass">

	form label
		min-width: 170px

</style>