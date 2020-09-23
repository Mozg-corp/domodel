<template>
	<article>
		<div class="contact r-flex">
			<label>
				{{title}}:
			</label>
			<input :disabled="disabled" type="text" :value="text"/>
		</div>
	</article>
</template>
<script>
	export default{
		name: "ContactItem",
		props: [
			'title',
			'text',
			'disabled'
		]
	}
</script>
<style scoped lang="sass">
	.contact input
		flex-grow: 3
		font-weight: normal
		font-size: 20px
		line-height: 24px
		word-break: break-all
		font-weight: 300
		background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3))
	input, textarea
		background-color: rgba(239, 239, 239, 0.3)
	input:disabled, textarea:disabled
		border: 1px solid #FFF
		background-color:  #FFF
	label
		min-width: 170px
</style>