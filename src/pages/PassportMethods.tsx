import { Box, Button } from "@biom3/react";
import { ethers, providers } from "ethers";
import { PassportActions, PassportContext } from "./Context/PassportContext";
import { useContext, useEffect } from "react";

export const PassportMethods = () => {
  const state = useContext(PassportContext);
  const {
    passport,
    provider,
    walletAddress
  } = state.passportState;

  useEffect(() => {
    if (!provider) {
      console.log('No provider');
      return;
    }

    if (walletAddress) {
      // Already called eth_requestAccounts
      return;
    }

    (async () => {
      const [walletAddress] = await provider.request({
        method: 'eth_requestAccounts',
      });
      state.passportDispatch({
        payload: {
          type: PassportActions.SET_WALLET_ADDRESS,
          walletAddress,
        }
      });
    })();
  }, [provider]);

  const onPersonalSign = async () => {
    if (!passport || !provider || !walletAddress) {
      console.log('Not connected', {
        passport,
        provider,
        walletAddress,
      });
      return;
    }

    try {
      const zkProvider = new providers.Web3Provider(provider);
      
      const signer = zkProvider.getSigner();
      const message = "Testing signed message.";
      let signature: string;
      signature = await signer.signMessage(message);
      const digest = ethers.utils.hashMessage(message);
      const contract = new ethers.Contract(
        walletAddress,
        ['function isValidSignature(bytes32, bytes) public view returns (bytes4)'],
        zkProvider,
      );

      const isValidSignatureHex = await contract.isValidSignature(digest, signature);
      const ERC_1271_MAGIC_VALUE = '0x1626ba7e';
      console.log('isValidSignatureHex', isValidSignatureHex === ERC_1271_MAGIC_VALUE);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Box>
      <Box sx={{ paddingY: 'base.spacing.x2' }} />
      <Button
        onClick={onPersonalSign}
      >
        Sign Message
      </Button>
      <Box sx={{ paddingY: 'base.spacing.x2' }} />
    </Box>
  )
}
