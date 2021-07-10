import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
// import { useUserContext } from '../context/user_context';

const PrivateRoute = ({children , ...otherProps}) => {
  
  const {user} = useAuth0()
  
  return <Route {...otherProps} render={ ()=> {return user ? children : <Redirect to="/" ></Redirect> }}></Route>;
};
export default PrivateRoute;
