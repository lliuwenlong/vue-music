<template>
  <div id="app">
    	<!--头部-->
    	<Head v-if="shHead"></Head>
    	<!--内容-->
    	<div class="mui-content">
    			<loading v-if="loads"></loading>
    	    <router-view></router-view>
    	</div>
    	<!--底部-->
    	<Foot v-if="shFoot"></Foot>
  </div>
</template>

<script>
	//顶部
	import Head from "./components/Head.vue"
	//底部
	import Foot from "./components/Footer.vue"
	//vuex
	import {mapGetters,mapActions} from "vuex"
	export default {
			data(){
				return {
					shHead:true,
					shFoot:true
				}
			},
	 		components:{
	 			Head,
	 			Foot
	 		},
	 		computed:mapGetters(["loads"]),
	 		watch:{
	 			$route(to){
	 				if(to.path == "/audio" || to.path == "/vedio"){
	 					this.shHead = false;
	 					this.shFoot = false;
	 				}else{
	 					this.shHead = true;
	 					this.shFoot = true;
	 				}
	 			}
	 		},
	 		
	}
</script>

<style>

</style>
