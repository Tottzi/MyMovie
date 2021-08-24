import React, { useState } from "react";
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import '../style/Signup.css'

const Signup = props => {
  const initValue = {
    username: '',
    pass: '',
    passVer: ''
  }
  const [newUser, setNewUser] = useState(initValue);

  const changeUserName = value => {
    setNewUser({...newUser, username: value})
  }
  return (
    <div className='popup-box'>
      <div className='box'>
        {/* <span className='close-icon' onClick={props.handleClose}>x</span>
        <form>
          <label> username:
          <input type='text' value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})}></input>
          </label>
        </form> */}
        <span className='close-icon' onClick={props.handleClose}>x</span>
        <Segment placeholder>
          <Grid columns={1} relaxed='very' stackable>
            <Grid.Column>
              <Form>
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

                {/* <Button content='Login' secondary onClick={login}/>
                <p></p> */}
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
