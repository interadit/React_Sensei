
const state = {
	user : ''
};

const getters = {
	user: state => state.user
};

const actions = {

};

const mutations = {
	setUser(state, data) {
		state.user = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
}