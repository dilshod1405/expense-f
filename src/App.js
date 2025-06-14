import ExpenseChart from "./components/ExpenseChart";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        ⚡️ Company Expenses Dashboard
      </h1>
      <ExpenseChart />
    </div>
  );
};

export default App;
