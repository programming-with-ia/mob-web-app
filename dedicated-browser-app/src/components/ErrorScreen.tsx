// src/components/ErrorScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops, something went wrong.</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default ErrorScreen;
