import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: UserState = {
  isLoading: false,
};

export default createSlice({
  name: 'user',
  initialState,
  reducers,
});
