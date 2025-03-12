import { useLocation } from "react-router-dom";

const SendMoney = () => {
    const location = useLocation();
    const { receiverId, name } = location.state || {}; 

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>

                {/* Receiver Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-semibold">
                        {name ? name[0] : "?"}
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                        {name || "Unknown"}
                        <p className="text-sm text-gray-500">ID: {receiverId}</p>
                    </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Amount (in Rs)</label>
                    <input
                        type="number"
                        className="w-full h-12 rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-300 px-4 text-lg outline-none"
                        placeholder="Enter amount"
                    />
                </div>

                {/* Send Button */}
                <button className="w-full h-12 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-md transition">
                    Send Money
                </button>
            </div>
        </div>
    );
};

export default SendMoney;
