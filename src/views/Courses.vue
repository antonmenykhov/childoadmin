<template>
<div>
    <div class="courses-wrapper">
        <div @click="$router.push({path: '/coursesEdit/'+item.id})" class="course" v-for="item,i in courses" :key="i" :style="'background: url(\''+url+item.image.formats.small.url+ '\') no-repeat center center / cover'">
            <span class="material-icons delete">
                delete
            </span>
            <span class="material-icons edit">
                edit
            </span>
            <div class="name">{{item.Name}}</div>
        </div>
        <div class="add-course">
            <span class="material-icons">
                add
            </span>
            Новый курс
        </div>
    </div>
</div>
</template>

<script>
import constants from '../constants'
export default {
    data() {
        return {
            url: constants.url
        }
    },
    computed: {
        courses: function () {
            return this.$store.state.courses
        }
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

.courses-wrapper {
    display: flex;
    flex-wrap: wrap;
}

.course {
    height: 200px;
    width: 200px;
    margin: 10px;
    border-radius: 20px;
    transition: all .2s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    .edit{
      position: absolute;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      left: 10px;
      top: 10px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .delete{
      position: absolute;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      right:  10px;
      top: 10px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name{
      font-size: 20px;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      background: rgba(0, 0, 0, 0.726);
      color: white;
      padding: 5px;
    }
}

.add-course {
    .material-icons {
        font-size: 40px;
    }

    margin: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 200px;
    border-radius: 20px;
    background: rgba(196, 196, 196, 0.425);
    border: 2px solid rgba(128, 128, 128, 0.459);
    cursor: pointer;
    transition: all .2s;

}

.add-course:hover,
.course:hover {
    transform: scale(0.9);

}
</style>
