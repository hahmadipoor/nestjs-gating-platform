import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import io from 'socket.io-client'
import welcomeImg from '../images/GM.png'
const Members=()=>{
    const [socket,setSocket]=useState(null);
    const navigateTo = useNavigate();

    useEffect(()=>{
      //TODO: send request to the backend to get the videos
    },[])


    return<>
      <p>TODO: play the video</p>
      
    </>
 }
 export default Members;