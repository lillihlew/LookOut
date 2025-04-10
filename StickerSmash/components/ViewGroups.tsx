import React, { useState, useEffect, useCallback } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity, // Import TouchableOpacity
  Alert // Import Alert
} from 'react-native';
import SharedStyles from "@/app/styles";
import Button from "./Button";
import { collection, addDoc, serverTimestamp, updateDoc, doc, arrayUnion, getDoc, setDoc, arrayRemove } from 'firebase/firestore'; // Import arrayRemove
import { auth, db } from '../firebaseConfig';
import PublicOrPrivate from "./PublicOrPrivate";
import { SafeAreaProvider } from "react-native-safe-area-context";


async function leaveGroup(groupId: string, userId: string) {
    try {
      // 1. Remove the user from the 'members' array in the group document
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: arrayRemove(userId),
      });
  
      // 2. Remove the group ID from the user's 'groups' array in the user document
      const userRef = doc(db, "UserCol", userId);
      await updateDoc(userRef, {
        groups: arrayRemove(groupId),
      });
  
      console.log("User left group successfully.");
    } catch (error: any) {
      console.error("Error leaving group:", error);
      throw error; // Re-throw the error for UI handling
    }
  }
export default function ViewGroups() {
    const [groupNames, setGroupNames] = useState<
    { id: string; name: string }[]
  >([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({}); // Track expanded groups
     const [members, setMembers] = useState<{[key: string]: string[]}>({}); // Store member usernames for each group
    const [loadingMembers, setLoadingMembers] = useState<{[key: string]: boolean}>({}); // Store loading state for each group

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (!user) {
            console.log("User is signed out.");
            setGroupNames([]);
            setIsLoading(false);
            return;
          }
      
          console.log("User is signed in. UID:", user.uid);
      
          try {
            setIsLoading(true);
            setErrorMessage(null);
      
            const userDocRef = doc(db, "UserCol", user.uid);
            const userDocSnap = await getDoc(userDocRef);
      
            if (!userDocSnap.exists()) {
              throw new Error("User document not found.");
            }
      
            const userData = userDocSnap.data();
            console.log("User data:", userData);
      
            const groupIds: string[] = userData?.groups || [];
            console.log("Group IDs:", groupIds);
      
            if (groupIds.length === 0) {
              console.log("User has no group memberships.");
              setGroupNames([]);
              return;
            }
      
            const names: { id: string; name: string }[] = [];
      
            for (const groupId of groupIds) {
              const groupDocRef = doc(db, "groups", groupId);
              const groupDocSnap = await getDoc(groupDocRef);
      
              if (groupDocSnap.exists()) {
                const groupData = groupDocSnap.data();
                console.log(`Fetched group ${groupId}:`, groupData);
                names.push({ id: groupId, name: groupData?.name || "(Unnamed Group)" });
              } else {
                console.warn(`Group with ID ${groupId} not found.`);
              }
            }
            setGroupNames(names);
          } catch (error: any) {
            console.error("Error fetching user groups:", error);
            setErrorMessage("Failed to load groups: " + error.message);
          } finally {
            setIsLoading(false);
          }
        });
      
        return unsubscribe; // Clean up the listener
      }, []);
      
    if (isLoading) {
      return (
        <View>
          <Text>Loading groups...</Text>
        </View>
      );
    }
  
    if (errorMessage) {
      return (
        <View>
          <Text>{errorMessage}</Text>
        </View>
      );
    }
  

    const toggleGroupExpansion = (groupId: string) => {
        setExpandedGroups(prev => ({
          ...prev,
          [groupId]: !prev[groupId]
        }));

          // Fetch members only when expanding
        if (!expandedGroups[groupId]) {
            fetchMembers(groupId);
        }
      };

    const fetchMembers = async (groupId: string) => {
         setLoadingMembers(prev => ({ ...prev, [groupId]: true }));
        try {
          const groupDocRef = doc(db, "groups", groupId);
          const groupDocSnap = await getDoc(groupDocRef);
  
          if (groupDocSnap.exists()) {
            const groupData = groupDocSnap.data();
            const memberIds = groupData?.members || [];
  
            // Fetch usernames for each member
            const memberUsernames = await Promise.all(
              memberIds.map(async (memberId: string) => {
                const userDocRef = doc(db, "UserCol", memberId);
                const userDocSnap = await getDoc(userDocRef);
                return userDocSnap.exists() ? userDocSnap.data()?.username || 'Unknown User' : 'Unknown User';
              })
            );
             setMembers(prev => ({ ...prev, [groupId]: memberUsernames }));
          } else {
            console.warn(`Group with ID ${groupId} not found.`);
          }
        } catch (error: any) {
          console.error("Error fetching members:", error);
        } finally {
           setLoadingMembers(prev => ({ ...prev, [groupId]: false }));
        }
      };

    const renderGroupMembers = (groupId: string) => {
         if (loadingMembers[groupId]) {
          return <Text style={styles.memberItem}>Loading members...</Text>;
        }
      
        return (
          <View style={styles.membersContainer}>
            {members[groupId]?.length > 0 ? (
              members[groupId].map((member, index) => (
                <Text key={index} style={styles.memberItem}>{member}</Text>
              ))
            ) : (
              <Text style={styles.memberItem}>No members yet.</Text>
            )}
          </View>
        );
      };
      const handleLeaveGroup = async (groupId: string) => {
        try {
          if (!auth.currentUser) {
            throw new Error("No user is currently signed in.");
          }
    
          const userId = auth.currentUser.uid;
          await leaveGroup(groupId, userId);
    
          // Update the state to reflect the user leaving the group
          setGroupNames(prevGroups => prevGroups.filter(group => group.id !== groupId));
          setExpandedGroups(prevExpanded => {
            const { [groupId]: removed, ...rest } = prevExpanded;
            return rest;
          });
          setMembers(prevMembers => {
            const { [groupId]: removed, ...rest } = prevMembers;
            return rest;
          });
          setLoadingMembers(prevLoading => {
            const { [groupId]: removed, ...rest } = prevLoading;
            return rest;
          });
    
          Alert.alert("Success", "You have successfully left the group!");
        } catch (error: any) {
          console.error("Error leaving group:", error);
          Alert.alert("Error", "Failed to leave group: " + error.message);
        }
      };
    
  
    return (
        <ScrollView>
          <SafeAreaView>
            {groupNames.length > 0 ? (
                groupNames.map((group, index) => (
                  <View key={index}>
                    <View style={styles.groupNameContainer}>
                      <Text style={styles.groupItem}>{group.name}</Text>
                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <TouchableOpacity onPress={() => toggleGroupExpansion(group.id)}>
                            <Text style={styles.showMembersButton}>
                            {expandedGroups[group.id] ? 'Hide Members' : 'Show Members'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLeaveGroup(group.id)}>
                            <Text style={styles.leaveGroupButton}>
                                Leave Group
                            </Text>
                        </TouchableOpacity>
                       </View>
                       
                    </View>
                     {/* Always render renderGroupMembers, conditionally rendering its content */}
                      {expandedGroups[group.id] ?  <View>
                       {renderGroupMembers(group.id)}
                      </View> : null}
                  </View>
                ))
              ) : (
              <Text style={styles.noGroupsText}>You are not currently a member of any groups.</Text>
            )}
          </SafeAreaView>
        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    groupItem: {
      padding: 15,
      fontSize: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    noGroupsText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#666',
      textAlign: 'center',
      padding: 20,
    },
    memberItem: {
        paddingLeft: 20,
        fontSize: 14,
        color: '#333',
      },
      groupNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      showMembersButton: {
        fontSize: 12,
        color: 'blue',
      },
    leaveGroupButton: {  // Style for the Leave Group button
        fontSize: 12,
        color: 'red',
        marginLeft: 10,  // Add some spacing from the Show Members button
      },
      membersContainer: { // New style for the members container
        marginTop: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
      },
  });

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Keyboard,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity // Import TouchableOpacity
// } from 'react-native';
// import SharedStyles from "@/app/styles";
// import Button from "./Button";
// import { collection, addDoc, serverTimestamp, updateDoc, doc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../firebaseConfig';
// import PublicOrPrivate from "./PublicOrPrivate";
// import { SafeAreaProvider } from "react-native-safe-area-context";


