import { Button } from "@biom3/react";
import { Passport } from "@imtbl/sdk/passport"
import { providers } from "ethers";
import { useState } from "react";

type DefaultConnectProps = {
  passport: Passport
}
export const DefaultConnect = ({ passport }: DefaultConnectProps) => {
  const [zkEvmProvider, setZkEvmProvider] = useState<any>();
  const [passportWalletAddress, setPassportWalletAddress] = useState<string>("");

  const onConnect = async () => {
    console.log(passport);
    const provider = passport.connectEvm();
    const [walletAddress] = await provider.request({
      method: 'eth_requestAccounts',
    });
    setPassportWalletAddress(walletAddress);
    setZkEvmProvider(new providers.Web3Provider(provider));
    console.log('Wallet address:', walletAddress);
  };

  return (
    <Button onClick={onConnect}>
      Default Connect to Passport
    </Button>
  )
}