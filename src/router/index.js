import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//顶部
import Mp3 from "../components/Mp3.vue"
//播放
import Audio from "../components/audio.vue"
//底部
import Mp4 from "../components/Mp4.vue"
import Vedio from "../components/vedio.vue"
export default new Router({
  routes: [
    {
     path:"/mp3",
     component:Mp3
    },
    {
    	path:"/mp4",
    	component:Mp4
    },
    {
    	path:"/audio",
    	name:"audio",
    	component:Audio
    },
    {
    	path:"/vedio",
    	name:"vedio",
    	component:Vedio
    },
    {
    	path:"/",
    	redirect:"/mp3"
    }
  ]
})
