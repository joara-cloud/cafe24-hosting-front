<template>
	<div>
		<div class="sort">
			<form method="get" ref="uploadForm">
				<select name="" id="" v-model="sortSelect" @change="onPaging">
					<option value="8" :selected="listNum===8">8개씩</option>
					<option value="12" :selected="listNum===12">12개씩</option>
					<option value="16" :selected="listNum===16">16개씩</option>
				</select>
			</form>
		</div>
		<p class="total">total : {{totalList}}</p>
		<form action="" @submit.prevent="onsubmit">
			<ul class="posts">
				<li v-for="(post, index) in posts" :key="index">
					<input type="checkbox" name="selectedItem" id="" :value="post.pid" v-model="selectedItem">
					<router-link v-bind:to="`view/${post.pid}`">
						<div class="thumb">
							<img :src="post.f_name ? `/${post.f_name}` : '/temp.png'" alt="">
						</div>
						<div class="info">
							<h4 class="post_subject">{{post.subject}}</h4>
							<p class="post_date">{{dateFormat(post.created, '. ')}}</p>
						</div>
					</router-link>
				</li>
			</ul>
			<button type="submit">삭제</button>
		</form>
		<div class="pagination_wrap pagination">
			<a :href="`?page=${prevPaging}&listNum=${listNum}`" class="crumb crumb__prev" @click="prevPage">Previous</a>
			<ul class="pagination crumbs">
				<li 
				v-for="(i, page) in new Array(pagination)" 
				:key="i" :class="[currentPage == page+1 ? 'active' : '', 'customclass']">
					<a :href="`?page=${page+1}&listNum=${listNum}`" class="crumb">{{page+1}}</a>
				</li>
			</ul>
			<a :href="`?page=${nextPaging}&listNum=${listNum}`" class="crumb crumb__next" @click="nextPage">Next</a>
		</div>
		<Dim v-if="loading"></Dim>
	</div>
</template>

<script>
import {FETCH_POSTS, DELETE_POST} from '@/api/posts.js';
import {dateFormat} from '@/utils/dateFormat.js';
import Dim from '@/components/common/Dim.vue';

export default {
	data() {
		return {
			posts: [],
			totalList: 0, // 전체 DATA개수
			paging: 0, // 페이징 개수
			listNum: 8, // 한 페이지당 DATA 개수 (초기 8개)
			currentPage: 1, // 현재페이지 (1page: 0, 2page: 1, 3page: 2, ...)
			sortSelect: this.$route.query.listNum, // 정렬개수
			totallistNum: 0, // 전체 페이징 버튼 개수
			loading: true,
			prevPage: 0,
			nextPage: 0,
			selectedItem: [] // 선택한 게시물
		}
	},
	components: {
		Dim
	},
	async created() {		
		this.fetchData();


		this.currentPage *= 1;
		this.nextNum = this.currentPage + 1 < this.pagination ? this.currentPage + 1 : this.pagination;
		this.prevPage = this.currentPage - 1 < 1 ? 1 : this.currentPage-1;
	},
	computed: {
		currentList() {
			const start = (this.currentPage-1) * this.sortSelect*1;
			const end = start + this.sortSelect*1;

			return this.posts.slice(start, end);
		},
		pagination() { // 전체 페이징 버튼 개수
			return Math.ceil(this.totalList / this.sortSelect);
		},

		nextPaging() { // 다음 페이지
			return this.currentPage < this.pagination ? this.currentPage+1 : this.pagination; // 미래의 다음 페이지(this.currentPage+1)랑 페이지 총 개수랑 비교해서 더 커지면 그냥 총 개수로
		},
		prevPaging() { // 이전 페이지
			return this.currentPage > 1 ? this.currentPage-1 : 1;
		},
	},
	methods: {
		// 데이터 불러오기
		async fetchData() {
			this.currentPage = this.$route.query.page ? this.$route.query.page : 1;
			this.listNum = this.$route.query.listNum;

			try {
				// 전체 데이터 개수
				// const response = await FETCH_POSTS('post', '/posts/list'); 
				// this.totalList = response.data.posts.length;

				// 뿌려질 데이터
				const fetchData = {
					page: this.$route.query.page,
					listNum: this.$route.query.listNum,
				}

				console.log('addddd :::: ', fetchData);

				// listNum 만큼 가져오기
				const {data} = await FETCH_POSTS('post', '/posts/list', fetchData);
				this.posts = data.posts;

				this.loading = false;

			} catch(err) {
				console.log('FETCH_POSTS 중 err : ', err);
			}
		},
		onPaging: function() {

			console.log(this.sortSelect);
			this.listNum = this.sortSelect;

			this.fetchListNum(this.sortSelect);

		},
		dateFormat,
		fetchListNum(listNum=`${this.listNum}`) {
			console.log('fetchListNum : ', listNum);

			window.location.href = `/posts/list?page=${this.$route.query.page}&listNum=${listNum}`;
		},
		async onsubmit() {
			if(!confirm('선택한 게시물을 삭제하시겠습니까?')) return;

			const data = {deleteItem: this.selectedItem}

			console.log(data);

			const response = await DELETE_POST('delete', '/posts/delete', data);
			alert(response.data.msg);
			this.fetchData();

		}
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