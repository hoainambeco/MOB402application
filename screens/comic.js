import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function comic({navigation, route}) {
  const {id} = route.params;
  const [comic, setComic] = useState({});
  const [comicData, setComicData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    setRefreshing(false);
    getComics();
  }

  function getComics() {
    setComic('');
    fetch(`http:192.168.0.100:2410/public-api/Comics/${id._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setComic(responseJson);
        console.log(responseJson);
        setComicData(responseJson.image_detail);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getComics();
  }, []);
  return (
    <View style={{width: '100%', height: '100%'}}>
      <ImageBackground source={require('./background.jpg')}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={() => {
            return (
              <View style={{padding: 10}}>
                <Image
                  source={{uri: comic.AnhDaiDien}}
                  style={{width: '100%', height: 200}}
                  resizeMode="contain"
                />
                <Text style={styles.text}>Tên: {comic.Ten}</Text>
                <Text style={styles.text}>Thể Loại: {comic.TheLoai}</Text>
                <Text style={styles.text}>Tác giả: {comic.TacGia}</Text>
                <Text style={styles.text}>Tóm tắt: {comic.NgayCapNhat}</Text>
              </View>
            );
          }}
          data={comicData}
          renderItem={({item}) => {
            console.log('itema' + item);
            return (
              <View>
                <Image
                  source={{uri: `http://192.168.0.100:2410${item}`}}
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    height: 500,
                  }}
                />
              </View>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
  },
});
