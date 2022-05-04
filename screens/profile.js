import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import HeaderTabs from '../components/HeaderTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function profile({navigation, route}) {
  const [activeTab, setActiveTab] = useState('Profile');
  const {Info} = route.params;
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@Info', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  let chucvu = Info.user.Role === 'Admin' ? 'Quản trị viên' : 'Người dùng';
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View
        style={{
          borderRadius: 50,
          borderColor: 'gray',
          margin: 10,
          borderWidth: 1,
          paddingLeft: 40,
        }}>
        <Text style={styles.TT}>Họ và tên: {Info.user.FullName}</Text>
        <Text style={styles.TT}>Tên đăng nhập: {Info.user.UserName}</Text>
        <Text style={styles.TT}>Email: {Info.user.Email}</Text>
        <Text style={styles.TT}>Chức vụ: {chucvu}</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          margin: 10,
          width: '100%',
          height: 466,
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('editpassword', {Info: Info});
          }}>
          <Text style={styles.TT}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('editprofile', {Info: Info});
          }}>
          <Text style={styles.TT}>Đổi thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            fetch(`http://192.168.0.100:2410/public-api/user/logout`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `${Info.token}`,
              },
            }).then(r => {
              if (r.status === 200) {
                storeData(null).then(r => {
                  console.log(r);
                });
                navigation.navigate('login');
              }
            });
          }}>
          <Text style={styles.TT}>Đăng xuất</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            fetch(`http://192.168.0.100:2410/public-api/user/logout-all`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `${Info.token}`,
              },
            }).then(r => {
              console.log(r);
              storeData('').then(r => {
                console.log(r);
              });
              navigation.navigate('login');
            });
          }}>
          <Text style={styles.TT}>Đăng xuất tất cả</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          bottom: 0,
          flex: 1,
        }}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate('home', {Info: Info});
          }}>
          <Text style={{fontSize: 20, fontWeight: '900', color: 'black'}}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('profile', {Info: Info});
          }}>
          <Text style={{fontSize: 20, fontWeight: '900', color: '#FFF'}}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TT: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  button2: {
    backgroundColor: '#EEE',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  btn: {
    width: '60%',
    borderRadius: 50,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    margin: 10,
  },
});
