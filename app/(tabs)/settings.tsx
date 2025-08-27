import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function SettingsScreen() {
  const { isDarkMode, setDarkMode } = useDarkMode();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

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
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }]}>
            <Ionicons name={icon as any} size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          </View>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.settingSubtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
            Settings
          </Text>
          <Text style={[styles.headerSubtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Customize your app experience
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
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

        <View style={[styles.section, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
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

        <View style={[styles.section, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Appearance
          </Text>
          <SettingItem
            icon="moon"
            title="Dark Mode"
            subtitle="Use dark theme"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E7EB', true: '#6B46C1' }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#F9FAFB'}
              />
            }
          />
          <SettingItem
            icon="language"
            title="Language"
            subtitle="English"
            rightElement={
              <Ionicons name="chevron-forward" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            }
            onPress={() => router.push('/(tabs)/language-selection')}
          />
        </View>

        <View style={[styles.section, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
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