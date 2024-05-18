import React from 'react'
import { FacebookAuthProvider, signInWithPopup, getAuth ,linkWithCredential } from 'firebase/auth';
import { app } from './firebase.js';
import { useNavigate } from 'react-router-dom';
import "./mix.css";

export default function Fauth() {
    const auth = getAuth(app)
    const navigate = useNavigate()

    const handleFacebookClick = async () => {
        const provider = new FacebookAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromFacebook = await signInWithPopup(auth, provider)
            const res = await fetch('https://firstproject-main-1.onrender.com/api/auth/facebook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fname: resultsFromFacebook.user.fullName,
                    email: resultsFromFacebook._tokenResponse.email
                }),
            })
            const data = await res.json()
            console.log(resultsFromFacebook);
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
            <button className='facebook-login-button ' onClick={handleFacebookClick} >
            <i className="fab fa-facebook-f" style={{ color: '#1877f2', fontWeight: 'bold' }}></i> Sign in with Facebook  
            </button>
            </>
        )
    }


// import React from 'react'
// import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, getAuth, linkWithCredential } from 'firebase/auth';
// import { app } from './firebase.js';
// import { useNavigate } from 'react-router-dom';
// import "./mix.css";

// export default function Fauth() {
//     const auth = getAuth(app)
//     const navigate = useNavigate()

//     const handleFacebookClick = async () => {
//         const provider = new FacebookAuthProvider()
//         try {
//             const resultsFromFacebook = await signInWithPopup(auth, provider)
//             console.log(resultsFromFacebook);

//             // If user exists, link with credential
//             const googleProvider = new GoogleAuthProvider();
//             googleProvider.setCustomParameters({ prompt: 'select_account' });
//             const googleCredential = await signInWithPopup(auth, googleProvider);
//             await linkWithCredential(resultsFromFacebook.user, googleCredential.credential);
//             console.log('Accounts have been merged.');
//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     }

//     return (
//         <>
//             <button className='facebook-login-button' onClick={handleFacebookClick}>
//                 Sign In with Facebook
//             </button>
//         </>
//     )
// }


