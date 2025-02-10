import "./App.css";
import Gastos from "./components/Gastos";
function App() {
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          SpendWise
        </h1>
        <Gastos />
      </div>
    </div>
  );
}

export default App;
