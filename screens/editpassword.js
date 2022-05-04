import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function editpassword({navigation, route}) {
  const {Info} = route.params;
  const [oldpassword, setOldpassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmpassword, setConfirmpassword] = React.useState('');
  return (
    <View>
      <ImageBackground source={require('./background.jpg')} style={styles.body}>
        <Text style={{color: '#D3D3D3', fontSize: 30}}>Đổi mật khẩu</Text>
        <TextInput
          placeholder="Nhập mật khẩu cũ"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setOldpassword(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Nhập mật khẩu mới"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Nhập lại mật khẩu mới"
          placeholderTextColor={'#D3D3D3'}
          onChangeText={text => setConfirmpassword(text)}
          style={styles.textInput}
        />
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (password === confirmpassword) {
                fetch(`http://192.168.0.100:2410/public-api/user/editPass`, {
                  method: 'POST',
                  headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `id=${Info.user._id}&Password=${oldpassword}&NewPassword=${password}`,
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
              } else {
                alert('Mật khẩu mới không khớp');
              }
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
