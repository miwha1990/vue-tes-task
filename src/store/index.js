import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      deals: false,
      currency: false,
      result:false,
      title:'TripSorter',
    },
    getters: {
      getDealsData(state){
        return state.deals;
      },
      getCurrency(state){
        return state.currency;
      },
      getResultData(state){
        return state.result;
      },
      getTitle(state){
        return state.title;
      }
    },
    mutations: {
      SET_CURRENCY(state, payload) {
        state.currency = payload;
      },
      SET_DEALS(state, payload) {
        state.deals = payload;
      },
      SET_RESULT(state, payload) {
        state.result = payload;
      },
    },
    actions: {
      fetchDeals(context, url) {
       return Vue.http.get(url).then(res => {
          context.commit('SET_DEALS', res.body['deals']);
          context.commit('SET_CURRENCY', res.body['currency'])
        })
      }
    }
})

export default store;
