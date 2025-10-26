// src/components/Browser.tsx
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  Linking,
} from 'react-native';
import WebView from 'react-native-webview';
import {
  WebViewSource,
  WebViewErrorEvent,
  WebViewNavigation,
  WebViewRequest,
} from 'react-native-webview/lib/WebViewTypes';

import { BASE_URL, injectedJavaScript } from '../config';
import ErrorScreen from './ErrorScreen';

interface BrowserProps {
  initialUrl: string;
}

const Browser: React.FC<BrowserProps> = ({ initialUrl }) => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<WebViewErrorEvent['nativeEvent'] | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const source: WebViewSource = { uri: initialUrl };

  const handleRefresh = () => {
    setIsRefreshing(true);
    webViewRef.current?.reload();
    setIsRefreshing(false);
  };

  const handleError = (event: WebViewErrorEvent) => {
    setError(event.nativeEvent);
  };

  const handleRetry = () => {
    setError(null);
    webViewRef.current?.reload();
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  const onShouldStartLoadWithRequest = (request: WebViewRequest) => {
    // Only allow navigation to the base URL
    if (request.url.startsWith(BASE_URL)) {
      return true;
    }

    // Open all other links in the default browser
    Linking.openURL(request.url);
    return false;
  };

  // Android back button handling
  React.useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  if (error) {
    return <ErrorScreen onRetry={handleRetry} />;
  }

  return (
    <>
      {isLoading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      )}
      <WebView
        ref={webViewRef}
        source={source}
        injectedJavaScript={injectedJavaScript}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        style={styles.webview}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Browser;
