<template>
<div id="app">
    <div class="left">
        
        <el-menu default-active="1" class="el-menu-vertical-demo" >
            
            <el-menu-item index="1" @click="$router.push({path: '/'})">
                <i class="el-icon-menu"></i>
                <span>Главная</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push({path:'/courses'})">
                <i class="el-icon-menu"></i>
                <span>Курсы</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push({path:'/teachers'})">
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
     
      
     
      
    },
    
}
</script>

<style lang="scss">
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
.img {
    width: 200px;
    height: 100px;
    position: relative;
}

.delete {
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    right: 10px;
    top: 10px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.features,
.lessons {
    display: flex;
    flex-direction: column;

    .lesson {
        position: relative;
        margin: 30px 0 10px;

        .name {
            background: rgba(216, 70, 150, 0.726);
            position: absolute;
            width: 100%;
            top: -30px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            padding: 0 10px;

            .deleteFeature {

                padding: 5px !important;
            }
        }
    }

    .feature {
        display: flex;
        margin: 30px 0 10px;
        position: relative;

        .el-form-item__label {
            padding: 0 10px 0 10px !important;
        }

        .right {
            margin-left: 10px;
        }

        .el-form-item__content {
            display: flex;
        }

        .deleteFeature {

            padding: 5px !important;
        }

        .name {
            position: absolute;
            width: 100%;
            background: rgba(149, 241, 247, 0.678);
            top: -30px;
            height: 30px;
            display: flex;
            padding: 0 10px;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
        }

        .img-add {
            height: 100px;
            width: 200px;
            background: grey;
        }

    }
}
</style>
