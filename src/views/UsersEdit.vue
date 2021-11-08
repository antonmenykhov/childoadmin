<template>
<div class="users">
    <el-form label-width="200px">
        <el-form-item label="Имя">
            <el-input v-model="userData.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item label="Instagram">
            <el-input v-model="userData.Instagram"></el-input>
        </el-form-item>
        <el-form-item label="Оплаченные курсы">
            <div v-for="item,index in userData.BuyedCourses" :key="item.id" class="user-course">
                <div class="course-name">
                    Курс {{index+1}}
                    <el-button @click="deleteCourse(index)">Удалить курс</el-button>
                </div>
                <el-form label-width="200px">

                    <el-form-item label="Название курса">
                        <el-input v-model="item.courseMainData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Дата начала">
                        <el-input type="date" v-model="item.courseStart"></el-input>
                    </el-form-item>
                    <el-form-item label="Дата окончания">
                        <el-input type="date" v-model="item.CourseEnd"></el-input>
                    </el-form-item>
                    <el-form-item label="Уроки">
                        <ul class="ul-lessons">
                            <li v-for="lesson,i in item.courseMainData.lessons" :key="lesson.id">{{lesson.Name}} <span class="material-icons delete" @click="deleteLesson(index,i)">
                                    delete
                                </span></li>
                            <el-button @click="openAddLesson(index)">Добавить урок</el-button>
                        </ul>
                    </el-form-item>

                </el-form>
            </div>
            <el-button style="width: 100%; margin-top: 5px" @click="addCourse">Добавить курс</el-button>
        </el-form-item>
        <el-form-item label="Сохранить">
            <el-button @click="save">Сохранить</el-button>
        </el-form-item>
    </el-form>
    <el-dialog :visible.sync="openLesson">
        <div class="dialog-lessons">
            <div class="half">
                <h3>Доступные уроки</h3>
                <ul class="ul-lessons">
                    <li @click="addLesson(i)" v-for="lesson,i in availableLessons" :key="lesson.id">{{lesson.Name}}</li>
                </ul>
            </div>
            <div class="half">
                <h3>Добавленные уроки</h3>
                <ul class="ul-lessons">
                    <li @click="removeLesson(i)" v-for="lesson,i in addedLessons" :key="lesson.id">{{lesson.Name}}</li>
                </ul>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import constants from '../constants'
export default {
    methods: {
        deleteCourse(id) {
            this.userData.BuyedCourses.splice(id, 1)
        },
        addCourse() {
            this.userData.BuyedCourses.push({
                CourseEnd: '',
                courseMainData: {
                    lessons: [],
                    name: ''
                },
                courseStart: '',
                lessonsData: {},
                progress: null,
                style: null,
                __component: "buyed.buyed-courses"
            })
        },
        deleteLesson(courseId, lessonsId) {
            this.userData.BuyedCourses[courseId].courseMainData.lessons.splice(lessonsId, 1)
        },
        openAddLesson(courseId) {
            this.openLesson = true
            this.dialogCourse = courseId;
            this.addedLessons = this.userData.BuyedCourses[courseId].courseMainData.lessons;
            this.availableLessons = []
            this.courses.forEach(course => {

                this.availableLessons = this.availableLessons.concat(course.lessons.filter(({ id: id1 }) => !this.addedLessons.some(({ id: id2 }) => id2 === id1)));
            });
        },
        addLesson(lessonId) {
            this.addedLessons.push(this.availableLessons[lessonId])
            this.availableLessons.splice(lessonId, 1)
        },
        removeLesson(lessonId) {
            this.availableLessons.push(this.addedLessons[lessonId])
            this.addedLessons.splice(lessonId, 1)
        },
        save() {
            for (let i = 0; i < this.userData.BuyedCourses.length; i++) {
                this.userData.BuyedCourses[i].courseStart = (this.$moment(this.userData.BuyedCourses[i].courseStart, 'YYYY-MM-DD')).format('x');
                this.userData.BuyedCourses[i].CourseEnd = (this.$moment(this.userData.BuyedCourses[i].CourseEnd, 'YYYY-MM-DD')).format('x');
            }

            axios.put(constants.users + this.id, this.userData, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }
            }).then(this.$router.push({ path: '/users' }))

        }
    },
    data() {
        return {
            id: this.$route.params.id * 1,
            url: constants.url,
            userData: {},
            openLesson: false,
            dialogCourse: 0,
            addedLessons: [],
            availableLessons: []

        }
    },
    created() {
        let data = this.$store.state.users.find(user => user.id === this.id)
        for (let i = 0; i < data.BuyedCourses.length; i++) {
            data.BuyedCourses[i].courseStart = (this.$moment((data.BuyedCourses[i].courseStart) * 1)).format('YYYY-MM-DD');
            data.BuyedCourses[i].CourseEnd = (this.$moment((data.BuyedCourses[i].CourseEnd) * 1)).format('YYYY-MM-DD');
        }
        this.userData = data;
    },
    computed: {
        courses: function () {
            return this.$store.state.courses
        }
    }

}
</script>

<style lang="scss">
.course-name {
    display: flex;
    justify-content: space-between;
    background: cadetblue;
    border-radius: 5px;
    padding: 0 15px;
    align-items: center;
    margin: 10px 0;

    .el-button {
        padding: 4px 10px;
        height: 90%;
    }
}

.ul-lessons {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;

    li {
        border: 1px solid rgb(230, 230, 230);
        border-radius: 5px;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        width: 300px;
    }

    li:hover {
        border: 1px solid rgb(183, 183, 247)
    }

    .el-button {
        width: 300px;
    }
}

.dialog-lessons {
    display: flex;
}

.half {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        text-align: center;
    }

    li {
        cursor: pointer;
        padding: 5px 15px;
        margin-bottom: 2px;
    }
}
</style>
