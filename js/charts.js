import { Chart } from '@/components/ui/chart';
// Funções para criar gráficos de estatísticas
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar gráficos quando a página estiver carregada
  initCharts();
});

function initCharts() {
  // Gráfico de estatísticas de reciclagem para empresa
  createRecyclingStatsChart();

  // Gráfico de estatísticas de coleta para instituição
  createCollectionStatsChart();
}

function createRecyclingStatsChart() {
  const chartContainer = document.querySelector('#empresa-home .stats-chart');
  if (!chartContainer) return;

  // Limpar conteúdo existente
  chartContainer.innerHTML = '';

  // Criar elemento canvas para o gráfico
  const canvas = document.createElement('canvas');
  canvas.id = 'recycling-stats-chart';
  chartContainer.appendChild(canvas);

  // Dados para o gráfico
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Papel (kg)',
        data: [120, 150, 180, 140, 200, 250],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Plástico (kg)',
        data: [85, 100, 120, 110, 130, 150],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Metal (kg)',
        data: [60, 80, 70, 90, 100, 110],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Eletrônicos (kg)',
        data: [30, 40, 35, 45, 50, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantidade (kg)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Mês',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Quantidade de Resíduos Reciclados por Mês',
        font: {
          size: 16,
        },
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  // Criar o gráfico
  new Chart(canvas, {
    type: 'bar',
    data: data,
    options: options,
  });
}

function createCollectionStatsChart() {
  const chartContainer = document.querySelector(
    '#instituicao-home .stats-chart',
  );
  if (!chartContainer) return;

  // Limpar conteúdo existente
  chartContainer.innerHTML = '';

  // Criar elemento canvas para o gráfico
  const canvas = document.createElement('canvas');
  canvas.id = 'collection-stats-chart';
  chartContainer.appendChild(canvas);

  // Dados para o gráfico
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Coletas Realizadas',
        data: [5, 8, 12, 10, 15, 18],
        backgroundColor: 'rgba(46, 204, 113, 0.5)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Total Coletado (kg)',
        data: [150, 240, 360, 300, 450, 540],
        backgroundColor: 'rgba(52, 152, 219, 0.5)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        type: 'line',
        yAxisID: 'y1',
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Coletas',
        },
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Quantidade (kg)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Mês',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Estatísticas de Coleta por Mês',
        font: {
          size: 16,
        },
      },
      legend: {
        position: 'bottom',
      },
    },
  };

  // Criar o gráfico
  new Chart(canvas, {
    type: 'bar',
    data: data,
    options: options,
  });
}
