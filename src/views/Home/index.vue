<template>
  <div class="content">
    <!-- <particles /> -->
    <bg />
    <div class="language" @click="changeLang">
      <span>{{ language }}</span>
      <ul v-if="lanShow" @click="qh">
        <li>中文</li>
        <li>English</li>
      </ul>
    </div>
    <div class="search">
      <div class="leftsearch">
        <div class="title">输入Github昵称</div>
        <p>
          一个用Vue构建的Github可视化大数据平台。通过它您可以更加直观看到您在Github里的一些数据情况
        </p>
        <div class="userinput">
          <input
            type="text"
            placeholder="输入自己的账号名称"
            ref="text"
            @focus="sshow"
          /><button @click="search">生成</button>
          <div class="isnull" v-if="iserror">{{ nullerror }}</div>
          <div class="isnull" v-if="iserror1">{{ nullerror1 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import httpinistance from "../../utils/https.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const route = useRouter();
const text = ref(null);
//判断是否显示语言选择
const lanShow = ref(false);
//记录选择的语言
const language = ref("中文");
//记录用户输入,可优化
const userInput = ref();
//警告输入为空
const iserror = ref(false);
const iserror1 = ref(false);
//警告内容
const nullerror = ref("输入不能为空");
const nullerror1 = ref("用户不存在或网络问题");
//点击输入框警告隐藏
const sshow = () => {
  iserror.value = false;
  iserror1.value = false;
};
//点击生成按钮修改userInput值
const search = () => {
  //路由跳转到数据页
  userInput.value = text.value.value;
  if (userInput.value) {
    httpinistance({
      url: `/users/${userInput.value}`,
      method: "get",
    })
      .then((response) => {
        let res = JSON.parse(JSON.stringify(response));
        if (res.status === 200) {
          route.push({
            name: "searchuser",
            params: {
              user: userInput.value,
            },
          });
        }
      })
      .catch((error) => {
        iserror1.value = true;
      });
  } else {
    iserror.value = true;
  }
};
//是否显示下拉框
const changeLang = () => {
  lanShow.value = lanShow.value === true ? false : true;
};
//点击切换语言，但我没写英文版哈哈哈哈
const qh = (e) => {
  language.value = e.target.innerText;
};
</script>

<style scoped lang='less'>
.content {
  position: relative;
  width: 100%;
  .language {
    position: absolute;
    top: 30px;
    right: 55px;
    width: 70px;
    height: 50px;
    span {
      cursor: pointer;
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      border: 1px solid #0086b3;
      text-align: center;
      line-height: 50px;
      font-size: 15px;
      color: #fff;
      //选择语言后面三角
      // &:after {
      //   content: "▽";
      // }
    }
    ul {
      text-align: center;
      border: 1px solid #0086b3;
      border-radius: 5px;
      color: #fff;
      position: absolute;
      top: 53px;
      left: 3px;
      cursor: pointer;
      li {
        font-size: 15px;
        padding: 5px;
        border-bottom: 1px solid #0086b3;
        &:hover {
          border-radius: 5px;
          background-color: #6097a2;
        }
      }
    }
  }
  .search {
    position: absolute;
    top: 200px;
    width: 100%;
    height: 500px;
    .leftsearch {
      float: right;
      width: 50%;
      height: 100%;
      p {
        margin-top: 15px;
        color: #fff;
        font-size: 20px;
      }
      .title {
        margin-top: 80px;
        color: #fff;
        font-size: 40px;
      }
      .userinput {
        margin-top: 15px;
        // font-size: 0;
        // border: 1px solid red;
        input {
          height: 50px;
          color: #ffffff;
          border-radius: 0.5rem;
          background-color: transparent;
          border: 1px solid #ffffff;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-right: 13rem;
          padding-left: 1rem;
          font-size: 1rem;
          font-weight: 300;
          overflow: hidden;
          //强制文本不换行
          white-space: nowrap;
          //用省略号表示被裁剪掉的文字
          text-overflow: ellipsis;
          &:focus {
            box-shadow: 0 0 5px 1px skyblue;
          }
          //不用考虑padding和border，让布局更简单、可靠
          box-sizing: border-box;
          outline: 0;
          &::-webkit-input-placeholder {
            color: #ffffff;
            font-size: 1rem;
          }
        }
        button {
          position: absolute;
          border: none;
          color: #fff;
          height: 50px;
          margin-left: 5px;
          background-color: #006699;
          border-radius: 0.5rem;
          padding: 0rem 1.6rem;
          font-weight: 300;
          font-size: 1.5rem;
          cursor: pointer;
          &:hover {
            background-color: rgb(21, 48, 85);
          }
        }
        .isnull {
          text-align: center;
          color: rgb(255, 0, 0);
          font-size: 15px;
          z-index: 1000;
          width: 150px;
          border-radius: 5px;
          // background-color: #ffffff;
          margin-left: -13px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
