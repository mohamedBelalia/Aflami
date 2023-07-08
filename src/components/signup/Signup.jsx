import React, { useState } from 'react'
import './signup.css'
import background from './bg.jpg'
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../../config/AuthUserContext'
import { setDoc , doc } from 'firebase/firestore'
import { db } from '../../config/firebase-config'

const Login = () => {
    
    
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {user , signup} = UserAuth()
    const navigate = useNavigate()


    const onSignUp = async (e) => {
        e.preventDefault()
        try {
            await signup(email , password)
            setDoc(doc(db,"users",email),{
                watchList : []
            })
            navigate('/')
        }
        catch(error){
            console.log(error);
        }
    }


  return (
    <div className='signup'>
        <div className='background-signup'>
            <img src={background} alt='movies-background'/>
        </div>


        <div className='text-signup'>
                <form onSubmit={onSignUp}>
                    <div>
                        <label>Email</label>
                        <input onChange={(v)=>setEmail(v.target.value)} placeholder='ex@gmail.com' type='email'/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input onChange={(v)=>setPassword(v.target.value)} placeholder='your password' type='password'/>
                    </div>
                    <button>Signup</button>
                </form>
                <div className='text-below'>
                    <p>Already have an account in AFLAMI? {' '}<span onClick={()=>navigate('/Login')}>Login</span></p>
                </div>
        </div>

    </div>
  )
}

export default Login