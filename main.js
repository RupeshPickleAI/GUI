const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Enable live reload for development
try {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
} catch (err) {
  console.log('electron-reload not available in production');
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false
        },
    });

    // Load the index.html file
    win.loadFile(path.join(__dirname, 'public', 'index.html'));
    
    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

// Your existing IPC handlers...
ipcMain.handle('run-python-script', async (event, pythonPath, scriptPath) => {
    console.log(`Running script: ${scriptPath} with Python: ${pythonPath}`);
    
    return new Promise((resolve, reject) => {
        const command = `start cmd.exe /k "${pythonPath} ${scriptPath}"`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution failed: ${stderr || error.message}`);
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            console.log(`Execution output: ${stdout}`);
            resolve(stdout || 'Script executed successfully');
        });
    });
});

ipcMain.handle('get-random-images', async (event, folderPath) => {
    try {
        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
        });
        return imageFiles;
    } catch (error) {
        console.error('Error reading images:', error);
        return [];
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});