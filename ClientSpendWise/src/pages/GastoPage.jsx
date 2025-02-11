import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Wallet, List } from "lucide-react";

function GastoPage() {
  const [activeTab, setActiveTab] = useState("gastos");
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
    <div className="w-screen h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 h-full bg-gray-900  p-4 flex flex-col space-y-2">
        <h2 className="text-white text-2xl font-bold">Menu</h2>
        <button
          className={`flex items-center mt-5 p-2 text-white rounded-lg transition ${
            activeTab === "gastos" ? "bg-slate-600" : "hover:bg-slate-600"
          }`}
          onClick={() => setActiveTab("gastos")}
        >
          <Wallet className="mr-2" size={20} /> Gastos
        </button>
        <button
          className={`flex items-center p-2 text-white rounded-lg transition ${
            activeTab === "categorias" ? "bg-slate-600" : "hover:bg-slate-600"
          }`}
          onClick={() => setActiveTab("categorias")}
        >
          <List className="mr-2" size={20} /> Categorias
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full h-full space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-300 hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-center flex-1">
              Detalhes do Gasto
            </h1>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold">Valor:</h2>
            <p className="text-xl text-green-400 font-semibold">{valor}</p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold">Data:</h2>
            <p className="text-gray-300">{dataFormatada}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GastoPage;
