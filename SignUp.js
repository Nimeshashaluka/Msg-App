import {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable, 
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export function SignUp({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [country, setCountry] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [countries, setCountries] = useState('');

  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <Text style={styles.signUptext1}>Welcome to Chat Family</Text>
      <Text style={styles.signUptext2}>
        Before chatting, register for an account.
      </Text>
      <Pressable
        style={styles.signUpImagePicker}
        onPress={selectProfilePicture}>
        <Icon style={styles.signUpImageIcon} name="plus" />
      </Pressable>

      <View style={styles.signUpView1}>
        <Icon style={styles.signUpIcon1} name="user" />
        <TextInput
          style={styles.signUpInput1}
          autoCorrect={false}
          placeholder={'Name'}
          onChangeText={setName}
        />
      </View>

      <View style={styles.signUpView1}>
        <Icon style={styles.signUpIcon1} name="mobile" />
        <TextInput
          style={styles.signUpInput1}
          autoCorrect={false}
          inputMode={'numeric'}
          maxLength={10}
          placeholder={'Mobile Number'}
          onChangeText={setMobileNumber}
        />
      </View>

      <View style={styles.signUpView1}>
        <Icon style={styles.signUpIcon1} name="lock" />
        <TextInput
          style={styles.signUpInput1}
          secureTextEntry={true}
          placeholder={'Password'}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.signUpView1}>
        <Icon style={styles.signUpIcon1} name="lock" />
        <TextInput
          style={styles.signUpInput1}
          secureTextEntry={true}
          placeholder={'Re-Type Password'}
          onChangeText={setVerifyPassword}
        />
      </View>

      <View style={styles.signUpView1}>
        <Icon style={styles.signUpIcon1} name="map-marker" />
        <SelectDropdown
          buttonStyle={styles.signUpSelect}
          defaultButtonText={'Select Country'}
          data={countries}
          onSelect={setCountry}
        />
      </View>

      <Pressable style={styles.signUpButton1} onPress={signUpRequest}>
        <Text style={styles.signUpBtnText}>Sign Up</Text>
      </Pressable>
      <Pressable style={styles.signUpButton2} onPress={signInRequest}>
        <Text style={styles.signUpBtnText}>Back to Sign In</Text>
      </Pressable>
    </SafeAreaView>

   
  );

  function loadCountry() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var countryArray = JSON.parse(request.responseText);
        setCountries(countryArray);
      }
    };
    request.open('GET', 'http://10.0.2.2/React_Chat/load_countrise.php', true);
    request.send();
  }

  loadCountry();

  async function selectProfilePicture() {
    const options = {
      mediaType: 'photo',
      // camaraType: 'front',
    };

    const result = await launchImageLibrary(options);
    // const result = await launchCamera(options);

    if (result.didCancel) {
      Alert.alert('Error Message', 'No Image');
    } else {
      const imageObjet = {
        uri: result.assets[0].uri,
        name: 'profile.png',
        type: 'image/png',
      };

      Alert.alert('Message', 'Image Upload Success');

      setProfileImage(imageObjet);
    }
  }

  function n() {
    if (!profileImage) {
      Alert.alert('Error Massage', 'Please Select your profile image');
    } else if (!name) {
      Alert.alert('Error Massage', 'Please Enter your Name');
    } else if (!mobileNumber) {
      Alert.alert('Error Massage', 'Please Enter your Mobile Number');
    } else if (!password) {
      Alert.alert(
        'Error Massage',
        'Please Enter your Password',
      );
    } else if (password !== verifyPassword) {
      Alert.alert('Error Massage', 'Enter the same password again');
    } else if (!country) {
      Alert.alert('Error Massage', 'Please Select your Country');
    } else {
      Alert.alert('Massage', 'Account Successfully Created');
      navigation.navigate('Sign In');
    }
  }

  function signUpRequest() {
    var form = new FormData();
    form.append('mobile', mobileNumber);
    form.append('name', name);
    form.append('password', password);
    form.append('verifyPassword', verifyPassword);
    form.append('country', country);
    form.append('profile_picture', profileImage);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        if (request.responseText == '1') {
          navigation.navigate('Sign In');
          Alert.alert('Massage', 'User Registration Successful');
        } else {
          // Alert.alert('Error Massage', 'Enter your full details');
          n();
        }
      }
    };
    request.open('POST', 'http://10.0.2.2/React_Chat/signUp.php', true);
    request.send(form);
  }

  function signInRequest() {
    navigation.navigate('Sign In');
  }

  return ui;
}

const styles = StyleSheet.create({
  signUpMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 19,
    backgroundColor: '#FFFFFF',
  },
  signUptext1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  signUptext2: {
    fontSize: 18,
    marginTop: -15,
  },
  signUpImagePicker: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 1,
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpImageIcon: {
    fontSize: 24,
    position: 'absolute',
  },
  signUpImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  signUpView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpInput1: {
    width: '80%',
    height: 50,
    fontSize: 18,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    paddingStart: 40,
    justifyContent: 'center',
  },
  signUpIcon1: {
    fontSize: 20,
    position: 'absolute',
    start: 15,
    color: 'black',
  },
  signUpButton1: {
    width: '80%',
    height: 50,
    backgroundColor: '#2802FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
  },
  signUpButton2: {
    width: '80%',
    height: 50,
    backgroundColor: '#2802FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  signUpSelect: {
    width: '80%',
    height: 40,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    // paddingStart: 40,
  },
});

const styles2 = StyleSheet.create({
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: 20,
    paddingEnd: 10,
  },
  input1: {
    width: '60%',
    height: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingStart: 10,
  },
});
