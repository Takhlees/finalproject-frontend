import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(`Register with email: ${email}, role: ${role}`);

    try {
      const response = await fetch("https://glimmer-petal-ceder.glitch.me/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        document.cookie = `token=${data.token}; path=/; domain=.vercel.app;`;
        document.cookie = `userID=${data.id}; path=/; domain=.vercel.app;`;

        // Redirect based on role
        if (data.role === "admin") {
          navigate("https://finalproject-adminportal.vercel.app");
        } else {
          navigate("/");
        }
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="authpage">
      <div className="authContainer">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="terms">
          By logging in or creating an account, you agree with our{" "}
          <a href="/terms">Terms & Conditions</a> and{" "}
          <a href="/privacy">Privacy Statement</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
