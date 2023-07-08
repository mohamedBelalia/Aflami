import React from 'react'
import './navbar.css'
import { useState , useRef } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { UserAuth } from '../../config/AuthUserContext'

const Navbar = () => {

  const {user , logout} = UserAuth()
  console.log(user?.email);

    const ulElement = useRef(); 
    const ulElement2 = useRef();

  const navigate = useNavigate()
    
   const handleClick = (index , path) => {
    for(let i=0 ; i< ulElement.current.childNodes.length ; i++){
        ulElement.current.childNodes[i].className = ''
        ulElement2.current.childNodes[i].className = ''
    }
    ulElement.current.childNodes[index].className = 'active' 
    ulElement2.current.childNodes[index].className = 'active' 

    navigate(path)

  };

  const onLogout = async () =>{
    try{
        await logout()
        navigate('/')
    } catch(error){
      console.log(error);
    }
  }

  return ( 
    <div className='navbar'>
        
        <div className='container nav-content'>
            <div className='logo-aflami'>
                <h1>AFLAMI</h1>
            </div>
            <div className='links '>
                <ul ref={ulElement}>
                  <li onClick={() => handleClick(0 ,'/' )} className='active'>Home</li>
                  <li onClick={() => handleClick(1 , '/Movies')}>Movies</li>
                  <li onClick={() => handleClick(2 , '/Series')}>Series</li>
                  <li onClick={() => handleClick(3 , '/Search')}>Search</li>
                </ul>
            <div className='coneect-btns'>
              <div>
                {
                  user?.email ? 
                  <>
                  <button onClick={onLogout}>Logout</button>
                  <button onClick={()=>navigate('/WatchList')}>Watch list</button>
                  </>
                  :
                  <>
                  <button onClick={()=>navigate('/Login')}>Log in</button>
                  <button onClick={()=>navigate('/Signup')}>Sign up</button>
                  </>
                }
              </div>
            </div>
            </div>


             {/* Button trigger modal  */}
<div type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
  <span className='phone-btn'></span>
  <span className='phone-btn'></span>
  <span className='phone-btn'></span>
</div>

 {/* Modal  */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      
        <div className='butt'>
        <button className='cancel-btn' type="button" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>

      <div className="modal-body">
            <ul ref={ulElement2}>
                <li  onClick={() => handleClick(0,'/')}>Home</li>
                <li  onClick={() => handleClick(1, '/Movies')}>Movies</li>
                <li  onClick={() => handleClick(2, '/Series')}>Series</li>
                <li  onClick={() => handleClick(3 , '/Search')}>Search</li>
            </ul>
      </div>

      <div className="my-footer">
              <div className='phone-contact-btns'>
                {
                  user?.email ? 
                  <>
                  <button onClick={onLogout}>Logout</button>
                  <button onClick={()=>navigate('/WatchList')}>Watch list</button>
                  </>
                  :
                  <>
                  <button onClick={()=>navigate('/Login')}>Log in</button>
                  <button onClick={()=>navigate('/Signup')}>Sign up</button>
                  </>
                }
              </div>
      </div>
      
    </div>
  </div>
</div>


        </div>
    </div>
  )
}

export default Navbar


