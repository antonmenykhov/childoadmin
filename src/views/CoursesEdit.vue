<template>
<div>
  
    <el-form label-width="200px">
          <el-form-item label="Номер курса">
        <el-input-number v-model="data.num"></el-input-number>
    </el-form-item>
        <el-form-item label="Обложка курса для главной">
            <input v-if="!data.image" type="file" id="mainImage" v-on:change="mainImageUpload()">
            <div :style="'background: url(\''+constants.url+data.image.formats.thumbnail.url+ '\') no-repeat center center / cover'" class="img" v-if="data.image">
                <span @click="$set(data, 'image', null)" class="material-icons delete">
                    delete
                </span>
            </div>
        </el-form-item>
        <el-form-item label="Кто на обложке курса">
            <el-select v-model="data.girl">
                <el-option value="masha" label="Маша"></el-option>
                <el-option value="tanya" label="Татьяна"></el-option>
            </el-select>
        </el-form-item>
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
            <el-input v-model="data.smallDescription" autosize type="textarea" :rows="2" placeholder="Please input">
            </el-input>
        </el-form-item>
        <el-form-item label="Полное описание">
            <el-input v-model="data.description" autosize type="textarea" :rows="5" placeholder="Please input">
            </el-input>
        </el-form-item>
        <el-form-item label="Инструменты и материалы">
            <div class="tools" v-if="data.style=='child'">
                <el-input autosize type="textarea" :rows="2" v-model="data.tools"></el-input>
            </div>
            <div class="tools" v-if="data.style=='grow'">
                <el-form-item label="Apple">
                    <el-input autosize type="textarea" :rows="2" v-model="data.apple"></el-input>
                </el-form-item>
                <el-form-item label="Android">
                    <el-input autosize type="textarea" :rows="2" v-model="data.android"></el-input>
                </el-form-item>
                <el-form-item label="Бонусы">
                    <el-form label-position="top" v-for="item,i in data.bonus" :key="i" class="bonus">
                        <div class="name"><p>Бонус {{i+1}}</p> <el-button  v-on:click="deleteBonus(i)" class="deleteFeature">Удалить бонус</el-button></div>
                        <el-form-item label="Файл">
                        <p v-if="item.file">{{item.file.name}}
                            <span @click="$set(data.bonus[i], 'file', null)" class="material-icons delete">
                                delete
                            </span>
                        </p>
                        
                        <input v-if="!item.file" type="file" :id="'bonus'+i" v-on:change="bonusFileUpload(i)">
                        </el-form-item>
                        <el-form-item label="Название бонуса">
                        <el-input v-model="item.name"></el-input>
                        </el-form-item>

                    </el-form>
                    <el-button @click="addBonus">Добавить бонус</el-button>
                </el-form-item>
            </div>
        </el-form-item>
        <el-form-item label="Изображение для инструментов и материалов">
            <input v-if="!data.toolsImage" type="file" id="toolsImage" v-on:change="ToolsImageUpload()">
            <div :style="'background: url(\''+constants.url+data.toolsImage.formats.thumbnail.url+ '\') no-repeat center center / cover'" class="img" v-if="data.toolsImage">
                <span @click="$set(data, 'toolsImage', null)" class="material-icons delete">
                    delete
                </span>
            </div>
        </el-form-item>
        <el-form-item label="Фишки курса">
            <div class="features">
                <el-form label-position="top" class="feature" v-for="item,i in data.fetures" :key="i">
                    <div class="name">
                        <p>Фишка {{i+1}}</p>
                        <el-button class="deleteFeature" v-on:click="deleteFeature(i)">Удалить фишку</el-button>
                    </div>
                    <div class="left">
                        <el-form-item label="Заголовок">
                            <el-input v-model="item.title">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="Изображение">
                            <div class="img" v-if="item.image" :style="'background: url(\''+constants.url+item.image.formats.thumbnail.url+ '\') no-repeat center center / cover'">
                                <span @click="$set(data.fetures[i], 'image', null)" class="material-icons delete">
                                    delete
                                </span>
                            </div>
                            <input v-if="item.image == '' || item.image == null" type="file" :id="'file'+i" v-on:change="handleFileUpload(i)">
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="Описание">
                            <el-input autosize type="textarea" :rows="2" v-model="item.text"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <el-button @click="addFeature">Добавить фишку</el-button>
            </div>
        </el-form-item>

        <el-form-item label="Тарифы">
            <div class="features prices">
                <el-form label-position="top" class="feature" v-for="item,i in data.prices" :key="i">
                    <div class="name">
                        <p>Тариф {{i+1}}</p>
                        <el-button class="deleteFeature" v-on:click="deleteTarif(i)">Удалить тариф</el-button>
                    </div>
                    <div class="left">
                        <el-form-item label="Название тарифа">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>

                        <el-form-item  label="Длительность">
                            <el-input v-model="item.time"></el-input>
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="Цена за тариф">
                            <el-input-number v-model="item.price"></el-input-number>
                        </el-form-item>
                        <el-form-item v-if="data.style == 'grow'" label="Описание тарифа">
                            <el-input autosize type="textarea" :rows="2" v-model="item.description"></el-input>
                        </el-form-item>

                        <el-form-item v-if="data.style == 'child'" label="Цена за месяц">
                            <el-input-number v-model="item.pricePerM"></el-input-number>
                        </el-form-item>
                    </div>

                </el-form>
                <el-button @click="addTarif">Добавить тариф</el-button>
            </div>

        </el-form-item>
        <el-form-item label="Уроки">
            <div class="lessons">
                <div class="lesson" v-for="item,i in data.lessons" :key="i">
                    <div class="name">
                        <p>Урок {{i+1}}</p>
                        <el-button class="deleteFeature" v-on:click="deleteLesson(i)">Удалить урок</el-button>
                    </div>
                    <el-form-item label="Название урока">
                        <el-input v-model="item.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="Обложка урока">
                        <div class="img" v-if="item.img" :style="'background: url(\''+constants.url+item.img.formats.thumbnail.url+ '\') no-repeat center center / cover'">
                            <span @click="$set(data.lessons[i], 'img', null)" class="material-icons delete">
                                delete
                            </span>
                        </div>

                        <input v-if="!item.img" type="file" :id="'lesson'+i" v-on:change="lessonFileUpload(i)">
                    </el-form-item>
                    <el-form-item label="Видео">
                        <el-input v-model="item.Video"></el-input>
                    </el-form-item>
                    <el-form-item label="Длительность видео">
                        <el-input v-model="item.time"></el-input>
                    </el-form-item>
                    <el-form-item label="Краткое описание урока">
                        <el-input autosize type="textarea" :rows="2" v-model="item.smallDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="Полное описание урока">
                        <el-input autosize type="textarea" :rows="2" v-model="item.Description"></el-input>
                    </el-form-item>
                    <el-form-item label="Инструменты и материалы на урок">
                        <el-input autosize type="textarea" :rows="2" v-model="item.tools"></el-input>
                    </el-form-item>
                    <el-form-item label="Цвет урока на странице курса">
                        <el-select v-model="item.color"> 
                             <el-option label="Оранжевый" value="orange"></el-option>
                            <el-option label="Зеленый" value="green"></el-option>
                            <el-option label="Розовый" value="pink"></el-option>
                            <el-option label="Голубой" value="blue"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Стиль урока">
                        <el-select v-model="item.styleGrow" v-if="data.style == 'grow'">
                            <el-option label="Взрослый стиль 1" value="gr-1"></el-option>
                            <el-option label="Взрослый стиль 2" value="gr-2"></el-option>
                            <el-option label="Взрослый стиль 3" value="gr-3"></el-option>
                            <el-option label="Взрослый стиль 4" value="gr-4"></el-option>
                            <el-option label="Взрослый стиль 5" value="gr-5"></el-option>
                            <el-option label="Взрослый стиль 6" value="gr-6"></el-option>
                            <el-option label="Взрослый стиль 7" value="gr-7"></el-option>
                            <el-option label="Взрослый стиль 8" value="gr-8"></el-option>
                            <el-option label="Взрослый стиль 9" value="gr-9"></el-option>
                            <el-option label="Взрослый стиль 10" value="gr-10"></el-option>
                        </el-select>
                        <el-select v-model="item.styleChild" v-if="data.style == 'child'">
                            <el-option label="Детский стиль 1" value="ch-1"></el-option>
                            <el-option label="Детский стиль 2" value="ch-2"></el-option>
                            <el-option label="Детский стиль 3" value="ch-3"></el-option>
                            <el-option label="Детский стиль 4" value="ch-4"></el-option>
                            <el-option label="Детский стиль 5" value="ch-5"></el-option>
                            <el-option label="Детский стиль 6" value="ch-6"></el-option>
                            <el-option label="Детский стиль 7" value="ch-7"></el-option>
                            <el-option label="Детский стиль 8" value="ch-8"></el-option>
                            <el-option label="Детский стиль 9" value="ch-9"></el-option>
                            <el-option label="Детский стиль 10" value="ch-10"></el-option>
                            <el-option label="Детский стиль 11" value="ch-11"></el-option>
                            <el-option label="Детский стиль 12" value="ch-12"></el-option>
                            <el-option label="Детский стиль 13" value="ch-13"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="data.style=='child'" label="ДЗ">
                        <el-input autosize type="textarea" :rows="2" v-model="item.dz"></el-input>
                    </el-form-item>
                </div>
                <el-button @click="addLesson">Добавить урок</el-button>
            </div>
        </el-form-item>
        <el-form-item label="Спикер">
            <el-select v-model="data.teacher">
                <el-option v-for="item, i in teachers" :key="i" :label="item.Name" :value="item.id"></el-option>
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
            num: '',
            file: '',
            id: this.$route.params.id,
            data: {
                Name: '',
                android: '',
                apple: '',
                bonus: [],
                description: '',
                fetures: [],
                image: '',
                lessons: [],
                prices: [],
                smallDescription: '',
                style: '',
                teacher: {},
                tools: '',
                girl: '',
                toolsImage: null,
            },
            constants: constants,
            teachers: ''
        }
    },
    methods: {
        getData() {
            axios.get(this.constants.courses + this.id, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }}).then(response => {
                this.data = response.data
            })
            

        },
        getTeachers(){
            axios.get(this.constants.teachers, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }}).then(response => {
                this.teachers = response.data
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
        addBonus() {
            this.data.bonus.push({
                file: null,
                name: '',
                __component: "features.bonus"
            })
        },
        addTarif() {
            this.data.prices.push({
                price: 0,
                name: '',
                pricePerM: 0,
                description: '',
                time: '',
                __component: "features.price"
            })
        },
        addLesson() {
            this.data.lessons.push({
                Description: '',
                Name: '',
                Video: '',
                dz: '',
                img: null,
                smallDescription: '',
                styleChild: '',
                styleGrow: '',
                tools: '',
                time: null,
                color: '',
                __component: "features.lesson"
            })
        },
        submitFeature(i) {
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
                    formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${this.$store.state.jwt}` }, }
                ).then(response => {
                    this.$set(this.data.fetures[i], 'image', response.data[0])

                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        handleFileUpload(i) {
            let reff = 'file' + i;
            this.file = document.getElementById(reff).files[0];
            this.submitFeature(i)
        },
        mainImageUpload() {
            this.file = document.getElementById('mainImage').files[0];
            this.submitMainImage()
        },
        submitMainImage() {
            let formData = new FormData();
            formData.append('files', this.file);
            axios.post(constants.upload,
                    formData, { headers: { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${this.$store.state.jwt}` }, }
                ).then(response => {
                    this.$set(this.data, 'image', response.data[0])

                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        bonusFileUpload(i) {
            let reff = 'bonus' + i
            this.file = document.getElementById(reff).files[0];
            this.submitBonus(i)
        },
        submitBonus(i) {
            let formData = new FormData();
            formData.append('files', this.file);
            axios.post(constants.upload,
                    formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${this.$store.state.jwt}` }, }
                ).then(response => {
                    this.$set(this.data.bonus[i], 'file', response.data[0])

                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        ToolsImageUpload() {
            let reff = 'toolsImage'
            this.file = document.getElementById(reff).files[0];
            this.submitTools()
        },
        submitTools() {
            let formData = new FormData();
            formData.append('files', this.file);
            axios.post(constants.upload,
                    formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${this.$store.state.jwt}` }, }
                ).then(response => {
                    this.$set(this.data, 'toolsImage', response.data[0])

                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },

        lessonFileUpload(i) {
            let reff = 'lesson' + i
            this.file = document.getElementById(reff).files[0];
            this.submitLesson(i)
        },
        submitLesson(i) {
            let formData = new FormData();
            formData.append('files', this.file);
            axios.post(constants.upload,
                    formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${this.$store.state.jwt}` }, }
                ).then(response => {
                    this.$set(this.data.lessons[i], 'img', response.data[0])

                })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        sendData() {
            if (this.id !== 'new') {
                axios.put(this.constants.courses + this.id, this.data, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }})
            } else {
                axios.post(this.constants.courses, this.data, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }})
            }
        },
        deleteFeature(i) {
            this.$delete(this.data.fetures, i)
        },
        deleteBonus(i) {
            this.$delete(this.data.bonus, i)
        },
        deleteTarif(i) {
            this.$delete(this.data.prices, i)
        },
        deleteLesson(i) {
            this.$delete(this.data.lessons, i)
        },

    },
    mounted() {
        if (this.id !== 'new') {
            this.getData()
        }
        this.getTeachers()
    },
}
</script>

<style lang="scss">
.bonus{
    display: flex;
    position: relative;
    margin-top: 40px;
    margin-bottom: 10px;
    .name{
        position: absolute;
        background: cadetblue;
        top: -30px;
        height: 30px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        display: flex;
        padding: 0 10px;
        border-radius: 5px;
        .deleteFeature{
            padding: 5px!important;
        }
    }
}
</style>
