import React, {useState} from 'react';
import LoginForm from './LoginForm';
import styled from "styled-components";
import RegistrationForm from './RegistrationForm';

const Tab = styled.div `
overflow: hidden;
background-color:  #C0C0C0;
width: 39.5%;
display: flex;
justify-content: space-around;
`

export default function LoginPage(){
    const [userValues, setUserValues] = useState([]);
    const [loginViewActive, setActive] =useState(true)
    const login = user =>{
        const newUser = {
            email: user.email,
            password: user.password
        }

        setUserValues([...userValues, newUser])
    }

    return ( 
        <div className='container'>
          <div className='toggle'>
            <Tab className="tab" >
                <button className={`Button ${ loginViewActive ? 'active' : ''}`} onClick={() => setActive(true)} >Login</button>
                <button className={`Button ${loginViewActive ? '' : 'active'}`} onClick={() => setActive(false)}>Register</button>
            </Tab>
          </div>
          <p>	&#9400; 2020, Macro Tactics</p>
        </div>   
    
      );
}