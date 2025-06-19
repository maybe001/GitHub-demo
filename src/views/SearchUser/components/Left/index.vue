<template>
  <div class="big">
    <border>
      <div class="picture">
        <div class="img"><img :src="`${person.personImg}`" alt="" /></div>
        <div class="pp">
          <p>{{ person.personName }}</p>
        </div>
        <div class="time">{{ person.pesonTime }}</div>
        <div class="iii">加入GitHub</div>
      </div>
      <border class="store" :title="title1" :no-corners="true">
        <Store :bingUrl="URL1" />
      </border>
      <border class="lange" :title="title2" :border="border" :no-corners="true">
        <Store :bingUrl="URL2" />
      </border>
    </border>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Store from "./Tuxing/bing1.vue";
import httpinistance from "../../../../utils//https.js";
const route = useRoute();
const title1 = ref("仓库starts详细");
const title2 = ref("仓库语言分类");
const URL1 = ref([]);
const URL2 = ref([]);
const bing2 = ref(true);
const bing1 = ref(true);
defineProps({
  person: {
    type: Object,
  },
});
//处理饼状图数据
const oneBing = () => {
  httpinistance({
    url: `https://api.github.com/users/${route.params.user}/repos`,
    method: "get",
  })
    .then((response) => {
      let res = JSON.parse(JSON.stringify(response));
      if (res.status === 200) {
        let data = res.data;
        console.log("原始数据:", data);

        //处理仓库数据
        let ArryA = data
          .map(({ name, size }) => ({
            name: name || "未命名",
            value: parseInt(size) || 0,
          }))
          .filter((item) => item.value > 0); // 过滤掉值为0的项目

        URL1.value = ArryA;
        console.log("仓库数据:", URL1.value);

        // 处理：语言分类 + 合并重复语言 + 过滤 null
        let langMap = {};

        data.forEach(({ language, size }) => {
          if (!language) return; // 跳过没有语言的
          const sizeValue = parseInt(size) || 0;
          if (sizeValue <= 0) return; // 跳过size为0的项目

          if (!langMap[language]) {
            langMap[language] = 0;
          }
          langMap[language] += sizeValue;
        });

        const ArryB = Object.entries(langMap)
          .filter(([language, size]) => size > 0) // 过滤掉总size为0的语言
          .map(([language, size]) => ({
            name: language,
            value: size,
          }));

        URL2.value = ArryB;
        console.log("语言数据:", URL2.value);

        // 更新显示状态
        bing1.value = URL1.value.length > 0;
        bing2.value = URL2.value.length > 0;

        console.log("bing1状态:", bing1.value, "bing2状态:", bing2.value);
      }
    })
    .catch((error) => {
      console.error("获取仓库数据失败:", error);
      URL1.value = [];
      URL2.value = [];
      bing1.value = false;
      bing2.value = false;
    });
};
//
onMounted(() => {
  oneBing();
});
</script>

<style scoped lang="less">
.big {
  width: 99%;
  height: 99%;
  .picture {
    position: relative;
    width: 100%;
    height: 20%;
    .img {
      position: absolute;
      margin-left: 30px;
      margin-top: 25px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: skyblue;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .pp {
      color: skyblue;
      font-weight: 700;
      font-size: 1.7rem;
      position: absolute;
      width: 200px;
      margin-left: 150px;
      margin-top: 35px;
    }
    .time {
      font-size: 1.5rem;
      font-weight: 700;
      position: absolute;
      color: #cdd621;
      margin-top: 70px;
      margin-left: 150px;
    }
    .iii {
      font-size: 0.7rem;
      color: #fff;
      position: absolute;
      margin-top: 105px;
      margin-left: 150px;
    }
  }
  .store {
    width: 100%;
    height: 40%;
  }
  .lange {
    position: relative;
    width: 100%;
    height: 50%;
  }
}
</style>