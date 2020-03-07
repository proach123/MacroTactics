import React, { useState } from 'react';
import authios from '../../api/authios'

const RegistrationForm = props => {


    console.log(props)
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        passError: '',
        successMess: ''
    });

    const handleChanges = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const validate = () => {
        let passError = "";
        const specialCharRegex = /[\W\s]/g;
        const specialCharTest = user.password.match(specialCharRegex)
        console.log(specialCharTest)
        if (user.password !== user.passwordConfirm) {
          passError = "passwords must match";
        } else if ( user.password.length < 6) {
            passError = "password must be 6 characters"
        } else if (user.password.includes(specialCharTest || '  ') === true) {
            passError = "passwords cannot contain spaces or special characters"
        }
    
        if (passError) {
          setUser({...user, passError});
          return false;
        }
    
        return true;
      };

    const submitForm = e => {
        e.preventDefault();
        const isValid = validate();
        const userCredentials = { username: user.email, password: user.password }
        if(isValid) {
            // console.log(user)
            authios()
                .post('/auth/register', userCredentials)
                .then(res => {
                    console.log(res)
                    //registration success message here?
                })
                .catch( err => console.log(err) );
            let successMess = 'Registration Successful'
            setUser({...user, successMess})
            setTimeout(() => {
               props.setActive(true) 
            }, 1000)
            
        }

    }


        

  return (
    <div>
     <h5>Register New User</h5>
        <form onSubmit={submitForm}>
            <div className="namestuff">
                <label htmlFor="email"> E-Mail: </label>
                <div className="inputForm">
                    <input id='email' type='email' name='email' onChange={handleChanges} placeholder=' E-Mail' value={user.email} required />
                </div>
                
            </div>
            <div className="namestuff">
                <label htmlFor="Password"> Password: </label>
                <div className="inputForm">
                    <input id='Password' name='password' type='password' onChange={handleChanges} placeholder=' Password' value={user.password} required />
                </div>
            </div>
            <div className="namestuff">
                <label htmlFor="passwordConfirm"> Confirm  Password: </label>
                <div className="inputForm">
                    <input id='passwordConfirm' name='passwordConfirm' type='password' onChange={handleChanges} placeholder=' Confirm Password' value={user.passwordConfirm} required />
                </div>
            </div>
            <div>
                {user.passError}
                {user.successMess}
            </div>
        <div className='buttonL'>
          <button type='submit'> Sign-up </button>
        </div>
      </form>
    </div>
  );
}


export default RegistrationForm;