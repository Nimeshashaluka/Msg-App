import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  View,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function StartPage({navigation}) {
  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <Text style={styles.startText1}>Get Nearer To Everyone</Text>
      <Text style={styles.startText2}>Helps you to contact everyone in just easy way
      </Text>
      <Image
        source={require('./images/Texting-pana.png')}
        style={styles.startImage}
      />

      <Pressable style={styles.startButton1} onPress={StartProcess}>
        <Text style={styles.startButtonText1}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );

  return ui;

  function StartProcess() {
    navigation.navigate('Sign Up');
  }
}

const styles = StyleSheet.create({
  signUpMain: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: 20,
  },

  signInMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    // textAlign:'left',
  },
  startText2: {
    fontSize: 20,
    textAlign: 'center',
  },

  startImage: {
    width: 420,
    height: 340,
    // borderRadius: 50,
  },

  startButton1: {
    width: '85%',
    height: 50,
    backgroundColor: '#2802FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
  },
  startButtonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
