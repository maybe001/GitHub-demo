<template>
  <div class="icon">
    <div class="a" v-for="item in allUrl" :key="item.id">
      <img :src="`${item.avatar_url}`" alt="" />
      <p>{{ getname(item) }}</p>
    </div>
  </div>
  <div class="langeNull" v-if="!fensshow">
    <img src="../../../../../assets/图标/空数据_数据为空.png" alt="" />
  </div>
</template>

<script setup>
import httpinistance from "../../../../../utils/https.js";
import { onMounted, ref } from "vue";
const fensshow = ref(true);
// const imgUrl = ref([]);
// const name = ref([]);
const allUrl = ref([]);
const props = defineProps({
  dataUrl: {
    type: String,
  },
});
const searchImg = () => {
  httpinistance({
    url: props.dataUrl,
    method: "get",
  }).then((response) => {
    let res = JSON.parse(JSON.stringify(response));
    if (res.status === 200) {
      let data = res.data;
      fensshow.value = Array.isArray(data) && data.length > 0;
      allUrl.value = data;
      allUrl.value = [...allUrl.value].reverse();
    }
  });
};
//取昵称前9位剩余省略号
const getname = (item) => {
  let name = item.login;
  return name.length <= 11 ? name : name.slice(0, 11) + "..";
};
onMounted(() => {
  searchImg();
});
</script>

<style scoped lang="less">
.icon {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  .a {
    width: 70px;
    // border: 1px solid red;
    margin-left: 17px;
    margin-top: 6px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 7px;
      // background-color: skyblue;
    }
    p {
      width: 100%;
      font-size: 0.7rem;
      color: rgb(11, 169, 232);
      text-align: center;
      //   border: 1px solid red;
      margin-top: -1px;
    }
  }
}
.langeNull {
  margin: auto;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>