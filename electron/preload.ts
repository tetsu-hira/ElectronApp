import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  counter: (index: number, count: number, plus: number) => {
    return count + plus;
  },
});
