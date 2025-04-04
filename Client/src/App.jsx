import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage.jsx";

function App() {


    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/send" element={<SendMoney />} />
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
