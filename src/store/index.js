import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    teachers: [],
    lessons: [],
    jwt: '', 
    users: []
  },
  mutations: {
    setCourses(state, it){
      state.courses = it
    },
    setTeachers(state, it){
      state.teachers = it
    },
    setLessons(state, it){
      state.lessons = it
    },
    changeJwt(state, it){
      state.jwt = it
    },
    setUsers(state, it){
      state.users = it
    }
  },
  actions: {
  },
  modules: {
  }
})
