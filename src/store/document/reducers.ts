import { PayloadAction } from '@reduxjs/toolkit';

import { Page, defaultPage } from '@/common/page';

const reducers = {
  requestGetDocuments: (state: DocumentsState) => {
    state.isLoading = true;
    state.documents = defaultPage;
  },
  successGetDocuments: (
    state: DocumentsState,
    action: PayloadAction<Page<Documents>>,
  ) => {
    state.isLoading = false;
    state.documents = action.payload;
  },
};

export default reducers;
