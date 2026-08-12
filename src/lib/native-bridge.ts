// Bridge to the Ezzyshop mobile app when the dashboard runs inside its WebView.
// The native shell injects `window.__EZZY_NATIVE__` before page load and listens
// for messages posted via `window.ReactNativeWebView.postMessage`.

interface NativeBridgeMessage {
  type: "logout" | "navigate";
  path?: string;
}

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (message: string) => void };
    __EZZY_NATIVE__?: { platform: "android" | "ios"; version: string };
  }
}

export const isNativeApp = (): boolean => Boolean(window.ReactNativeWebView);

export const postToNative = (message: NativeBridgeMessage): void => {
  try {
    window.ReactNativeWebView?.postMessage(JSON.stringify(message));
  } catch {
    // never break the web app because of the bridge
  }
};
