import React, { useState } from 'react'
import './SignUpPage.css';
import validator from 'validator';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import image from './backgroundImage.png'
import { useHistory } from "react-router-dom";
import { auth, db } from './firebase';

function SignUpPage() {
    const [name, setName] = useState('');
    const [password, setpassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const history = useHistory();

    const SignUpButton=async()=>{
        if(name==='' || password===''|| email===''|| number===''){
            alert('Please fill all field!!');
        }else{
            if(password.length < 8){    
                alert('Password must be at least 8 characters!!');
            }else if(number.length>10 || number.length<10){
                alert("Mobile number should be 10 digit only!!");
            }else if(!validator.isEmail(email)){
                alert('Invalid Email!!')
            }else{
                await auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
                // Signed in 
                var userId = userCredential.user.uid;
                return db.collection('user').doc(userId).set({
                    username:name,
                    email:email,
                    password:password,
                    mobileNo:number,
                    id:userId,
                }).then(()=>{
                    console.log('data added successfully');
                    alert('Welcome!!you successfully registered');
                    history.push("/login");
                    setpassword('');
                    setEmail('');
                    setName('');
                    setNumber('');
                })
                // ...
            })
            .catch((error) => {
                alert(error.message);
                // ..
            });
            }  
        } 
    
    }

    return (
        <div className="mainContainerOfRegister">
            <div className="leftContainerOfRegister">
                <img src={image} alt="img"/>
            </div>
            <div className="rightContainerOfRegister">
                <div className="signUpContainerOfRegister">
                    <h2>Register</h2>
                    <p>please create your account.</p>
                </div>
                <br />
                <br />
                <div className="inputContainerOfRegister">
                    <FormControl className='inputArea'>
                    <InputLabel htmlFor="my-input">fullname</InputLabel>
                    <Input id="my-input" type="text" value={name} onChange={event=>setName(event.target.value)}  aria-describedby="my-helper-text"/>    
                    </FormControl >
                    <br />
                    <FormControl className='inputArea'>
                    <InputLabel htmlFor="my-input">contect number</InputLabel>
                    <Input id="my-input" type="number" value={number} onChange={event=>setNumber(event.target.value)}  aria-describedby="my-helper-text"/>    
                    </FormControl >
                    <br />
                    <FormControl className='inputArea'>
                    <InputLabel htmlFor="my-input">email</InputLabel>
                    <Input id="my-input" type="email" value={email} onChange={event=>setEmail(event.target.value)} aria-describedby="my-helper-text" required />    
                    </FormControl >
                    <br />
                    <FormControl className='inputArea'>
                    <InputLabel htmlFor="my-input">password</InputLabel>
                    <Input id="my-input" type="password" value={password} onChange={event=>setpassword(event.target.value)}  aria-describedby="my-helper-text"/>    
                    </FormControl >
                </div>
                <br />
                <br />
                <button className="signUpBtn" onClick={SignUpButton}>
                    Register
                </button>  
                <br />
                <p className="loginHeading" >have an account? <span style={{color:'#61acb3'}} onClick={()=>{history.push("/login")}}>login</span></p>
                <br />
                <br />
                {/* <p className="termCondition">Terms of use.Privacy policy</p> */}
            </div>
        </div>
    )
}
export default SignUpPage
