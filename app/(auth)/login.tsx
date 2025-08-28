import { CNMIButton } from '@/components/ui/CNMIButton';
import { CNMICard } from '@/components/ui/CNMICard';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Implement Supabase authentication
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/map');
    }, 1000);
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  return (
    <View 
      className="flex-1" 
      style={{ 
        backgroundColor: '#F9FAFB'
      }}
    >
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
            <Text 
              className="text-2xl font-bold mb-2"
              style={{ color: '#111827' }}
            >
              TRANSIT CNMI
            </Text>
            <Text 
              className="text-base text-center"
              style={{ color: '#6B7280' }}
            >
              Your island transit companion
            </Text>
          </View>

                     {/* Login Form */}
           <CNMICard variant="elevated" className="mb-6">
             <Text 
               className="text-xl font-semibold mb-6 text-center"
               style={{ color: '#111827' }}
             >
               Login
             </Text>
             
             <View className="mb-4">
               <Text 
                 className="text-sm font-medium mb-2"
                 style={{ color: '#6B7280' }}
               >
                 Email
               </Text>
               <TextInput
                 value={email}
                 onChangeText={setEmail}
                 placeholder="Enter your email"
                 placeholderTextColor="#6B7280"
                 keyboardType="email-address"
                 autoCapitalize="none"
                 className="border rounded-lg px-4 py-3 text-base"
                 style={{
                   borderColor: '#D1D5DB',
                   backgroundColor: '#FFFFFF',
                   color: '#111827'
                 }}
               />
             </View>

             <View className="mb-6">
               <Text 
                 className="text-sm font-medium mb-2"
                 style={{ color: '#6B7280' }}
               >
                 Password
               </Text>
               <TextInput
                 value={password}
                 onChangeText={setPassword}
                 placeholder="Enter your password"
                 placeholderTextColor="#6B7280"
                 secureTextEntry
                 className="border rounded-lg px-4 py-3 text-base"
                 style={{
                   borderColor: '#D1D5DB',
                   backgroundColor: '#FFFFFF',
                   color: '#111827'
                 }}
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
           <Text 
             className="text-center text-sm"
             style={{ color: '#6B7280' }}
           >
             Connecting the community, one ride at a time
           </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}