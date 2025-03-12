import React, {useState, useEffect} from "react";
import {Button} from "./Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const token = sessionStorage.getItem("accessToken");
            if (!token) return console.error("No access token found");

            try {
                const response = await axios.get("http://localhost:8000/api/v1/user/bulk", {
                    headers: {Authorization: `Bearer ${token}`},
                    withCredentials: true,
                });

                setUsers(response.data.user || []);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
            }
        };

        fetchUsers();
    }, []);

    const handleSendMoney = (receiverId) => {
    };

    if (!users.length) return <div>Loading users...</div>;

    const filteredUsers = users.filter((user) => user.fullName?.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="border rounded border-slate-200 px-3 py-1 w-full"
                />
            </div>
            <div>
                {filteredUsers.map((user) => (
                    <User key={user._id} user={user} onSendMoney={handleSendMoney} />
                ))}
            </div>
        </div>
    );
};

const User = ({user, onSendMoney}) => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between mt-4">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">{user.fullName?.[0] || ""}</div>
                </div>
                <div className="flex flex-col justify-center h-full">{user.fullName}</div>
            </div>
            <div className="flex flex-col justify-center h-full">
            <Button onClick={() => navigate("/send", { state: { receiverId: user._id, name: user.fullName } })} label={"Send Money"} />

            </div>
        </div>
    );
};

export {Users};
