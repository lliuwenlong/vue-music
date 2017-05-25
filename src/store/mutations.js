import getters from "./getters.js"
const state = {
	shLoad:false
}

const mutations = {
	showload(state){
		state.shLoad = true;
	},
	hideload(state){
		state.shLoad = false;
	}
}
export default{
	state,
	mutations,
	getters
}
