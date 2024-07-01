import { StyleSheet } from 'react-native';
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
import UserHome from '../../components/Screen/User/UserHome';
import EditVendorProfile from '../../components/Screen/Vendor/EditVendorProfile';
import VendorHome from '../../components/Screen/Vendor/VendorHome';
import VendorProfileView from '../../components/Screen/Vendor/VendorProfileView';
import VendorSiderMenu from '../../components/Screen/Vendor/VendorSiderMenu';
import AddFoodItems from '../../components/Screen/Vendor/AddFoodItems';
import ManageFoodCollection from '../../components/Screen/Vendor/ManageFoodCollection';
import AdminHome from '../../components/Screen/Admin/AdminHome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function HomeScreen() {

  const Stack = createNativeStackNavigator();
  return (

    <>

      <Stack.Navigator>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}

        {/* User Screens */}
        {/* <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="Usersetting" component={Usersetting} />
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
        <Stack.Screen name="UserSiderMenu" component={UserSiderMenu} />
        <Stack.Screen name="UserProfileView" component={UserProfileView} />
        <Stack.Screen name="UserFeedback" component={UserFeedback} /> */}
        {/* Vendor Screens */}
        {/* <Stack.Screen name="VendorHome" component={VendorHome} />
        <Stack.Screen name="EditVendorProfile" component={EditVendorProfile} />
        <Stack.Screen name="VendorProfileView" component={VendorProfileView} />
        <Stack.Screen name="VendorSiderMenu" component={VendorSiderMenu} />
        <Stack.Screen name="AddFoodItems" component={AddFoodItems} />
        <Stack.Screen name="ManageFoodCollection" component={ManageFoodCollection} /> */}
        {/* Admin Screens */}
        {/* <Stack.Screen name="AdminHome" component={AdminHome} /> */}
        {/* <Stack.Screen name="ManageFoodCollection" component={ManageFoodCollection} /> */}

        <Stack.Screen name="AddFoodItems" component={AddFoodItems} />
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
