<template>
	<div>
		<update-form></update-form>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UpdateForm from '@/components/posts/UpdateForm.vue'

export default {
	components: {
		UpdateForm
	},
	created() {
		this.FETCH_POST({id: this.$route.params.id})
	},
	computed: {
		...mapState(['currentBoard'])
	},
	methods: {
		...mapActions(['FETCH_POST'])
	}
}
</script>

<style>

</style>