import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import SharedStyles from './styles';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function Index() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState<number>(0);  
  const [valid, setValid] = useState<boolean>(false);
  const [correctOTP, setCorrectOTP] = useState<number>();
  const router = useRouter();

  const goToHome = async () => {
    router.push('/(tabs)/Home');
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setCorrectOTP(otp);
    return otp;
  };

  const signIn = goToHome;

  return (
    <View style={SharedStyles.container}>
        <Text style={SharedStyles.textWhite}>Username:</Text>
        <TextInput 
            value={username}
            onChangeText={(newValue: string) => setUsername(newValue)}
            style={SharedStyles.inputText}
            placeholder="Enter your username"
            placeholderTextColor="#fff"
        />
        
        <Text style={SharedStyles.textWhite}>Email:</Text>
        <TextInput 
            value={email}
            onChangeText={(newValue: string) => {
                setEmail(newValue);
                setCorrectOTP(generateOTP()); 
            }}
            style={SharedStyles.inputText}
            placeholder="Enter your email address"
            placeholderTextColor="#fff"
        />

        <Text style={SharedStyles.textWhite}>One Time Password:</Text>
        <TextInput 
            value={OTP.toString()} 
            onChangeText={(newValue: string) => {
                // Handle empty values and backspaces
                const otpValue = newValue.trim() === "" ? 0 : parseInt(newValue, 10);
                if (!isNaN(otpValue)) {
                    setOTP(otpValue); 
                    setValid(otpValue === correctOTP); 
                } else {
                    setOTP(0);
                    setValid(false);
                }
            }}
            style={SharedStyles.inputText}
            placeholder="Enter your one time password"
            placeholderTextColor="#fff"
            keyboardType="numeric"
        />
    
        {valid ? (
            <View style={styles.footerContainer}>
                <Button 
                    onPress={signIn}
                    theme="primary" 
                    label="Sign in" />
            </View>
        ) : (
            <View style={styles.footerContainer}>
                <Text>{OTP === correctOTP ? 'OTP matches' : 'OTP does not match'}</Text>
                <Text>Entered OTP: {OTP}</Text>
                <Text>Correct OTP: {correctOTP}</Text>
            </View>
        )}
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
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});



// import { Text, View, StyleSheet, TextInput } from 'react-native';
// import { Image } from 'expo-image';
// import ImageViewer from '@/components/ImageViewer';
// import Button from '@/components/Button';
// import * as ImagePicker from "expo-image-picker";
// import { useState } from 'react';
// import IconButton from '@/components/IconButton';
// import CircleButton from '@/components/CircleButton';
// import { useRouter, Stack, Link} from 'expo-router';
// import SharedStyles from './styles';
// // import axios from 'axios';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


// export default function Index() {
//   const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
//   const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
//   const router = useRouter();
  
//   const goToHome = async () => {
//     router.push('/(tabs)/Home');
//   };

//   const signIn = goToHome; //UPDATE this to use sign in stuff later
//   const createAccount = goToHome; //ALSO UPDATE THIS  with create account stuff later

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [OTP, setOTP] = useState('');
//   const [valid, setValid] = useState<boolean>(false);
//   const [correctOTP, setCorrectOTP] = useState('');

//   return (
//     <View style={SharedStyles.container}>
//         <Text style = {SharedStyles.textWhite}> Username:</Text>
//         <TextInput 
//             value={username}
//             onChangeText = {(newValue: any) => {
//                 setUsername(newValue);
//             }}
//             style = {SharedStyles.inputText}
//             placeholder = {"Enter your username"}
//             placeholderTextColor = "#fff"
//         />
//         <Text style = {SharedStyles.textWhite}> Email:</Text>
//         <TextInput 
//             value={email}
//             onChangeText = {(newValue: any) => {
//                 setEmail(newValue);
//                 setCorrectOTP("password");
//             }}
//             style = {SharedStyles.inputText}
//             placeholder = {"Enter your email address"}
//             placeholderTextColor = "#fff"
//         />
//         <Text style = {SharedStyles.textWhite}> One Time Password:</Text>
//         <TextInput 
//             value={OTP}
//             onChangeText = {(newValue: any) => {
//                 setOTP(newValue);
//                 setValid(newValue===correctOTP);
//             }}
//             style = {SharedStyles.inputText}
//             placeholder = {"Enter your one time password"}
//             placeholderTextColor = "#fff"
//         />
    
//     {valid ? (<View style={styles.footerContainer}>
//       <Button 
//         onPress={signIn}
//         theme="primary" 
//         label="Sign in" />
//     </View>): (<View style={styles.footerContainer}>
//       <Text> {OTP===correctOTP} {OTP} {correctOTP}</Text> </View>)}

//   </View>
//   );
// }

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


