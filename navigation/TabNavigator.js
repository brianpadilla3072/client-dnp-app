import React, { useContext, useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../screens/Inicio';
import loginScreen from '../screens/Usuario';
import homeUserScreen from '../screens/userWelcomeScreen';
import DevocionalesScreen from '../screens/Devocionales';
import { GlobalContentext } from '../context';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { getToken,token } = useContext(GlobalContentext);
  const [toen, setToken] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Devocionales');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };
  useEffect(() => {
    // Actualiza el estado local con el token del contexto
    setToken(getToken());
  }, [getToken, selectedTab]); // Agrega selectedTab como dependencia si es necesario


  return (
    <Tab.Navigator>
      <Tab.Screen
        key={'Devocionales'}
        name="Devocionales"
        component={DevocionalesScreen}
        options={{
          tabBarIcon: () => (
            <Icons
              name={selectedTab === 'Devocionales' ? 'chatbox' : 'chatbox-outline'}
              size={30}
              color={'#ffae00'}
            />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
        listeners={{
          tabPress: () => handleTabPress('Devocionales'),
        }}
      />
      <Tab.Screen
        key={'Inicio'}
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icons
              name={selectedTab === 'Inicio' ? 'home' : 'home-outline'}
              size={30}
              color={'#ffae00'}
            />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
        listeners={{
          tabPress: () => handleTabPress('Inicio'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        key={'Usuarios'}
        name="Usuarios"
        component={token ? homeUserScreen : loginScreen}
        options={{
          tabBarIcon: () => (
            <Icons
              name={selectedTab === 'Usuarios' ? 'person' : 'person-outline'}
              size={30}
              color={'#ffae00'}
            />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
        listeners={{
          tabPress: () => handleTabPress('Usuarios'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
