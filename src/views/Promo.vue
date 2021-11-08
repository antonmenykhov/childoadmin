<template>
<div class="promocodes">
    <div class="promocode" v-for="promo,i in promocodes" :key="promo.id">
        <el-form :inline="true" :model="formInline">
            <el-form-item label="Название">
                <el-input v-model="promo.name"></el-input>
            </el-form-item>
            <el-form-item label="Процентная">
                <el-checkbox v-model="promo.percent"></el-checkbox>
            </el-form-item>
            <el-form-item label="Размер скидки">
                <el-input-number v-model="promo.price"></el-input-number>
            </el-form-item>
            <el-form-item label="Кол-во использований">
                <el-input-number v-model="promo.kolvo"></el-input-number>
            </el-form-item>
            <el-form-item label="Секретный код">
                <el-input v-model="promo.code"></el-input>
            </el-form-item>
            <el-button @click="save(i)">Сохранить</el-button>
            <el-button @click="del(i)">Удалить</el-button>
        </el-form>
    </div>

    <div class="buttons">

        <el-button @click="addPromo">Добавить промокод</el-button>
    </div>
</div>
</template>

<script>
import constants from '../constants'
import axios from 'axios'
export default {
    methods: {
        addPromo() {
            this.promocodes.push({
                code: '',
                kolvo: '',
                name: '',
                percent: true,
                price: 0,
                used: 0,
                whoUsed: [],
                id: 'new'
            })
        },
        del(i) {
            axios.delete(constants.promocodes + this.promocodes[i].id, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }
            })
            this.promocodes.splice(i, 1)

        },
        save(i) {
            if (this.promocodes[i].id !== 'new') {
                axios.put(constants.promocodes + this.promocodes[i].id, this.promocodes[i], {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.jwt}`
                    }
                }).then(
                    this.$notify({
                        title: 'Успешно',
                        message: 'Данные сохранены',
                        type: 'success'
                    })
                )
            } else {
                this.promocodes[i].id = null;
                axios.post(constants.promocodes, this.promocodes[i], {
                    headers: {
                        Authorization: `Bearer ${this.$store.state.jwt}`
                    }
                }).then(
                    this.$notify({
                        title: 'Успешно',
                        message: 'Промокод создан',
                        type: 'success'
                    })
                )
            }
        }
    },
    created() {
        axios.get(constants.promocodes, {
            headers: {
                Authorization: `Bearer ${this.$store.state.jwt}`
            }
        }).then(response => this.promocodes = response.data)
    },
    data() {
        return {
            promocodes: []
        }
    },
}
</script>

<style>
.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
}

.promocodes {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.promocode {
    margin-top: 25px;
    border-bottom: 1px solid rgb(161, 161, 161);
}
</style>
