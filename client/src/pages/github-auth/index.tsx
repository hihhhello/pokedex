import { userModel } from 'entities/user';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingPage } from 'shared/ui';

const GithubAuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { login } = userModel.context.useUserContext();

  const loginUser = () => {
    const code = searchParams.get('code');

    if (!code) {
      toast('No code in search params. Please try again.', { type: 'error' });
      navigate('/', { replace: true });
      return;
    }

    login(code);
  };

  useEffect(() => {
    loginUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingPage />;
};

export default GithubAuthPage;
