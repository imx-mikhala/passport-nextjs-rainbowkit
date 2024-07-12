import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@biom3/react';
import { PassportActions, PassportContext } from './Context/PassportContext';

const RedirectPage: React.FC = () => {
  const router = useRouter();
  const state = useContext(PassportContext);
  const {
    passport,
  } = state.passportState;

  useEffect(() => {
    if (!passport) {
      console.log('No passport instance found when redirecting');
      router.replace('/');
      return;
    };

    passport.loginCallback();
    router.replace('/');
  }, [router, passport]);

  return <Box>Redirecting...</Box>
};

export default RedirectPage;
