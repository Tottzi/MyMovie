import axios from 'axios';
import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

const DividerExampleVerticalForm = () => {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  let history = useHistory();
  const onclick = async e => {
    await axios.post(`${fetchURL}/api/user`, {
      userName,
      userPass
    })
    localStorage.setItem('userName', userName)
    setUserName('');
    setUserPass('')
    history.push("/MyMovie/");
    window.location.reload();
  }
return (
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

          <Button content='Login' primary onClick={onclick}/>
          {/* <Button content='Sign up' icon='signup' size='big' /> */}
        </Form>
      </Grid.Column>
    </Grid>

    {/* <Divider vertical>Or</Divider> */}
  </Segment>
)}

export default DividerExampleVerticalForm
