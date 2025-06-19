<template>
  <div class="big">
    <div class="top">
      <border>
        <!-- 新增粉丝 -->
        <border class="border" :title="title1" :no-corners="true"
          ><Newfens :dataUrl="URL1" />
        </border>
        <!-- 最近跟随 -->
        <border class="border" :title="title3" :no-corners="true">
          <Newfens :dataUrl="URL2" />
        </border>
      </border>
    </div>
    <!-- 最新消息 -->
    <div class="bottom">
      <border :title="title2">
        <News />
      </border>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Newfens from "./component/newfens.vue";
import News from "./component/news.vue";
import { ref } from "vue";
const route = useRoute();
const title1 = ref("新增粉丝");
const title2 = ref("最新消息");
const title3 = ref("最近跟随");
const URL1 = ref(`https://api.github.com/users/${route.params.user}/followers`);
const URL2 = ref(`https://api.github.com/users/${route.params.user}/following`);
defineProps({
  starts: {
    type: Object,
  },
});
</script>
<style scoped lang="less">
.big {
  width: 100%;
  height: 100%;
  .top {
    width: 95%;
    height: 58%;
    .border {
      width: 100%;
      height: 50%;
      overflow: hidden;
    }
  }
  .bottom {
    overflow: hidden;
    margin-top: 15px;
    width: 95%;
    height: 39%;
  }
}
</style>