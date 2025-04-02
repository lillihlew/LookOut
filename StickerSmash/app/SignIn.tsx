import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { firebaseAuth } from '../firebase'; // Import the initialized firebaseAuth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'expo-router';

function Authentication() {
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
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('User signed in!');
      goToHome();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
}

export default Authentication;


// import { Text, View, TextInput, StyleSheet } from 'react-native';
// import { Image } from 'expo-image';
// import ImageViewer from '@/components/ImageViewer';
// import Button from '@/components/Button';
// import * as ImagePicker from "expo-image-picker";
// import React, { useState } from 'react';
// import IconButton from '@/components/IconButton';
// import CircleButton from '@/components/CircleButton';
// import { useRouter, Stack, Link} from 'expo-router';


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// import { getAuth, connectAuthEmulator, Auth } from "firebase/auth"; // Import getAuth and connectAuthEmulator

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB1wZaTO3IXSZS_iBJJq8HKTUCqKvUDOmI",
//   authDomain: "lookout-5fee5.firebaseapp.com",
//   projectId: "lookout-5fee5",
//   storageBucket: "lookout-5fee5.firebasestorage.app",
//   messagingSenderId: "191644762711",
//   appId: "1:191644762711:web:6559aa6606d8e5bcb75912",
//   measurementId: "G-SK87BDC73C"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firebase Authentication
// const firebaseAuth: Auth = getAuth(app);

// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(firebaseAuth, "http://localhost:9099");
// }

// export { firebaseAuth };




// const firestore = initializeFirestore(app, {
//   // Your Firestore settings
// });

// //THIS IS THE LINE THAT WILL MESS US UP LONG TERM BECAUSE THIS IS THE LINE THAT SAYS IT ONLY WORKS IN DEVELOPMENT NOT IN REAL LIFE
// //TO MAKE IT WORK IN REAL LIFE WE HAVE TO REJECT EXPO GO AND RECONFIGURE A BUNCH OF STUFF (AND I DON'T KNOW HOW YET)
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(firestore, 'localhost', 8080);
// }

// export { firestore };



// function Authentication() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [valid, setValid] = useState<boolean>(false);

//   const signUp = async () => {
//     try {
//       await firebaseAuth.createUserWithEmailAndPassword(email, password);
//       console.log('User account created & signed in!');
//       setValid(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   const signIn = async () => {
//     try {
//       await firebaseAuth.signInWithEmailAndPassword(email, password);
//       console.log('User signed in!');
//       setValid(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  // const router = useRouter();
  
  // const goToHome = async () => {
  //   router.push('/(tabs)/Home');
  // };

//   return (
//     <View>
//       <Text>Email:</Text>
//       <TextInput value={email} onChangeText={setEmail} />
//       <Text>Password:</Text>
//       <TextInput value={password} onChangeText={setPassword} secureTextEntry />
//       <Button 
//         label="Sign Up" 
//         onPress={() => {
//           signUp();
//           if(valid){
//             goToHome;
//           }
//           }} />
//       <Button label="Sign In" onPress={() => {
//         signIn();
//         if(valid){
//           goToHome;
//         }}} />
//     </View>
//   );
// }

// export default Authentication;




// // export default function Index() {
// //   const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
// //   const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
// //   const router = useRouter();
  
// //   const goToHome = async () => {
// //     router.push('/(tabs)/Home');
// //   };

// //   const signIn = goToHome; //UPDATE this to use sign in stuff later
// //   const createAccount = goToHome; //ALSO UPDATE THIS  with create account stuff later

// //   return (
// //     <View style={styles.container}>
     
    
// //     <View style={styles.footerContainer}>
// //       <Button 
// //         onPress={signIn}
// //         theme="primary" 
// //         label="Sign in" />
     
// //     </View>

// //   </View>
// //   );
// // }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
//   textWhite: {
//     color: '#fff',
//   },
//   textBlue: {
//     color: '#9ff'
//   },
//   button: {
//     fontSize: 20,
//     textDecorationLine: 'underline',
//     color: '#fff',
//   },
//   imageContainer: {
//     flex: 1,
//   },
//   image: {
//     width: 320,
//     height: 440,
//     borderRadius: 18,
//   },
//   footerContainer: {
//     flex: 1 / 3,
//     alignItems: 'center',
//   },
//   optionsContainer: {
//     position: 'absolute',
//     bottom: 80,
//   },
//   optionsRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
// });





