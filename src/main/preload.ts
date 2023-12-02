import {contextBridge, ipcRenderer} from 'electron';


async function repositoryExec(name, method, data) {
  return ipcRenderer.invoke("repository:exec", name, method, data);
}

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => {
    console.log("123");
    ipcRenderer.send('message', message)
  },
  StudentRepository: {
    list: (data) => repositoryExec("StudentRepository", "list", data),
    upsert: (data) => repositoryExec("StudentRepository", "upsert", data),
    saveToFile: (data) => repositoryExec("StudentRepository", "saveToFile", data),
  },
})
