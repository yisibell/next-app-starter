import MuiBox from '@mui/material/Box'
import MuiTextField from '@mui/material/TextField'
import type { NextPageWithLayout } from './_app'
import MuiPaper from '@mui/material/Paper'
import MuiButton from '@mui/material/Button'
import MuiDivider from '@mui/material/Divider'
import { useState, ChangeEvent } from 'react'
import { $api } from '~/api'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'

const Login: NextPageWithLayout = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      username: e.target.value,
    })
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: e.target.value,
    })
  }

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { code } = await $api.user.login(form)

      if (code === 0) {
        router.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MuiBox
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f5f8',
      }}
    >
      <MuiPaper elevation={6} sx={{ p: 4 }}>
        <MuiBox
          component="form"
          sx={{
            width: '460px',
            '& > :not(style)': {
              mb: 4,
            },
          }}
        >
          <MuiBox
            sx={{
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            用户登录
          </MuiBox>

          <MuiDivider></MuiDivider>

          <MuiTextField
            value={form.username}
            label="用户"
            fullWidth
            onChange={handleUsernameChange}
          ></MuiTextField>
          <MuiTextField
            value={form.password}
            label="密码"
            fullWidth
            type="password"
            onChange={handlePasswordChange}
          ></MuiTextField>
          <MuiButton
            variant="contained"
            size="large"
            sx={{
              width: '100%',
              minHeight: '50px',
            }}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading && (
              <CircularProgress
                sx={{
                  mr: 4,
                }}
              />
            )}
            登 录
          </MuiButton>
        </MuiBox>
      </MuiPaper>
    </MuiBox>
  )
}

Login.getLayout = (page) => {
  return <MuiBox>{page}</MuiBox>
}

export default Login
