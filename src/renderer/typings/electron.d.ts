import StudentRepository from "../../main/repositories/StudentRepository";

export default interface ElectronApi {
  sendMessage: (message: string) => void,
  StudentRepository: typeof StudentRepository
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}