// export default function ViewGroups() {
//     const [groupNames, setGroupNames] = useState<
//     { id: string; name: string }[]
//   >([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({}); // Track expanded groups
//      const [members, setMembers] = useState<{[key: string]: string[]}>({}); // Store member usernames for each group
//     const [loadingMembers, setLoadingMembers] = useState<{[key: string]: boolean}>({}); // Store loading state for each group

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(async (user) => {
//           if (!user) {
//             console.log("User is signed out.");
//             setGroupNames([]);
//             setIsLoading(false);
//             return;
//           }
      
//           console.log("User is signed in. UID:", user.uid);
      
//           try {
//             setIsLoading(true);
//             setErrorMessage(null);
      
//             const userDocRef = doc(db, "UserCol", user.uid);
//             const userDocSnap = await getDoc(userDocRef);
      
//             if (!userDocSnap.exists()) {
//               throw new Error("User document not found.");
//             }
      
//             const userData = userDocSnap.data();
//             console.log("User data:", userData);
      
//             const groupIds: string[] = userData?.groups || [];
//             console.log("Group IDs:", groupIds);
      
//             if (groupIds.length === 0) {
//               console.log("User has no group memberships.");
//               setGroupNames([]);
//               return;
//             }
      
//             const names: { id: string; name: string }[] = [];
      
//             for (const groupId of groupIds) {
//               const groupDocRef = doc(db, "groups", groupId);
//               const groupDocSnap = await getDoc(groupDocRef);
      
//               if (groupDocSnap.exists()) {
//                 const groupData = groupDocSnap.data();
//                 console.log(`Fetched group ${groupId}:`, groupData);
//                 names.push({ id: groupId, name: groupData?.name || "(Unnamed Group)" });
//               } else {
//                 console.warn(`Group with ID ${groupId} not found.`);
//               }
//             }
//             setGroupNames(names);
//           } catch (error: any) {
//             console.error("Error fetching user groups:", error);
//             setErrorMessage("Failed to load groups: " + error.message);
//           } finally {
//             setIsLoading(false);
//           }
//         });
      
//         return unsubscribe; // Clean up the listener
//       }, []);
      
//     if (isLoading) {
//       return (
//         <View>
//           <Text>Loading groups...</Text>
//         </View>
//       );
//     }
  
//     if (errorMessage) {
//       return (
//         <View>
//           <Text>{errorMessage}</Text>
//         </View>
//       );
//     }
  

//     const toggleGroupExpansion = (groupId: string) => {
//         setExpandedGroups(prev => ({
//           ...prev,
//           [groupId]: !prev[groupId]
//         }));

//           // Fetch members only when expanding
//         if (!expandedGroups[groupId]) {
//             fetchMembers(groupId);
//         }
//       };

//     const fetchMembers = async (groupId: string) => {
//          setLoadingMembers(prev => ({ ...prev, [groupId]: true }));
//         try {
//           const groupDocRef = doc(db, "groups", groupId);
//           const groupDocSnap = await getDoc(groupDocRef);
  
//           if (groupDocSnap.exists()) {
//             const groupData = groupDocSnap.data();
//             const memberIds = groupData?.members || [];
  
//             // Fetch usernames for each member
//             const memberUsernames = await Promise.all(
//               memberIds.map(async (memberId: string) => {
//                 const userDocRef = doc(db, "UserCol", memberId);
//                 const userDocSnap = await getDoc(userDocRef);
//                 return userDocSnap.exists() ? userDocSnap.data()?.username || 'Unknown User' : 'Unknown User';
//               })
//             );
//              setMembers(prev => ({ ...prev, [groupId]: memberUsernames }));
//           } else {
//             console.warn(`Group with ID ${groupId} not found.`);
//           }
//         } catch (error: any) {
//           console.error("Error fetching members:", error);
//         } finally {
//            setLoadingMembers(prev => ({ ...prev, [groupId]: false }));
//         }
//       };

//     const renderGroupMembers = (groupId: string) => {
//          if (loadingMembers[groupId]) {
//           return <Text style={styles.memberItem}>Loading members...</Text>;
//         }
      
//         return (
//           <View style={styles.membersContainer}>
//             {members[groupId]?.length > 0 ? (
//               members[groupId].map((member, index) => (
//                 <Text key={index} style={styles.memberItem}>{member}</Text>
//               ))
//             ) : (
//               <Text style={styles.memberItem}>No members yet.</Text>
//             )}
//           </View>
//         );
//       };

    
  
//     return (
//         <ScrollView>
//           <SafeAreaView>
//             {groupNames.length > 0 ? (
//                 groupNames.map((group, index) => (
//                   <View key={index}>
//                     <View style={styles.groupNameContainer}>
//                       <Text style={styles.groupItem}>{group.name}</Text>
//                       <TouchableOpacity onPress={() => toggleGroupExpansion(group.id)}>
//                         <Text style={styles.showMembersButton}>
//                           {expandedGroups[group.id] ? 'Hide Members' : 'Show Members'}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                      {/* Always render renderGroupMembers, conditionally rendering its content */}
//                       {expandedGroups[group.id] ?  <View>
//                        {renderGroupMembers(group.id)}
//                       </View> : null}
//                   </View>
//                 ))
//               ) : (
//               <Text style={styles.noGroupsText}>You are not currently a member of any groups.</Text>
//             )}
//           </SafeAreaView>
//         </ScrollView>
//     );
//   }

//   const styles = StyleSheet.create({
//     groupItem: {
//       padding: 15,
//       fontSize: 18,
//       borderBottomWidth: 1,
//       borderBottomColor: '#eee',
//     },
//     noGroupsText: {
//       fontSize: 16,
//       fontStyle: 'italic',
//       color: '#666',
//       textAlign: 'center',
//       padding: 20,
//     },
//     memberItem: {
//         paddingLeft: 20,
//         fontSize: 14,
//         color: '#333',
//       },
//       groupNameContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       },
//       showMembersButton: {
//         fontSize: 12,
//         color: 'blue',
//       },
//       membersContainer: { // New style for the members container
//         marginTop: 5,
//         padding: 10,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 5,
//       },
//   });
