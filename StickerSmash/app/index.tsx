import React, { useState } from 'react';
import { View, Text, TextInput, Share } from 'react-native';
import { firebaseAuth } from '../firebase'; // Import the initialized firebaseAuth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import SharedStyles from './styles';
import ImageViewer from '@/components/ImageViewer';

function Authentication() {
  const PlaceholderImage = require('@/assets/images/emoji3.png'); //eventually update this to logo
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  
  const goToHome = async () => {
    router.push('/(tabs)/Home');
  };
  
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log('User account created & signed in!');
      goToHome();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('User signed in!');
      goToHome();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <View style={SharedStyles.container}>
      <ImageViewer imgSource={PlaceholderImage} selectedImage = {selectedImage}/>
      <><Text style={SharedStyles.textWhite}>Welcome to LookOut!</Text><Text style={SharedStyles.textBlue}>Explore your everyday surroundings today!</Text></> 
      <Text style = {SharedStyles.topLeftWhite}>
        Email:
      </Text>
      <TextInput 
        value={email} 
        onChangeText={setEmail}
        placeholder = {"Enter your email"}
        style = {SharedStyles.inputText} />
      <Text style = {SharedStyles.topLeftWhite}>
        Password:
      </Text>
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder = {"Enter your password"}
        style = {SharedStyles.inputText}
        secureTextEntry />
      <Button 
        label="Sign Up" 
        onPress={signUp} 
        theme = "primary"/>
      <Button 
        label="Sign In" 
        onPress={signIn} />
    </View>
  );
}

export default Authentication;