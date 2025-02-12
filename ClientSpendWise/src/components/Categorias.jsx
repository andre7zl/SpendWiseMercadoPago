import axios from "axios";
import { useEffect, useState } from "react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categorias")
      .then((response) => {
        const categoriasFormatadas = response.data.map((categoria) => ({
          ...categoria,
          nomeFormatado:
            categoria.nome.charAt(0).toUpperCase() +
            categoria.nome.slice(1).toLowerCase(),
        }));

        setCategorias(categoriasFormatadas);
      })
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow w-full mx-auto">
      <ul className="space-y-4">
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow text-white"
          >
            <div>
              <span className="text-lg">{categoria.nomeFormatado}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
