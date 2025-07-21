<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useColorMode } from '#imports'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions
} from 'chart.js'

// Register only necessary parts
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const barData = ref({
  labels: ['Leads', 'Conversion', 'Efficiency', 'Revenue'],
  datasets: [
    {
      label: 'Before Right Brain',
      data: [40, 15, 50, 30],
      backgroundColor: 'rgba(255, 85, 85, 0.4)',
      borderWidth: 0
    },
    {
      label: 'After Right Brain',
      data: [85, 45, 85, 75],
      backgroundColor: 'rgba(40, 167, 69, 0.4)',
      borderWidth: 0
    }
  ]
})

const colorMode = useColorMode()
const barOptions = ref<ChartOptions<'bar'>>()

const setBarOptions = (isDark: boolean) => {
  ChartJS.defaults.datasets.bar.borderRadius = 0
  ChartJS.defaults.datasets.bar.borderSkipped = false

  ChartJS.defaults.datasets.bar.borderSkipped = false

if (barData.value?.datasets?.[0]) {
  barData.value.datasets[0].backgroundColor = isDark
    ? 'rgba(255, 85, 85, 0.5)'
    : 'rgba(255, 85, 85, 0.4)';
}

if (barData.value?.datasets?.[1]) {
  barData.value.datasets[1].backgroundColor = isDark
    ? 'rgba(40, 200, 90, 0.5)'
    : 'rgba(40, 167, 69, 0.4)';
}

  barOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: isDark ? 'rgba(30,30,30,0.95)' : 'rgba(245, 245, 245, 0.95)',
        titleColor: isDark ? '#f1f5f9' : '#111',
        bodyColor: isDark ? '#e2e8f0' : '#111',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}/10`
        }
      },
      legend: {
        labels: {
          color: isDark ? '#e2e8f0' : '#111',
          boxWidth: 8,
          boxHeight: 8
        }
      }
    },
    scales: {
      x: {
        ticks: {
          callback: function (val, index) {
            const labels = ['📈 Leads', '🔄 Conversion', '🤝 Efficiency', '💰 Revenue']
            return labels[index] || val
          },
          font: {
            weight: 'bold',
            size: 14
          },
          color: isDark ? '#e2e8f0' : '#444'
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Performance Metrics (%)',
          color: isDark ? '#e2e8f0' : '#111'
        },
        max: 100,
        ticks: {
          color: isDark ? '#e2e8f0' : '#333'
        },
        grid: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  }
}

onMounted(() => {
  setBarOptions(colorMode.value === 'dark')
})

watch(() => colorMode.value, (val) => {
  setBarOptions(val === 'dark')
})
</script>

<template>
  <div class="chart-line-wrapper lgt-neo">
    <client-only>
      <Bar :key="JSON.stringify(barOptions)"  :data="barData" :options="barOptions" />
    </client-only>
  </div>
</template>
