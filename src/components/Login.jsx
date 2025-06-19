import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function Login() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() == "") {
      alert("Please enter username");
      return;
    }
    if (password.trim() == "") {
      alert("Enter password");
      return;
    }
    if (password.length < 6) {
      alert("Password must be of 6 characters");
      return;
    }
    setUser(username);
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center text-black px-4">
      <div className="w-full max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-md p-6">
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="  Username"
            className="border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="username"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="  Password"
            className="border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="cursor-pointer bg-white border-2 rounded-4xl p-1 hover:bg-blue-600 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
