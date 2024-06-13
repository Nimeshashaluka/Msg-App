import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Chat({route, navigation}) {
  const [chatText, setChatText] = useState();

  const [id, setId] = useState(null);

  async function m() {
    var userJsonText = await AsyncStorage.getItem('user');
    var userJSObject = JSON.parse(userJsonText);
    setId(userJSObject.id);
  }
  m();

  const [chatHistory, setChatHistory] = useState([]);

  const ui = (
    <SafeAreaView style={styles.chat}>
      <View style={styles.chatHome}>
        <Text style={styles.chatText1}>{route.params.name}</Text>

        <Image
          source={require('./images/211830_telephone_icon.png')}
          style={styles.chatCall}
        />

        <Image
          source={require('./images/2559773_camera_media_video_icon.png')}
          style={styles.chatVideo}
        />
        <Image
          source={{
            uri: route.params.uri,
          }}
          style={styles.itemImage}
        />
      </View>

      <Image
          source={require('./images/th_(1).jpeg')}
          style={styles.chatImage}
        />      
        <FlatList
          data={chatHistory}
          renderItem={chatItem}
          style={styles.chatList}
        />
      

      <View style={styles.chatSendView}>
        <TextInput
          style={styles.chatInput1}
          autoCorrect={false}
          placeholder={'Type a message'}
          placeholderTextColor="#FFFFFF"
          onChangeText={setChatText}
        />

        <TouchableOpacity onPress={saveChat} style={styles.sendIcon}>
          <Icon name="send" style={styles.chatIcon1} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  loadChat();

  return ui;

  function loadChat() {
    const form = new FormData();
    form.append('id1', id);
    form.append('id2', route.params.id);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        // Alert.alert(responseText);
        setChatHistory(responseArray);
      }
    };
    request.open('POST', 'http://10.0.2.2/React_Chat/load_chat.php', true);
    request.send(form);
  }

  async function saveChat() {
    var userJsonText = await AsyncStorage.getItem('user');
    var fromUserObject = JSON.parse(userJsonText);

    var requestObject = {
      from_user_id: fromUserObject.id,
      to_user_id: route.params.id,
      message: chatText,
    };

    const formData = new FormData();
    formData.append('requestJSON', JSON.stringify(requestObject));

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
      }
    };
    request.open('POST', 'http://10.0.2.2/React_Chat/save_chat.php', true);
    request.send(formData);
  }
}

function chatItem({item}) {
  const itemUI = (
    <View
      style={item.side == 'Right' ? styles.chatViewRight : styles.chatViewLeft}>
      <Text>{item.msg}</Text>
      <View style={styles.chatView1}>
        <Text style={styles.chatText3}>{item.time}</Text>
        {item.side == 'Right' ? (
          <Icon
            name="check"
            size={14}
            style={
              item.status == 'seen' ? styles.chatIconSeen : styles.chatIconSent
            }
          />
        ) : null}
      </View>
    </View>
  );
  return itemUI;
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    alignItems: 'center',
  },
  chatText1: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 15,
    color: '#ffffff',
    fontFamily: 'DancingScript',
    // position:'absolute',
    marginLeft: 20,
  },
  chatHome: {
    backgroundColor: '#2802FF',
    width: '100%',
    height: 66,
  },
  chatCall: {
    width: 35,
    height: 40,
    position: 'absolute',
    marginTop: 10,
    marginLeft: 200,
  },
  chatVideo: {
    width: 30,
    height: 30,
    position: 'absolute',
    marginTop: 15,
    marginLeft: 260,
  },
  chatImage:{
    height:'81%',
    position:'absolute',
    marginTop:66,
  },
  chatText2: {
    fontSize: 20,
    paddingVertical: 10,
    color: '#2b2b2b',
    fontWeight: 'bold',
  },
  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatViewLeft: {
    backgroundColor: '#99f2c6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginEnd: 10,
    marginBottom: 10,
  },
  chatViewRight: {
    backgroundColor: '#C1E8FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginStart: 10,
    marginBottom: 10,
  },
  chatInput1: {
    width: '80%',
    height: 42,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 12,
    borderColor: '#ffffff',
    color: '#ffffff',
  },
  chatIcon1: {
    paddingHorizontal: 15,
    color: '#ffffff',
    fontSize: 26,
  },

  chatSendView: {
    width: '100%',
    backgroundColor: '#0000ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  chatText3: {
    fontSize: 11,
    color: '#2b2b2b',
  },
  chatIconSeen: {
    color: '#24a2ff',
    paddingLeft: 10,
  },
  chatIconSent: {
    color: 'grey',
    paddingLeft: 10,
  },
  chatList: {
    width: '100%',
    paddingVertical: 10,
  },
  itemImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: 320,
    marginTop: -55,
    // position:'absolute',
  },
});
