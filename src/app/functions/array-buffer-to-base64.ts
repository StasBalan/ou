export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';

  const bytes = new Uint8Array(buffer);
  const bytesLength = bytes.byteLength;

  for (let i = 0; i < bytesLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}
