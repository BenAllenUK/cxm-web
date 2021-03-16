const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
  })
  win.loadURL(
    true
      ? 'http://admin.omnea.local:3000/gimme/editor/new-2021-02-23T17:01:20.019Z'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
