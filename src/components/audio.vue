<template>
	<div id="musics">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
		</header>
		<audio :src="url" autoplay="autoplay"  id="myaudios" loop></audio>
		<!--{{$route.params}}-->
		<div class="mui-card" id="muicon">
			<h4 class="mui-text-center">{{$route.params.song}}</h4>
			<div class="lrc mui-text-center">
				<div v-html="lrc"></div>
			</div>
		</div>
		<div class="plays">
			<ul class="mui-table-view">
			    <li class="mui-table-view-cell mui-media">
		            <img class="mui-media-object mui-pull-left" :class="roll" :src="$route.params.img" :style="im"/>
		            <img :src="src" width="50" height="50" class="playpau" :class="roll" @click="paly"/>
		            <div class="mui-media-body">
		                <span class="mui-pull-left">{{$route.params.song}}</span><span class="mui-pull-right">{{$route.params.singer}}</span>
		                <div class="mui-clearfix"></div>
		                <!--进度条-->
		                <div class="prog">
		                	<div class="p-bar" id="pbar"></div>
		                </div>
		                <div class="mui-ellipsis">
		                	<div class="handle mui-text-center">
		                		<a class="mui-pull-left" @click="prevs">
		                			<img src="/static/img/prev.png" width="30" height="30"/>
		                		</a>
		                		<span>{{cur}}</span>- <span>{{dura}}</span>
		                		<a class="mui-pull-right" @click="nexts">
		                			<img src="/static/img/next.png" width="30" height="30"/>
		                		</a>
		                	</div>
		                </div>
		            </div>
			    </li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				im:"border-radius: 50%;margin-top: 0px;width: 60px;height: 60px;max-width:60px;",
				url:this.$route.params.url,
				cur:"",
				dura:"",
				audio:"",
				src:"/static/img/pause.png",
				roll:"",
				lrc:""
			}
		},
		mounted(){
			let audioDom = document.getElementById("myaudios"),
				that = this;
				this.audio = audioDom;
			//总时长
			audioDom.oncanplaythrough = function(){
				that.dura = that.gstime(this.duration);
			}
			//当前时间
			audioDom.ontimeupdate = function(){
				that.cur = that.gstime(this.currentTime);
				//进度条
				document.getElementById("pbar").style.width = ((this.currentTime/this.duration)*100).toFixed(0) + "%";
			}
			this.roll = "rol";
			//请求歌词
			this.$http.get("http://route.showapi.com/213-2",{
				params:{
					showapi_appid:30699,
					showapi_sign:"48c9abdbb3604b9b82af331570e343a5",
					musicid:this.$route.params.sid
				}
			}).then(function(res){
				let glrc = that.pgc(res.data.showapi_res_body.lyric);
				that.lrc = glrc;
			});
			//窗口高度
			document.getElementById("muicon").style.height = (window.innerHeight - 146) + "px";
			//歌词滚动
			audioDom.addEventListener("timeupdate",function(){
				//获取当前播放时间
				var timer = this.currentTime;
				//解析音乐对应时间
				var m = parseInt(timer/60);
				var ss = parseInt(timer);
				//去样式
				let heh = document.getElementsByClassName("hehe");
				for(var i = 0,len=heh.length;i<len;i++){
					heh[i].className = "hehe";
				}
				document.getElementById(`${ss-3}`).className = "hehe lrcsel";
				var st = m * 60+ss*4;
				document.getElementById('muicon').scrollTop = st;
				
			});
			
		},
		methods:{
			//事件格式化
			gstime(timer){
			    var m = Math.floor(timer /60);
			    var s = Math.floor(timer%60);
			    //补0
			    if(m<10)m = "0" + m;
			    if(s<10)s = "0" + s;
			    return m + ":"+ s;
			},
			//拼接解析歌词
			pgc(text){
				var txt = text.split("0]").splice(1).join("]");
				var larArr = txt.split("[");
				var garr = {};
				var html = "";
				for(var i = 0;i<larArr.length; i++){
					//二分割
					var arr = larArr[i].split("]");
					//取到歌词
					var message = arr[1];
					//取到时间
					var timer = arr[0].split(";");
					//分钟和秒
					var mm = timer[0].split("&#")[0];
					var stime = timer[1].split("&#")[0];
					var sm = timer[2];
					var hsm = "["+mm + ":" +stime + "." +sm+"]";
					//取到时间
					var gtimer = hsm.split(".");
					
					//分钟和秒
					var gstime = gtimer[0].split(":");
					
					//转换成秒
					var ms = gstime[0].split("[")[1] * 60 + gstime[1] * 1 - 2;
					if(message){
						html += "<div class = 'hehe' id='"+ms+"'>"+message+"</div>";
						//console.log(html);
					}
				}
				return html;
			},
			//播放暂停
			paly(){
				if(this.audio.paused){
					this.audio.play();
					this.src = "/static/img/pause.png";
					this.roll = "rol";
				}else{
					this.audio.pause();
					this.src = "/static/img/play.png";
					this.roll = "";
				};
			},
			//上一首
			prevs(){
				//http://ws.stream.qqmusic.qq.com/201308159.m4a?fromtag=46
				this.$route.params.sid++;
				this.url = "http://ws.stream.qqmusic.qq.com/"+this.$route.params.sid+".m4a?fromtag=46";
			},
			//下一首
			nexts(){
				this.$route.params.sid--;
				this.url = "http://ws.stream.qqmusic.qq.com/"+this.$route.params.sid+".m4a?fromtag=46";
			}
		}
	}
</script>

<style>
	#musics{width: 100%;height: auto;overflow: hidden;margin-top: 45px;}
	#musics .lrc{width: 95%;height: auto;margin: auto;}
	#musics #muicon{overflow: auto;}
	#musics #muicon h4{padding: 5px;color:#E50541;}
	.plays{position: fixed;bottom: 0;width: 100%;height: 80px;}
	.plays .mui-table-view,.plays .mui-table-view .mui-table-view-cell{height: 80px;background-color: #e4e4e4;color:#333;}
	.mui-table-view-cell{padding: 10px 15px;}
	.mui-table-view .mui-media-object.mui-pull-left{margin-right: 20px;}
	.handle{width: 100%;height: 45px;line-height: 45px;}
	.handle img{margin-top: 8px;}
	.playpau{position: absolute;left: 20px;top: 15px;}
	.lrcsel{color:#E50541;font-size: 18px;}
	.prog{width: 100%;height: 10px;border-radius: 5px;background: #fff; margin-bottom: -4px;margin-top: 6px;}
	.p-bar{height: 100%;border-radius: 5px;background: #FF4848;}
	.rol{
	    animation: roll 10s linear infinite;
	}
	@keyframes roll{
	    0%{transform: rotate(0deg)}
	    100%{transform: rotate(360deg)}
	}
</style>