<template>
  <div class="big-bg">
    <div class="title">
      <div class="back" @click="$router.push('/')">
        <img src="../../assets/图标/back.png" alt="" />
      </div>
      <div class="title">
        <img src="../../assets/images/title.png" alt="" />
        <div>GitHub数据可视化</div>
      </div>
    </div>
    <div class="contentb">
      <div class="content">
        <!-- 左侧个人信息，仓库详细，仓库语言分类 -->
        <div class="left">
          <Suspense>
            <template #default>
              <Left :useName="useName" :person="person" />
            </template>
            <template #fallback>
              <div class="loading">加载中...</div>
            </template>
          </Suspense>
        </div>
        <!-- 公开仓库数，粉丝数，跟随数，仓库数据，最近操作详细 -->
        <div class="hiddle">
          <Suspense>
            <template #default>
              <middle :pesonStore="pesonStore" />
            </template>
            <template #fallback>
              <div class="loading">加载中...</div>
            </template>
          </Suspense>
        </div>
        <!-- 新增粉丝，最近跟随，最新消息 -->
        <div class="right">
          <Suspense>
            <template #default>
              <right :starts="starts" />
            </template>
            <template #fallback>
              <div class="loading">加载中...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import httpinistance from "../../utils/https.js";

// 懒加载组件
const Left = defineAsyncComponent(() => import("./components/Left/index.vue"));
const middle = defineAsyncComponent(() =>
  import("./components/middle/index.vue")
);
const right = defineAsyncComponent(() =>
  import("./components/right/index.vue")
);

const route = useRoute();
//用户昵称
const useName = ref();
//头像，创建时间
const person = ref({});
//公开仓库数，粉丝数，跟随数，仓库数据，最近操作详细
const pesonStore = ref({});
//新增粉丝，最近跟随，最新消息
const starts = ref({});
//处理信息
const search = () => {
  httpinistance({
    url: `/users/${useName.value}`,
    method: "get",
  })
    .then((response) => {
      let res = JSON.parse(JSON.stringify(response));
      if (res.status === 200) {
        let data = res.data;
        //收集头像，创建时间
        let personImg = data.avatar_url;
        let pesonTime = data.created_at.substring(0, 10);
        let ObjP = {
          personName: useName.value,
          personImg: personImg,
          pesonTime: pesonTime,
        };
        person.value = ObjP;
        //收集公开仓库数，粉丝数，跟随数，仓库数据，最近操作详细
        let storeNum = data.public_repos;
        let followers = data.followers;
        let following = data.following;
        let ObjS = {
          storeNum: storeNum,
          followers: followers,
          following: following,
        };
        pesonStore.value = ObjS;
        //收集新增粉丝，最近跟随，最新消息
        // let
        route.push({
          name: "searchuser",
          params: {
            user: useName.value,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
onMounted(() => {
  useName.value = route.params.user;
  search();
});
</script>

<style scoped lang='less'>
.big-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/true.png);
  .title {
    position: relative;
    .back {
      position: absolute;
      z-index: 100;
      margin-top: 5px;
      margin-left: 5px;
      width: 40px;
      height: 40px;
      background-color: #2c58a6;
      border-radius: 3px;
      img {
        width: 40px;
        height: 40px;
        &:hover {
          cursor: pointer;
        }
      }
      &:hover {
        background-color: rgb(21, 48, 85);
      }
    }
    .title {
      position: absolute;
      width: 100%;
      height: 80px;
      // background-color: pink;
      img {
        z-index: 100;
        width: 100%;
        height: 100%;
      }
      div {
        color: #fff;
        font-size: 2.5rem;
        font-weight: 600;
        line-height: 80px;
        text-align: center;
        margin-top: -85px;
        z-index: 0;
        height: 100%;
        // background-color: #fff;
      }
    }
  }
  .contentb {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .content {
      position: relative;
      margin-top: 150px;
      width: 98%;
      height: 750px;
      // background-color: pink;
      .left {
        display: flex;
        justify-content: center;

        float: left;
        width: 25%;
        height: 100%;
        // background-color: #fff;
      }
      .hiddle {
        float: left;
        width: 50%;
        height: 100%;
        // background-color: skyblue;
      }
      .right {
        float: right;
        width: 25%;
        height: 100%;
        // background-color: #fff;
      }
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #fff;
        font-size: 18px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
      }
    }
  }
}
</style>