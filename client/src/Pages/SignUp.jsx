import React from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Oath from '../Components/Oath';5
export default function SignUp() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error , setError] = useState(null);
  const [loading , setLoading] = useState(false);
  const handleChange = (e) => {
     setFormData(
      {
        ...formData,
       [e.target.id]: e.target.value ,
      }
     );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const  res = await fetch('/api/auth/signup', 
        {
          method: 'POST',
          headers:{
            'content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      const data = await res.json();
  
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      } 
      
      setLoading(false);
      setError(null);
      navigate('/sign-in');
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    

    console.log(data);
  };

  // console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
          <input type="text" placeholder='username' onChange = {handleChange}className='border p-3 rounded-lg  border-slate-400 bg-white ' id = 'username' />

          <input type="email" placeholder='email' onChange = {handleChange}className='border p-3 rounded-lg bg-white border-slate-400' id = 'email' />

          <input type="password" placeholder='password' onChange = {handleChange}className='border border-slate-400 p-3 rounded-lg bg-white ' id = 'password' />

          <button disabled = {loading} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90  '>{loading ? 'loading..': 'Sign Up'}</button>
          <Oath/>
        </form>

        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to={"/sign-in"}> 
          <span className='text-blue-700'>Sign in</span>
          </Link>
        </div>
        {error && <p className='text-red-600 mt-3'>{error}</p>}
    </div>
  )
}
