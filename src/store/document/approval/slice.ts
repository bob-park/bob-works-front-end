import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { defaultPage } from '@/common/page';
import { DocumentApprovalState } from './types';

const initialState: DocumentApprovalState = {
  isLoading: false,
  approvals: defaultPage,
};

export default createSlice({
  name: 'documentApproval',
  initialState,
  reducers,
});
