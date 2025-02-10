import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GastoPage() {
  const [searchParams] = useSearchParams();
  const valor = searchParams.get("valor");
  const dataFormatada = searchParams.get("dataFormatada");
  const navigate = useNavigate();

  if (!valor || !dataFormatada) {
    return <div>Parâmetros inválidos ou ausentes</div>;
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Gerenciador de Tarefas
          </h1>
        </div>
        <div className="space-y-4 p-6 bg-slate-400 rounded-md shadow flex flex-col">
          <h2 className="text-xl text-white font-bold">
            <strong>Valor:</strong> R${valor}
          </h2>
          <p className="text-white">
            <strong>Data:</strong> {dataFormatada}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GastoPage;
