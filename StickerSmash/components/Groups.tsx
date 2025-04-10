// import { Keyboard, SafeAreaView, ScrollView, TextInput, View, Text, Alert } from "react-native";
// import SharedStyles from "@/app/styles";
// import Button from "./Button";
// import { collection, addDoc, serverTimestamp, updateDoc, doc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../firebaseConfig';
// import { useState } from "react";
// import PublicOrPrivate from "./PublicOrPrivate";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import ViewGroups from "./ViewGroups"

// async function createGroup(
//     name: string, 
//     privacy: boolean, 
//     inviteCode: string) {
//     try {
//       if (!auth.currentUser) {
//         throw new Error("No user is currently signed in.");
//       }
//       const groupData = {
//         name: name,
//         groupCreatorid: auth.currentUser.uid,
//         createdAt: serverTimestamp(),
//         members: [auth.currentUser.uid],
//         privacy: privacy,
//         inviteCode: inviteCode
//       }
      
//       const groupRef = await addDoc(collection(db, "groups"), groupData);
//       const userRef = doc(db, "UserCol", auth.currentUser.uid);
//       await updateDoc(userRef, {
//         groups: arrayUnion(groupRef.id), 
//     });
//     return groupRef.id;

//     } catch (error: any) {
//         console.error("Error creating group:", error);
//         throw error; 
//     }
// }

// async function joinGroup(groupId: string) {
//     try {
//       if (!auth.currentUser) {
//         throw new Error("No user is currently signed in.");
//       }
  
//       const userId = auth.currentUser.uid;
  
//       // 1. Update the group document to add the user to the 'members' array
//       const groupRef = doc(db, "groups", groupId);
//       await updateDoc(groupRef, {
//         members: arrayUnion(userId),
//       });
  
//       // 2. Update the user's document to add the group ID to their 'groups' array
//       const userRef = doc(db, "UserCol", userId);
//       await updateDoc(userRef, {
//         groups: arrayUnion(groupId),
//       });
  
//       console.log("User joined group successfully.");
//     } catch (error: any) {
//       console.error("Error joining group:", error);
//       throw error; // Re-throw the error for UI handling
//     }
// }
  
// const handleJoinGroup = async (groupIdToJoin: string) => {
//     try {
//       await joinGroup(groupIdToJoin); // Assuming you have a way to get the group ID
//       Alert.alert("Success", "Successfully joined the group!"); // Optional: Show a success message
//     } catch (error: any) {
//       Alert.alert("Error", "Failed to join group: " + error.message);
//     }
//   };


// const dismissKeyboard = () => {
//         Keyboard.dismiss();  // This dismisses the keyboard when called
//     };

    
// export default function Groups(){//{usingGroups, setUsingGroups}: GroupsProps) {
//     const[name, setName] = useState('');
//     const[privacy, setPrivacy] = useState<boolean>(false);
//     const[inviteCode, setInviteCode] = useState('');
//     const[makingNewGroup, setMakingNewGroup] = useState<boolean>(false);
//     const[viewGroups, setViewGroups] = useState<boolean>(false);
//     const[viewGroupsLabel, setViewGroupsLabel] = useState('View Existing Groups');
//     const[newGroupButtonLabel, setNewGroupButtonLabel] = useState('Create New Group');
//     const[usingJoinGroup, setUsingJoinGroup] = useState<boolean>(false);
//     const[groupIdToJoin, setGroupIdToJoin] = useState(''); // New state for group ID input


//     const toggleMakingNewGroup= () => {
//         setMakingNewGroup(!makingNewGroup);
//         if(newGroupButtonLabel==='Create New Group'){
//             setNewGroupButtonLabel('Stop Creating New Group');
//         }else{
//             setNewGroupButtonLabel('Create New Group');
//             resetGroup();
//         }
//     }

//     const toggleViewGroups= () => {
//         setViewGroups(!viewGroups);
//         if(viewGroupsLabel==='View Existing Groups'){
//             setViewGroupsLabel('Stop Viewing Existing Groups');
//         }else{
//             setViewGroupsLabel('View Existing Groups');
//         }
//     }

//     const resetGroup = () => {
//         setName('');
//         setPrivacy(false);
//         setInviteCode('');
//     }

//     const toggleJoinGroupLabel = () =>{
//         setUsingJoinGroup(!usingJoinGroup);
//     }
    

