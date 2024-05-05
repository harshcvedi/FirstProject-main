import React, { useContext,useEffect, useState } from 'react'
import "../App.css";
import { NavLink, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './ContextProvider/Context';




function Dashboard() {

  

  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata.ValidUserOne.email);

  const [getuserdata,setUsserdata]=useState([]);
  console.log(getuserdata);

  
  const getdata = async (e) => {
    

    const res=await fetch("http://localhost:8080/getdata",{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        },

       
    });

    const data=await res.json();
    console.log(data);

    if(res.status===422 ||!data){
        
        console.log("error");
    }else{

        setUsserdata(data);
       
        console.log("get data");
    }

}

useEffect(()=>{
  getdata();
},[]);

  
  const navigate=useNavigate();

  
   const DashboardValid= async()=>{
      
    let token = localStorage.getItem("usersdatatoken");
    
    // http://localhost:8080

    const res = await fetch("http://localhost:8080/validuser", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token
      }
  });

  
  

  const data = await res.json();
  //   console.log(data);

   
     if (data.status === 401 || !data) {
      navigate("*");

    }

    else {
      
      console.log("user verify");
      setLoginData(data);
      navigate("/dashboard");
    }
   }

  useEffect(() => {
    DashboardValid();
  }, []);




    function handleClick(){
        navigate('/adduser');
    }

    const deleteuser=async(id)=>{
        const res2=await fetch(`http://localhost:8080/deleteuser/${id}`,{
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              
          }
        });

        const deletedata=await res2.json();
        console.log(deletedata);

        if(res2.status===422 ||!deletedata){
          console.log("error");
        }else{
          toast.success("User deleted successfully", {
            position: "top-center"
        });
          getdata();
        }
        
    }

    
    
  return (

    <div className='mt-5'>
        <div className='container'>
            <div className='add_btn mt-2 mb-3'>
                <button className='btn btn-primary' onClick={handleClick}>Add data</button>
            </div>

            <table class="table">
  <thead>
    <tr className='table-dark'>
    <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone No.</th>
      <th scope="col">Address</th>
      <th scope="col">Age</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

    {
      getuserdata.map((element,id)=>{
        return(
          <>
          <tr>
    <th scope='row'>{id+1}</th>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.age}</td>
      <td>{element.mobile}</td>
      <td>{element.add}</td>
      <td>
          <NavLink to={`view/${element._id}`}><button className='btn btn-success ' style={{marginRight:20 }}><RemoveRedEyeIcon/></button></NavLink>  
          <NavLink to={`edit/${element._id}`}><button className='btn btn-primary ml-10' style={{marginRight:20}}><EditIcon/></button></NavLink> 
        <button className='btn btn-danger' onClick={()=>deleteuser(element._id)}><DeleteOutlineIcon/></button>
      </td>
    </tr>
          </>
        )
      })
    }
    

   

    
   
  </tbody>
</table>
<ToastContainer/>
        </div>
    </div>


  )
}

export default Dashboard