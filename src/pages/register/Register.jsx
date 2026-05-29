import React, { useState } from "react";
import API from "../../services/api";
import "../../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await API.post("/auth/register", {
      name,
      email,
      password
    });

    alert(res.data.message);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register 🚀</h2>

        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;