import React from "react";
import {useState, useEffect} from "react";
import {Button} from "./Button";

const Users = () => {
    const [users, setUsers] = useState([
        {
            name: "Krishna Mehta",
            _id: 1,
        },
    ]);
    const [filter, setFilter] = useState("");

    return (
        <div>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    type="text"
                    placeholder="Search users..."
                    className="border rounded border-slate-200 px-3 py-1 w-full"
                />
            </div>
            <div>
                {users.map((user) => (
                    <User user={user} />
                ))}
            </div>
        </div>
    );
};

const User = ({user}) => {
    return (
        <div className="flex justify-between mt-4">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">{user.name[0]}    
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">{user.name}
                </div>
            </div>
                <div className="flex flex-col justify-center h-full">
                    <Button label={"SendMoney"} />
                </div>
        </div>
    );
};

export {Users};
