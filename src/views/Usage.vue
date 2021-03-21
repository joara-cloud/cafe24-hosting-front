<template>
	<div>
		<form action="" @submit.prevent="onsubmit">
			<input type="text" value="hello">
		</form>
		<Dim v-if="loading"></Dim>
	</div>
</template>

<script>
import Dim from '@/components/common/Dim.vue';

export default {
	data() {
		return {
			
		}
	},
	components: {
		Dim
	},
	created() {		
		var vm = this;

		this.$http({
			method: 'post',
			url: '/api/movies',
			data: {
				paramss: vm.$route.params
			}
		}).then(function(response) {
			console.log('rrrrrrresponse : ', response);
		}).catch(function(err) {
			console.log('err : ', err);
		})

	},
	computed: {

	},
	methods: {

	},
}
</script>

<style>
/* @import url('@/assets/css/post.css'); */
/* posts */
.posts {margin-left:-2%;font-size:0}
.posts p {font-size:14px}
.posts > li {display:inline-block;width:23%;margin-left:2%;margin-bottom:25px;vertical-align:top}
.posts > li > a {display:block}
.posts .post_subject {padding:10px 0 0;font-size:16px;line-height:1.4;color:#172852}
.posts .post_date {padding:8px 0 0;font-size:14px;font-weight:600;color:#172852}
.posts .thumb img {width:100%}
.sort {padding:0 0 10px;text-align:right}
.sort select {padding:7px 10px;border:1px solid #ccc;border-radius:5px;font-size:14px}
.total {padding:0 0 15px;font-weight:600;color:#172852}

/* pagination */
.pagination {display: flex;justify-content:center;padding: 1rem;border-radius: 0.25rem;}
.crumbs {display: flex;flex-wrap: wrap;justify-content: center;align-items: center;list-style-type: none;margin: 0;padding: 0;gap: 0.5rem;}
.crumb {display: block;padding: 0.5rem 1rem;text-decoration: none;color: currentColor;border-radius: 0.2rem;border: 0.0625rem solid #d7d7d7; /* 1px */}
.crumb:hover, .active .crumb, .crumb__active {background-color: #1d1f20;color: #fdfdfd;border-color: #1d1f20;}
.crumb__prev { margin-right: 0.5rem; }
.crumb__next { margin-left: 0.5rem;}
</style>