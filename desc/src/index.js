import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

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
	mainWindow.webContents.openDevTools();
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
