import  { useState } from "react";
import API from "../../services/api";
import "../../styles/Login.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  // login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // register states
  const [name, setName] = useState("");

  // LOGIN
// const login = async () => {
//   const res = await API.post("/auth/login", {
//     email,
//     password
//   });

//   if (res.data.success) {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));

//     alert("Login Success");

//     // 🔥 ADMIN CHECK
//     if (
//       res.data.user.email === "admin@gmail.com" &&
//       password === "1234"
//     ) {
//       window.location.href = "/admin";
//     } else {
//       window.location.href = "/attendance";
//     }

//   } else {
//     alert(res.data.message);
//   }
// };

const login = async () => {
  const res = await API.post("/auth/login", {
    email,
    password
  });

  if (res.data.success) {
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login Success");

    // 🔥 ROLE BASED REDIRECT
    if (res.data.user.email === "admin@gmail.com") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/attendance";
    }
  } else {
    alert(res.data.message);
  }
};
  // REGISTER
  const register = async () => {
    const res = await API.post("/auth/register", {
      name,
      email,
      password
    });

    alert(res.data.message);

    if (res.data.success) {
      setIsLogin(true); // auto switch to login
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

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

        <button
          className="btn"
          onClick={isLogin ? login : register}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* SWITCH BUTTON */}
        <p style={{ marginTop: "10px" }}>
          {isLogin ? "New user?" : "Already have account?"}
        </p>

        <button
          className="btn-secondary"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register Here" : "Login Here"}
        </button>

      </div>
    </div>
  );
}

export default Auth;