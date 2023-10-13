import { Autocomplete, Zoom } from '@mui/material'
import { Slide }             from '@mui/material'
import { Typography }        from '@mui/material'
import { Backdrop }          from '@mui/material'
import { Box }               from '@mui/material'
import { Button }            from '@mui/material'
import { CircularProgress }  from '@mui/material'
import { Container }         from '@mui/material'
import { TextField }         from '@mui/material'
import Grow                  from '@mui/material/Grow'
import { useCallback }       from 'react'
import { useState }          from 'react'
import { shallowEqual }      from 'react-redux'
import { useSelector }       from 'react-redux'
import { Link }              from 'react-router-dom'

import { RootState }         from '@/app/model/store'
import { useAppDispatch }    from '@/shared/hooks/redux.hooks'
import { selectCertificate } from '@/widgets/certificates/model/certificates.slice'

import { Certificate }       from '../../shared/types'

const Main = () => {
  const dispatch = useAppDispatch()

  const select = useSelector(
    (state: RootState) => ({
      loading: state.certificates.loading,
      certificatesList: state.certificates.certificatesList,
      selectedCertificate: state.certificates.selectedCertificate,
      error: state.certificates.error
    }),
    shallowEqual
  )

  const callbacks = {
    selectCertificate: useCallback(
      (value: Certificate) => {
        dispatch(selectCertificate(value))
      },
      [dispatch]
    )
  }

  const [value, setValue] = useState<Certificate | null>(
    select.selectedCertificate
  )

  if (select.loading === true) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={select.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <Container maxWidth="xs">
      <Grow in={true}>
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography variant="h4" component="h2" sx={{ marginBottom: '30px' }}>
            Тестовое задание Sycret
          </Typography>
          <Autocomplete
            fullWidth
            value={value}
            onChange={(event: any, newValue: Certificate | null) => {
              setValue(newValue)
            }}
            loading={select.loading}
            options={select.certificatesList}
            getOptionLabel={(option) => option.NAME}
            isOptionEqualToValue={(option, value) => option.ID === value.ID}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Выберите сертификат"
                variant="standard"
              />
            )}
          />
          {select.error && <h1>{select.error}</h1>}
          {value !== null && (
            <Zoom in={value !== null}>
              <div>
                <p>
                  Price: <b>{value.SUMMA}</b>
                </p>
                <Button
                  onClick={() => callbacks.selectCertificate(value)}
                  component={Link}
                  to="/form"
                  color="success"
                  variant="outlined">
                  Сделать покупку
                </Button>
              </div>
            </Zoom>
          )}
        </Box>
      </Grow>
    </Container>
  )
}

export default Main
