<template>
  <table border="1" v-if="biaosshow">
    <thead>
      <tr>
        <th>操作时间</th>
        <th>类型</th>
        <th>操作仓库</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in eventList" :key="item.id">
        <td>{{ item.created_at.slice(0, 10) }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.repo.name }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <div class="langeNull" v-if="!biaosshow">
    <img src="../../../../../assets/图标/空数据_数据为空.png" alt="" />
  </div>
</template>

<script setup>
import httpinistance from "../../../../../utils/https.js";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const eventList = ref([]);
const route = useRoute();
const biaosshow = ref(true);
const EventList = () => {
  httpinistance({
    url: `https://api.github.com/users/${route.params.user}/events`,
    method: "get",
  }).then((response) => {
    let res = JSON.parse(JSON.stringify(response));
    if (res.status === 200) {
      let data = res.data;
      biaosshow.value = Array.isArray(data) && data.length > 0;
      eventList.value = data;
    }
  });
};
onMounted(() => {
  EventList();
});
</script>

<style scoped lang='less'>
table {
  margin: 0 auto;
  margin-top: 5px;
  border-color: rgb(79, 185, 226);
  font-size: 0;
  th,
  td {
    color: #fff;
    text-align: center;
    padding: 10px 40px;
  }
  td {
    box-sizing: border-box;
    font-size: 1rem;
    color: rgb(23, 164, 219);
  }
  th {
    // max-width: 150px;
    font-size: 1.1rem;
    background-color: rgb(5, 58, 152);
  }
  tbody tr:nth-child(odd) td {
    color: rgb(25, 212, 174) !important;
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