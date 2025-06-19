<template>
  <ul class="bgchange">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script setup>
</script>

<style scoped lang='less'>
.bgchange {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0086b3;
  z-index: 0;
  //设置动画
  li {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 0;
    -webkit-backface-visibility: hidden;
    animation: bganimation 48s linear infinite 0s;
    //三张图片第四章进行轮回播放
    &:nth-child(1) {
      background-image: url(../../assets/images/bg-1.jpg);
    }
    &:nth-child(2) {
      background-image: url(../../assets/images/bg-2.jpg);
      animation-delay: 12s;
    }
    &:nth-child(3) {
      background-image: url(../../assets/images/bg-3.jpg);
      animation-delay: 24s;
    }
    &:nth-child(4) {
      background-image: url(../../assets/images/bg-1.jpg);
      animation-delay: 36s;
    }
  }
}
//设置关键帧
@keyframes bganimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }
  8% {
    opacity: 1;
    transform: scale(1.15);
    animation-timing-function: ease-out;
  }
  17% {
    opacity: 1;
    transform: scale(1.2);
  }
  25% {
    opacity: 0;
    transform: scale(1.4);
  }
  100% {
    opacity: 0;
  }
}
</style>