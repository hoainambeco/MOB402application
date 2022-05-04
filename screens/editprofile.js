import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function editprofile({navigation, route}) {
  const {Info} = route.params;
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [User, setUserName] = React.useState('');
  const Password = Info.user.Password;
  const Role = Info.user.Role;
  return (
    <View>
      <ImageBackground source={require('./background.jpg')} style={styles.body}>
        <Text style={{color: '#D3D3D3', fontSize: 30}}>Đổi thông tin</Text>
        <TextInput
          placeholder={Info.user.FullName}
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => {
            text === '' ? setName(Info.user.FullName) : setName(text);
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder={Info.user.UserName}
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => {
            text === '' ? setUserName(Info.user.UserName) : setUserName(text);
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder={Info.user.Email === '' ? 'Email' : Info.user.Email}
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => {
            text === '' ? setEmail(Info.user.Email) : setEmail(text);
          }}
          style={styles.textInput}
        />
        <Text>
          <Text style={{color: '#D3D3D3'}}>Role: </Text>
          {Role}
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetch(`http://192.168.0.100:2410/public-api/user/edit`, {
                method: 'POST',
                headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `id=${Info.user._id}&FullName=${name}&UserName=${User}&Email=${email}&Password=${Password}&Role=${Role}`,
              })
                .then(response => response.json())
                .then(responseJson => {
                  console.log(responseJson);
                  if (responseJson.msg === 'Update success') {
                    navigation.navigate('profile', {Info: Info});
                  } else {
                    alert(responseJson.message);
                  }
                })
                .catch(error => {
                  alert(error);
                });
            }}>
            <Text style={styles.buttonText}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    margin: 10,
    color: '#D3D3D3',
    borderRadius: 20,
    paddingLeft: 20,
    borderColor: '#D3D3D3',
    fontSize: 15,
  },
  button: {
    height: 40,
  },
  buttonText: {
    color: '#D3D3D3',
    textAlign: 'center',
    fontSize: 20,
  },
});
