<template>
	<div>
		<h3>{{this.postIndx}}</h3>
		<view-content :postIndex="postIndex"></view-content>
		<router-link to="/posts/list" class="btn_ty01">목록으로</router-link>
	</div>
</template>

<script>
import ViewContent from '@/components/posts/ViewContent.vue';

export default {
	data() {
		return {
			postIndex: 0
		}
	},
	components: {
		ViewContent
	},
	async created() {
		this.postIndex = this.$route.params.idx;
	}
}
</script>

<style>

</style>