import { useState } from 'react';
import toast from 'react-hot-toast';
import { signup } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';


const SignupPage = () => {
  const [form, setForm]=useState({
    username: "",
    contact:"",
    email: "",
    password: ""
  })

  const handelFormChange=(e)=>{
    setForm((prev)=>{
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = { ...form, contact: `+${form.contact}` };
     let response = await signup(data);
     console.log(response, "res=============")
      toast.success('Signup successful');
      //navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    }
  };

  console.log(form, "FORM DATA")

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          id='username'
          className="w-full border p-2 mb-4 rounded"
          placeholder="Username"
          value={form.username}
          onChange={handelFormChange}
        />

        <PhoneInput
          className="w-full border p-0.9 mb-4 rounded"
          country={'in'}
          id='phone'
          value={form.phone}
          onChange={(value)=>{
            setForm((prev)=>{
              return {
                ...prev,
                contact: value
              }
            })
          }}
          inputStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            
          }}
        />
        <input
          type="email"
          id='email'
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          value={form.email}
          onChange={handelFormChange}
        />
        <input
          type="password"
          id='password'
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={form.password}
          onChange={handelFormChange}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>

        <div className="text-sm text-center mt-4">
          <span className="text-gray-500">Already have an account?</span>
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
