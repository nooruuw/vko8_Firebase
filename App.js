import { StyleSheet, TextInput, View, Button, ScrollView, SafeAreaView, Text } from 'react-native';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp, onSnapshot, query, orderBy } from './firebase/Config';
import { useState, useEffect } from "react";
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import Login from './screens/Login';

console.log(firestore)
export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES),orderBy('created','desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages =[]

      querySnapshot.forEach((doc) => {
        //create and format message object based on data retrieved from database
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
    
    }, [])

  

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
    console.log('Message saved.')
  }

  // return (
  //   <View style={styles.container}>
  //     <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
  //     <Button title='Send' type="button" onPress={save}/>
  //   </View>
  // );
if (logged) {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
       <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
       <Button title='Send' type="button" onPress={save}/>
     </View>
      <ScrollView>
        {
          messages.map((message) =>(
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      </SafeAreaView>
  )
} else {
  return <Login setLogin={setLogged} />
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    paddingTop: 20,
    paddingBottom: 30

  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12
  }
});
