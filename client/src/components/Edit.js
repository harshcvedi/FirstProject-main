import React, { useEffect, useState } from 'react'
import { NavLink, json, useParams,useNavigate } from 'react-router-dom';


function Edit() {

    // const [getuserdata,setUsserdata]=useState([]);
    
    const history=useNavigate("");
    

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        add: ""
       
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const {id}=useParams("");
    console.log(id);
    
    

   
    
    const getdata = async () => {
      
  
      const res=await fetch(`http://localhost:8080/getuser/${id}`,{
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
  
        setINP(data);
         
          console.log("get data");
      }
  
  }

  useEffect(()=>{
    getdata();
  },[]);

  const updateuser=async (e)=>{
    e.preventDefault();

    const {name,email,age,mobile,add}=inpval;

    const res2=await fetch(`http://localhost:8080/updateuser/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name,email,age,mobile,add
        })
    });
    
    const data2=await res2.json();
    console.log(data2);

    if(res2.status===422 || !data2){
        alert("fill the data");
    }else{
        alert("data update");
        history("/dashboard");
    }
  }


  return (
    <div className="container">
    <NavLink to="/dashboard">home</NavLink>
    <form className="mt-4">
        <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">email</label>
                <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">age</label>
                <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Mobile</label>
                <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
            </div>
            
            <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Address</label>
                <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
            </div>
            

            <button type="submit" onClick={updateuser}  class="btn btn-primary">Submit</button>
        </div>
    </form>
</div>
  )
}

export default Edit