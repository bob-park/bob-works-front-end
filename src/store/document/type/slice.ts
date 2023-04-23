import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: DocumentsTypeState = {
  isLoading: false,
  types: [],
};

export default createSlice({
  name: 'documentsType',
  initialState,
  reducers,
});
