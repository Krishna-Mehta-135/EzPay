import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning";
import {useState} from "react";
import validator from "validator"; // Import validator.js
import axios from "axios";

const Signin = () => {
    const [identifier, setIdentifier] = useState(""); // Accepts email or username
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // Determine if input is an email
        const isEmail = validator.isEmail(identifier);

        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/signin", {
                email: isEmail ? identifier : undefined,
                username: isEmail ? undefined : identifier,
                password,
            });

            console.log("Login Successful", response.data);
        } catch (error) {
            console.error("Login Failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Email or Username"
                        label={"Email or Username"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        label={"Password"}
                        type="password"
                    />
                    <div className="pt-4" onClick={handleLogin}>
                        <Button label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};

export default Signin;
