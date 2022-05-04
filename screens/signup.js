import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';

export default function signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [User, setUserName] = React.useState('');
  const [Pass, setPassword] = React.useState('');
  const [CPass, setCPassword] = React.useState('');
  return (
    <View>
      <ImageBackground source={require('./background.jpg')} style={styles.body}>
        <Text style={{color: '#D3D3D3', fontSize: 30}}>Đăng ký</Text>
        <TextInput
          placeholder="Full name"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="User name"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setUserName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setEmail(text)}
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
        <TextInput
          placeholder="Confirm Password"
          password={true}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          secureTextEntry={true}
          passwordRules={true}
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setCPassword(text)}
          style={styles.textInput}
        />
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (Pass === CPass) {
                fetch(`http://192.168.0.100:2410/public-api/reg`, {
                  method: 'POST',
                  headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `FullName=${name}&UserName=${User}&Email=${email}&Password=${Pass}&Role=User`,
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(responseJson);
                    if (responseJson.user.FullName === name) {
                      navigation.navigate('login');
                    } else {
                      alert(responseJson.message);
                    }
                  })
                  .catch(error => {
                    alert(error);
                  });
              } else {
                alert('Password not match');
              }
            }}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
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
