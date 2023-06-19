import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { tokenCheck } from './util/authHelper';
import DashboardScreen from './screens/private/DashboardScreen';
import PublicStackScreen from './stack/PublicStackScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { login, signout } from './store/loginSlice';

const Main = () => {

  const isLoggedIn = useSelector((state: RootState) => state.login);


  

  let dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  //eğer token VARSA ve expire olmamışsa dashboard, expire olmuşsa login page

  useEffect(() => {

    tokenCheck()
      .then(res => {
        if (res == true) {
          setloading(false);
          dispatch(login())
        }
        else {
          setloading(false);
          dispatch(signout())
        }
      })

  }, [])


  const openScreen = () => {

    if (!loading) {
      if (isLoggedIn.value) {
        return <DashboardScreen />
      }
      else {
        return <PublicStackScreen/>
      }
    }
    else {
      return <Text>loading...</Text>
    }

  }

  return (<>
      {
        openScreen()
      }
  </>
  )
}

export default Main