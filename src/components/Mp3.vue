<template>
	<div id="dd">
		<div class="mui-input-row mui-search">
			<input type="search" class="mui-input-clear" v-model="value" placeholder="关键词" @focus="serch" @blur="unserch" :style="wth"/>
			<button class="mui-btn mui-btn-primary" @click="sou"><i class="mui-icon mui-icon-search"></i></button>
		</div>
		<!--首页列表-->
		<ul class="mui-table-view" v-if="listsh">
		    <li class="mui-table-view-cell mui-media" v-for="item in arrList">
		        <router-link :to="{name:'audio',params:{url:item.url,img:item.albumpic_big,song:item.songname,singer:item.singername,sid:item.songid}}">
		            <img class="mui-media-object mui-pull-left" :src="item.albumpic_big" :style="imgc">
		            <div class="mui-media-body">
		              	歌名：{{item.songname}}
		                <p class="mui-ellipsis">歌手：{{item.singername}}</p>
		            </div>
		        </router-link>
		    </li>
		</ul>
		<!--搜索列表-->
		<ul class="mui-table-view" v-if="serchsh">
		    <li class="mui-table-view-cell mui-media" v-for="item in serList">
		        <router-link :to="{name:'audio',params:{url:item.m4a,img:item.albumpic_big,song:item.songname,singer:item.singername,sid:item.songid}}">
		            <img class="mui-media-object mui-pull-left" :src="item.albumpic_big" :style="imgc">
		            <div class="mui-media-body">
		              	歌名：{{item.songname}}
		                <p class="mui-ellipsis">歌手：{{item.singername}}</p>
		            </div>
		        </router-link>
		    </li>
		</ul>
		<p v-if="arrList.length ==0" class="mui-text-center">暂无数据</p>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				arrList:[],
				serList:[],
				imgc:"border-radius:50%;",
				listsh:true,
				serchsh:false,
				wth:"width:84%;",
				value:""
			}
		},
		mounted(){
			let that = this;
			this.$http.get("https://route.showapi.com/213-4",{
				params:{
					showapi_appid:30699,
					showapi_sign:"48c9abdbb3604b9b82af331570e343a5",
					topid:5
				}
			}).then(function(res){
				that.arrList = res.data.showapi_res_body.pagebean.songlist;
			}).catch(function(err){
				console.log(err);
			})
		},
		methods:{
			serch(){
				this.listsh = false;
				this.serchsh = true;
			},
			unserch(){
				this.listsh = true;
				this.serchsh = false;
			},
			sou(){
				let that = this;
				this.listsh = false;
				this.serchsh = true;
				if(this.value != ""){
					this.$http.get("https://route.showapi.com/213-1",{
						params:{
							showapi_appid:30699,
							showapi_sign:"48c9abdbb3604b9b82af331570e343a5",
							keyword:this.value
						}
					}).then(function(res){
						console.log(res)
						that.serList = res.data.showapi_res_body.pagebean.contentlist;
					}).catch(function(err){
						console.log(err);
					})
				}
			}
		}
	}
</script>

<style>
	#dd{margin-bottom: 55px;}
	.mui-search{margin-top: 15px;}
	.mui-input-row .mui-btn{padding: 8px 15px;}
</style>