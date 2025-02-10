import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

function Gastos() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/gastos")
      .then((response) => {
        const gastosFormatados = response.data.map((gasto) => ({
          ...gasto,
          dataFormatada: formatarData(gasto.data),
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
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    }).format(data);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {gastos.map((gasto) => (
        <li key={gasto.id} className="flex gap-2">
          <button className="w-full bg-slate-400 text-white p-2 rounded-md text-left">
            R${gasto.valor} - {gasto.dataFormatada}
          </button>
          <button className="bg-slate-400 text-white p-2 rounded-md text-left">
            <ChevronRight />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Gastos;
