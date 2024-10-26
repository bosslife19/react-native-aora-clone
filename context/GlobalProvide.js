import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = ()=>useContext(GlobalContext);

export const GlobalProvider = ({children})=>{
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        getCurrentUser().then(res=>{
            if(res){
                setisLoggedIn(true);
                setUser(res)
            }else{
                setisLoggedIn(false);
                setUser(null)
            }
        }).catch(error=>console.log(error)).finally(()=>{
            setIsLoading(false);
        })
    }, [])
    return (
        <GlobalContext.Provider value={{isLoggedIn, setisLoggedIn, user, setUser, isLoading}}>
            {children}
        </GlobalContext.Provider>
    )
}