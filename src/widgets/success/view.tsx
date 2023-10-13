import { Box }          from '@mui/material'
import { Zoom }         from '@mui/material'
import { Button }       from '@mui/material'
import { Container }    from '@mui/material'
import { useEffect }    from 'react'
import { shallowEqual } from 'react-redux'
import { useSelector }  from 'react-redux'
import { Link }         from 'react-router-dom'
import { useNavigate }  from 'react-router-dom'

import { RootState }    from '../../redux/store'

const Success = () => {
  const navigate = useNavigate()

  const select = useSelector(
    (state: RootState) => ({
      certificate: state.certificates.selectedCertificate
    }),
    shallowEqual
  )

  useEffect(() => {
    if (!select.certificate) {
      navigate('/')
    }
  }, [select.certificate, navigate])

  return (
    <Container maxWidth="xs">
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <h1>Оплата проведена успешно!</h1>
          <Button component={Link} to="/" color="success" variant="outlined">
            Главная
          </Button>
        </Box>
      </Zoom>
    </Container>
  )
}

export default Success
