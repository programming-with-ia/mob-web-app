# Dedicated Browser App

This is a React Native Expo application that acts as a dedicated browser for a single website.

## Configuration

The target URL and injected JavaScript can be configured in `src/config.ts`.

## Customizing the Splash Screen

To customize the splash screen, replace the `splash-icon.png` file in the `assets` directory with your own image. The recommended size for the splash screen image is 1284x2778 pixels. After replacing the image, you may need to update the `splash` section of the `app.json` file to reflect the new image path.

## Deep Linking

This application supports deep linking, allowing it to open specific paths within the target website. The custom URL scheme is configured in `src/config.ts` and `app.json`.

### Testing Deep Linking

To test the deep linking feature, you can use the following command in your terminal:

```bash
# For iOS
npx uri-scheme open mysite://path/to/page --ios

# For Android
npx uri-scheme open mysite://path/to/page --android
```
