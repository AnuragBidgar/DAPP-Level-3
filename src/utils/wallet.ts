import { isConnected, requestAccess, getAddress } from '@stellar/freighter-api';

export const connectWallet = async (): Promise<string | null> => {
  try {
    const connected = await isConnected();
    if (!connected) {
      alert("Please install Freighter wallet to use this app!");
      return null;
    }
    const access = await requestAccess();
    if (access) {
      const response = await getAddress();
      return response.address;
    }
    return null;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
};
