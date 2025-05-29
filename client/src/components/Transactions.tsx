import { useState } from "react";
import axios from "axios";
import type { Transaction } from "../types/Transaction";

const TransactionForm = () => {
    const [txn, setTxn] = useState<Transaction>({
        user_id: "",
        amount: 0,
        device_id: "",
        location: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setTxn((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/transaction", txn);
            alert(res.data.message || "Sent successfully");
        } catch (err: any) {
            alert(err?.response?.data?.error || "Error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]  ">
            <div className="flex flex-col gap-10">
                <label htmlFor="user_id" className="text-sm font-medium text-gray-700">User ID</label>
                <input 
                    id="user_id"
                    name="user_id" 
                    placeholder="Enter user ID" 
                    value={txn.user_id} 
                    onChange={handleChange} 
                    required 
                    className="px-4 py-2 bg-gray-50 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount</label>
                <input 
                    id="amount"
                    name="amount" 
                    type="number"
                    placeholder="Enter amount" 
                    value={txn.amount} 
                    onChange={handleChange} 
                    required 
                    className="px-4 py-2 bg-gray-50 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="device_id" className="text-sm font-medium text-gray-700">Device ID</label>
                <input 
                    id="device_id"
                    name="device_id" 
                    placeholder="Enter device ID" 
                    value={txn.device_id} 
                    onChange={handleChange} 
                    required 
                    className="px-4 py-2 bg-gray-50 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                <input 
                    id="location"
                    name="location" 
                    placeholder="Enter location" 
                    value={txn.location} 
                    onChange={handleChange} 
                    required 
                    className="px-4 py-2 bg-gray-50 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200"
                />
            </div>

            <button 
                type="submit" 
                className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
            >
                Submit Transaction
            </button>
        </form>
    );
};

export default TransactionForm;
