import React from 'react'
import {createContext,useState} from 'react';


export const MyContext=createContext();
export const Auth=({children})=>{
    const InitialToken=localStorage.getItem('authToken');
    const InitialUser=localStorage.getItem('User');
    const [user,setUser]=useState(
        InitialToken && InitialUser ? {token:InitialToken,username:InitialUser}:null
    )

    const login=(userData)=>{
        setUser(userData)
    }

    return(
        <>
        <MyContext.Provider value={{user,login}}>
        {children}
        </MyContext.Provider>
        </>
    )

}

 