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



export function SignIn({navigation}) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <Text style={styles.signIntext1}>Hello, Welcome Back</Text>
      <Text style={styles.signIntext2}>
        Happy to see you again, to use your account please login first.
      </Text>
      <Image
        source={require('./images/Messaging_fun-amico.png')}
        style={styles.signInImage}
      />

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="mobile" />
        <TextInput
          style={styles.signInInput1}
          autoCorrect={false}
          inputMode={'numeric'}
          maxLength={10}
          placeholder={'Your Mobile'}
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="lock" />
        <TextInput
          style={styles.signInInput1}
          secureTextEntry={true}
          placeholder={'Your Password'}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.signInButton1} onPress={signInProcess}>
        <Text style={styles.signInButtonText1}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.signInButton2} onPress={signUpProcess}>
        <Text style={styles.signInButtonText1}>New User? Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );

  return ui;

  

  function n() {
    if (!mobile) {
      Alert.alert('Error Massage', 'Please Enter your Mobile Number');
    } else if (!password) {
      Alert.alert('Error Massage', 'Please Enter your Password');
    } 
  }

  function signInProcess() {
    // AsyncStorage.setItem("x","10");
    // const x = await AsyncStorage.getItem("x");
    // Alert.alert("Message", x);

    var jsRequestObject = {mobile: mobile, password: password};
    var jsonRequestText = JSON.stringify(jsRequestObject);

    var formData = new FormData();
    formData.append('jsonRequestText', jsonRequestText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var jsonResponseText = request.responseText;
        var jsResponseObject = JSON.parse(jsonResponseText);

        if (jsResponseObject.msg == 'Error') {
          // Alert.alert('Message', 'Invalid Details');
          n();
        } else {
          
          Alert.alert('Massage', 'Login Success');

          var userObject = jsResponseObject.user;

          AsyncStorage.setItem('user', JSON.stringify(userObject));

          navigation.navigate('Home');
        }
      }
    };
    request.open('POST', 'http://10.0.2.2/React_Chat/signIn.php', true);
    request.send(formData);
  }
  function signUpProcess() {
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
  signIntext1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  signIntext2: {
    fontSize: 19,
    textAlign: 'center',
  },

  signInImage: {
    width: 260,
    height: 230,
    
  },

  signInView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  signInIcon1: {
    fontSize: 20,
    position: 'absolute',
    start: 15,
  },

  signInInput1: {
    width: '80%',
    height: 50,
    fontSize: 18,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 35,
  },

  signInButton1: {
    width: '80%',
    height: 50,
    backgroundColor: '#2802FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInButton2: {
    width: '80%',
    height: 50,
    backgroundColor: '#2802FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInButtonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
