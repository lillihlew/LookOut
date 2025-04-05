import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  label: string;
  theme: string;
  onPress?: () => void;
};



export default function Button({ label, theme, onPress}: Props) {
  if (theme === 'photo') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  else if (theme === 'date') {
      return (
        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
          ]}>
          <Pressable
            style={[styles.button, { backgroundColor: '#fff' }]}
            onPress={onPress}>
            <Fontisto name="date" size={24} color="black" />
            <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
          </Pressable>
        </View>
      );
    }
  
    else if (theme === 'Private') {
      return (
        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
          ]}>
          <Pressable
            style={[styles.button, { backgroundColor: '#fff' }]}
            onPress={onPress}>
            <AntDesign name="lock1" size={24} color="black" />
            <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
          </Pressable>
        </View>
      );
    }

    else if (theme === 'Public') {
      return (
        <View
          style={[
            styles.buttonContainer,
            { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
          ]}>
          <Pressable
            style={[styles.button, { backgroundColor: '#fff' }]}
            onPress={onPress}>
            <AntDesign name="unlock" size={24} color="black" />
            <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
          </Pressable>
        </View>
      );
    }

  return (
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
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonU:{
    color:'#fff',
    fontSize:16,
    textDecorationLine: 'underline',
  }
});
