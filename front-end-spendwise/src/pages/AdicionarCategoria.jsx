import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
function AdicionarCategoria() {
  const [searchParams] = useSearchParams();
  const valor = searchParams.get("valor");
  const dataFormatada = searchParams.get("dataFormatada");
  const navigate = useNavigate();

  if (!valor || !dataFormatada) {
    return (
      <div className="text-white text-center mt-10">
        Parâmetros inválidos ou ausentes
      </div>
    );
  }

  return (
    <div className="flex-1 bg-zinc-800 flex justify-center">
      <div className="w-full  space-y-6 p-6  text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-300 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-center flex-1">
            Detalhes do AdicionarCategoria
          </h1>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <h2 className="text-lg font-semibold">Valor:</h2>
          <p className="text-xl text-green-400 font-semibold">{valor}</p>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <h2 className="text-lg font-semibold">Data:</h2>
          <p className="text-gray-300">{dataFormatada}</p>
        </div>
      </div>
    </div>
  );
}

export default AdicionarCategoria;