//  return(
//     <View>
//         <Button
//         label = {newGroupButtonLabel}
//         theme = "newGroup"
//         onPress = {() => {
//             toggleMakingNewGroup();
//         }}
//         />
//         <Button
//         label = {viewGroupsLabel}
//         theme = "groups"
//         onPress = {() => {
//             toggleViewGroups();
//         }}
//         />
//         <Button
//         label = 'Join an Existing Group'
//         theme = "add"
//         onPress = {() => {
//             toggleJoinGroupLabel();
//         }}
//         />
//         {viewGroups ? (
//             <ViewGroups/>
//             ) : (<View/>)}
//          {usingJoinGroup ? 
//          (<View>
//           <TextInput
//             style={SharedStyles.inputText}
//             placeholder="Enter Group ID to Join"
//             placeholderTextColor="#25292e"
//             value={groupIdToJoin}
//             onChangeText={setGroupIdToJoin}
//             returnKeyType="done"
//             onSubmitEditing={dismissKeyboard}
//             maxLength={50}
//           />
//           <Button
//             label="Join Group"
//             theme="add"
//             onPress={() => handleJoinGroup(groupIdToJoin)}
//             disabled={!groupIdToJoin} // Disable if the group ID is empty
//           />
//         </View>) : (<View/>)}
//         {makingNewGroup ? (
//             <View>
//                 <TextInput 
//                     value={name}
//                     onChangeText = {(newValue: any) => {
//                         setName(newValue);
//                     }}
//                     style = {SharedStyles.inputText}
//                     placeholder = {"Enter your group name"}
//                     placeholderTextColor = "#25292e"
//                     returnKeyType="done"
//                     onSubmitEditing={dismissKeyboard}
//                     maxLength={50}
//                 />
//                 <TextInput 
//                     value={inviteCode}
//                     onChangeText = {(newValue: any) => {
//                         setInviteCode(newValue);
//                     }}
//                     style = {SharedStyles.inputText}
//                     placeholder = {"Enter your invite code"}
//                     placeholderTextColor = "#25292e"
//                     returnKeyType="done"
//                     onSubmitEditing={dismissKeyboard}
//                     maxLength={50}
//                 />
//                 <PublicOrPrivate
//                     selectedPrivacyOn = {privacy}
//                     setSelectedPrivacyOn ={setPrivacy}
//                     />
//                 <Button
//                     label = "Create Group"
//                     disabled = {((inviteCode==='')||(name===''))}
//                     theme = "newGroup"
//                     onPress = {() => {
//                         createGroup(name, privacy, inviteCode);
//                         toggleMakingNewGroup();
//                         console.log("making a group");
//                     }}
//                     />
//                 <Button
//                     onPress={()=>{
//                         resetGroup();}}
//                     theme="reset" 
//                     label="Reset Group Information" />
//                 <Button
//                     onPress={()=>{
//                         resetGroup();
//                         toggleMakingNewGroup();}}
//                     theme="back" 
//                     label="Back to Settings Without Saving" />
//             </View>
//               ) : (<View/>)}

        
//     </View>
//  );   
// }




import { Keyboard, SafeAreaView, ScrollView, TextInput, View, Text, Alert } from "react-native";
import SharedStyles from "@/app/styles";
import Button from "./Button";
import { collection, addDoc, serverTimestamp, updateDoc, doc, arrayUnion, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useState } from "react";
import PublicOrPrivate from "./PublicOrPrivate";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ViewGroups from "./ViewGroups"

async function createGroup(
    name: string, 
    privacy: boolean, 
    inviteCode: string) {
    try {
      if (!auth.currentUser) {
        throw new Error("No user is currently signed in.");
      }
      const groupData = {
        name: name,
        groupCreatorid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        members: [auth.currentUser.uid],
        privacy: privacy,
        inviteCode: inviteCode
      }
      
      const groupRef = await addDoc(collection(db, "groups"), groupData);
      const userRef = doc(db, "UserCol", auth.currentUser.uid);
      await updateDoc(userRef, {
        groups: arrayUnion(groupRef.id), 
    });
    return groupRef.id;

    } catch (error: any) {
        console.error("Error creating group:", error);
        throw error; 
    }
}

async function joinGroup(groupId: string) {
    try {
      if (!auth.currentUser) {
        throw new Error("No user is currently signed in.");
      }
  
      const userId = auth.currentUser.uid;
  
      // 1. Update the group document to add the user to the 'members' array
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(userId),
      });
  
      // 2. Update the user's document to add the group ID to their 'groups' array
      const userRef = doc(db, "UserCol", userId);
      await updateDoc(userRef, {
        groups: arrayUnion(groupId),
      });
  
      console.log("User joined group successfully.");
    } catch (error: any) {
      console.error("Error joining group:", error);
      throw error; // Re-throw the error for UI handling
    }
}

// New function to find a group by name and invite code
async function findGroupByNameAndInviteCode(groupName: string, inviteCode: string) {
    try {
      const groupsRef = collection(db, "groups");
      const q = query(
        groupsRef,
        where("name", "==", groupName),
        where("inviteCode", "==", inviteCode)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        return null; // Group not found
      }
  
      // Assuming there's only one group with the same name and invite code
      const groupDoc = querySnapshot.docs[0];
      return groupDoc.id; // Return the group ID
    } catch (error: any) {
      console.error("Error finding group:", error);
      return null;
    }
  }
  
