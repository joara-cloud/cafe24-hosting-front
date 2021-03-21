<template>
	<div id="content" class="memo_wrap">
		<memo-row v-on:dhow="addMemo"></memo-row>
		<add-memo v-if="isAddMemo" v-on:close="isAddMemo=false"></add-memo>
	</div>
</template>

<script>
import MemoRow from '@/components/memo/MemoRow.vue';
import AddMemo from '@/components/memo/AddMemo.vue';

export default {
	data() {
		return {
			isAddMemo: false,
		}
	},
	components: {
		MemoRow,
		AddMemo
	},
	methods: {
		addMemo() {
			this.isAddMemo = true;
		}
	},
	created() {

	}

}
</script>

<style>
.memo_wrap {min-height:50vh;background: -webkit-gradient(linear, left top, left bottom, from(#3EB9DE), to(#3A80DE));background: linear-gradient(#3EB9DE, #3A80DE);background:#ddd;}

</style>