import { Passport } from '@imtbl/sdk/passport';
import { createContext } from 'react';

export interface PassportState {
  passport: Passport | null;
  provider: any | null;
  walletAddress: string;
}

export const initialisePassportState = (passport: Passport) => {
  return {
    passport,
    provider: null,
    walletAddress: "",
  }
}

export interface PassportContextState {
  passportState: PassportState;
  passportDispatch: React.Dispatch<PassportAction>;
}

export interface PassportAction {
  payload: ActionPayload;
}

type ActionPayload =
  | SetPassport
  | SetProvider
  | SetWalletAddress;

export enum PassportActions {
  SET_PASSPORT = 'SET_PASSPORT',
  SET_PROVIDER = 'SET_PROVIDER',
  SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS',
}

export type SetPassport = {
  type: PassportActions.SET_PASSPORT;
  passport: Passport;
}

export type SetProvider = {
  type: PassportActions.SET_PROVIDER;
  provider: any;
}

export type SetWalletAddress = {
  type: PassportActions.SET_WALLET_ADDRESS;
  walletAddress: string;
}

export const PassportContext = createContext<PassportContextState>({
  passportState: {
    passport: null,
    provider: null,
    walletAddress: "",
  },
  passportDispatch: () => {},
});

PassportContext.displayName = 'PassportContext';

export type Reducer<S, A> = (prevState: S, action: A) => S;

export const passportReducer: Reducer<PassportState, PassportAction> = (
  state: PassportState,
  action: PassportAction,
) => {
  switch (action.payload.type) {
    case PassportActions.SET_PASSPORT:
      return {
        ...state,
        passport: action.payload.passport,
      };
    case PassportActions.SET_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
      };
    case PassportActions.SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload.walletAddress,
      };
    default:
      return state;
  }
};
