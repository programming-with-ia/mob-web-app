// App.tsx
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Browser from './src/components/Browser';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Browser />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
