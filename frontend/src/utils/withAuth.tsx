import { useEffect } from 'react';
import { useRouter } from '@/src/navigation';
import { useAuth } from '../services/queries';
import LoadingIndicator from '../components/LoadingIndicator';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Auth: React.FC = (props) => {
    const router = useRouter();
    const {data, isLoading} = useAuth();

    useEffect(() => {
      if (!data?.isAuthenticated && !isLoading) {
      
          router.push('/signin');
        
      }
    }, [data?.isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!data?.isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
