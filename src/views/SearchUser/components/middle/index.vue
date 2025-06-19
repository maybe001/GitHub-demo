<template>
  <div class="big">
    <div class="top">
      <!-- 公开仓库 -->
      <div class="left">
        <div class="img">
          <img src="../../../../assets/图标/物资仓库.png" alt="" />
        </div>
        <div class="pp"><p>公开仓库数</p></div>
        <div class="spann">
          <span>{{ pesonStore.storeNum }}</span>
        </div>
      </div>
      <div class="right">
        <!-- 粉丝 -->
        <div class="fens">
          <div class="img">
            <img src="../../../../assets/图标/粉丝.png" alt="" />
          </div>
          <div class="pp"><p>粉丝</p></div>
          <div class="spann">
            <span>{{ pesonStore.followers }}</span>
          </div>
        </div>
        <!-- 跟随 -->
        <div class="follow">
          <div class="img">
            <img src="../../../../assets/图标/累计跟随.png" alt="" />
          </div>
          <div class="pp"><p>跟随</p></div>
          <div class="spann">
            <span>{{ pesonStore.following }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 柱状图数据 -->
    <div class="middle">
      <border class="kuang" :title="title1" :no-corners="true">
        <Zhu />
      </border>
    </div>
    <!-- 操作记录表格 -->
    <div class="bottom">
      <border :title="title">
        <Biao />
      </border>
    </div>
  </div>
</template>

<script setup>
import Zhu from "./component/zhu.vue";
import Biao from "./component/biao.vue";
import { ref } from "vue";
const title = ref("最近操作仓库");
const title1 = ref("仓库数据");
defineProps({
  pesonStore: {
    type: Object,
  },
});
</script>

<style scoped lang="less">
.big {
  width: 100%;
  height: 100%;
  .top {
    margin: 0 auto;
    width: 95%;
    height: 20%;
    .left {
      display: inline-block;
      position: relative;
      width: 40%;
      height: 90%;
      background-color: rgb(21, 48, 85);
      .img {
        display: inline-block;
        width: 70px;
        height: 70px;
        border: 2px solid #f4ea2a;
        border-radius: 50%;
        padding: 3px;
        margin-top: 35px;
        margin-left: 35px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .pp {
        color: #fff;
        font-size: 20px;
        margin-top: -85px;
        margin-left: 120px;
      }
      .spann {
        width: 50px;
        text-align: center;
        font-size: 2.5rem;
        font-weight: 900;
        color: #f4ea2a;
        margin-left: 130px;
        margin-top: 15px;
      }
    }
    .right {
      display: inline-block;
      position: relative;
      margin-left: 20px;
      width: 57%;
      height: 90%;
      background-color: rgb(21, 48, 85);
      .fens {
        display: inline-block;
        .img {
          display: inline-block;
          width: 70px;
          height: 70px;
          border: 2px solid #1296db;
          border-radius: 50%;
          padding: 10px;
          margin-top: 35px;
          margin-left: 35px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .pp {
          width: 110px;
          color: #fff;
          font-size: 20px;
          margin-top: -85px;
          margin-left: 135px;
        }
        .spann {
          width: 50px;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          color: #1296db;
          margin-left: 130px;
          margin-top: 15px;
        }
      }
      .follow {
        display: inline-block;
        margin-left: 10px;
        .img {
          display: inline-block;
          width: 70px;
          height: 70px;
          border: 2px solid #d81e06;
          border-radius: 50%;
          padding: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .pp {
          color: #fff;
          font-size: 20px;
          margin-top: -85px;
          margin-left: 100px;
        }
        .spann {
          width: 50px;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          color: #d81e06;
          margin-left: 100px;
          margin-top: 15px;
        }
      }
    }
  }
  .middle {
    margin: 0 auto;
    width: 95%;
    height: 42.6%;
    .kuang {
      width: 100%;
      height: 100%;
    }
  }
  .bottom {
    overflow: hidden;
    margin: 0 auto;
    width: 95%;
    height: 35%;
  }
}
</style>