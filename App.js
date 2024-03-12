import { StyleSheet, TextInput, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { firestore,collection,addDoc,serverTimestamp,MESSAGES } from './firebase/Config';
import { useState, useEffect } from 'react';
import { orderBy,query,onSnapshot } from 'firebase/firestore';
import { convertFirebaseTimeStampToJS } from './helper/Functions';


export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  
  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created','desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages =[]

      querySnapshot.forEach(doc => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => { unsubscribe() }

  }, [])

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setNewMessage('')
    console.log('Message saved.')
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      {
        messages.map(message =>(
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
        ))
      }
    </ScrollView>
      <TextInput style={styles.textInput} placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={{ color: 'white' }}>Send</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  button: {
    marginTop: 10,
    marginBottom: 60,
    backgroundColor: '#000', 
    borderRadius: 4,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  textInput: {
    marginTop: 10,
    marginBottom: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
  }
});
