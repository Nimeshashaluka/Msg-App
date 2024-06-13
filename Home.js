import React, {useEffect} from 'react';
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
import { LogOut } from './LogOut';

export function Home({navigation}) {
  const [searchText, setSearchText] = useState('');

  const [items, setItem] = useState([
    // {
    //   pic: 'https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png',
    //   name: 'Sahan Perera',
    //   msg: 'Hi',
    //   time: '9:15 PM',
    //   count: '2',
    // },
  ]);

  async function loadFreindList(text) {
    const userJSONText = await AsyncStorage.getItem('user');
    const formData = new FormData();
    formData.append('userJSONText', userJSONText);
    formData.append('text', text);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItem(JSON.parse(request.responseText));
        // Alert.alert("m", request.responseText);
      }
    };
    request.open('POST', 'http://10.0.2.2/React_Chat/load_users.php', true);
    request.send(formData);
  }

  const ui = (
    <SafeAreaView style={styles.home}>
      <View style={styles.homeChat}>
        <Text style={styles.homeText}>Chats</Text>
        <View style={styles.homeView1}>
          <TextInput
            style={styles.homeInput1}
            autoCorrect={false}
            onChangeText={p}
            // onChangeText={text => loadFreindList(text)}
          />
          <Icon
            name="search"
            size={25}
            color="#FFFFFF"
            style={styles.homeInputImage}
          />

          <Pressable onPress={logOut}>
          <Image
            source={require('./images/8679841_logout_box_r_line_icon.png')}
            style={styles.LogoutImage}
            
            
          />
          </Pressable>
          
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={homeItemUI}
        style={styles.homeItemList}
      />
    </SafeAreaView>
  );

  function start() {
    loadFreindList('');
  }

  function p(text) {
    loadFreindList(text);
  }

  useEffect(start, []);

  function homeItemUI({item}) {
    const ui = (
      <TouchableOpacity style={styles.item} onPress={m}>
        <Image
          source={{uri: 'http://10.0.2.2/React_Chat/' + item.pic}}
          style={styles.itemImage}
        />
        <View style={styles.itemView1}>
          <Text style={styles.itemText1}>{item.name}</Text>
          <Text style={styles.itemText2}>{item.msg}</Text>
        </View>
        <View style={styles.itemView2}>
          <Text style={styles.itemText3}>{item.time}</Text>
          <View style={styles.itemShape}>
            <Text style={styles.itemText4}>{item.count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    function m() {
      // Alert.alert('Message', 'Success');

      const obj = {
        name: item.name,
        id: item.id,
        uri: 'http://10.0.2.2/React_Chat/' + item.pic,
      };

      navigation.navigate('Chat', obj);
    }

    return ui;
  }

  function logOut(){
    navigation.navigate('LogOut');

  }

  return ui;
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'#ff8000',
  },

  homeText: {
    fontSize: 24,
    paddingVertical: 15,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 20,
  },

  homeInput1: {
    height: 45,
    borderStyle: 'solid',
    borderWidth: 2,
    width: '60%',
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 60,
    borderColor: '#ffffff',
    marginLeft: 95,
    marginTop: -62,
    color: '#ffffff',
    // backgroundColor:'#ff8000',
  },
  homeItemList: {
    // backgroundColor: '#ff0000',
  },
  homeChat: {
    backgroundColor: '#2802FF',
    width: '100%',
    height: '11%',
    
  },
  LogoutImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    marginLeft: 20,
    top: -45,
  },

  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'#ff8000',
  },

  homeInputImage: {
    position: 'absolute',
    right: 80,
    top: -45,

    // backgroundColor:'#80ff00',
  },

  homeInput1Image: {
    position: 'absolute',
    end: 20,
    // backgroundColor:'#ff8000',
  },

  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
    // backgroundColor:'#80ff00',
  },

  item: {
    flexDirection: 'row',
    padding: 5,
    borderColor: '#2802FF',
    backgroundColor:'#ffffff',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom:1,
    marginTop:5,
    gap: 6,
  },

  itemText1: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    // backgroundColor:'#ff8000',
  },

  itemText2: {
    fontSize: 16,
    color: '#808080',
    // backgroundColor:'#ff8000',
  },

  itemText3: {
    fontSize: 14,
    color: '#0f0f0f',
    paddingBottom: 5,
    // backgroundColor:'#ff8000',
  },

  itemText4: {
    fontSize: 14,
    color: 'white',
    // backgroundColor:'#ff8000',
  },
  itemShape1: {
    width: 22,
    height: 22,
    backgroundColor: '#00a3f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemShape: {
    width: 22,
    height: 22,
    backgroundColor: '#2675EC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemView1: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: '60%',
  },

  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '20%',
    // backgroundColor:'#ffff00',
  },
});
