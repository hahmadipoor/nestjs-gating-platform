import {useNavigate,useLocation} from "react-router-dom"
import './Home.css'
import { useEffect } from "react"
import { useState } from "react"

const Home=()=>{
    const location = useLocation()
    const navigateTo=useNavigate()
    const accountAddress = location.state.address;
    const [address,setAddress]=useState(accountAddress);
    const [balance,setBalance]=useState(0);

    useEffect(()=>{
      if(address){
         get1Balance()
      }
    },[balance])

    const get1Balance=async()=>{
      try{
         const res = await fetch(`http://localhost:3000/user/balance`,{
            method:"POST",
            headers:{
              "content-type":"application/json",
              Accept: 'application/json',
            },
            body:JSON.stringify({address})
         })
         const data = await res.json();
         setBalance(Number(data));
      }catch(error){
         console.error(error)
      }
    }

    const revealMsg=async()=>{
        try{
           const res = await fetch(`http://localhost:3000/videos`,{
              method:"POST",
              headers:{
                "content-type":"application/json"
              },
              body:JSON.stringify({from:account})
           })
           const data = await res.json();
           if(data.status===200){
             navigateTo("/videos")
           }else{
             window.alert("You currently do not hold any NFTs in collection")
           }
        }catch(error){
           console.error(error)
        }
    }

   const buyNFTs=async()=>{
      try{
         console.log(address);
         const res = await fetch(`http://localhost:3000/auth/login`,{
            method:"POST",
            headers:{
              "content-type":"application/json",
              Accept: 'application/json',
            },
            body:JSON.stringify({address})
         })
         const data = await res.json();
         console.log(data);
      }catch(error){
         console.error(error)
      }
   }
    return(
    <>
        <b>your address: </b> {address}
        <br />
        <span className="beautiful-sentence">I have a secret message for holders of my NFT collection </span>
        <br />
        <span>balance: {balance}</span>
        <br />
        {        
            balance>0
               ?(<span>
                     <button className="btn" onClick={revealMsg}>Reveal Message</button>
                </span>)
               :(<span>
                  you don't have enough balance, you have to buy some NFT
                  <button className="btn" onClick={buyNFTs}>Buy NFTs</button>
                </span>)
        }
        
    </>
    )
 }
 export default Home;