import { ChevronLeft, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Categorias from "../components/Categorias";

function AdicionarCategoria() {
  const [searchParams] = useSearchParams();
  const valor = searchParams.get("valor");
  const gastoId = searchParams.get("id");
  const dataFormatada = searchParams.get("dataFormatada");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const navigate = useNavigate();

  if (!valor || !dataFormatada) {
    return (
      <div className="text-white text-center mt-10">
        Parâmetros inválidos ou ausentes
      </div>
    );
  }

  const atualizarGasto = (id) => {
    fetch(`http://localhost:8000/gastos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoria_id: categoriaSelecionada }),
    })
      .then((res) => res.json())
      .then(() => {
        setMensagemSucesso(true); // Mostra a mensagem de sucesso
        setTimeout(() => setMensagemSucesso(false), 3000); // Oculta após 3 segundos
      });
  };

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
            Adicionar Categoria
          </h1>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <h2 className="text-lg font-semibold">Valor:</h2>
          <p className="text-xl text-green-400 font-semibold">{valor}</p>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <h2 className="text-lg font-semibold">Datagggggg:</h2>
          <p className="text-gray-300">{dataFormatada}</p>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <h2 className="text-lg font-semibold">Categoria:</h2>
          <select
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="w-full p-2 mt-2 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <Categorias />
          </select>

          <button
            onClick={() => atualizarGasto(gastoId)}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Salvar
          </button>
        </div>

        {mensagemSucesso && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-fade">
            <CheckCircle size={20} />
            Categoria salva com sucesso!
          </div>
        )}
      </div>
    </div>
  );
}

export default AdicionarCategoria;
