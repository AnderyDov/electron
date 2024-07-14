const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
	getData: () => ipcRenderer.invoke('getData'),
	lineDrow: callback => ipcRenderer.on('lineDrow', (_e, v) => callback(v)),
});
