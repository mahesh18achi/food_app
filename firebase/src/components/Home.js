import Navbar from "./Navbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";
import Body from "./Body";
function Home() {
const navigate=useNavigate()
const {  dispatch } = useContext(AuthContext);

  return (
    <div>
      <Navbar/>
      <div style={{position:'absolute',top:'100px',right:'0px',display:'flex',marginRight:'5px'}}>
      
      <button onClick={()=>{navigate("/register")}}  style={{backgroundColor:'green',marginLeft:'5px',borderRadius:'14px',color:'whitesmoke',padding:'10px'}}>Register</button>
      <button onClick={() => { dispatch({ type: 'LOGOUT' }) }} style={{backgroundColor:'green',marginLeft:'5px',borderRadius:'14px',color:'whitesmoke',padding:'10px'}}>Log Out</button>
      </div>
      <Body/>
      <Footer/>

      </div>
  );
}


export default Home;