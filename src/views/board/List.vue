<template>
	<div class="board_list">
		<div class="inner">
			<list-item></list-item>
			<router-link to="/board/write" class="btn_ty01">글쓰기</router-link>
		</div>
	</div>
</template>

<script>
import ListItem from '@/components/posts/ListItem.vue';

export default {
	components: {
		ListItem,
	}
}
</script>

<style>

</style>