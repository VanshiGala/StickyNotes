import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { Container, Row, Col } from "reactstrap";

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
    <div className="min-h-screen  text-black  flex items-center justify-center">
      <Container className="w-70  justify-center items-center">
        <Row className="justify-center">
          <Col xs="10" sm="8" md="6" lg="4">
            <div className=" items-center flex justify-center h-50 border-2 rounded-md bg-white">
              <form
                className="flex flex-col space-y-2 text-lg  "
                onSubmit={handleLogin}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="  Username"
                  className="border-2 rounded-md"
                  autoComplete="current-username"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="  Password"
                  className="border-2 rounded-md text-black"
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
