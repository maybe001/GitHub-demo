//数据处理和发送
import { computed, ref } from 'vue'
import { defineStore } from "pinia";
import httpinistance from "../../utils/https.js";

export const getUserStore = defineStore('user', () => {
    //定义start
    const userdatabase = ref({})
    //定义action
    const getusers = async () => {
        const res = await httpinistance
    }
})