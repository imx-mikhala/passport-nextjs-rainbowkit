import { Passport } from '@imtbl/sdk/passport';
import { createContext } from 'react';
import { Connector } from 'wagmi';

export interface PassportState {
  passport: Passport | null;
  wagmiConnector: Connector | null;
}

export const initialisePassportState = (passport: Passport) => {
  return {
    passport,
    wagmiConnector: null,
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
  | SetWagmiConnector;

export enum PassportActions {
  SET_PASSPORT = 'SET_PASSPORT',
  SET_WAGMI_CONNECTOR = 'SET_WAGMI_CONNECTOR',
}

export type SetPassport = {
  type: PassportActions.SET_PASSPORT;
  passport: Passport;
}

export type SetWagmiConnector = {
  type: PassportActions.SET_WAGMI_CONNECTOR;
  wagmiConnector: Connector;
}

export const PassportContext = createContext<PassportContextState>({
  passportState: {
    passport: null,
    wagmiConnector: null,
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
    case PassportActions.SET_WAGMI_CONNECTOR:
      return {
        ...state,
        wagmiConnector: action.payload.wagmiConnector,
      };
    default:
      return state;
  }
};
