import React , { useEffect , createContext , useContext , useState } from "react";
import { auth , db } from "./firebase-config";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , onAuthStateChanged } from "firebase/auth";
import {setDoc , doc, addDoc} from 'firebase/firestore'


const AuthConext = createContext()

export function AuthConextProvider({children}){

    const [user , setUser] = useState({})


    function signup(email , password){
       return createUserWithEmailAndPassword( auth , email , password)
    }


    function login(email , password) {
        return signInWithEmailAndPassword(auth , email , password)
    }


    function logout () {
        return signOut(auth)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    })


    return(
        <AuthConext.Provider value={{signup , login , logout , user}}>
            {children}
        </AuthConext.Provider>
    )

}

export function UserAuth(){
    return useContext(AuthConext)
}


