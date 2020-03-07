import React, { useState } from 'react';
import  authios  from '../../api/authios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setUserId } from '../../actions';

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoginForm = props => {
  let history = useHistory();
  const [note, setNote] = useState({
    email: '',
    password: ''
  });

  const handleChanges = e => {
    //   console.log(note);

    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = e => {
    e.preventDefault();
    const userCredentials = { username: note.email, password: note.password };
    authios()
      .post('/auth/login', userCredentials)
      .then(res => {
        console.log(res);
        props.setUserId(res.data.user.id);
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('userId', res.data.user.id);
        history.push('/home');
      });
  };

  return (
    <form onSubmit={submitForm}>
      <div className='formdiv'>
        <div className='namestuff'>
          <FormInput>
            <label htmlFor='email'>Email </label>

            <div className='inputForm'>
              <input
                id='email'
                type='email'
                name='email'
                onChange={handleChanges}
                placeholder=' E-Mail'
                value={note.email}
              />
            </div>
          </FormInput>
        </div>

        <div className='namestuff'>
          <FormInput>
            <label htmlFor='password'>Password </label>

            <div className='inputForm'>
              <input
                id='password'
                type='password'
                name='password'
                onChange={handleChanges}
                placeholder=' Password'
                value={note.password}
              />
            </div>
          </FormInput>
        </div>

        <div className='buttonL'>
          <button type='submit'>Login</button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { setUserId })(LoginForm);