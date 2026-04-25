import { isConnected, requestAccess, getAddress, signTransaction } from '@stellar/freighter-api';

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

export const signBadgeTransaction = async (address: string) => {
  try {
    const { TransactionBuilder, Networks, Account, Operation } = await import('@stellar/stellar-sdk');
    const account = new Account(address, "0");
    const transaction = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(Operation.manageData({
        name: "mint_badge",
        value: "proof_of_skill"
      }))
      .setTimeout(30)
      .build();

    const xdr = transaction.toXDR();
    const signedTx = await signTransaction(xdr, { networkPassphrase: Networks.TESTNET });
    
    // The signedTx might be a string or an object depending on the API version. 
    // Usually it returns the signed XDR string or an object with an error.
    if (typeof signedTx === 'object' && signedTx !== null && 'error' in signedTx) {
        throw new Error(signedTx.error as string);
    }
    
    return signedTx;
  } catch (error: any) {
    console.error("Transaction signing failed:", error);
    alert(`Transaction rejected or failed: ${error.message || 'Unknown error'}`);
    return null;
  }
};

export const transferBadgeTransaction = async (sourceAddress: string, destinationAddress: string) => {
  try {
    const { TransactionBuilder, Networks, Account, Operation } = await import('@stellar/stellar-sdk');
    const account = new Account(sourceAddress, "0");
    const transaction = new TransactionBuilder(account, {
      fee: "100",
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(Operation.manageData({
        name: "transfer_badge",
        value: destinationAddress.substring(0, 64) // Truncate to max 64 bytes
      }))
      .setTimeout(30)
      .build();

    const xdr = transaction.toXDR();
    const signedTx = await signTransaction(xdr, { networkPassphrase: Networks.TESTNET });
    
    if (typeof signedTx === 'object' && signedTx !== null && 'error' in signedTx) {
        throw new Error(signedTx.error as string);
    }
    
    return signedTx;
  } catch (error: any) {
    console.error("Transfer transaction signing failed:", error);
    alert(`Transfer transaction rejected or failed: ${error.message || 'Unknown error'}`);
    return null;
  }
};
