import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }

        // ✅ Get saved usernames from localStorage
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // ✅ Check if username already exists
        const userExists = savedUsers.includes(username);

        if (userExists) {
            alert("❌ This username is already exist!");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            // ✅ Save new username in localStorage
            savedUsers.push(username);
            localStorage.setItem("users", JSON.stringify(savedUsers));

            setUser({ username });

            alert("✅ Your profile is logged in");

            setUsername("");
            setPassword("");

            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-80">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login 🔐
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
