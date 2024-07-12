import {
  immutableZkEvm,
  immutableZkEvmTestnet,
} from 'wagmi/chains';
import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';

export const getConfig = () => {
  const config = createConfig({
    chains: [
      immutableZkEvmTestnet,
      immutableZkEvm,
    ],
    transports: {
      [immutableZkEvmTestnet.id]: http(),
      [immutableZkEvm.id]: http(),
    },
    connectors: [injected()],
  })
  return config;
}
