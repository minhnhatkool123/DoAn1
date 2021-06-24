import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Preloader from './Preloader';

function AdminRoute({ component: Component, children, redirect, ...rest }) {
  const { isLoading, isSuccess } = useQuery('authAdmin', async () => {
    const userAccessToken = localStorage.getItem('accessToken');

    if (!userAccessToken) {
      throw new Error('Access token not available');
    }

    const config = {
      headers: {
        Authorization: userAccessToken,
      }
    }

    const response = await axios.get('http://localhost:5000/user/info', config);
    if (response.data.user.type !== 1) {
      throw new Error('You are not an admin');
    }
  }, { retry: false });

  return (
    <React.Fragment>
      {isLoading ? (
        <Preloader />
      ) : (
        <Route {...rest} render={() =>
          isSuccess ? children || <Component /> : <Redirect to={{ pathname: redirect }} />
        } />
      )}
    </React.Fragment>
  );
}

export default AdminRoute;