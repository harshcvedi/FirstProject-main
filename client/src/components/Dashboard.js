import React, { useContext,useEffect, useState } from 'react'
import "../App.css";
import { NavLink, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './ContextProvider/Context';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';




function Dashboard() {

  const [searchQuery, setSearchQuery] = useState('');

  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata.ValidUserOne.email);

  const [getuserdata,setUsserdata]=useState([]);
  console.log(getuserdata);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

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
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchKeyPress = (event) => {
      if (event.key === 'Enter') {
        const nameToSearch = searchQuery.trim().toLowerCase();
        const filteredData = getuserdata.filter(user =>
          user.name.toLowerCase().includes(nameToSearch)
        );
        setUsserdata(filteredData);
      }
    };
  return (
    <div className='mt-5'>
    <div className='container'>
      <div className='add_btn mt-2 mb-3'>
        <button className='btn btn-primary' onClick={() => navigate('/adduser')}>Add data</button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name and press Enter"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
      />

<TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Age</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getuserdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, id) => (
                <TableRow key={id}>
                  <TableCell>{id + 1}</TableCell>
                  <TableCell>{element.name}</TableCell>
                  <TableCell>{element.email}</TableCell>
                  <TableCell>{element.mobile}</TableCell>
                  <TableCell>{element.add}</TableCell>
                  <TableCell>{element.age}</TableCell>
                  <TableCell>
                    <NavLink to={`view/${element._id}`}>
                      <button className='btn btn-success' style={{ marginRight: '10px' }}>
                        <RemoveRedEyeIcon />
                      </button>
                    </NavLink>
                    <NavLink to={`edit/${element._id}`}>
                      <button className='btn btn-primary' style={{ marginRight: '10px' }}>
                        <EditIcon />
                      </button>
                    </NavLink>
                    <button className='btn btn-danger' onClick={() => deleteuser(element._id)}>
                      <DeleteOutlineIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getuserdata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <ToastContainer />
      </div>
    </div>
  );
}

export default Dashboard