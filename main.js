const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Crear ventana del navegador.
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      // Permitir la integración de Node.js
      nodeIntegration: true,
      // Permitir la carga de recursos locales
      contextIsolation: false,
      enableRemoteModule: true//,
      //preload: path.join(__dirname, 'preload.js')
    }
  })

  // Cargar el archivo HTML de la aplicación.
  win.loadFile('index.html');
}

// Este método se llamará cuando Electron haya finalizado la inicialización
// y esté listo para crear ventanas del navegador.
// Algunas APIs pueden solamente ser usadas después de que este evento ocurra.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // En macOS es común re-crear una ventana en la aplicación cuando el
    // icono de la barra de tareas es clickeado y no hay otras ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Salir cuando todas las ventanas hayan sido cerradas, excepto en macOS.
// En macOS es común para aplicaciones y sus barras de menú para quedarse activas
// hasta que el usuario salga explicitamente de la aplicación utilizando Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
