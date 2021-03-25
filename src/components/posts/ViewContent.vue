<template>
	<div class="view_wrap">
		<div class="view_header">
			<p class="date">{{dateFormat(currentBoard.created, '. ')}}</p>
			<h3>{{currentBoard.subject}}</h3>
		</div>
		<div class="view_body">
			<div class="content">
				<div class="image_area">
					<img :src="`/${currentBoard.f_name}`" alt="">
				</div>
				<div class="text_area">
					{{currentBoard.content}}
				</div>
			</div>
		</div>
		<!-- <div class="view_footer">
			하단입니다.
		</div> -->
		<Dim v-if="loading"></Dim>
	</div>
</template>

<script>
import {dateFormat} from '@/utils/dateFormat.js';
import Dim from '@/components/common/Dim.vue';
import {mapState, mapActions} from 'vuex';

export default {
	data() {
		return {
			created: '',
			loading: true
		}
	},
	props: {
		postIndex: { // 해당 게시물의 idx
			type: Number,
			required: true
		}
	},
	components: {
		Dim
	},
	async created() {
		try {
			// vuex 적용
			this.FETCH_POST({id: this.postIndex});
			this.loading = false;
		} catch(err) {
			console.log(err);
		}
	},
	computed: {
		...mapState(['currentBoard'])
	},
	methods: {
		...mapActions(['FETCH_POST']),
		dateFormat
	}
}
</script>

<style>
.view_wrap .view_header h3 {font-size:40px;font-weight:600;color:#172852}
.view_wrap .view_header .date {padding:0 0 8px;font-size:12px;font-weight:400;color:#172852}
.view_wrap .view_body {padding:25px 0 100px;font-size:16px;line-height:1.4;color:#172852}
.view_wrap .view_body .image_area {text-align:center}

</style>