<template>
	<div class="cityzens_box__item r-flex">
		<div class="cityzen_item__col1">
			<p>
				{{cityzen.address}}
			</p>
		</div>
		<div class="cityzen_item__col3">
			<p>
				{{cityzen.lastName}} {{cityzen.firstName}} {{cityzen.patronymic}}
			</p>
		</div>
		<div class="cityzen_item__col4">
			<p >
				{{cityzen.honeNumber}} / <router-link :to="{name: 'cityzen profile', params: {id: 1} }" class="cityzen_item__col4">{{cityzen.username}}</router-link>
			</p>
		</div>
	</div><!--cityzen_box_item-->
</template>
<script>
	export default{
		name: "CityzenItem",
		props: ['cityzen'],
		computed: {
		}
	}
</script>
<style scoped lang="sass">
</style>