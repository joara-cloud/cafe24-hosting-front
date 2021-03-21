<template>
	<div class="view_wrap">
		<div class="view_header">
			<p class="date">{{created}}</p>
			<h3>{{subject}}</h3>
		</div>
		<div class="view_body">
			<div class="content">
				<div class="image_area">
					<img :src="`/${image}`" alt="">
				</div>
				<div class="text_area">
					{{content}}
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
import {FETCH_POST} from '@/api/posts.js';
import {dateFormat} from '@/utils/dateFormat.js';
import Dim from '@/components/common/Dim.vue';

export default {
	data() {
		return {
			subject: '',
			content: '',
			created: '',
			image: '',
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
			const {data} = await FETCH_POST('get', `/posts/${this.postIndex}`);
			const post = data.posts[0];
			this.subject = post.subject;
			this.content = post.content;
			this.created = dateFormat(post.created, '. '); // utils의 공통함수
			this.image = post.f_name;

			this.loading = false;
		} catch(err) {
			console.log(err);
		}
	}
}
</script>

<style>
.view_wrap .view_header h3 {font-size:40px;font-weight:600;color:#172852}
.view_wrap .view_header .date {padding:0 0 8px;font-size:12px;font-weight:400;color:#172852}
.view_wrap .view_body {padding:25px 0 100px;font-size:16px;line-height:1.4;color:#172852}
.view_wrap .view_body .image_area {text-align:center}

</style>