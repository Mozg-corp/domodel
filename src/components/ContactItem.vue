<template>
	<article>
		<div class="contact r-flex">
			<input class="contact__title" :disabled="disabled" type="text" :value="title" @change="changeTitleHandler($event)"/>
			<input class="contact__text" :disabled="disabled" type="text" :value="text" @change="changeFieldHandler($event)"/>
		</div>
	</article>
</template>
<script>
	import {mapActions} from 'vuex';
	export default{
		name: "ContactItem",
		props: [
			'title',
			'text',
			'disabled',
			'id'
		],
		methods: {
			...mapActions(['changeContactField']),
			changeFieldHandler($event){
				let text = $event.target.value;
				let field = {
					id: this.id,
					text,
					title: this.title
				}
				this.changeContactField(field)
					//.then(f => console.log(f))
					.catch(e=>concole.log(e))
			},
			changeTitleHandler($event){
				let title = $event.target.value;
				let field = {
					id: this.id,
					text:this.text,
					title
				}
				this.changeContactField(field)
					//.then(f => console.log(f))
					.catch(e=>concole.log(e))
			}
		}
	}
</script>
<style scoped lang="sass">
	.contact
	
	.contact__text
		flex-grow: 3
		font-weight: normal
		font-size: 20px
		line-height: 24px
		word-break: break-all
		font-weight: 300
		background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3))
	input, textarea
		background-color: rgba(239, 239, 239, 0.3)
		margin-left: 10px
	input:disabled, textarea:disabled
		border: 1px solid #FFF
		background-color:  #FFF
	label
		min-width: 170px
	.contact__title
		color: #000000
		flex-basis: 50px
		flex-grow: 1
		font-weight: normal
		font-size: 20px
		line-height: 24px
		word-break: break-all
		font-weight: 300
</style>