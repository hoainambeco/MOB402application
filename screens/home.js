import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function home({navigation, route}) {
  const {Info} = route.params;
  const [listComics, setListComics] = useState('');
  const [Refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    setRefreshing(false);
    getComics();
  }

  function getComics() {
    fetch(`http://192.168.0.100:2410/public-api/Comics`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        setListComics(responseJson);
      })

      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log('a' + Info);
    getComics();
  }, []);
  console.log('a   ' + Info);
  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <View style={{width: '100%', height: '100%'}}>
        <Text style={{fontSize: 20, color: 'black', margin: 10}}>
          Chào mừng {Info.user.FullName} đã quay trở lại
        </Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
          }
          data={listComics}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('comic', {id: item});
                }}>
                <View style={styles.container}>
                  <Image
                    source={{uri: item.AnhDaiDien}}
                    resizeMode="stretch"
                    style={{
                      width: '30%',
                      height: '100%',
                    }}
                  />
                  <View style={{color: '#FFF', marginLeft: 10}}>
                    <Text style={styles.text} numberOfLines={5}>
                      Tên: {item.Ten}
                    </Text>
                    <Text style={styles.text}>Thể Loại: {item.TheLoai}</Text>
                    <Text style={styles.text}>Tác giả: {item.TacGia}</Text>
                    <Text style={styles.text}>Tóm tắt: {item.NgayCapNhat}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: '900', color: '#FFF'}}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              navigation.navigate('profile', {Info: Info});
            }}>
            <Text style={{fontSize: 20, fontWeight: '900', color: 'black'}}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '99%',
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    minHeight: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    maxWidth: '80%',
    color: 'black',
    flex: 0.5,
    flexDirection: 'column',
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
});
