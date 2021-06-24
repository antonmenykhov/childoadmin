import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    teachers: [],
    lessons: []
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
  },
  actions: {
  },
  modules: {
  }
})
