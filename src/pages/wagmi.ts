import {
  immutableZkEvmTestnet,
} from 'wagmi/chains';
import { Connector, createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';

export const getWagmiConfig = () => {
  const config = createConfig({
    chains: [
      immutableZkEvmTestnet,
    ],
    transports: {
      [immutableZkEvmTestnet.id]: http(),
    },
    connectors: [injected()],
  })
  return config;
}

// Ensures the user is connected to the wagmi connector
export const handleUserConnection = async (wagmiConnector: Connector): Promise<boolean> => {
  if (!wagmiConnector) return false;

  const accounts = await wagmiConnector.getAccounts();
  if (accounts.length === 0) {
    // Disconnected from the wagmi connector, try reconnecting first before signing
    try {
      await wagmiConnector.connect();
    } catch (error) {
      console.error('Error connecting to wagmi connector:', error);
      return false;
    }
  }

  return true;
}

export const PASSPORT_WAGMI_CONNECTOR_NAME = 'Immutable Passport';