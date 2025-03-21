import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Welcome to LookOut!</Text>
      <Text style={styles.text2}>Look out into your everyday surroundings!!</Text>
      <Text style={styles.text2}>Explore Your sorroundings today!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: '#fff',
  },
  text2: {
    color: '#9ff'
  }
});
