import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { defaultPage } from '@/common/page';

const initialState: DocumentsState = {
  isLoading: false,
  documents: defaultPage,
};

export default createSlice({
  name: 'document',
  initialState,
  reducers,
});
