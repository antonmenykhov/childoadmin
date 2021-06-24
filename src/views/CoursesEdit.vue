<template>
<div>
    <el-form>
        <el-form-item label="Название курса">
            <el-input v-model="data.Name"></el-input>
        </el-form-item>
        <el-form-item label="Аудитория">
            <el-select v-model="data.style">
                <el-option value="child" label="Дети"></el-option>
                <el-option value="grow" label="Взрослые"></el-option>

            </el-select>
        </el-form-item>
        <el-form-item label="Короткое описание">
            <el-input v-model="data.smallDescription" autosize="true" type="textarea" :rows="2" placeholder="Please input">
            </el-input>
        </el-form-item>
        <el-form-item label="Полное описание">
            <el-input v-model="data.description" autosize="true" type="textarea" :rows="5" placeholder="Please input">
            </el-input>
        </el-form-item>
        <el-form-item label="Фишки курса">
            <div class="features">
                <div class="feature" v-for="item,i in data.fetures" :key="i">

                    <el-input v-model="item.title"></el-input>
                    <el-input autosize="true" type="textarea" :rows="2" v-model="item.text"></el-input>
                    <div class="img" v-if="item.image" :style="'background: url(\''+constants.url+item.image.formats.thumbnail.url+ '\') no-repeat center center / cover'"></div>
                    <input v-if="item.image == '' || item.image == null" type="file" :id="'file'+i"  v-on:change="handleFileUpload(i)">
                    <el-button v-on:click="deleteFeature(i)">Удалить</el-button>
                </div>
                <el-button @click="addFeature">Add</el-button>
            </div>
        </el-form-item>
    </el-form>
    <el-button @click="sendData">Send Data</el-button>
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
            data: {
                Name: '',
                android: '',
                apple: '',
                bonuses: '',
                description: '',
                fetures: [],
                image: '',
                lessons: [],
                prices: [],
                smallDescription: '',
                style: '',
                teacher: {},
                tools: []
            },
            constants: constants,
            teachers: this.$store.state.teachers
        }
    },
    methods: {
        getData() {
            axios.get(this.constants.courses + this.id).then(response => {
                this.data = response.data
            })

        },
        addFeature() {
            this.data.fetures.push({
                title: '',
                text: '',
                image: '',
                __component: "features.feature"
            })
        },
        submitFile(i) {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('files', this.file);
                console.log(this.file.name)
            /*
              Make the request to the POST /single-file URL
            */
            axios.post(constants.upload,
                    formData, { headers: { 'Content-Type': 'multipart/form-data' }, }
                ).then(response => {
                    this.$set(this.data.fetures[i], 'image', response.data[0])
                 
                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        handleFileUpload(i) {
            let reff='file'+i;
            this.file = document.getElementById(reff).files[0];
            this.submitFile(i)
        },
        sendData(){
            axios.put(this.constants.courses+this.id, this.data)
        },
        deleteFeature(i){
            this.$delete(this.data.fetures, i)
        }

    },
    mounted() {
        if (this.id !== 'new') {
            this.getData()
        }
    },
}
</script>

<style lang="scss">
.features {
    .feature {
        .img {
            height: 100px;
            width: 200px;
        }

        .img-add {
            height: 100px;
            width: 200px;
            background: grey;
        }

    }
}
</style>
