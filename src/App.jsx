import { FilesProvider } from './hooks/useFiles'
import { DownloadFilesProvider } from './hooks/useDownloadsFiles'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/redux/store'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { theme } from '@/utils/theme'
import { ThemeProvider } from '@mui/material/styles'
import Routes from '@/Routes'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <FilesProvider>
              <DownloadFilesProvider>
                <Routes />
              </DownloadFilesProvider>
            </FilesProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
