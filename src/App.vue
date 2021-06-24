<template>
<div id="app">
    <div class="left">
        
        <el-menu default-active="1" class="el-menu-vertical-demo" >
            
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span>Главная</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push({path:'/courses'})">
                <i class="el-icon-menu"></i>
                <span>Курсы</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span>Преподаватели</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span>Пользователи</span>
            </el-menu-item>
            
        </el-menu>
    </div>
    <div class="right">
        
        <router-view> </router-view>
    </div>

</div>
</template>

<script>
import axios from 'axios';
import constants from './constants';
export default {
    name: 'app',
    components: {

    },
    beforeMount() {
      axios.get(constants.courses).then(
        response => {this.$store.commit('setCourses', response.data)}
      );
      axios.get(constants.teachers).then(
        response => {this.$store.commit('setTeachers', response.data)}
      );
      axios.get(constants.lessons).then(
        response => {this.$store.commit('setLessons', response.data)}
      )
      
    },
}
</script>

<style>
*{
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
}
.left {
    width: 200px;
    height: 100%;
}

.right {
    flex: 1;
}

#app {
    display: flex;

}
</style>
