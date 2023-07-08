import React, { useState } from 'react'
import './login.css'
import background from './bg.jpg'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../config/AuthUserContext'
import { auth } from '../../config/firebase-config'

const Login = () => {

    const navigate = useNavigate()
    const {user , login} = UserAuth()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')


    const onLogIn = async (e) => {
        e.preventDefault()
        setError('')

        console.log(email);
        console.log(password);


        try{
            await login( email , password)
            navigate('/')
            console.log(user?.email);
        }
        catch(err){
            console.log(err);       
             setError(err.message)
        }
    }


  return (
    <div className='login'>
        <div className='background-login'>
            <img src={background} alt='movies-background'/>
        </div>


        <div className='text-login'>
                <form onSubmit={onLogIn}>
                    <div>
                        <label>Email</label>
                        <input onChange={(v)=>setEmail(v.target.value)} placeholder='ex@gmail.com' type='email'/>
                    </div>

                    <div> 
                        <label>Password</label>
                        <input onChange={(v)=>setPassword(v.target.value)} placeholder='your password' type='text'/>
                    </div>
                    {error ? <p className='error-msg'>Email or Password is wrong !!</p> : null}
                    <button>Login</button>
                </form>
                <div className='text-below'>
                    <p>You didn't have an account in AFLAMI ? {' '}<span onClick={()=>navigate('/Signup')}>Signup</span></p>
                </div>
        </div>

    </div>
  )
}

export default Login