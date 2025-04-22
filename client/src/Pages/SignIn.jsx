// SignIn.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { handleInputChange, handleSignInSubmit } from '../handlers/signInHandlers';
import { handleSignInChange, handleSignInSubmit } from '../Handlers/SignInHandlers';
import Oath from '../Components/Oath';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={(e) => handleSignInSubmit(e, formData, dispatch, navigate)} className='flex flex-col gap-4 '>
        <input
          type="email"
          placeholder='email'
          onChange={(e) => handleSignInChange(e, formData, setFormData)}
          className='border p-3 rounded-lg bg-white border-slate-400'
          id='email'
        />

        <input
          type="password"
          placeholder='password'
          onChange={(e) => handleSignInChange(e, formData, setFormData)}
          className='border border-slate-400 p-3 rounded-lg bg-white'
          id='password'
        />

        <button disabled={loading} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90'>
          {loading ? 'loading..' : 'Sign In'}
        </button>
        <Oath />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-3'>{error}</p>}
    </div>
  );
}
