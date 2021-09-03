import axios from 'axios';
import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import Signup from './Signup';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com';

const DividerExampleVerticalForm = () => {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  let history = useHistory();

  const login = async e => {
    if(userName && userPass){
      const loggedInUser = await axios.post(`${fetchURL}/api/user/login`, {
        userName,
        userPass
      });
      if(loggedInUser.data.username){
        localStorage.setItem('user', JSON.stringify(loggedInUser.data))
        setUserName('');
        setUserPass('')
        history.push("/");
        return window.location.reload();
      }
      console.log(loggedInUser.data.message)
    }
  }

  const signup = () => {
    setIsOpen(!isOpen);
  }

return (
  <>
    <Segment placeholder>
      <Grid columns={1} relaxed='very' stackable>
        <Grid.Column>
          <Form>
            <Form.Input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              icon='user'
              iconPosition='left'
              label='Username'
              placeholder='Username'
            />
            <Form.Input
              onChange={(e) => setUserPass(e.target.value)}
              value={userPass}
              icon='lock'
              iconPosition='left'
              label='Password'
              type='password'
            />

            <Button content='Login' secondary onClick={login}/>
            <p></p>
            <Button content='Sign up' secondary icon='signup' size='medium' onClick={signup}/>
          </Form>
        </Grid.Column>
      </Grid>

      {/* <Divider vertical>Or</Divider> */}
    </Segment>
    {isOpen && <Signup
    handleClose={signup}
    />}
  </>
)}

export default DividerExampleVerticalForm
