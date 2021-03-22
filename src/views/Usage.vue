<template>
	<div>
		usage
	</div>
</template>

<script>

export default {
	data() {
		return {
			
		}
	},
	components: {
	},
	created() {		
		this.$http({
			method: 'get',
			url: '/usage'
		}).then(function(response) {
			console.log('response :::', response);
		}).catch(function(err) {
			console.log('errrrrr ::: ', err);
		})

	},
	computed: {

	},
	methods: {

	},
}
</script>

<style>
</style>