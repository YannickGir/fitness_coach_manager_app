"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import {Profile, SignUpFormProps} from '../../domain/entities/auth.types'

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
const [userDatas, setUserDatas] = useState<Profile>({
    username: "",
    email: "",
    password_hash: "",
    id: 0,
    created_at: new Date(),
})

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDatas((prev) => ({...prev, [name]: value}))

}
const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    onSignUp(userDatas.username, userDatas.password_hash, userDatas.email);
  }


  return (
    <div className='wrapper' >
        <h1>Sign Up </h1>
        <form className='forms'>
  <label>
   <h2> Username </h2> 
    <input onChange={handleChange} className='inputform' type="text" name="username" value={userDatas.username} />
  </label>

  <label>
     <h2> Email </h2> 
    <input onChange={handleChange} className='inputform' type="text" name="email" value={userDatas.email}/>
  </label>

  <label>
      <h2> password </h2> 
    <input onChange={handleChange} className='inputform' type="text" name="password_hash" value={userDatas.password_hash} />
  </label>

</form>
<button onClick={handleClick} >Inscription</button> 
        
    </div>
  )
}
export default SignUpForm;
