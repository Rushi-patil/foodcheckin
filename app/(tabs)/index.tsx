import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Login from "../../components/Development/Login"
import Signup from '../../components/Development/Signup';
import ForgotPassword from '../../components/Development/Forgotpassword';
import ConfirmationCode from '../../components/Development/ConfirmationCode';

export default function HomeScreen() {
  return (
    <>
   {/* <Signup/> */}

    
    {/* <Login/> */}
    {/* <ForgotPassword/> */}
    <ConfirmationCode/>
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
