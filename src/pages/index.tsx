import { BiomeCombinedProviders, Box, Heading } from "@biom3/react";
import { RainbowConnect } from "./RainbowConnect";
import { useContext, useEffect } from "react";
import { PassportActions, PassportContext, passportReducer } from "./Context/PassportContext";

export default function Home() {
  const { passportState, passportDispatch } = useContext(PassportContext);
  const {
    passport,
    provider,
  } = passportState;

  useEffect(() => {
    if (!passport) {
      console.log('No passport instance found when redirecting');
      return;
    }

    if (provider) {
      return;
    }

    // Injects Passport into RainbowKit
    const zkEvmProvider = passport.connectEvm();
    passportDispatch({ 
      payload: { 
        type: PassportActions.SET_PROVIDER,
        provider: zkEvmProvider
      } 
    });
  }, [passport, provider]);

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
