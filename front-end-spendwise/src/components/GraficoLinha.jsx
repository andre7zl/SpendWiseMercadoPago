import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const GraficoLinha = () => {
  const [gastosPorMes, setGastosPorMes] = useState(new Array(12).fill(0));
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  async function pegarDatasCriacao() {
    try {
      const res = await fetch("http://localhost:8000/gastos");
      const data = await res.json();

      const meses = new Array(12).fill(0);

      data.forEach((g) => {
        if (g.categoria_id === null || g.categoria_id === "null") {
          return;
        } else {
          const dataCriacao = new Date(g.data_criacao);
          const mes = dataCriacao.getMonth();
          meses[mes] += g.valor;
        }
      });

      setGastosPorMes(meses);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  useEffect(() => {
    pegarDatasCriacao();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Total de Gastos por Mês",
            data: gastosPorMes,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }, [gastosPorMes]);

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoLinha;
