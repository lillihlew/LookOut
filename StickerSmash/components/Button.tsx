import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  label: string;
  theme: 'photo' | 'date' | 'Private' | 'Public' | 'info' | 'reset' | 'done' | 'back' | 'add' | 'signin' | 'signout' | 'settings';
  onPress?: () => void;
  // color: 'valid'|'invalid'|'null';
};

const iconMapping = {
  photo: <FontAwesome name="picture-o" size={18} color="#25292e" />,
  date: <Fontisto name="date" size={24} color="black" />,
  Private: <AntDesign name="lock1" size={24} color="black" />,
  Public: <AntDesign name="unlock" size={24} color="black" />,
  info: <Ionicons name="information-circle-outline" size={24} color="black" />,
  reset: <EvilIcons name="undo" size={24} color="black" />,
  done: <MaterialIcons name="done" size={24} color="black" />,
  back: <Ionicons name="arrow-back" size={24} color="black" />,
  add: <Ionicons name="add" size={24} color="black" />,
  signin: <FontAwesome name="sign-in" size={24} color="black" />,
  signout: <FontAwesome name="sign-out" size={24} color="black" />,
  settings: <Ionicons name="settings-outline" size={24} color="black" />,
};

const colorMapping = {
  photo: '#cbff7c',
  date: '#cbff7c',
  Private: '#cbff7c',
  Public: '#cbff7c',
  info: '#589100',
  reset: '#589100',
  done: '#589100',
  back: '#589100',
  add: '#589100',
  signin: '#589100',
  signout: '#589100',
  settings: '589100',
};

export default function Button({ label, theme, onPress}: Props) { 
  const renderIcon = iconMapping[theme] || null;
  let renderColor = colorMapping[theme];
  if (theme === null) renderColor = styles.button.backgroundColor;

    if(theme !== null){
      return (
        <View
          style={[
            styles.buttonContainer,
          ]}>
          <Pressable
            style={[styles.button, { backgroundColor: renderColor }]}
            onPress={onPress}>
            {renderIcon}
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
      );
  } else return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonU}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#c7e9c0",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#25292e',
    fontSize: 16,
  },
  buttonU:{
    color:'#fff',
    fontSize:16,
    textDecorationLine: 'underline',
  }
});
