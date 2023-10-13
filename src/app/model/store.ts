import { configureStore } from '@reduxjs/toolkit'

import certificatesSlice  from '@/widgets/certificates/model/certificates.slice'

const store = configureStore({
  reducer: {
    certificates: certificatesSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
