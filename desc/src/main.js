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
	('/home/andrey/.nvm');

	mainWindow.setMenuBarVisibility(false);
	// mainWindow.webContents.openDevTools();

	ipcMain.handle('getData', async function func() {
		// let t = execSync('ls -ra', { cwd: homedir() }).toString().split('\n');

		function func(path) {
			let t = fs.readdirSync(path, { withFileTypes: true });
			for (let i = 0; i < t.length; i++) {
				// await new Promise(r => setTimeout(() => r(), 10));
				if (t[i].name[0] !== '.' && !/\/\./.test(t[i].parentPath) && !/node_module/.test(t[i].parentPath)) {
					let l = t[i].parentPath.split('/').length;
					let str = '';
					for (let k = 0; k < l; k++) {
						str += '\t';
					}
					if (t[i].isDirectory()) {
						mainWindow.webContents.send('lineDrow', `${str}${t[i].name}/`);
						func(`${t[i].parentPath}/${t[i].name}`);
					}
					if (t[i].isFile()) {
						mainWindow.webContents.send('lineDrow', `${str}${t[i].name}`);
						// func(t[i]);
					}
				}
			}
		}

		func(`${homedir()}/projects`);

		// for (let i = 0; i < t.length; i++) {
		// 	// await new Promise(r => setTimeout(() => r(), 10));
		// 	if (t[i].name[0] !== '.' && !/\/\./.test(t[i].parentPath) && !/node_module/.test(t[i].parentPath)) {
		// 		if (t[i].isDirectory()) {
		// 			mainWindow.webContents.send('lineDrow', t[i].name);
		// 		} else {
		// 			mainWindow.webContents.send('lineDrow', t[i].name);
		// 		}
		// 	}
		// }

		// for (let el of t) {
		// 	// await new Promise(r => setTimeout(() => r(), 10));
		// 	if (el.name[0] !== '.' && !/\/\./.test(el.parentPath) && !/node_module/.test(el.parentPath)) {
		// 		if (el.isFile()) {
		// 			mainWindow.webContents.send('lineDrow', `\t${el.name}`);
		// 		} else {
		// 			mainWindow.webContents.send('lineDrow', `${el.name}/`);
		// 		}
		// 	}
		// }
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
