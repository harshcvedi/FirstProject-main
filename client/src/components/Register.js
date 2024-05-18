import React, { useState } from 'react'
import "./mix.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { height } from '@mui/system';
// import FacebookLogin from 'react-facebook-login';
// import axios from 'axios';
// ashboard from './Dashboard.js'import d
import Dashboard from './Dashboard'; 


function Register() {
        const navigate=useNavigate();
        



    const [passShow, setPassShow] = useState(false);
    const [cpassShow, csetPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });




    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {//for validation
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            toast.warning("fname is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Enter a valid email", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        } else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("password and confirm password does not match", {
                position: "top-center"
            });
        } else {
            // toast.success("User registered successfully",{
            //     position: "top-center"
            // });

            const data = await fetch("https://firstproject-main-1.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res);

            if (res.status === 201) {
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            }
        }


    }

    // const responseFacebook = async (res) => {
    //     console.log(res);
      
    //     try {
    //       const response = await fetch('http://localhost:8080/facebooklogin', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ accessToken: res.accessToken, userID: res.userID })
    //       });
      
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
      
    //       const data = await response.json();
    //       console.log('Facebook login success', data);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };




    return (
        <>
            <section >
                <div className='form_data' >
                    <div className='.form_heading'>
                        <h1 style={{ textAlign: "center", fontSize: "20px" }}>Sign Up</h1>
                    </div>

                    <form style={{ marginTop: 5, marginBottom: 0 }}>

                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter your Name' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter your Email Address' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter your Password' />
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='cpassword'>Confirm Password</label>
                            <div className='two'>
                                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name='cpassword' id='cpassword' placeholder='Confirm Password' />
                                <div className='showpass' onClick={() => csetPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>
                            Already have an account? <NavLink to='/'>Log In</NavLink>
                        </p>

                    </form>
                    {/* <button className='login-with-google-btn' onClick={loginwithgoogle}>
                        Sign In with Google
                    </button> */}
                    {/* <div>
                        
                        <FacebookLogin
                            appId="276618725542735"
                            autoLoad={true}

                            cssClass="facebook-login-button"
                            icon="fa-facebook"
                            callback={responseFacebook} />
                    </div> */}
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register
