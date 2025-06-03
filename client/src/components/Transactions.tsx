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
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white p-8 shadow-xl rounded-2xl border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Submit Transaction</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                        </label>
                        <input
                            id="user_id"
                            name="user_id"
                            placeholder="Enter user ID"
                            value={txn.user_id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={txn.amount}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="device_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Device ID
                        </label>
                        <input
                            id="device_id"
                            name="device_id"
                            placeholder="Enter device ID"
                            value={txn.device_id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            id="location"
                            name="location"
                            placeholder="Enter location"
                            value={txn.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow shadow-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
