import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    // TODO: Check if user is authenticated
    // For now, redirect to auth
    router.replace('/(auth)/login');
  }, []);

  return null;
}