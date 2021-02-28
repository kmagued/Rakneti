# Rakneti

1. Make sure Node.js is installed on your device. Run this command to check if it installed
  ```
  node -v
  ```
  If not installed, download the LTS version from https://nodejs.org/en/
  
2. Run this command in the project's directory ```"../Rakneti"``` to install all third-party libraries used
```
npm install
```
3. Run this command in the project's directory ```"../Rakneti"``` to install pods on iOS
```
cd ios && pod install
```
4. Link libraries to your app
 ```
 react-native link
 ```
5. Run this command to build the app and run it on Android Emulator (Android Studio)
```
react-native run-android
```
6. Run this command to build the app and run it on iOS
```
react-native run-ios
```
