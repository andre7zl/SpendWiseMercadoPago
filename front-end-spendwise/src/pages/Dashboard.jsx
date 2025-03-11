import { useEffect } from "react";
import Chart from "chart.js/auto";
import GraficoBarras from "../components/GraficoLinha";

const Dashboard = () => {
  const URL_GASTOS = "http://127.0.0.1:8000/gastos";
  const URL_CATEGORIAS = "http://127.0.0.1:8000/categorias";

  useEffect(() => {
    async function chamarApi() {
      try {
        const [resGastos, resCategorias] = await Promise.all([
          fetch(URL_GASTOS),
          fetch(URL_CATEGORIAS),
        ]);

        if (!resGastos.ok || !resCategorias.ok) {
          throw new Error(
            `Erro ao chamar API: ${resGastos.status}, ${resCategorias.status}`
          );
        }

        const gastos = await resGastos.json();
        const categorias = await resCategorias.json();

        const somaGastos = categorias.map((categoria) => ({
          nome: categoria.nome,
          total: gastos
            .filter((gasto) => gasto.categoria_id === categoria.id)
            .reduce((acc, gasto) => acc + gasto.valor, 0),
        }));

        desenharGrafico(somaGastos);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

    function desenharGrafico(dados) {
      const ctx = document.getElementById("graficoRosca");
      if (ctx) {
        if (Chart.getChart(ctx)) {
          Chart.getChart(ctx).destroy();
        }

        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: dados.map((d) => d.nome),
            datasets: [
              {
                label: "Gastos por Categoria",
                data: dados.map((d) => d.total),
                backgroundColor: [
                  "#1E88E5", // Azul
                  "#D32F2F", // Vermelho
                  "#388E3C", // Verde
                  "#FBC02D", // Amarelo
                  "#7B1FA2", // Roxo
                  "#FF5722", // Laranja
                ],
                borderColor: "#222", // Cor da borda
                borderWidth: 2,
                hoverOffset: 8,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  color: "#fff", // Cor das legendas no tema escuro
                },
              },
            },
          },
        });
      }
    }

    chamarApi();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"></div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Customers
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  3,782
                </h4>
              </div>
            </div>
          </div>
          {/* <!-- Metric Item End --> */}

          {/* <!-- Metric Item Start --> */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"></div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Orders
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  5,359
                </h4>
              </div>
            </div>
          </div>
          {/* <!-- Metric Item End --> */}
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
          <div className="flex items-center h-75 justify-between">
            <GraficoBarras />
            <div className="relative inline-block">
              <button className="dropdown-toggle"></button>
            </div>
          </div>
        </div>
      </div>

      {/* MONTLHY TARGET */}
      <div className="col-span-12 xl:col-span-5">
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
            <div className="flex justify-between">
              <canvas id="graficoRosca"></canvas>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
            <div>
              <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                Target
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                $20K
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C7.83148 13.9176 7.83187 13.9176 7.83226 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z"
                    fill="#D92D20"
                  />
                </svg>
              </p>
            </div>

            <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

            <div>
              <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                Revenue
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                $20K
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                    fill="#039855"
                  />
                </svg>
              </p>
            </div>

            <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

            <div>
              <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                Today
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                $20K
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                    fill="#039855"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-span-12">
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
          <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Statistics
              </h3>
              <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                Target you’ve set for each month
              </p>
            </div>
            <div className="flex items-start w-full gap-3 sm:justify-end"></div>
          </div>

          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div className="min-w-[1000px] xl:min-w-full"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
