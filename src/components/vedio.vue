<template>
	<div id="vedio">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
		</header>
		<video id="myvideo" :src="src" autoplay controls></video>
		<div class="mui-card mygif">
			<h4>搞笑天地</h4>
			<ul class="mui-table-view">
			    <li class="mui-table-view-cell mui-media" v-for="item in arrList">
			        <a href="javascript:;">
			            <img class="mui-media-object mui-pull-right" :src="item.img" @click="zoomy(item.img)">
			            <div class="mui-media-body">
			                {{item.ct}}
			                <p class="mui-ellipsis">{{item.title}}</p>
			            </div>
			        </a>
			    </li>
			</ul>
			<div class="imgview" v-if="showimg" @click="hideimg">
				<img :src="srcs" alt="" width="100%" height="100%"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				src:this.$route.params.url,
				arrList:"",
				showimg:false,
				srcs:""
			}
		},
		mounted(){
			let that = this;
			this.$http.get("https://route.showapi.com/341-3",{
				params:{
					showapi_appid:30699,
					showapi_sign:"48c9abdbb3604b9b82af331570e343a5"
				}
			}).then(function(res){
				that.arrList = res.data.showapi_res_body.contentlist;
			}).catch(function(err){
				console.log(err);
			})
		},
		methods:{
			zoomy(obj){
				this.srcs = obj;
				this.showimg = true;
			},
			hideimg(){
				this.showimg = false;
			}
		}
	}
</script>

<style>
	#myvideo{width: 100%;height: 200px;max-height: 230px;margin-top: 50px;position: relative;}
	.mygif h4{padding: 10px;color:#E50541;}
	.imgview{width: 90%;left:0;right:0;top:0;margin: auto;position: fixed;height: 300px;background-color: red;transition: 2s;}
</style>