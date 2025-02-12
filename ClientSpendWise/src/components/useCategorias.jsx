import { useState, useEffect } from "react";
import axios from "axios";

function useCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categorias")
      .then((response) => {
        const categoriasFormatadas = response.data.map((categoria) => ({
          id: categoria.id,
          nome:
            categoria.nome.charAt(0).toUpperCase() +
            categoria.nome.slice(1).toLowerCase(),
        }));

        setCategorias(categoriasFormatadas);
        console.log("Categorias carregadas:", categoriasFormatadas);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        setCategorias([]);
      });
  }, []);

  return categorias;
}

export default useCategorias;
