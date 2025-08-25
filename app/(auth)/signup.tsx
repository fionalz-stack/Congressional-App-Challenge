import { CNMIButton } from '@/components/ui/CNMIButton';
import { CNMICard } from '@/components/ui/CNMICard';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDarkMode } from '../../contexts/DarkModeContext';

type UserRole = 'passenger' | 'taxi_driver' | 'transit_driver';

export default function SignupScreen() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('passenger');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const roles = [
    { id: 'passenger', title: 'Passenger', description: 'I want to ride the bus or taxi' },
    { id: 'taxi_driver', title: 'Taxi Driver', description: 'I provide taxi services' },
    { id: 'transit_driver', title: 'Transit Driver', description: 'I drive public buses' },
  ];

  return (
    <SafeAreaView 
      className="flex-1" 
      style={{ 
        paddingTop: insets.top,
        backgroundColor: isDarkMode ? '#111827' : '#F9FAFB'
      }}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-cnmi-primary rounded-2xl items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">🚌</Text>
            </View>
            <Text 
              className="text-2xl font-bold mb-2"
              style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
            >
              Join TRANSIT CNMI
            </Text>
            <Text 
              className="text-base text-center"
              style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
            >
              Create your account to get started
            </Text>
          </View>

          {/* Signup Form */}
          <CNMICard variant="elevated" className="mb-6">
            <Text className="text-xl font-semibold text-cnmi-gray-900 mb-6 text-center">
              Sign Up
            </Text>
            
            {/* Role Selection */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-cnmi-gray-700 mb-3">I am a:</Text>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.id}
                  onPress={() => setSelectedRole(role.id as UserRole)}
                  className={`border rounded-lg p-4 mb-3 ${
                    selectedRole === role.id 
                      ? 'border-cnmi-primary bg-cnmi-light' 
                      : 'border-cnmi-gray-300 bg-white'
                  }`}
                >
                  <Text className={`font-semibold ${
                    selectedRole === role.id ? 'text-cnmi-primary' : 'text-cnmi-gray-900'
                  }`}>
                    {role.title}
                  </Text>
                  <Text className="text-sm text-cnmi-gray-600 mt-1">
                    {role.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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

            <View className="mb-4">
              <Text className="text-sm font-medium text-cnmi-gray-700 mb-2">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                secureTextEntry
                className="border border-cnmi-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-medium text-cnmi-gray-700 mb-2">Confirm Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                className="border border-cnmi-gray-300 rounded-lg px-4 py-3 text-base bg-white"
              />
            </View>

            <CNMIButton
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              className="mb-4"
            />

            <CNMIButton
              title="Already have an account? Login"
              onPress={handleLogin}
              variant="ghost"
            />
          </CNMICard>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}