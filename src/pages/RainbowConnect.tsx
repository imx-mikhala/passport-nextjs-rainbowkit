import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import { Box, Button } from '@biom3/react';
import '@rainbow-me/rainbowkit/styles.css';
import { PassportMethods } from './PassportMethods';
import { PassportContext } from './Context/PassportContext';
import { useContext } from 'react';

export function RainbowConnect() {
  const { disconnect } = useDisconnect();
  const state = useContext(PassportContext);
  const { passport } = state.passportState;

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <Box>
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal}>
                    Connect Using RainbowKit
                  </Button>
                );
              }
              if (chain.unsupported) {
                console.log({
                  chain: chain,
                  chainUnsupported: chain.unsupported,
                })
                return (
                  <Button onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={openChainModal}
                  >
                    {chain.hasIcon && (
                      <Box>
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </Box>
                    )}
                    {chain.name}
                  </Button>
                  <Box sx={{ paddingY: 'base.spacing.x2' }} />
                  <PassportMethods />
                  <Box sx={{ paddingY: 'base.spacing.x2' }} />
                  <Button onClick={async () => {
                    disconnect();
                    await passport?.logout();
                    await passport?.logoutSilentCallback('http://localhost:3000/logout');
                  }}>
                    Disconnect
                  </Button>
                </Box>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
