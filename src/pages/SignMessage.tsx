import React, { useContext, useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { Body, Box, Button, Heading, Icon, TextInput } from '@biom3/react';
import { verifyMessage } from 'wagmi/actions';
import { getWagmiConfig, handleUserConnection } from './wagmi';
import { PassportContext } from './Context/PassportContext';

export function SignMessage() {
  const [isSigning, setIsSigning] = useState(false);
  const { data, error, signMessage } = useSignMessage();
  const { address } = useAccount();
  const [message, setMessage] = useState('Testing sign message with wagmi');
  const [verifiedMessage, setVerifiedMessage] = useState(false);
  const [messageVerificationComplete, setMessageVerificationComplete] = useState(false);
  const { passportState } = useContext(PassportContext);
  const { wagmiConnector } = passportState;

  const handleSignMessage = async () => {
    if (!wagmiConnector) {
      console.error('Cannot sign message - Immutable Passport wagmi connector not found', wagmiConnector);
      return false;
    }  

    setIsSigning(true);
    setMessageVerificationComplete(false);
    
    // Ensure the user is connected to the wagmi connector before signing
    const isConnected = await handleUserConnection(wagmiConnector);
    if (!isConnected) {
      setIsSigning(false);
      return;
    }

    try {
      signMessage({
        message,
        connector: wagmiConnector,
        account: address,
      });
    } catch (error) {
      console.error('Error signing message:', error);
      setIsSigning(false);
    }
  };

  useEffect(() => {
    if (data && address) {
      (async () => {
        setIsSigning(false);
        const verified = await verifyMessage(getWagmiConfig(), {
          address,
          message,
          signature: data,
        });
        setVerifiedMessage(verified);
        setMessageVerificationComplete(true);
      })();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('Error signing message:', error);
      setIsSigning(false);
    }
  }, [error]);

  return (
    <Box
      sx={{
        paddingY: 'base.spacing.x2',
      }}
    >
      <Heading
        sx={{
          paddingY: 'base.spacing.x2',
        }}
        size="small"
      >
        Wallet Address
      </Heading>
      <Box sx={{ paddingY: 'base.spacing.x2' }}>
        <Body>{address}</Body>
      </Box>
      <Heading
        sx={{
          paddingY: 'base.spacing.x2',
        }}
        size="small"
      >
        Sign Message
      </Heading>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput 
          placeholder='Enter message to sign'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box sx={{ paddingX: 'base.spacing.x2' }} />
        <Button onClick={handleSignMessage} disabled={isSigning}>
          Sign Message
        </Button>
      </Box>
      {isSigning &&
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <Icon icon="Loading" />
          <Box sx={{ paddingY: 'base.spacing.x2' }}/>
          <Body>Signing message...</Body>
        </Box>
      }
      <Box sx={{ paddingY: 'base.spacing.x2' }}>
        {messageVerificationComplete && verifiedMessage && data && <Body sx={{ paddingY: 'base.spacing.x2' }}>Message verified ✅</Body>}
        {messageVerificationComplete && !verifiedMessage && data && <Body sx={{ paddingY: 'base.spacing.x2' }}>Message could not be verified ❌</Body>}
      </Box>
    </Box>
  );
}
