import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData);
      console.log(response.data , "hello working");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleclick =() => {
    navigate("/register")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-24 shadow-md px-6 py-6 rounded-md"
    >
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your Email"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Your password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button onClick={handleclick}>sign up</button>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
    </form>
  );
};

export default LoginScreen;
