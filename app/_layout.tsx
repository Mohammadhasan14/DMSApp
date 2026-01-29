import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { Stack, useRouter, useSegments } from 'expo-router';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useSelector((state: any) => state.user);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)'); 
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(app)/home');
    }
  }, [isLoggedIn, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthGuard>
      </PersistGate>
    </Provider>
  );
}