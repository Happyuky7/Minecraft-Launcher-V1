// Minecraft Imports
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

//Import the auth class
const { auth } = require("msmc");

// Electron Implementation
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

// Login Button
var loginBtn = document.getElementById("loginBtn");
var crackedBtn = document.getElementById("crackedBtn");
var loginOption = document.getElementById("loginOption");
var crackedOption = document.getElementById("crackedOption");

loginBtn.addEventListener("click", function () {
    // Hide cracked option and show login option
    loginOption.style.display = "block";
    crackedOption.style.display = "none";

});

crackedBtn.addEventListener("click", function () {
    // Hide login option and show cracked option
    crackedOption.style.display = "block";
    loginOption.style.display = "none";

});

// Get DOM elements
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progressBar');
const status = document.getElementById('status');

// Get DOM Elements Login Option Cracked Player.
const usernameInput = document.getElementById("username");

// Get DOM Elements Game Options
const versionSelect = document.getElementById("version");
const rammin = document.getElementById("ram_min");
const rammax = document.getElementById("ram_max");
const directorySelect = document.getElementById("directory");

// Add event listener
playBtn.addEventListener('click', () => {
    //playBtn.disabled = true;
    //progressBar.value = 0;
    //status.innerText = 'Starting...';


    const defaultDirectory = "C:/Minecraft-Node-V1/.minecraft"; // Defaul Directory
    const directory = directorySelect.value || defaultDirectory; // use Custom Directory or Default Directory

    // Default Verions
    const defaultVersions = [
        '1.8.9',
        '1.12.2',
        '1.16.5',
        '1.17', '1.17.1',
        '1.18', '1.18.1', '1.18.2',
        '1.19', '1.19.1', '1.19.2', '1.19.3', '1.19.4'
    ];

    // Snapshot Versions
    const snapshotVersions = [
        '1.20-pre5'
    ];

    // Version Selected
    const selectedVersion = versionSelect.value;

    // Version opts
    //type: defaultVersions.includes(selectedVersion) ? "release" : "custom"
    let versionOpts = {
        number: selectedVersion,
        type: defaultVersions.includes(selectedVersion) ? "release" : snapshotVersions.includes(selectedVersion) ? "snapshot" : "unknown"
    };

    const defaultRAMMin = "1G";
    const defaultRAMMax = "3G";

    const ramMin = rammin.value || defaultRAMMin;
    const ramMax = rammax.value || defaultRAMMax;

    let memoryOpts = {
        max: ramMax,
        min: ramMin     
    };

    // Check if the cracked option is selected
    if (crackedOption.style.display == "block") {
        // Cracked option is selected
        const username = usernameInput.value;

        if (username == null || username == "") {
            alert("Please enter a username");
            return;
        }

        launchGameCracked(username, versionOpts, memoryOpts, directory);
    }

    // Check if the login option is selected
    if (loginOption.style.display == "block") {
        // Login option is selected
        const token = loginMicrosoft()

        if (token == null) {
            alert("Please login with your Microsoft Account");
            return;
        } else {
          
            launchGamePremium(token, versionOpts, memoryOpts, directory);
        
        }
        
    }

});


// Launch the game
async function launchGamePremium(token, versionOpts, memoryOpts, directory) {
    console.log("Starting!");
    launcher.launch({
        authorization: token.mclc(),
        root: directory,
        version: versionOpts,
        memory: memoryOpts,
    });
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
    /*launcher.on('progress', (e) => {
        progressBar.value = e;
        status.innerText = `Downloading ${e}%`;
    });*/
}

async function launchGameCracked(username, versionOpts, memoryOpts, directory) {
    console.log("Starting!");
    launcher.launch({
        authorization: Authenticator.getAuth(username),
        root: directory,
        version: versionOpts,
        memory: memoryOpts,
    });
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
    /*launcher.on('progress', (e) => {
        progressBar.value = e;
        status.innerText = `Downloading ${e}%`;
    });*/

}


// Login with Microsoft Account
async function loginMicrosoft() {
    try {

        console.log('Calling loginMicrosoft function');
        const authManager = new auth("select_account");
        console.log('authManager:', authManager);

        console.log('XboxManager is launching...');
        const xboxManager = await authManager.launch("raw");
        console.log('xboxManager:', xboxManager);

        const token = await xboxManager.getMinecraft();
        console.log('token:', token);

        if (token === null || token === "") {
            alert("Please login with your Microsoft Account");
            return null;
        }
        if (token === "Error") {
            alert("Error logging in with your Microsoft Account");
            return null;
        }

        return token;
    } catch (error) {
        console.error('Error in loginMicrosoft function:', error);
    }
}

/*async function loginMicrosoft() {
    //try {
        const authManager = new auth("select_account");
        const xboxManager = await authManager.launch("electron")
        const token = await xboxManager.getMinecraft();
        return token.mclc();
    //} catch (error) {
      //  console.error(error);
    //}
}*/







