import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContentext } from '../context';
import UserProfileCard from '../components/userProfileCard';

export default function WelcomeScreen() {

  return (
    <View style={styles.container}>
      <UserProfileCard/>    
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
