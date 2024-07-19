import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import { Box, Button } from '@biom3/react';
import '@rainbow-me/rainbowkit/styles.css';
import { SignMessage } from './SignMessage';
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
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && chain && account;

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
              
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SignMessage />
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
