<template>
  <div class="news">
    <div class="new" v-for="(item, index) in newList" :key="index">
      <img src="../../../../../assets/图标/tx-fill-菱形.png" alt="" />
      <img src="../../../../../assets/图标/小喇叭.png" alt="" class="laba" />
      <p>
        {{ index + 1 }}、{{ item.created_at.slice(0, 9) }}
        {{ item.actor.login }}给了你一个操作
        {{ item.payload.action }}
      </p>
    </div>
  </div>
  <div class="langeNull" v-if="!newssshow">
    <img src="../../../../../assets/图标/空数据_数据为空.png" alt="" />
  </div>
</template>

<script setup>
// https://api.github.com/users/HongqingCao/received_events
import httpinistance from "../../../../../utils/https";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const newssshow = ref(true);
const route = useRoute();
const newList = ref([]);
const NewtList = () => {
  httpinistance({
    url: `https://api.github.com/users/${route.params.user}/events`,
    method: "get",
  }).then((response) => {
    let res = JSON.parse(JSON.stringify(response));
    if (res.status === 200) {
      let data = res.data;
      newssshow.value = Array.isArray(data) && data.length > 0;
      newList.value = data;
    }
  });
};
onMounted(() => {
  NewtList();
});
</script>

<style scoped lang='less'>
.news {
  margin: 0 auto;
  margin-top: 5px;
  // border: 1px solid red;
  width: 95%;
  height: 97%;
  overflow: hidden;
  .new {
    position: relative;
    width: 90%;
    height: 25px;
    margin: 0 auto;
    margin-top: 5px;
    background-color: rgba(53, 59, 78, 0.5);
    border-radius: 7px;
    img {
      position: absolute;
      padding-top: 3px;
      //   border: 1px solid red;
      width: 25px;
      height: 25px;
      &.laba {
        left: 25px;
      }
    }
    p {
      line-height: 25px;
      height: 100%;
      color: #fff;
      position: absolute;
      left: 50px;
      padding-left: 5px;
      height: 100%;
      width: 84%;
      font-size: 0.8rem;
      // border: 1px solid red;
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