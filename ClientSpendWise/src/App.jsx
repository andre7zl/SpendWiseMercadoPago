import "./App.css";
import Gastos from "./components/Gastos";
import { useState } from "react";
import { Wallet, List } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("gastos");

  return (
    <div className="w-screen h-screen flex">
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

      {/* Conteúdo Principal */}
      <div className="flex-1 bg-gray-800  flex justify-center p-6">
        <div className="w-full space-y-4">
          {activeTab === "gastos" ? (
            <Gastos />
          ) : (
            <p className="text-white text-center">Categorias em breve...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
