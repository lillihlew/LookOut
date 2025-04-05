
import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import { useRouter, Stack, Link} from 'expo-router';
import SharedStyles from './styles';



export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const router = useRouter();
  
  const goToHome = async () => {
    router.push('/(tabs)/Home');
  };

  const signIn = goToHome; //UPDATE this to use sign in stuff later
  const createAccount = goToHome; //ALSO UPDATE THIS  with create account stuff later

  return (
    <View style={styles.container}>
     
    
    <View style={styles.footerContainer}>
      <Button 
        onPress={signIn}
        theme="primary" 
        label="Sign in" />
     
    </View>

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
  textWhite: {
    color: '#fff',
  },
  textBlue: {
    color: '#9ff'
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});





// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// const logo = require('@/assets/images/emoji3.png');
// import Icon from '@expo/vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as yup from 'yup';


// const loginValidationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Please enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, ({ min }) => `Password must be at least ${min} characters`)
//     .required('Password is required'),
// });

// export default function Login() {
//   const { token, user, saveToken, saveUser } = useAuth();
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Image source={logo} style={styles.logo} />
//       <Text style={styles.title}>Login</Text>
//       <Formik
//         validationSchema={loginValidationSchema}
//         initialValues={{ email: '', password: '' }}
//         onSubmit={submit}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           isValid,
//         }) => (
//           <>
//             <View style={styles.inputContainer}>
//               <Icon name="mail-outline" size={25} style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 keyboardType="email-address"
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//               />
//             </View>
//             {errors.email && touched.email && (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             )}
//             <View style={styles.inputContainer}>
//               <Icon name="lock-closed-outline" size={25} style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//               />
//             </View>
//             {errors.password && touched.password && (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             )}
//             <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
//               <Text style={styles.forgotPassword}>Forgot Password?</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleSubmit}
//               disabled={!isValid}
//             >
//               <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//               <Text style={styles.signUp}>
//                 Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
//               </Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </Formik>
//     </View>
//   );

  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//   },
//   logo: {
//     height: 200,
//     width: 200,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 32,
//     marginBottom: 40,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 50,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//     color: '#000',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#1E90FF',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   signUp: {
//     color: '#000',
//   },
//   signUpLink: {
//     color: '#1E90FF',
//   },
//   errorText: {
//     color: 'red',
//     alignSelf: 'flex-start',
//     marginBottom: 10,
//   },
// });


