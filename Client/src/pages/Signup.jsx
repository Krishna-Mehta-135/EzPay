import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { Button } from "../components/Button.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/signup", {
                username,
                email,
                fullName,
                password
            });
            localStorage.setItem("accessToken" , response.data.accessToken)

            // Redirect to login or home page after successful signup
            navigate("/signin");
        } catch (error) {
            console.error("Signup failed:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="Johnisgreat" label={"Username"} />
                    <InputBox onChange={(e) => setEmail(e.target.value)} placeholder="JohnDoe@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" label={"Full Name"} />
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="12345678" label={"Password"} />
                </div>
                
                {/* Attach onClick directly to Button */}
                <Button label={"Sign up"} onClick={handleSignup} />

                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    );
};

export default Signup;
