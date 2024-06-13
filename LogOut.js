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



export function LogOut({navigation}) {


  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <Text style={styles.logoutText1}>Log Out</Text>
      <Text style={styles.logoutText2}>Do you shut down your account?</Text>
     
      <Pressable style={styles.logoutButton1} onPress={logOut}>
        <Text style={styles.logoutButtonText1}>Yes</Text>
      </Pressable>
      <Pressable style={styles.logoutButton2} onPress={backHome}>
        <Text style={styles.logoutButtonText1}>No</Text>
      </Pressable>

    </SafeAreaView>
  );

  return ui;


  function logOut(){
    navigation.navigate('Sign In');

  }

  function backHome(){
    navigation.navigate('Home');

  }
}



const styles = StyleSheet.create({
  

  signUpMain: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    gap: 20,
  },
  logoutText1:{
    fontSize:32,
    fontWeight:'bold',
    color:'#000000',
    // padding:5,
  

  }, logoutText2:{
    fontSize:19,
    textAlign:'center',
    padding:10,
    

  },
  logoutButton1: {
    width: '80%',
    height: 50,
    backgroundColor: '#00d500',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButton2: {
    width: '80%',
    height: 50,
    backgroundColor: '#ff0000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
