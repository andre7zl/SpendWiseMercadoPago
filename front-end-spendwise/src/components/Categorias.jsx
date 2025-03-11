import { useEffect, useState } from "react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data));
  }, []);

  return (
    <>
      <option value="">Selecione uma categoria</option>
      {categorias.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.nome}
        </option>
      ))}
    </>
  );
}

export default Categorias;
