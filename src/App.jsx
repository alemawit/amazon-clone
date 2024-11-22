import { useContext, useEffect, useState } from 'react'
import './App.css'
import Routing from './Routing.jsx'
import { DataContext } from './Components/DataProvider/DataProvider.jsx'
import {auth} from './Utility/firebase.js'
import { Type } from './Utility/action.type.js'

function App() {
  const [{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }
      else
      {
          dispatch({
            type: Type.SET_USER,
            user: null,
          });
      }
  
    
    
    })


  },[])
  
  return (
    <>
      <Routing/>
    </>
  )
}

export default App
