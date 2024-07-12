// pages/redirect.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@biom3/react';

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return <Box>Logging out...</Box>
};

export default LogoutPage;
