<template>
<div class="teachers">
    <el-form label-width="200px">
        <el-form-item label="Стиль оформления на странице курса">
            <el-select v-model="data.style">
                <el-option value="cs-1" label="Как в курсе 1"></el-option>
                <el-option value="cs-2" label="Как в курсе 2"></el-option>

            </el-select>
        </el-form-item>
        <el-form-item label="Позиция на главной странице">
            <el-input-number v-model="data.num"></el-input-number>
        </el-form-item>
        <el-form-item label="Имя">
            <el-input v-model="data.Name"></el-input>
        </el-form-item>
        <el-form-item label="Фото">
            <input v-if="!data.Avatar" type="file" id="avatar" v-on:change="mainImageUpload()">
            <div :style="'background: url(\''+constants.url+data.Avatar.formats.medium.url+ '\') no-repeat center center / cover'" class="avatar" v-if="data.Avatar">
                <span @click="$set(data, 'Avatar', null)" class="material-icons delete">
                    delete
                </span>
            </div>
        </el-form-item>
        <el-form-item label="Описание на главной">
            <el-input v-model="data.description" type="textarea" rows="5" autosize></el-input>
        </el-form-item>
        <el-form-item label="Описание на странице курса">
            <el-input v-model="data.courseDescription" type="textarea" rows="5" autosize></el-input>
        </el-form-item>
        <el-form-item v-if="data.style=='cs-1'" label="Достижения">
            <el-input v-model="data.achives" type="textarea" rows="5" autosize></el-input>
        </el-form-item>
        <el-form-item label="Образование">
            <el-input v-model="data.school" type="textarea" rows="5" autosize></el-input>
        </el-form-item>
        <el-form-item v-if="data.style=='cs-1'" label="Цитата 1">
            <el-input v-model="data.quote1" type="textarea" rows="5" autosize></el-input>
        </el-form-item>
        <el-form-item v-if="data.style=='cs-1'" label="Цитата 2">
            <el-input v-model="data.quote2" type="textarea" rows="5" autosize></el-input>
        </el-form-item>
        <el-form-item label="Цвет кляксы">
            <el-select v-model="data.color">
                <el-option value="pink" label="Розовый"></el-option>
                <el-option value="green" label="Зеленый"></el-option>
                <el-option value="blue" label="Голубой"></el-option>
                <el-option value="orange" label="Оранжевый"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Сохранить">
            <el-button @click="sendData">Сохранить</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import axios from 'axios';
import constants from '../constants'
export default {
    data() {
        return {
            file: '',
            id: this.$route.params.id,
            constants: constants,
            data: {
                Avatar: null,
                description: '',
                courseDescription: '',
                Name: '',
                achives: '',
                school: '',
                style: '',
                quote1: '',
                quote2: '',
                color: ''

            }
        }
    },
    methods: {
        getData() {
            axios.get(this.constants.teachers + this.id, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }}).then(response => {
                this.data = response.data
            })

        },
        sendData() {
            if (this.id !== 'new') {
                axios.put(this.constants.teachers + this.id, this.data, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }})
            } else {
                axios.post(this.constants.teachers, this.data, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }})
            }
        },
         mainImageUpload() {
            this.file = document.getElementById('avatar').files[0];
            this.submitMainImage()
        },
        submitMainImage() {
            let formData = new FormData();
            formData.append('files', this.file);
            axios.post(constants.upload,
                    formData, { headers: { 'Content-Type': 'multipart/form-data',  Authorization: `Bearer ${this.$store.state.jwt}` }, }
                ).then(response => {
                    this.$set(this.data, 'Avatar', response.data[0])

                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
    },
    mounted() {
        if (this.id !== 'new') {
            this.getData()
        }
    },
}
</script>

<style lang="scss">
.avatar {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    position: relative;

    .delete {
        position: absolute;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        right: 10px;
        top: 10px;
        background: grey;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white
    }

}
</style>
