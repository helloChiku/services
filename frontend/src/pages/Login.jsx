
import { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import {setAuthToken} from "../utils/auth"
const LoginPage = () => {
  const [form , setForm]=useState({
    email: "",
    password: ""
  })
  
  const handleChnage = (e)=>{

    setForm((prev)=>{
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(form);
      console.log(response, "helo===========>")
      if(!response.err){
        setAuthToken(response.data.token)
        
        toast.success('Logged in successfully');
        navigate('/dashboard');
      }
      
      
      
    } catch (err) {
      let message = err?.message || err?.response?.data || 'Failed to login'
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>
        <input
          type="email"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          id="email"
          value={form.email}
          onChange={handleChnage}
        />
        <input
          type="password"
          id="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={form.password}
          onChange={handleChnage}
        />
        <button
          onClick={handleLogin}
          style={{
            cursor: "pointer"
          }}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Login
        </button>

        {/* Bottom Links */}
        <div className="text-sm text-center mt-4">
          <Link to="/forgot-password" className="text-blue-500 hover:underline block">
            Forgot Password?
          </Link>
          <span className="text-gray-500">Don't have an account?</span>
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
