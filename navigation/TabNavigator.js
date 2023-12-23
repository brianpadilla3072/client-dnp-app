import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Inicio';
import SettingsScreen from '../screens/Usuario';
import DevocionalesScreen from '../screens/Devocionales';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [selectedTab, setSelectedTab] = useState('Devocionales');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        key={"Devocionales"}
        name="Devocionales"
        component={DevocionalesScreen}
        options={{
          tabBarIcon: () => (
            <Icons
              name={selectedTab === 'Devocionales' ? 'chatbox' : 'chatbox-outline'}
              size={30}
              color={"#ffae00"}
            />
          ),
          tabBarLabel: () => null,
          headerShown: false ,

        }}
        listeners={{
          tabPress: () => handleTabPress('Devocionales'),
        }}
      />
      <Tab.Screen
        key={"Inicio"}
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icons
              name={selectedTab === 'Inicio' ? 'home' : 'home-outline'}
              size={30}
              color={"#ffae00"}
            />
          ),
          tabBarLabel: () => null,
          headerShown: false ,

        }}
        listeners={{
          tabPress: () => handleTabPress('Inicio'),
          headerShown: false ,

        }}
      />
      <Tab.Screen
        key={"Usuarios"}
        name="Usuarios"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => (
            <Icons
              name={selectedTab === 'Usuarios' ? 'person' : 'person-outline'}
              size={30}
              color={"#ffae00"}
            />
          ),
          tabBarLabel: () => null,
          headerShown: false ,
        }}
        listeners={{
          tabPress: () => handleTabPress('Usuarios'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
