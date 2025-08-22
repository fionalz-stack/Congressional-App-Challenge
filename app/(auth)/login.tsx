import { CNMIButton } from '@/components/ui/CNMIButton';
import { CNMICard } from '@/components/ui/CNMICard';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  return (
    <SafeAreaView className="flex-1 bg-cnmi-light">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Logo and Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-cnmi-primary rounded-2xl items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">🚌</Text>
            </View>
            <Text className="text-2xl font-bold text-cnmi-gray-900 mb-2">TRANSIT CNMI</Text>
            <Text className="text-base text-cnmi-gray-600 text-center">
              Your island transit companion
            </Text>
          </View>

          {/* Login Form */}
          <CNMICard variant="elevated" className="mb-6">
            <Text className="text-xl font-semibold text-cnmi-gray-900 mb-6 text-center">
              Login
            </Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-cnmi-gray-700 mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-cnmi-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-medium text-cnmi-gray-700 mb-2">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                className="border border-cnmi-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              />
            </View>

            <CNMIButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              className="mb-4"
            />

            <CNMIButton
              title="Create Account"
              onPress={handleSignUp}
              variant="outline"
            />
          </CNMICard>

          {/* Footer */}
          <Text className="text-center text-sm text-cnmi-gray-500">
            Connecting the islands, one ride at a time
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}