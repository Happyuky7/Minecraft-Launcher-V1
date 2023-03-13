const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();


const { shell } = require('electron');
const links = document.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const href = link.getAttribute('href');
    if (href.startsWith('http://') || href.startsWith('https://')) {
      shell.openExternal(href);
    }
  });
});



/*const fs = require('fs');

// Obtener el elemento del select
const versionSelect = document.getElementById("version");

// Ruta de la carpeta de versiones
const versionsPath = "D:/Minecraft/.minecraft_test1/versions/";

// Leer las carpetas de versiones y agregar opciones al select
fs.readdir(versionsPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }


  files.forEach((file) => {
    const option = document.createElement("option");
    option.value = file;
    option.text = file;
    versionSelect.appendChild(option);
  });
});*/


// Obtener elementos del DOM
const usernameInput = document.getElementById("username");
const versionSelect = document.getElementById("version");
const rammin = document.getElementById("ram_min");
const rammax = document.getElementById("ram_max");
const directorySelect = document.getElementById("directory");
const playButton = document.getElementById("play-btn");

// Start Config Launcher
function launchGame() {
  // get username Value
  const username = usernameInput.value;
  
  // Check if username is not null
  if (username == null) {
    alert("Debes ingresar un nombre de usuario.");
    return;
  }

  const defaultDirectory = "C:/Minecraft-Node-V1/.minecraft"; // Directorio por defecto
  const directory = directorySelect.value || defaultDirectory; // Usar el valor del input o el directorio por defecto

    // Default Verions
    const defaultVersions = ['1.8.9', '1.12.2', '1.16.5', '1.17.1', '1.18.2', '1.19.3'];

    // Version Selected
    const selectedVersion = versionSelect.value;

    // Version opts
    let versionOpts = {
    number: selectedVersion,
    type: defaultVersions.includes(selectedVersion) ? "release" : "custom"
    };

    const defaultRAMMin = "1G";
    const defaultRAMMax = "3G";

    const ramMin = rammin.value || defaultRAMMin;
    const ramMax = rammax.value || defaultRAMMax;

    let memoryOpts = {
      max: ramMax,
      min: ramMin
    };


  // Config launcher
  let opts = {
    authorization: Authenticator.getAuth(username),
    root: directory,
    version: versionOpts,
    memory: memoryOpts
  }
  
  // Start the launcher
  launcher.launch(opts), (err) => {
    if (err) {
        alert("Error al iniciar el juego");
        console.error(err);
        return;
    }
    };

  // Logs console launcher
  launcher.on('debug', (e) => console.log(e));
  launcher.on('data', (e) => console.log(e));
}

playButton.addEventListener("click", launchGame);
