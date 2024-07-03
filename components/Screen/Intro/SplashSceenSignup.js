import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; 

const SplashScreenSignup = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation(); 

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ).start(() => {
        setTimeout(() => {
          fadeOut();
        }, 3000);
      });
    };

    const fadeOut = () => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start(() => {
        navigation.navigate('UserHome'); 
      });
    };

    fadeIn();

    return () => {
      fadeAnim.setValue(0);
    };
  }, []);

  return (
    <LinearGradient
      colors={['#203960', '#3682be']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Welcome Darshan</Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
      Getting ready for you
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SplashScreenSignup;
