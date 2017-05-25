<template>
	<div id="as">
		<div class="mui-row" v-for="item in arrList">
			<div class="mui-col-sm-12 mui-col-xs-12">
				<div class="mui-card">
					<!--内容区-->
					<div class="mui-card-content">
						<router-link :to="{name:'vedio',params:{url:item.video_uri}}">
							<img :src="item.profile_image" alt="" width="100%" height="200"/>
						</router-link>
					</div>
					<!--页脚，放置补充信息或支持的操作-->
					<div class="mui-card-footer">
						<p>名字：{{item.name}}</p>
						<p class="mui-ellipsis">描述：{{item.text}}</p>
						<p>创建时间：{{item.create_time}}</p>
					</div>
				</div>
			</div>
		</div>
		<p class="mui-text-center" v-if="arrList.length == 0">暂无数据</p>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				arrList:""
			}
		},
		mounted(){
			let that = this;
			this.$http.get("https://route.showapi.com/255-1",{
				params:{
					showapi_appid:30699,
					showapi_sign:"48c9abdbb3604b9b82af331570e343a5",
					type:41
				}
			}).then(function(res){
				that.arrList = res.data.showapi_res_body.pagebean.contentlist;
			}).catch(function(err){
				console.log(err);
			})
		}
	}
</script>

<style>
	#as{margin-bottom: 55px;}
	.mui-card-footer, .mui-card-header{display:block;width:100%;}
</style>