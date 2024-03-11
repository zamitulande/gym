import './App.css'
import { ThemeProvider } from '@mui/material'
import Routes from './routes/Routes'
import { getTheme } from './config/Theme'

function App() {
    return (
    <ThemeProvider theme={getTheme}>
      <Routes/>
    </ThemeProvider>
  )
}

export default App
