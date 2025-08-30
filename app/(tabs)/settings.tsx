import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const iconColor = theme === 'dark' ? '#FFFFFF' : '#6B7280';

  const handleLogout = () => {
    // Navigate back to main page which will redirect to login
    router.replace('/');
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    rightElement,
    onPress
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
  }) => {
    const content = (
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-outline-200 dark:border-outline-700">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-background-100 dark:bg-background-200">
            <Ionicons name={icon as any} size={20} color={iconColor} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold mb-0.5 text-typography-900 dark:text-typography-900">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-typography-600 dark:text-typography-400">
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {rightElement}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <ScrollView className="flex-1 bg-background-50 dark:bg-background-0">
        <View style={styles.header}>
          <Text className="text-3xl font-bold mb-2 text-typography-900 dark:text-typography-900">
            Settings
          </Text>
          <Text className="text-base text-typography-600 dark:text-typography-400">
            Customize your app experience
          </Text>
        </View>

        <View className="mx-5 mb-5 bg-background-0 dark:bg-background-50 rounded-xl overflow-hidden">
          <Text className="text-sm font-semibold uppercase tracking-wide px-5 pt-5 pb-3 text-typography-600 dark:text-typography-400">
            Notifications
          </Text>
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Receive updates about routes and delays"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#6B46C1' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#F9FAFB'}
              />
            }
          />
        </View>

        <View className="mx-5 mb-5 bg-background-0 dark:bg-background-50 rounded-xl overflow-hidden">
          <Text className="text-sm font-semibold uppercase tracking-wide px-5 pt-5 pb-3 text-typography-600 dark:text-typography-400">
            Location
          </Text>
          <SettingItem
            icon="location"
            title="Location Services"
            subtitle="Allow app to access your location"
            rightElement={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#E5E7EB', true: '#6B46C1' }}
                thumbColor={locationEnabled ? '#FFFFFF' : '#F9FAFB'}
              />
            }
          />
        </View>

        <View className="mx-5 mb-5 bg-background-0 dark:bg-background-50 rounded-xl overflow-hidden">
          <Text className="text-sm font-semibold uppercase tracking-wide px-5 pt-5 pb-3 text-typography-600 dark:text-typography-400">
            Appearance
          </Text>
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-outline-200 dark:border-outline-700">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-background-100 dark:bg-background-200">
                <Ionicons name="moon" size={20} color={iconColor} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold mb-0.5 text-typography-900 dark:text-typography-900">
                  Theme
                </Text>
                <Text className="text-sm text-typography-600 dark:text-typography-400">
                  Choose your preferred appearance
                </Text>
              </View>
            </View>
            <ThemeToggle />
          </View>
          <SettingItem
            icon="language"
            title="Language"
            subtitle="English"
            rightElement={
              <Ionicons name="chevron-forward" size={20} color={iconColor} />
            }
          />
        </View>

        <View className="mx-5 mb-5 bg-background-0 dark:bg-background-50 rounded-xl overflow-hidden">
          <Text className="text-sm font-semibold uppercase tracking-wide px-5 pt-5 pb-3 text-typography-600 dark:text-typography-400">
            About
          </Text>
          <SettingItem
            icon="information-circle"
            title="App Version"
            subtitle="1.0.0"
          />
          <SettingItem
            icon="document-text"
            title="Terms of Service"
          />
          <SettingItem
            icon="shield-checkmark"
            title="Privacy Policy"
          />
        </View>

        {/* Logout Section */}
        <View className="mx-5 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            className="bg-red-500 dark:bg-red-600 rounded-xl py-4 px-5 items-center"
          >
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
              <Text className="text-white font-semibold text-base ml-2">
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
});