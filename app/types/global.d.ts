export {};

declare global {
  interface Window {
    snap: {
      pay: (token: string, callbacks?: SnapCallbacks) => void;
    };
  }
}

interface SnapCallbacks {
  onSuccess: (result: any) => void;
  onPending: (result: any) => void;
  onError: (result: any) => void;
  onClose: () => void;
}