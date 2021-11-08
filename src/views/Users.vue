<template>
<div class="users">
    <div class="container">
        <div class="user-list">
            <div class="user-item" v-for="user in users" :key="user.id">
                <div class="user-name">{{user.name}}</div>
                <div class="user-mail">{{user.email}}</div>
                <div class="user-instagram">{{user.Instagram}}</div>
                <div class="icons-wrapper">
                    <span @click="$router.push({path: '/userEdit/'+user.id})" class="material-icons edit">
                        edit
                    </span>
                    <span class="material-icons delete" @click="deleteUser(user.id)">
                        delete
                    </span>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import constants from '../constants'
import axios from 'axios'
export default {
    created() {
        this.getUsers()
    },
    computed: {
        users: function () {
            return this.$store.state.users
        }
    },
    methods: {
        getUsers() {
            axios.get(constants.users, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }
            }).then(response => {
                this.$store.commit('setUsers', response.data)
            })
        },
        deleteUser(id) {
            axios.delete(constants.users + id, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }
            }).then(() => {
                this.getUsers();
                document.getElementById('user' + id).style.display = "none"
            })
        }
    },
    data() {
        return {
            url: constants.url
        }
    },

}
</script>

<style>
.users .icons-wrapper{
    justify-content: flex-end;
    display: flex;
    flex: 1;
}
.users .delete{
    position: unset;
    height: unset;
    width: unset;
    margin-left: 5px;
}
.delete, .edit{
    cursor: pointer;
}
.user-list {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}

.user-item {
    display: flex;
    border-bottom: 1px solid rgb(228, 228, 228);
    padding: 7px 1px;
    align-items: center;
    font-size: 18px;
}
.user-name, .user-mail, .user-instagram{
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
}
</style>
