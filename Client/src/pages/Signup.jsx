import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "./../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "./../components/Button.jsx";
import {BottomWarning} from "./../components/BottomWarning.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <InputBox
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        placeholder="John"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        placeholder="Doe"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="abcd@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="123456"
                        label={"Password"}
                    />
                </div>
                <div className="pt-4">
                    <Button label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    );
};

export default Signup;
