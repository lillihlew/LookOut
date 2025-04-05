import { Text, View, StyleSheet } from 'react-native';
import SharedStyles from '../styles';
import DisplayEvent from '@/components/DisplayEvent'
import { useState } from 'react';

const placeholderImage = require('@/assets/images/background-image.png');

export default function Favorites() {
  let [placeholderDate] = useState(new Date());
  let placeholderTitle = "Title";
  let placeholderDescription = "Description";
  let [placeholderPrivacy] = useState<boolean>(true);

  return (
    <View style={SharedStyles.container}>
      <Text style={SharedStyles.textWhite}>About screen</Text>
      <DisplayEvent 
        selectedImage = {placeholderImage} 
        selectedDate = {placeholderDate} 
        selectedTitle = {placeholderTitle} 
        selectedDescription = {placeholderDescription} 
        selectedPrivacyOn = {placeholderPrivacy}></DisplayEvent>
    </View>
  );
}