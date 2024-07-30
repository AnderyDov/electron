const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	console.log(__dirname);
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// mainWindow.loadFile(path.join(__dirname, `./dist/index.html`));
	// mainWindow.loadURL('http://localhost:4000');
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
	}

	mainWindow.setMenuBarVisibility(false);

	ipcMain.handle('getData', async function func() {
		function func(path) {
			let t = fs.readdirSync(path, { withFileTypes: true });
			for (let i = 0; i < t.length; i++) {
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
					}
				}
			}
		}

		func(`/home/andrey/PROJECTS/`);
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
