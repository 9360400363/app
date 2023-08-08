import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
export default function Register({navigation}) {
  const [signupData, setSignupData] = useState({});

  const inputChange = (name, value) => {
    console.log('test', name, value);
    setSignupData({...signupData, [name]: value});
  };

  const handleClick = async () => {
    const userData = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
    };
    await axios
      .post("http://192.168.29.195:5000/api/auth/register", userData)
      .then((res)=>{
       if(res.status === 201){
        navigation.navigate('Login')
       }
      }).catch((err)=>{
        console.log('err',err)
      })
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              justifyContent: 'center',
            }}>
            Register
          </Text>
        </View>
        <View
          style={{
            fontSize: 20,
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <TextInput
            keyboardType="Name"
            placeholder="Name"
            aria-label="username"
            onChangeText={val => inputChange('username', val)}
          />
        </View>
        <View
          style={{
            fontSize: 20,
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <TextInput
            keyboardType="email"
            placeholder="@ email"
            aria-label="email"
            onChangeText={val => inputChange('email', val)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <TextInput
            secureTextEntry={true}
            placeholder="password"
            aria-label="password"
            onChangeText={val => inputChange('password', val)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleClick()}
          style={{padding: 20, marginBottom: 30, borderRadius: 10}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 25,
              backgroundColor: 'purple',
              color: 'white',
            }}>
            {' '}
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already register ?</Text>
          <TouchableOpacity>
            <Text  style={{color: '#AD40AF', fontWeight: '700'}}>
              {' '}
              login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
