import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import img from './wallhaven-g7vpo7_3666x5000.png';

export default function Splash() {
  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={img}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '20%',
            backgroundColor: 'rgba(226, 224, 224, 0.3)',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 30,
              color: 'black',
              opacity: 1,
            }}>
            Nguyễn Hoài Nam
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
