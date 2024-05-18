import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from './firebase';
import { useNavigate } from 'react-router-dom';
import "./mix.css";

export default function Oauth() {
    const auth = getAuth(app)
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('https://firstproject-main-1.onrender.com/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fname: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email
                }),
            })
            const data = await res.json()
            console.log(resultsFromGoogle);
            if (res.ok) {
                console.log(data.result.token);
                localStorage.setItem("usersdatatoken",data.result.token);
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);
        }
    }
        return (
            <>
            <button className='login-with-google-btn' onClick={handleGoogleClick} >
                Sign In with Google
            </button>
            </>
        )
    }




