
import './App.css'
import TransactionForm from './components/Transactions'

function App() {

  return (
    <>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Transaction form </h1>
      </div>
      <TransactionForm />
    </>
  )
}

export default App
