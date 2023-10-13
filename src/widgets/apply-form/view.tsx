import { Box, Typography } from '@mui/material'
import { Slide }           from '@mui/material'
import { Button }          from '@mui/material'
import { Container }       from '@mui/material'
import { TextField }       from '@mui/material'
import { useEffect }       from 'react'
import { useState }        from 'react'
import InputMask           from 'react-input-mask'
import { shallowEqual }    from 'react-redux'
import { useSelector }     from 'react-redux'
import { Link }            from 'react-router-dom'
import { useNavigate }     from 'react-router-dom'

import { RootState }       from '@/app/model/store'
import { useAppDispatch }  from '@/shared/hooks/redux.hooks'
import { postCertificate } from '@/widgets/certificates/model/certificates.slice'

import { FormData }        from '../../shared/types'

export const ApplyForm = () => {
  const dispatch = useAppDispatch()
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

  const [formData, setFormData] = useState<FormData>({
    username: '',
    tel: '',
    email: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      const data = {
        Id: select.certificate?.ID,
        TableName: select.certificate?.TABLENAME,
        PrimaryKey: select.certificate?.PRIMARYKEY,
        Price: select.certificate?.PRICE,
        Summa: select.certificate?.SUMMA,
        PaymentTypeId: 2,
        UseDelivery: 0,
        ClientName: formData.username,
        Phone: formData.tel.replace(/\D/g, '').slice(1),
        Email: formData.email,
        ...(formData.message && { MsgText: formData.message })
      }
      dispatch(postCertificate(data))
      navigate('/success')
    } else {
      setErrors(validationErrors)
    }
  }

  function validate(data: FormData) {
    const errors: Record<string, string> = {}
    if (!data.username.trim()) {
      errors.username = 'Имя пользователя обязательно'
    }
    if (!data.email.trim()) {
      errors.email = 'Email обязателен'
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Неверный формат email'
    }
    if (!data.tel.trim()) {
      errors.tel = 'Телефон обязателен'
    } else if (!isValidTel(data.tel)) {
      errors.tel = 'Вы ввели некорректный телефон'
    }
    return errors
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidTel = (tel: string) => {
    const telRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
    return telRegex.test(tel)
  }

  return (
    <Container maxWidth="xs">
      <Slide in={true}>
        <Box
          component="form"
          sx={{
            marginTop: 16,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center'
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2">Ваш {select.certificate?.NAME}</Typography>
          <TextField
            required
            name="username"
            autoComplete="name"
            label="ФИО"
            placeholder="Введите..."
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
            fullWidth
          />
          <InputMask
            mask="+7 (999) 999-99-99"
            value={formData.tel}
            onChange={handleChange}>
            <TextField
              required
              name="tel"
              autoComplete="tel"
              label="Телефон"
              error={Boolean(errors.tel)}
              helperText={errors.tel}
              fullWidth
            />
          </InputMask>
          <TextField
            name="message"
            label="Сообщение"
            placeholder="Введите..."
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            required
            name="email"
            autoComplete="email"
            label="Почта"
            placeholder="Введите..."
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '100%'
            }}>
            <Button component={Link} to="/" color="success" variant="outlined">
              Вернуться
            </Button>
            <Button type="submit" color="success" variant="outlined">
              Оплата
            </Button>
          </Box>
        </Box>
      </Slide>
    </Container>
  )
}
