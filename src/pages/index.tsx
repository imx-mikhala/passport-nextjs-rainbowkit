import { BiomeCombinedProviders, Box, Heading } from "@biom3/react";
import { RainbowConnect } from "./RainbowConnect";
import { useContext, useEffect } from "react";
import { PassportActions, PassportContext } from "./Context/PassportContext";
import { getWagmiConfig, PASSPORT_WAGMI_CONNECTOR_NAME } from "./wagmi";

export default function Home() {
  const { passportState, passportDispatch } = useContext(PassportContext);
  const {
    passport,
    wagmiConnector,
  } = passportState;

  useEffect(() => {
    if (!passport) {
      console.log('No passport instance found when redirecting');
      return;
    }

    // Injects Passport into RainbowKit
    passport.connectEvm();
  }, [passport]);

  useEffect(() => {
    if (wagmiConnector) {
      return;
    }

    const connectors = getWagmiConfig().connectors.map((connector) => ({ ...connector }));
    const passportConnector = connectors.find((connector) => connector.name === PASSPORT_WAGMI_CONNECTOR_NAME);

    if (!passportConnector) {
      console.log('No wagmi connector for Passport found');
      return;
    }

    passportDispatch({ 
      payload: { 
        type: PassportActions.SET_WAGMI_CONNECTOR,
        wagmiConnector: passportConnector,
      } 
    });
  }, [wagmiConnector]);

  return (
    <BiomeCombinedProviders>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Heading>
          Passport + NextJS + RainbowKit
        </Heading>
        <Box sx={{ paddingY: 'base.spacing.x2' }} />
        <RainbowConnect />
      </Box>
    </BiomeCombinedProviders>
  );
}
