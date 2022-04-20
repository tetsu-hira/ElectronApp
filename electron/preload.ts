import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  counter: (count: number) => {
    console.log('ろう');
    return count + 1;
  },
});
