import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { forgotPassword } from '../api/auth';
const ForgotPasswordPage = () => {

  const [form, setForm]=useState({
    email: "",
    currentPassword: "",
    newPassword: ""
  })
  


  const handleChnage = (e)=>{
    setForm((prev)=>{
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }
  const handleSubmit = async () => {
    if (!form.email) {
      toast.error('Email is required');
      return;
    }


     try {
      const response = await forgotPassword(form);
      console.log(response, "helo===========>")
   
      
      toast.success(response?.message || 'Change password successfully');
      
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }


 
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">Forgot Password</h2>
        <input
          type="email"
          id="email"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChnage}
        />
        <input
          type="password"
          id="currentPassword"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Enter your Current Password"
          value={form.currentPassword}
          onChange={handleChnage}
        />
        <input
          type="password"
          id="newPassword"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Enter your New Password"
          value={form.newPassword}
          onChange={handleChnage}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Chnage Password
        </button>

        <div className="text-sm text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline block">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
