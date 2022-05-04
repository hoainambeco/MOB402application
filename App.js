import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import splash from './screens/splash';
import login from './screens/login';
import signup from './screens/signup';
import home from './screens/home';
import profile from './screens/profile';
import editprofile from './screens/editprofile';
import editpassword from './screens/editpassword';
import comic from './screens/comic';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplashScreen ? (
          <Stack.Screen
            name="splash"
            component={splash}
            options={{headerShown: false}}
          />
        ) : null}
        <Stack.Screen
          name="login"
          component={login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="home"
          component={home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="comic"
          component={comic}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="profile"
          component={profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="editprofile"
          component={editprofile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="editpassword"
          component={editpassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={signup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
