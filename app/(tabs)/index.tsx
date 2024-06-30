import {  StyleSheet } from 'react-native';
import Login from "../../components/Development/Login"
import Signup from '../../components/Development/Signup';
import ForgotPassword from '../../components/Development/Forgotpassword';
import ConfirmationCode from '../../components/Development/ConfirmationCode';
import Usersetting from '../../components/Screen/User/Usersetting';
import UserSiderMenu from '../../components/Screen/User/UserSiderMenu';
import SplashScreen from '../../components/Screen/Intro/SplashScreen';
import EditUserProfile from '../../components/Screen/User/EditUserProfile';
import UserProfileView from '../../components/Screen/User/UserProfileView';
import UserFeedback from '../../components/Screen/User/UserFeedback';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function HomeScreen() {
  
  const Stack = createNativeStackNavigator();
  return (
    
    <>

<Stack.Navigator>
      {/* <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      
      <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
      <Stack.Screen name="Usersetting" component={Usersetting} />
      
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      
       <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />  */}
    
    <Stack.Screen name="UserSiderMenu" component={UserSiderMenu} />
      <Stack.Screen name="Usersetting" component={Usersetting} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="UserProfileView" component={UserProfileView} />
      <Stack.Screen name="UserFeedback" component={UserFeedback} />

    </Stack.Navigator>


    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
