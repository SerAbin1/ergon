/**
 * Tab Layout - M3 Expressive Dark Theme
 *
 * Bottom navigation with three tabs: Focus, Stats, Settings.
 * Focus (index) is the default landing screen.
 */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { colors } from '@/src/theme/tokens';

/**
 * Tab bar icon component with M3 sizing
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // M3 dark navigation bar
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.surface.default,
          borderTopColor: colors.outline.variant,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}>
      {/* Focus Timer - Default landing screen (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
      {/* Statistics Dashboard */}
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
        }}
      />
      {/* Settings & Preferences */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
      {/* Hide old template screens */}
      <Tabs.Screen
        name="_old_index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="two"
        options={{ href: null }}
      />
    </Tabs>
  );
}
