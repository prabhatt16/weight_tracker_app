import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'; 
import './HomePage.css';
import firebase from 'firebase';
import { AiOutlineLogout } from 'react-icons/ai';
import WeightList from './WeightList';
import { auth, db } from './firebase';
import { useHistory } from 'react-router-dom';
import notFoundImage from './notFound.png'
function HomePage() {

  const [weights, setWeights] = useState([])
  const [input, setinput] = useState('')
  const history = useHistory();
  // const [user] = useAuthState(auth);
  const user=auth.currentUser;
  useEffect(()=>{
    if(user){
      db.collection('user').doc(user?.uid).collection('weight').orderBy('timeStamp','desc').onSnapshot(onSnapshot=>{
      setWeights(onSnapshot.docs.map(doc=>({id:doc.id,weight:doc.data().weight})));
    })}
  },[]) 
  console.log(user?.uid);
  const logOut=(e)=>{
      firebase.auth().signOut().then(() => {
            alert('you log-out successfully. see you soon 🙏🏻')
            history.goBack('/login')
            // history.push('/login');
            console.log("logout");
        }).catch((error) => {
            console.log(error)
         });
  }  

 const addWeight=(event)=>{
    event.preventDefault();
    if(user){
     db.collection('user').doc(user?.uid).collection('weight').add({
        weight:input,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp(),  
      })  
      setinput('');
    }
    return setWeights([...weights,input]);
  }
  
  return (
    <div className="home">
      <div className="top">
        <div className="userDetails">
            {/* <img src={user.photoURL} alt="userpic" /> */}
            <h1>Hey there, Work Hard 💪🏻</h1> 

            <AiOutlineLogout className="logoutIcon" onClick={logOut}/>
        </div>
        <div className="verticalLine"/>
        
        <div className="inputAreaOfHome">
            <input type="number" placeholder="Enter your weight" value={input} onChange={event=>setinput(event.target.value)} style={{fontSize:'15px',padding:'8px',outline:'none'}} />
            <Button disabled={!input} type="submit" onClick={addWeight} variant="contained" color="primary">add weight</Button> 
        </div>
      </div>
      <div className="weightItem">
        <ul >
            {  
                user?
                weights.map((weight)=>(
                    <WeightList key={weight.id+1} weight={weight}/>
                ))
                :(
                  <div className="notFoundContainer">
                    <img src={notFoundImage} alt="no user"/>
                  </div>
                )
            }
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
