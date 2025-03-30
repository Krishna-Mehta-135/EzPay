import {Link as ScrollLink} from "react-scroll";
import {useNavigate} from "react-router-dom";
import payment from "../assets/payment.jpg";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 md:px-16 py-4 shadow-md bg-white fixed w-full top-0 z-10">
                {/* Logo on the Left */}
                <h1 className="text-2xl font-bold">
                    <span className="text-white bg-blue-600 px-2 rounded-md">Ez</span>
                    <span className="text-blue-600">Pay</span>
                </h1>

                {/* Navigation Links - Now moved to the Right */}
                <div className="flex space-x-6">
                    <ScrollLink
                        to="features"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer mt-2 ml-2 text-gray-600 hover:text-blue-600"
                    >
                        Features
                    </ScrollLink>
                    <ScrollLink
                        to="how-it-works"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer mt-2 ml-2 text-gray-600 hover:text-blue-600"
                    >
                        How It Works
                    </ScrollLink>
                    <button
                        onClick={() => navigate("/signin")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="h-screen flex flex-col md:flex-row items-center justify-between text-center md:text-left px-6 pt-32">
                <div className="md:w-1/2">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Send & Receive Money <span className="text-blue-600">Effortlessly</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Fast, Secure, and Reliable Transactions Anytime, Anywhere.
                    </p>
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Get Started
                        </button>
                        <ScrollLink to="features" smooth={true} duration={500}>
                            <button className="px-6 py-3 border border-gray-700 text-gray-700 rounded-md text-lg font-semibold hover:bg-gray-200 transition">
                                Learn More
                            </button>
                        </ScrollLink>
                    </div>
                </div>

                {/* Hero Image on Right */}
                <div className="hidden md:block md:w-1/2 flex justify-end">
                    <img src={payment} alt="EzPay Mockup" className="w-[550px] rounded-lg shadow-lg" />
                </div>
            </header>

            {/* Features Section - Centered */}
            <section id="features" className="py-20 bg-white text-center px-6 md:px-16">
                <h2 className="text-4xl font-bold">
                    Why Choose <span className="text-blue-600">EzPay?</span>
                </h2>
                <p className="text-lg text-gray-600 mt-2 mb-8">Simplifying payments with speed and security.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="p-6 bg-gray-100 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">⚡ Instant Transfers</h3>
                        <p className="text-gray-600 mt-2">Send and receive money within seconds.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">🔒 Secure Payments</h3>
                        <p className="text-gray-600 mt-2">End-to-end encryption keeps your transactions safe.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold">📱 Easy to Use</h3>
                        <p className="text-gray-600 mt-2">A simple and intuitive interface for seamless payments.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section - Centered */}
            <section id="how-it-works" className="py-20 bg-gray-50 text-center px-6 md:px-16">
                <h2 className="text-4xl font-bold">
                    How <span className="text-blue-600">EzPay</span> Works
                </h2>
                <p className="text-lg text-gray-600 mt-2 mb-8">Start using EzPay in just three simple steps.</p>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold">📝 Sign Up</h3>
                        <p className="text-gray-600 mt-2">Create your account in minutes.</p>
                    </div>
                    <span className="text-3xl md:text-5xl">➡️</span>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold">💳 Add Funds</h3>
                        <p className="text-gray-600 mt-2">Securely load money into your wallet.</p>
                    </div>
                    <span className="text-3xl md:text-5xl">➡️</span>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold">💸 Start Transacting</h3>
                        <p className="text-gray-600 mt-2">Send and receive money seamlessly.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 bg-gray-900 text-white text-center">
                <p>© {new Date().getFullYear()} EzPay. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
