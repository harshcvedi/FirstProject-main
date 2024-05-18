import React, { useContext, useEffect, useState } from 'react'
import "./header.css";
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios';



function Header() {


  
  // const [userdata, setUserdata] = useState({});
  // console.log("response", userdata)

  // const getUser = async () => {
  //     try {
  //         const response = await axios.get("http://localhost:8080/login/sucess", { withCredentials: true });

  //         setUserdata(response.data.user)
  //     } catch (error) {
  //         console.log("error", error)
  //     }
  // }

  // // logoout
  // const logout = ()=>{
  //     window.open("http://localhost:8080/logout","_self")
  // }

  // useEffect(() => {
  //     getUser()
  // }, [])

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {

    let token = localStorage.getItem("usersdatatoken");
    
    // http://localhost:8080

    const res = await fetch("http://localhost:8080/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token
      }
  });

  const data = await res.json();
      console.log(data);
  
      if (res.status === 201) {
        console.log("user logout");
        localStorage.removeItem("usersdatatoken");
        setLoginData(false);
        history("/"); 
      } else {
        console.log("error");
      }
    };
    
      // let token = localStorage.getItem("usersdatatoken");
  
      // const res = await fetch("http://localhost:8080/logout");

      // const res = await fetch("http://localhost:8080/logout", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": token
          
      //   },
      //   credentials: "include"
      // });
  
      // const data = await res.json();
      // console.log(data);
  
      // if (res.status === 201) {
      //   console.log("user logout");
      //   localStorage.removeItem("usersdatatoken");
      //   setLoginData(false);
      //   history.push("/");
      // } else {
      //   console.log("error");
      // }
    
  
  

  const goDash = () => {
    history("/dashboard");
  }

  const goError = () => {
    history("*")
  }



  return (
    <>
      <header>

        <nav>
          <h1>
            Training Project
          </h1>

          
            {/* <h2 onClick={logout}>Logout</h2>
           */}

          <div className='avtar'>
            {
              logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                <Avatar style={{ background: "blue" }} onClick={handleClick} />
            }
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              logindata.ValidUserOne ? (
                <>
                  <MenuItem onClick={() => {
                    goDash()
                    handleClose()
                  }}>Profile</MenuItem>
                  <MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                  }}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => {
                    goError()
                    handleClose()
                  }}>Profile</MenuItem>
                </>
              )
            }

          </Menu>


        </nav>

      </header>

    </>
  )
}

export default Header
