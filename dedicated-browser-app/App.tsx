// App.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Linking } from 'react-native';
import Browser from './src/components/Browser';
import { BASE_URL, SCHEME } from './src/config';

const linking = {
  prefixes: [`${SCHEME}://`, BASE_URL],
};

export default function App() {
  const [initialUrl, setInitialUrl] = useState(BASE_URL);

  const handleDeepLink = (url: string | null) => {
    if (!url) {
      return;
    }

    const path = url.replace(`${linking.prefixes[0]}`, '').replace(`${linking.prefixes[1]}`, '');
    // Ensure the path starts with a slash
    const finalPath = path.startsWith('/') ? path : `/${path}`;
    setInitialUrl(`${BASE_URL}${finalPath}`);
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      handleDeepLink(url);
    };

    getInitialURL();

    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Browser initialUrl={initialUrl} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
