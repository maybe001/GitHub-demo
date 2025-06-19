<template>
  <!-- 动态类方便再border组件里面套border且不要任何边框样式和阴影 -->
  <div class="data-box" :class="{ 'no-corners': noCorners, allno: noCorners }">
    <!--左上边框-->
    <div class="line-box">
      <i class="t-l-line"></i>
      <i class="l-t-line"></i>
    </div>
    <!--右上边框-->
    <div class="line-box">
      <i class="t-r-line"></i>
      <i class="r-t-line"></i>
    </div>
    <!--左下边框-->
    <div class="line-box">
      <i class="l-b-line"></i>
      <i class="b-l-line"></i>
    </div>
    <!--右下边框-->
    <div class="line-box">
      <i class="r-b-line"></i>
      <i class="b-r-line"></i>
    </div>
    <!-- 头部标题 -->
    <div class="in-title" v-if="title">{{ title }}</div>
    <!-- 插入内容 -->
    <div class="chart">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
  border: {
    type: Boolean,
    default: true,
  },
  noCorners: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="less">
.allno {
  // 边框消除
  border: 0 !important;
  //阴影消除
  box-shadow: none !important;
}
.no-corners .line-box i {
  // 四个角消除
  display: none !important;
}
.data-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #2c58a6;
  position: relative;
  box-shadow: 0 0 10px #2c58a6;
  &.noborder {
    border: none;
    box-shadow: none;
  }

  .line-box {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;

    i {
      background-color: #4788fb;
      box-shadow: 0px 0px 10px #4788fb;
      position: absolute;

      &.l-t-line {
        width: 5px;
        height: 24px;
        left: -3px;
        top: -3px;
      }

      &.t-l-line {
        height: 5px;
        width: 26px;
        left: -3px;
        top: -3px;
      }

      &.t-r-line {
        height: 5px;
        width: 26px;
        right: -3px;
        top: -3px;
      }

      &.r-t-line {
        width: 5px;
        height: 24px;
        right: -3px;
        top: -3px;
      }

      &.l-b-line {
        width: 5px;
        height: 24px;
        left: -3px;
        bottom: -3px;
      }

      &.b-l-line {
        height: 5px;
        width: 26px;
        left: -3px;
        bottom: -3px;
      }

      &.r-b-line {
        width: 5px;
        height: 24px;
        right: -3px;
        bottom: -3px;
      }

      &.b-r-line {
        height: 5px;
        width: 26px;
        right: -3px;
        bottom: -3px;
      }
    }
  }

  .main-title {
    width: 180px;
    height: 35px;
    line-height: 33px;
    background-color: #2c58a6;
    border-radius: 18px;
    position: absolute;
    text-align: center;
    top: -17px;
    left: 50%;
    margin-left: -90px;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    box-sizing: border-box;
    z-index: 1000;

    i {
      color: fff;
    }
  }

  .in-title {
    width: 100%;
    height: 40px;
    color: #61d2f7;
    padding: 10px 10px 10px 20px;
    font-weight: bold;
    font-size: 1.3rem;
    margin-top: 10px;
    z-index: 1000;
  }

  .chart {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    z-index: 1;
  }
}
</style>