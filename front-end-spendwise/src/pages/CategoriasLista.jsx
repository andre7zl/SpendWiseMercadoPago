import { useEffect, useState } from "react";
import { ChevronRight, Trash2 } from "lucide-react";

function CategoriasLista() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data));
  }, []);

  return (
    <>
      <div className="w-full">
        <h6 className="text-white font-bold">Pendentes de categoria</h6>
        <div className="mt-7">
          <ul className="divide-y divide-zinc-700 bg-transparent">
            {categorias.map((cat) => (
              <li
                key={cat.id}
                value={cat.id}
                className="flex justify-between items-center py-2 px-4 bg-transparent"
              >
                <div>
                  <span className="text-lg font-medium text-zinc-300">
                    {cat.nome}
                  </span>
                  <p className="text-zinc-500 text-sm"></p>
                </div>

                <div className="flex gap-2">
                  <button className="bg-zinc-500 hover:bg-zinc-400 text-white p-1 rounded-sm">
                    <ChevronRight />
                  </button>
                  <button className="bg-red-800 hover:bg-red-700 text-white p-1 rounded-sm">
                    <Trash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CategoriasLista;