const handleJoinGroup = async (groupName: string, inviteCode: string) => {
    try {
      const groupId = await findGroupByNameAndInviteCode(groupName, inviteCode);
  
      if (groupId) {
        await joinGroup(groupId);
        Alert.alert("Success", "Successfully joined the group!");
      } else {
        Alert.alert("Error", "Group not found with the given name and invite code.");
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to join group: " + error.message);
    }
  };


const dismissKeyboard = () => {
        Keyboard.dismiss();  // This dismisses the keyboard when called
    };

    
export default function Groups(){//{usingGroups, setUsingGroups}: GroupsProps) {
    const[name, setName] = useState('');
    const[privacy, setPrivacy] = useState<boolean>(false);
    const[inviteCode, setInviteCode] = useState('');
    const[makingNewGroup, setMakingNewGroup] = useState<boolean>(false);
    const[viewGroups, setViewGroups] = useState<boolean>(false);
    const[viewGroupsLabel, setViewGroupsLabel] = useState('View Existing Groups');
    const[newGroupButtonLabel, setNewGroupButtonLabel] = useState('Create New Group');
    const[groupNameToJoin, setGroupName] = useState(''); // New state for group name input
    const[groupInviteCodeToJoin, setGroupInviteCode] = useState(''); // New state for group invite code input
    const [usingJoinGroup, setUsingJoinGroup] = useState<boolean>(false);


    const toggleMakingNewGroup= () => {
        setMakingNewGroup(!makingNewGroup);
        if(newGroupButtonLabel==='Create New Group'){
            setNewGroupButtonLabel('Stop Creating New Group');
        }else{
            setNewGroupButtonLabel('Create New Group');
            resetGroup();
        }
    }

    const toggleViewGroups= () => {
        setViewGroups(!viewGroups);
        if(viewGroupsLabel==='View Existing Groups'){
            setViewGroupsLabel('Stop Viewing Existing Groups');
        }else{
            setViewGroupsLabel('View Existing Groups');
        }
    }

    const resetGroup = () => {
        setName('');
        setPrivacy(false);
        setInviteCode('');
    }

    const toggleUsingJoinGroup = () =>{
        setUsingJoinGroup(!usingJoinGroup);
    }
    

 return(
    <View>
        <Button
        label = {newGroupButtonLabel}
        theme = "newGroup"
        onPress = {() => {
            toggleMakingNewGroup();
        }}
        />
        <Button
        label = {viewGroupsLabel}
        theme = "groups"
        onPress = {() => {
            toggleViewGroups();
        }}
        />
         <Button
            label = 'Join an Existing Group'
            theme = "add"
            onPress = {() => {
                toggleUsingJoinGroup();
            }}
        />
        {viewGroups ? (
            <ViewGroups/>
            ) : (<View/>)}
             {usingJoinGroup ? 
         (<View>
          <TextInput
            style={SharedStyles.inputText}
            placeholder="Enter Group Name"
            placeholderTextColor="#25292e"
            value={groupNameToJoin}
            onChangeText={setGroupName}
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
            maxLength={50}
          />
          <TextInput
            style={SharedStyles.inputText}
            placeholder="Enter Group Invite Code"
            placeholderTextColor="#25292e"
            value={groupInviteCodeToJoin}
            onChangeText={setGroupInviteCode}
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
            maxLength={50}
          />
          <Button
            label="Join Group"
            theme="add"
            onPress={() => {
                handleJoinGroup(groupNameToJoin, groupInviteCodeToJoin);
                toggleUsingJoinGroup();
                setGroupName('');
                setGroupInviteCode('');
            }}
             disabled={!groupNameToJoin || !groupInviteCodeToJoin} // Disable if either field is empty
          />
        </View>) : (<View/>)}
        {makingNewGroup ? (
            <View>
                <TextInput 
                    value={name}
                    onChangeText = {(newValue: any) => {
                        setName(newValue);
                    }}
                    style = {SharedStyles.inputText}
                    placeholder = {"Enter your group name"}
                    placeholderTextColor = "#25292e"
                    returnKeyType="done"
                    onSubmitEditing={dismissKeyboard}
                    maxLength={50}
                />
                <TextInput 
                    value={inviteCode}
                    onChangeText = {(newValue: any) => {
                        setInviteCode(newValue);
                    }}
                    style = {SharedStyles.inputText}
                    placeholder = {"Enter your invite code"}
                    placeholderTextColor = "#25292e"
                    returnKeyType="done"
                    onSubmitEditing={dismissKeyboard}
                    maxLength={50}
                />
                <PublicOrPrivate
                    selectedPrivacyOn = {privacy}
                    setSelectedPrivacyOn ={setPrivacy}
                    />
                <Button
                    label = "Create Group"
                    disabled = {((inviteCode==='')||(name===''))}
                    theme = "newGroup"
                    onPress = {() => {
                        createGroup(name, privacy, inviteCode);
                        toggleMakingNewGroup();
                        console.log("making a group");
                    }}
                    />
                <Button
                    onPress={()=>{
                        resetGroup();}}
                    theme="reset" 
                    label="Reset Group Information" />
                <Button
                    onPress={()=>{
                        resetGroup();
                        toggleMakingNewGroup();}}
                    theme="back" 
                    label="Back to Settings Without Saving" />
            </View>
              ) : (<View/>)}

        
    </View>
 );   
}
