/*
import { registerRootComponent } from 'expo';
//import PushNotification from 'react-native-push-notification';
import App from './App';





// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
*/
import App from './App';
import { AppRegistry } from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';


PushNotification.createChannel(
  {
    channelId: "ak99", // (required)
    channelName: "Ma chaine", // (required)
    channelDescription: "Catégorie de chaine", // (optional) default: undefine
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  }
)

PushNotification.configure({
  
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },
  onRegister:function(token) {
      console.log('Token==>', token)
  },

  popInitialNotification: true,
  requestPermissions: true
})


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
//registerRootComponent(App);
AppRegistry.registerComponent('main', () => App)