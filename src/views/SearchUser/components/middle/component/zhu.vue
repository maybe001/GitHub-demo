<template>
  <div ref="heng" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import httpinistance from "../../../../../utils/https.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const heng = ref(null);
let Storeata = ref([]);
let sizeArray = ref([]);
let nameArray = ref([]);
let chartInstance = ref(null);

const renderChart = async () => {
  const echarts = await import("echarts");
  if (!heng.value) return;
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  chartInstance.value = echarts.init(heng.value);

  // 添加空数据兜底配置
  const defaultOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        snap: true,
      },
    },
    grid: {
      left: "10px",
      right: "0",
      bottom: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: "#ffff",
      },
    },
    yAxis: {
      type: "category",
      data: nameArray.value,
      axisLabel: {
        color: "#ffff",
      },
    },
    series: [
      {
        name: "size",
        type: "bar",
        data: sizeArray.value,
        itemStyle: {
          color: "rgb(25, 212, 174)",
        },
      },
    ],
  };

  // 如果有数据，显示正常图表；否则显示空数据提示
  if (sizeArray.value?.length && nameArray.value?.length) {
    chartInstance.value.setOption(defaultOption);
  } else {
    // 空数据时的配置
    const emptyOption = {
      ...defaultOption,
      graphic: {
        type: "text",
        left: "center",
        top: "middle",
        style: {
          text: "暂无数据",
          fill: "#fff",
          fontSize: 16,
        },
      },
    };
    chartInstance.value.setOption(emptyOption);
  }

  window.addEventListener("resize", () => {
    chartInstance.value && chartInstance.value.resize();
  });
};

const storeData = () => {
  httpinistance({
    url: `https://api.github.com/users/${route.params.user}/repos`,
    method: "get",
  })
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;

        //更新数据
        Storeata.value = data;
        // 确保size是有效的数字
        sizeArray.value = data.map((item) => {
          const size = parseInt(item.size) || 0;
          return isNaN(size) ? 0 : size;
        });
        nameArray.value = data.map((item) => item.name || "未命名");

        //渲染图表（数据准备好后再执行）
        renderChart();
      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
      sizeArray.value = [0]; // 防止空数组
      nameArray.value = ["暂无数据"];
      renderChart();
    });
};

onMounted(() => {
  storeData();
});
</script>

<style scoped>
</style>