// // import React from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// // const logo = require('@/assets/images/emoji3.png');
// // import Icon from '@expo/vector-icons/Ionicons';
// // import { useNavigation } from '@react-navigation/native';
// // import { Formik } from 'formik';
// // import * as yup from 'yup';


// // const loginValidationSchema = yup.object().shape({
// //   email: yup
// //     .string()
// //     .email('Please enter a valid email')
// //     .required('Email is required'),
// //   password: yup
// //     .string()
// //     .min(6, ({ min }) => `Password must be at least ${min} characters`)
// //     .required('Password is required'),
// // });

// // export default function Login() {
// //   const { token, user, saveToken, saveUser } = useAuth();
// //   const navigation = useNavigation();

// //   return (
// //     <View style={styles.container}>
// //       <Image source={logo} style={styles.logo} />
// //       <Text style={styles.title}>Login</Text>
// //       <Formik
// //         validationSchema={loginValidationSchema}
// //         initialValues={{ email: '', password: '' }}
// //         onSubmit={submit}
// //       >
// //         {({
// //           handleChange,
// //           handleBlur,
// //           handleSubmit,
// //           values,
// //           errors,
// //           touched,
// //           isValid,
// //         }) => (
// //           <>
// //             <View style={styles.inputContainer}>
// //               <Icon name="mail-outline" size={25} style={styles.icon} />
// //               <TextInput
// //                 style={styles.input}
// //                 placeholder="Email"
// //                 keyboardType="email-address"
// //                 onChangeText={handleChange('email')}
// //                 onBlur={handleBlur('email')}
// //                 value={values.email}
// //               />
// //             </View>
// //             {errors.email && touched.email && (
// //               <Text style={styles.errorText}>{errors.email}</Text>
// //             )}
// //             <View style={styles.inputContainer}>
// //               <Icon name="lock-closed-outline" size={25} style={styles.icon} />
// //               <TextInput
// //                 style={styles.input}
// //                 placeholder="Password"
// //                 secureTextEntry
// //                 onChangeText={handleChange('password')}
// //                 onBlur={handleBlur('password')}
// //                 value={values.password}
// //               />
// //             </View>
// //             {errors.password && touched.password && (
// //               <Text style={styles.errorText}>{errors.password}</Text>
// //             )}
// //             <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
// //               <Text style={styles.forgotPassword}>Forgot Password?</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={styles.button}
// //               onPress={handleSubmit}
// //               disabled={!isValid}
// //             >
// //               <Text style={styles.buttonText}>Login</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
// //               <Text style={styles.signUp}>
// //                 Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
// //               </Text>
// //             </TouchableOpacity>
// //           </>
// //         )}
// //       </Formik>
// //     </View>
// //   );

  
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     paddingHorizontal: 20,
// //   },
// //   logo: {
// //     height: 200,
// //     width: 200,
// //     resizeMode: 'contain',
// //     marginBottom: 20,
// //   },
// //   title: {
// //     fontSize: 32,
// //     marginBottom: 40,
// //     fontWeight: 'bold',
// //     color: 'black',
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width: '100%',
// //     height: 50,
// //     backgroundColor: '#f1f1f1',
// //     borderRadius: 8,
// //     paddingHorizontal: 10,
// //     marginBottom: 20,
// //   },
// //   icon: {
// //     marginRight: 10,
// //   },
// //   input: {
// //     flex: 1,
// //     height: '100%',
// //   },
// //   forgotPassword: {
// //     alignSelf: 'flex-end',
// //     marginBottom: 20,
// //     color: '#000',
// //   },
// //   button: {
// //     width: '100%',
// //     height: 50,
// //     backgroundColor: '#1E90FF',
// //     borderRadius: 8,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //   },
// //   signUp: {
// //     color: '#000',
// //   },
// //   signUpLink: {
// //     color: '#1E90FF',
// //   },
// //   errorText: {
// //     color: 'red',
// //     alignSelf: 'flex-start',
// //     marginBottom: 10,
// //   },
// // });


