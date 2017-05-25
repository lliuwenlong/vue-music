<template>
	<div id="foot">
	    <router-link to="/mp3" active-class="myactive">
	        <span class="mui-icon mui-icon-star"></span>
	        <div class="mui-tab-label">音乐</div>
	    </router-link>
	    <router-link to="/mp4" active-class="myactive">
	        <span class="mui-icon mui-icon-videocam"></span>
	        <div class="mui-tab-label">视频</div>
	    </router-link>
	</div>
</template>

<script>
</script>

<style>
	#foot{width: 100%;height: 50px;position: fixed;bottom: 0;background-color: #E4e4e4;}
	#foot a{width: 48%;text-align: center;height:100%;line-height: 22px;display: inline-block;}
	.myactive{color:#E50541;}
</style>