<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch } from 'vue'
import { useColorMode } from '#imports'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const colorMode = useColorMode()
const lineData = ref<ChartData<'line'>>()
const lineOptions = ref<ChartOptions<'line'>>()

const updateChartTheme = (isDark: boolean) => {
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
  const tickColor = isDark ? '#e2e8f0' : '#1e293b'
  const tooltipBg = isDark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)'
  const tooltipText = isDark ? '#f8fafc' : '#111'
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'

  lineData.value = {
    labels: ['⚙️ Systems', '🔄 Conversion', '🤝 Team', '🔍 Insights', '🚀 Scaling'],
    datasets: [
      {
        label: 'Before Right Brain',
        data: [4.2, 3.0, 4.6, 3.2, 3.5],
        fill: false,
        borderColor: isDark ? 'rgba(255, 85, 85, 0.5)' : 'rgba(255, 85, 85, 0.4)',
        backgroundColor: isDark ? 'rgba(255, 85, 85, 0.5)' : 'rgba(255, 85, 85, 0.4)',
        tension: 0.4
      },
      {
        label: 'After Right Brain',
        data: [8.0, 5.7, 7.1, 6.6, 8.5],
        fill: false,
        borderColor: isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.4)',
        backgroundColor: isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.4)',
        tension: 0.4
      }
    ]
  }

  lineOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor,
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}/10`
        }
      },
      legend: {
          labels: {
            color: tickColor,
            usePointStyle: true,
            pointStyle: 'rect',
            borderRadius: 0,
            boxWidth: 8,
            boxHeight: 8,
          }
      }
    },
    scales: {
      x: {
        ticks: {
          color: tickColor
        },
        grid: {
          color: gridColor
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: tickColor,
          stepSize: 2
        },
        grid: {
          color: gridColor
        }
      }
    }
  }
}

onBeforeMount(() => {
  updateChartTheme(colorMode.value === 'dark')
})

onMounted(() => {
  updateChartTheme(colorMode.value === 'dark')
})

watch(() => colorMode.value, (val) => {
  updateChartTheme(val === 'dark')
})
</script>

<template>
  <div class="chart-line-wrapper lgt-neo">
    <client-only>
      <Line v-if="lineData && lineOptions" :data="lineData" :options="lineOptions" />
    </client-only>
  </div>
</template>
