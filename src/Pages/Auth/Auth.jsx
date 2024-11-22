import React, { useState, useContext} from 'react'
import classes from './Signup.module.css'
import { Link, Navigate, useNavigate,useLocation, redirect } from 'react-router-dom';
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import{ClipLoader} from 'react-spinners'
import {DataContext} from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type';
function Auth() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [{user},dispatch]=useContext(DataContext);
  const navigate=useNavigate();
  const navStateData=useLocation();
  console.log(navStateData);
  const [loading, setLoading]=useState({signIn:false,signUp:false})
  const authHandler=async(e)=>{
    e.preventDefault();
    // console.log(e.target.name);
    if(e.target.name=="signin")
    {
      // firebase auth
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        navigate(navStateData?.state?.redirect||"/");
      
      }).catch((err)=>{
        setError(err.message);
        setLoading({...loading,signIn:false})
      })
    }
    else
    {
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        setLoading({...loading,signUp:false})
        navigate(navStateData?.state?.redirect || "/");
        
      }).catch((err)=>{
        setError(err.message)
        setLoading({ ...loading, signUp: false });
      })

    }

  }
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/019/766/240/small/amazon-logo-amazon-icon-transparent-free-png.png"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {
          navStateData?.state?.msg && (<small style={{padding:"5px",textAlign:"center", color:"red",fontWeight:"bold"}}>
            {navStateData?.state?.msg}
          </small>)
        }
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password" id="password">
              Password
            </label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
          </div>
          <button type='submit' name='signin' onClick={authHandler} className={classes.login_signInButton}>{loading.signIn? <ClipLoader color='#000'size={15}></ClipLoader>:("Sign in")}</button>

          {/* agreement */}
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          {/* create account button */}
          <button type='submit' name='signup' onClick={authHandler} className={classes.login_registerButton}>{loading.signUp? <ClipLoader color='#000'size={15}></ClipLoader>:("Create your Amazon Account")}</button>
          {
            error&&<small style={{paddingTop:"5px",color:"red"}}>{error}</small>
          }
        </form>
      </div>
    </section>
  );
}

export default Auth;