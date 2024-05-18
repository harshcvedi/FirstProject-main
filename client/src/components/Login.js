import React, { useState } from 'react'
import "./mix.css";
import { NavLink,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Oauth from './Oauth';
import Fauth from './Fauth';

function Login() {

    const [passShow,setPassShow]=useState(false);

    const [inpval,setInpval]=useState({
     
        email:"",
        password:""
        
    });

    const history = useNavigate();

    
    // const loginwithgoogle = async () => {
    //     window.open("http://localhost:8080/auth/google/callback", "_self");
    //     // await Dashboard.DashboardValid();
    //     console.log("Sign in with Google button clicked");
    //     history("/dashboard");
    // };


    const setVal=(e)=>{
        const {name,value}=e.target;

        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })
    };

    
    
    const loginuser = async(e) => {

        e.preventDefault();

        const {email,password} = inpval;

        
       
        if (email === ""){
            toast.error("email is required!", {
                position: "top-center"
            });
        }else if(!email.includes("@")){
            toast.warning("Enter a valid email", {
                position: "top-center"
            });
        }else if(password === ""){
            toast.error("password is required!", {
                position: "top-center"
            });
        }else if(password.length<6){
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        }else{

            const data = await fetch("http://localhost:8080/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                     email, password
                })
            });

            const res = await data.json();
            //  console.log(res);

            if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token);
                history("/dashboard");
                setInpval({...inpval,email:"",password:""});
            }else{
                toast.error("user not authenticate", {
                    position: "top-center"
                });
                setInpval({...inpval,email:"",password:""});
            }
            
        }

    }



  return (
    <>
        <section>
            <div className='form_data'>
               <div className='.form_heading'>
                    <h1 style={{fontSize:"40px"}}>Welcome Back, Log In</h1>
                    <p style={{paddingLeft:"55px"}}>Hi, we are glad you are back. Please login.</p>
                </div>

                <form>
                    <div className='form_input'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' value={inpval.email} onChange={setVal} name='email' id='email' placeholder='Enter your Email Address' />
                    </div>

                    <div className='form_input'>
                        <label htmlFor='password'>Password</label>
                        <div className='two'>
                            <input type={!passShow ? "password" :"text"} onChange={setVal} value={inpval.password}  name='password' id='password' placeholder='Enter your Password' />
                            <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                                {!passShow ? "Show" :"Hide"}
                            </div>
                        </div>
                    </div>

                    <button className='btn' onClick={loginuser}>Login</button>

                    <p>
                        Don't have an Account? <NavLink to='/register'>Sign UP</NavLink>
                    </p>

                    
                </form>
              <Oauth></Oauth>
              <Fauth></Fauth>
                <ToastContainer/>
            </div>
        </section>
    </>
  )
}


export default Login