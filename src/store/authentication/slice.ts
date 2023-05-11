import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: AuthenticationState = {
  isLoading: false,
  isLoggedIn: false,
};

export default createSlice({
  name: 'authentication',
  initialState,
  reducers,
});
