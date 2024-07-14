import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';
// import { execSync } from 'child_process';
import process from 'node:process';
import { homedir } from 'os';
import * as fs from 'node:fs';

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: join(process.cwd(), 'src/preload.js'),
		},
	});

	mainWindow.loadURL('http://localhost:4000');

	mainWindow.setMenuBarVisibility(false);
	// mainWindow.webContents.openDevTools();

	ipcMain.handle('getData', async () => {
		// let t = execSync('ls -ra', { cwd: homedir() }).toString().split('\n');
		let t = fs.readdirSync(homedir());
		for (let el of t) {
			await new Promise(r => setTimeout(() => r(), 50));
			mainWindow.webContents.send('lineDrow', el);
		}
	});
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
