<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import httpinistance from "../../../../../utils/https.js";
const chartRef = ref(null);
const ifShow = ref(true);
const chartInstance = ref(null);
const loading = ref(true);
const props = defineProps({
  bingUrl: {
    type: Array,
    default: () => [],
  },
});

const renderChart = async (data) => {
  const echarts = await import("echarts");
  if (!chartRef.value) return;
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  chartInstance.value = echarts.init(chartRef.value);

  // 验证数据格式
  const validData = Array.isArray(data)
    ? data.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          item.name &&
          (typeof item.value === "number" || typeof item.value === "string")
      )
    : [];

  ifShow.value = validData.length > 7 ? false : true;

  if (validData.length > 0) {
    // 有数据时显示饼图
    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {d}%",
      },
      legend: {
        orient: "horizontal",
        top: "top",
        textStyle: {
          color: "#fff",
        },
        show: ifShow.value,
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          label: {
            show: true,
            color: "#fff",
          },
          color: [
            "#1f77b4",
            "#5dade2",
            "#2980b9",
            "#85c1e9",
            "#2e86c1",
            "#aed6f1",
            "#34495e",
            "#48c9b0",
          ],
          data: validData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    chartInstance.value.setOption(option);
  } else {
    // 无数据时显示提示
    const emptyOption = {
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
  loading.value = false;
};

onMounted(() => {
  renderChart(props.bingUrl || []);
});

watch(
  () => props.bingUrl,
  (newData) => {
    renderChart(newData || []);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
</style>
