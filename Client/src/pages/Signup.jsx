import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "./../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "./../components/Button.jsx";
import {BottomWarning} from "./../components/BottomWarning.jsx";

const Signup = () => {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <InputBox placeholder="John" label={"First Name"} />
                    <InputBox placeholder="Doe" label={"Last Name"} />
                    <InputBox placeholder="abcd@gmail.com" label={"Email"} />
                    <InputBox placeholder="123456" label={"Password"} />
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
