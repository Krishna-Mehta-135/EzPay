import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        toast(
            <div className="w-80 bg-white rounded-2xl shadow-lg p-4 text-center">
                <p className="text-lg font-semibold text-gray-900">Are you sure you want to Sign Out?</p>
                <div className="mt-4 flex flex-col gap-2">
                    <button
                        className="w-full py-3 text-red-600 font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                        onClick={() => {
                            sessionStorage.removeItem("accessToken");
                            toast.dismiss();
                            navigate("/signin");
                        }}
                    >
                        Sign Out
                    </button>
                    <button
                        className="w-full py-3 text-blue-600 font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                        onClick={() => toast.dismiss()}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                className: "bg-black bg-opacity-40 backdrop-blur-md", // iOS-style dimmed background
            }
        );
    };

    return (
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
