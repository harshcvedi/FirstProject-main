import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';

function Adduser() {

    const history=useNavigate();

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
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, add } = inpval;


        const res=await fetch("http://localhost:8080/adduser",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },

            body:JSON.stringify({
                name, email,  age, mobile,add
            })
        });

        const data=await res.json();
        console.log(data);

        if(res.status===422 ||!data){
            alert("error");
            console.log("error");
        }else{
            alert("data added ");
            console.log("data added");
            history("/dashboard");
        }

    }

 


  return (

    <div className="container">
    <NavLink to="/dashboard">Return To DashBoard</NavLink>
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
            

            <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
        </div>
    </form>
</div>
  );
};

export default Adduser


