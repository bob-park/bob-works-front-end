import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: Authentication = {
  isLoggedIn: false,
};

export default createSlice({
  name: 'authentication',
  initialState,
  reducers,
});
