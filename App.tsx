import { View, Text, Button, SafeAreaView, NativeModules } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import Main from './Main'
import { store } from './store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'



const App = () => {

  const {CalendarModule} = NativeModules;

  
  const addCalendar = () => {
    CalendarModule.createCalendarEvent("çağatay","ali")
  }
  
  return (<>
  <Button title='Add Calendar Event' onPress={addCalendar}></Button>
  {/* <BigListSample/> */}
    {/* <UploadSampe /> */}
    {/* <NavigationContainer>
      <Provider store={store}>
        <Main/>
      </Provider>
    </NavigationContainer> */}
  </>
  )
}

export default App



import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'
import BigListSample from './screens/public/BigListSample'

const UploadSampe = () => {

  const [file, setfile] = useState<any>({})

  let options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose Photo from Custom Option'
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


  const upload = () => {
    launchImageLibrary({
      mediaType: 'photo'
    }, setfile)

  }


  const postFile = () => {
    
    const formData = new FormData();
    // formData.append("profileImg", file.assets[0].uri);
    formData.append("profileImg", {
      uri: file.assets[0].uri,
      name: file.assets[0].fileName,
      type: file.assets[0].type,
    });

    formData.append('userId',3)

    axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  }

  return (<SafeAreaView>
    <Button title='upload' onPress={upload}></Button>
    <Button title='POST' onPress={postFile}></Button>

  </SafeAreaView>)

}



