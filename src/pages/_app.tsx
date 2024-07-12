import type { AppProps } from "next/app";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';
import { getConfig } from './wagmi';
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Environment, ImmutableConfiguration } from "@imtbl/sdk/config";
import { Passport } from "@imtbl/sdk/passport";
import { useMemo, useReducer } from "react";
import { initialisePassportState, PassportContext, passportReducer } from "./Context/PassportContext";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  const queryClient = new QueryClient();
  const passport = new Passport({
    baseConfig: new ImmutableConfiguration({ environment: Environment.SANDBOX }),
    clientId: process.env.NEXT_PUBLIC_PASSPORT_CLIENT_ID || '',
    redirectUri: 'http://localhost:3000/redirect',
    logoutRedirectUri: 'http://localhost:3000/logout',
    logoutMode: 'silent',
    audience: 'platform_api',
    scope: 'openid offline_access email transact',
  });
  const [passportState, passportDispatch] = useReducer(passportReducer, initialisePassportState(passport));
  const passportReducerValues = useMemo(
    () => ({ passportState, passportDispatch }),
    [passportState, passportDispatch],
  );

  return (
    <WagmiProvider config={getConfig()}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale} >
        <PassportContext.Provider value={passportReducerValues}>
          <Component {...pageProps} />;
        </PassportContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
