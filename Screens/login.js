import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useContext} from 'react';
import AuthProvider, {AuthContext} from '../AuthContext';
import InputField from '../Commponents/InputField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [logindata, setLogindata] = useState({});
  const Inputchange = (name, value) => {
    setLogindata({...logindata, [name]: value});
  };
  const handleChange = () => {
    console.log('res', logindata);
    const userData = {
      username: logindata.username,
      password: logindata.password,
    };
    axios.post("http://192.168.29.195:5000/api/auth/login",userData).then((res)=>{
      if(res.status === 200){
        AsyncStorage.setItem("token","accesstoken")
      }
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
            Login
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
            keyboardType="email-address"
            placeholder="@ Email"
            onChangeText={val => Inputchange('username', val)}
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
            secureTextEntry={true}
            placeholder="password"
            onChangeText={val => Inputchange('password', val)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleChange()}
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
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
