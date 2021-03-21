<template>
	<header id="header">
		<div class="h_upper">
			<nav>
				<a href="">Mac</a>
				<a href="">iPad</a>
				<a href="">iPhone</a>
				<a href="">Watch</a>
			</nav>
		</div>
		<div class="h_content">
			<!-- <h1><a href="/"><img alt="Vue logo" src="@/assets/logo.png"></a></h1> -->
			<h1><router-link to="/">ra</router-link></h1>
			<ul class="gnb">
				<li><router-link to="/usage">Usage</router-link></li>
				<li><router-link to="/memo">Memo</router-link></li>
				<li><router-link to="/posts/list">Board</router-link></li>
				<li class="member"><router-link to="/login">Login</router-link></li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {

}
</script>

<style>
#header {position:fixed;left:0;right:0;top:0;z-index:10;/*background-color:#fff*/}
#header .h_upper {background-color:#303030;}
#header .h_upper nav {margin:0 50px;text-align:center;}
#header .h_upper nav a {display:inline-block;margin:0 50px 0 0;padding:14px 0;font-size:14px;color:#fff}
#header .h_content {display:flex;padding:54px 50px;justify-content:space-between;align-items:center}
#header .h_content h1 {display:block;width:45px;height:45px;border:2px solid #797979;border-radius:4px;text-align:center;font-weight:900;font-size:22px}
#header .h_content h1 a {display:block;line-height:45px;color:#202020;/*background-color:#fff*/}
#header .h_content h1 img {width:100%}
#header .h_content .gnb > li {display:inline-block;position:relative;margin:0 0 0 40px;vertical-align:middle;}
#header .h_content .gnb > li:first-child {margin:0}
#header .h_content .gnb > li > a {display:block;font-size:18px;font-weight:600;color:#172852}
#header .h_content .gnb .member {overflow:hidden;height:50px;border-radius:25px;line-height:50px;background-color:#e2cebc}
#header .h_content .gnb .member a {position:relative;padding:0 38px;transition:all .5s}
#header .h_content .gnb .member:before {display:block;position:absolute;left:0;bottom:0;width:100%;height:0;content:'';background-color:#d06d43;transition:all .5s}
#header .h_content .gnb .member:hover:before {height:100%}
#header .h_content .gnb .member:hover a {color:#fff}
</style>