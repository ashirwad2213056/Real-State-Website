import React from 'react';
import { GoogleAuthProvider , getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Oath() {
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const Provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, Provider);
            
            // console.log(result);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName , email: result.user.email , image: result.user.photoURL}),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');

        } catch (error) {
            console.log('Could not sign in with Google', error);
        }
    }

  return (
    <button onClick={handleGoogleClick} className='bg-red-600 rounded-lg p-3 text-white uppercase hover:opacity-60'>Continue with Google</button>
  )
}
