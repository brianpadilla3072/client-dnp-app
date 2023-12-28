import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Inicio';
import loginScreen from '../screens/Usuario';
import homeUserScreen from "../screens/userWelcomeScreen"
import DevocionalesScreen from '../screens/Devocionales';
import { GlobalContentext } from "../context"; // Cambié la importación
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { getToken } = useContext(GlobalContentext); // Utilizando el contexto correcto
  const [selectedTab, setSelectedTab] = useState('Devocionales');
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    const token = getToken(); // Obteniendo el token del contexto
    // Puedes hacer lo que necesites con el token aquí
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
        component={token ? loginScreen : homeUserScreen}
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
