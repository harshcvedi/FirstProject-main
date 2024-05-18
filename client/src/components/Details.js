import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';


function Details() {

  


    const {id}=useParams("");
    console.log(id);
    
    const [getuserdata,setUsserdata]=useState([]);

    console.log(getuserdata);
    
    const getdata = async () => {
      
  
      const res=await fetch(`https://firstproject-main.onrender.com/getuser/${id}`,{
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
  




  return (
    <div className='container mt-3'>
        <h1>Welcome {getuserdata.name}</h1>
        <Card sx={{ maxWidth: 780 }}>
            <CardContent>
            <div className='add_btn'>

            

            </div>
                <div className='row'>

                <div className='left_view col-lg-6 col-md-6 col-12'>
                    <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' style={{width:50}} alt='profile'></img>
                    <h3  className='mt-3' >Name:<span style={{fontWeight:400}}>{getuserdata.name}</span></h3>
                    <h3 className='mt-3'>Age:<span style={{fontWeight:400}}>{getuserdata.age}</span></h3>
                    <h3 >Email:
                        <span style={{fontWeight:400}}>{getuserdata.email}</span>
                    </h3>

                </div>

                <div className='right_view col-lg-6 col-md-6 col-12 mt-5'>
                    
                    <h3 >Phone:
                        <span style={{fontWeight:400}}>{getuserdata.mobile}</span>
                    </h3>
                    <h3>Address:
                        <span style={{fontWeight:400}}>{getuserdata.add}</span>
                    </h3>
                </div>


                </div>
                
                
            </CardContent>
        </Card>
    </div>
  )
}

export default Details
