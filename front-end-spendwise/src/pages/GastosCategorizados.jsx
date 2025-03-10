import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GastosCategorizados() {
  const [gastos, setGastos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 7;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/gastos")
      .then((response) => {
        const gastosFormatados = response.data.map((gasto) => ({
          ...gasto,
          dataFormatada: formatarData(gasto.data_criacao),
          valorFormatado: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(gasto.valor),
        }));
        setGastos(gastosFormatados);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  function formatarData(dataString) {
    if (!dataString) return "Data inválida";
    const data = new Date(dataString);

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    }).format(data);
  }

  function onSeeDetailsClick(gasto) {
    navigate(
      `/gasto?valor=${gasto.valor}&dataFormatada=${gasto.dataFormatada}`
    );
  }

  function addCategoriaClick(gasto) {
    navigate(
      `/add-categoria?valor=${gasto.valor}&dataFormatada=${gasto.dataFormatada}`
    );
  }

  const gastosCategorizados = gastos.filter(
    (gasto) => gasto.categoria_id != null
  );

  const totalPaginas = Math.ceil(gastosCategorizados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const gastosPaginados = gastosCategorizados.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  );

  return (
    <div className="w-full">
      <h6 className="text-white font-bold">Pendentes de categoria</h6>
      <div className="mt-7">
        <ul className="divide-y divide-zinc-700 bg-transparent">
          {gastosPaginados
            .filter((gasto) => gasto.categoria_id != null)
            .map((gasto) => (
              <li
                key={gasto.id}
                className="flex justify-between items-center py-2 px-4 bg-transparent"
              >
                <div>
                  <span className="text-lg font-medium text-zinc-300">
                    {gasto.valorFormatado}
                  </span>
                  <p className="text-zinc-500 text-sm">{gasto.dataFormatada}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSeeDetailsClick(gasto)}
                    className="bg-zinc-500 hover:bg-zinc-400 text-white p-1"
                  >
                    <ChevronRight />
                  </button>
                  <button
                    onClick={() => addCategoriaClick(gasto)}
                    className="bg-green-700 hover:bg-green-600 text-white p-1"
                  >
                    <PlusSquare />
                  </button>
                </div>
              </li>
            ))}
        </ul>

        {/* Paginação */}
        <div className="flex justify-between items-center mt-4 text-zinc-400">
          <span className="text-sm">
            Mostrando {gastosPaginados.length} de {gastosCategorizados.length}{" "}
            gastos
          </span>
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className="p-2 text-zinc-400 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="px-4 py-1 text-sm text-zinc-300">
              {paginaAtual} / {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaAtual === totalPaginas}
              className="p-2 text-zinc-400 hover:text-white disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default GastosCategorizados;
