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

export default function login({navigation}) {
  const [User, setUserName] = React.useState('');
  const [Pass, setPassword] = React.useState('');
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@Info', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Info');
      console.log('   a ' + jsonValue.token);
      // if (JSON.parse(jsonValue).length === 0) {
      // } else {
      //   navigation.navigate('home', {Info: JSON.parse(jsonValue)});
      // }
      if (JSON.parse(jsonValue).token) {
        fetch(`http://192.168.0.100:2410/public-api/loginToken`, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `tokens=${JSON.parse(jsonValue).token}`,
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log('token : ' + responseJson);
            if (responseJson.message === 'Login success') {
              storeData(responseJson).then(r => {
                console.log(r);
              });
              console.log(responseJson);
              navigation.navigate('home', {Info: responseJson});
            } else {
              alert(
                responseJson.message +
                  '\nBạn đã bị đăng xuất khỏi tất cả các thiết bị',
              );
              storeData('').then(r => {
                console.log(r);
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <ImageBackground source={require('./background.jpg')} style={styles.body}>
        <Text style={{color: '#D3D3D3', fontSize: 30}}>Đăng nhập</Text>
        <TextInput
          placeholder="User name"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setUserName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          password={true}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          secureTextEntry={true}
          passwordRules={true}
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('signup')}>
            <Text
              style={{
                textAlign: 'left',
                float: 'left',
                color: '#D3D3D3',
              }}>
              register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetch(`http://192.168.0.100:2410/public-api/login`, {
                method: 'POST',
                headers: {
                  Accept: '*/*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `UserName=${User}&Password=${Pass}`,
              })
                .then(response => response.json())
                .then(responseJson => {
                  console.log(responseJson);
                  if (responseJson.message === 'Login success') {
                    storeData(responseJson).then(r => {
                      console.log(r);
                    });
                    navigation.navigate('home', {Info: responseJson});
                  } else {
                    alert(responseJson.message);
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            }}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
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
