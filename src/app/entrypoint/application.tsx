import                               '../styles/global-styles.css'

import CssBaseline              from '@mui/material/CssBaseline'
import { createTheme }          from '@mui/material/styles'
import { ThemeProvider }        from '@mui/material/styles'
import { useEffect }            from 'react'
import { Provider }             from 'react-redux'
import { BrowserRouter }        from 'react-router-dom'
import { Route }                from 'react-router-dom'
import { Routes }               from 'react-router-dom'

import store                    from '@/app/model/store'
import { useAppDispatch }       from '@/shared/hooks/redux.hooks'
import { ApplyForm }            from '@/widgets/apply-form/view'
import { loadCertificatesList } from '@/widgets/certificates/model/load-certificates.thunk'
import Main                     from '@/widgets/main-page/view'
import Success                  from '@/widgets/success/view'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadCertificatesList())
  }, [dispatch])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/form" element={<ApplyForm />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export const Entrypoint = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
