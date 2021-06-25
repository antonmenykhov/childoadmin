<template>
  <div class="teachers">
      <div class="courses-wrapper">
        <div :id="'course'+item.id" class="course" v-for="item,i in teachers" :key="i">
            <div v-if="item.Avatar" class="course-image" :style="'background: url(\''+url+item.Avatar.formats.medium.url+ '\') no-repeat center center / cover'"></div>
            <span class="material-icons delete" @click="deleteTeacher(item.id)">
                delete
            </span>
            <span @click="$router.push({path: '/teachersEdit/'+item.id})" class="material-icons edit">
                edit
            </span>
            <div class="name">{{item.Name}}</div>
        </div>
        <div class="add-course" @click="$router.push({path: '/teachersEdit/new'})">
            <span class="material-icons">
                add
            </span>
            Новый преподаватель
        </div>
    </div>
  </div>
</template>

<script>
import constants from '../constants'
import axios from 'axios'
export default {
    data() {
        return {
            url: constants.url
        }
    },
    mounted() {
        this.getTeachers()

    },
    computed: {
        teachers: function () {
            return this.$store.state.teachers
        }
    },
    methods: {
        getTeachers() {
            axios.get(constants.teachers, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }}).then(
                response => { this.$store.commit('setTeachers', response.data) })
        },
        deleteTeacher(id) {
            axios.delete(constants.teachers + id, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }}).then(() => {this.getTeachers(); document.getElementById('teacher'+id).style.display="none"})
        }
    },
}
</script>

<style>

</style>