import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState }        from '@/redux/store'

export const loadCertificatesList = createAsyncThunk<
  any,
  undefined,
  { state: RootState }
>('certificates/loadCertificatesList', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }?MethodName=OSGetGoodList&ismob=0&ApiKey=${import.meta.env.VITE_API_KEY}`
    )
    const data = await response.json()
    return data.data
  } catch (error) {}
})
