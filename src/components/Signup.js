import React, { useState } from "react";
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import axios from 'axios';
import '../style/Signup.css';

const fetchURL = process.env.NODE_ENV === 'DEV'
? 'http://localhost:5000'
: 'https://hackday-mymovies-backend.herokuapp.com';

const passwordCheck = psw => {
  // const specChar = /\W/g.test(psw);
  const lowChar = /[a-z]/g.test(psw);
  const highChar = /[A-Z]/g.test(psw);
  const digitChar = /\d/g.test(psw);
  if(lowChar && highChar && digitChar){
    return true;
  }
  return false
}

const verifyPass = state => {
  return state.pass === state.passVer
}

const verifyUserName = async state => {
  const isExist = await axios.post(`${fetchURL}/api/user/verify/username`,{username: state.username});
  return await isExist.data !== null;
}

const passLengthCheck = psw => psw.length >= 8 && psw.length <= 16
const userNameLengthCheck = name => name.length >= 3 && name.length <= 255

const Signup = props => {
  const initValue = {
    username: '',
    pass: '',
    passVer: ''
  }
  const [newUser, setNewUser] = useState(initValue);

  const submitSignUp = async () => {
    if(!userNameLengthCheck(newUser.username)){
      return console.log('username must be minimum 3 char')
    }
    if(await verifyUserName(newUser)){
      return console.log('The username has taken')
    }
    if(!verifyPass(newUser)){
      return console.log('Passwords are not matching')
    }
    if(!(passLengthCheck(newUser.pass) && passwordCheck(newUser.pass))){
      return console.log('not correct password')
    }
    const userData = await axios.post(`${fetchURL}/api/user/newuser`, {username: newUser.username, psw: newUser.pass})
    console.log(userData.data)
  }

  return (
    <div className='popup-box'>
      <div className='box'>
        <span className='close-icon' onClick={props.handleClose}>x</span>
        <Segment placeholder>
          <Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
              <Form onSubmit={submitSignUp}>
                <Form.Input
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  value={newUser.username}
                  icon='user'
                  iconPosition='left'
                  label='Username'
                  placeholder='Username'
                />
              <Form.Input
                onChange={(e) => setNewUser({...newUser, pass: e.target.value})}
                value={newUser.pass}
                icon='lock'
                iconPosition='left'
                label='Create a password'
                type='password'
                placeholder='8-16 char'
              />
              <Form.Input
                onChange={(e) => setNewUser({...newUser, passVer: e.target.value})}
                value={newUser.passVer}
                icon='lock'
                iconPosition='left'
                label='Confirm your password'
                type='password'
                placeholder='8-16 char'
              />

                <Button content='Register' secondary icon='signup' size='medium'/>
              </Form>
            </Grid.Column>
          </Grid>

        {/* <Divider vertical>Or</Divider> */}
        </Segment>
      </div>
    </div>
  );
};

export default Signup;
