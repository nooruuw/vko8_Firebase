import { View, Text, Button, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from '../firebase/Config'
import React from 'react'

export default function Login({ setLogin }) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        const auth = getAuth()

        signInWithEmailAndPassword(auth, user, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                setLogin(true)
            }).catch((error) => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    console.log('Invalid credentials')
                } else if (error.code === 'auth/too-many-requests') {
                    console.log('Too many requests')
                } else {
                    console.log(error.code + ' ' + error.message)
                }
            })
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Login</Text>
                <Text style={styles.field}>Username</Text>
                <TextInput style={styles.field} 
                   keyboardType='email-address'
                   placeholder='Type email here' 
                   value={user} 
                   onChangeText={text => setUser(text)} 
                   />
                <Text style={styles.field}>Password</Text>
                <TextInput style={styles.field} 
                   placeholder='Type password here'
                   value={password} 
                   onChangeText={text => setPassword(text)} 
                   secureTextEntry={true} 
                   />
                <Button title='Login' onPress={login} />
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    field: {
        width: '100%',
        marginVertical: 8,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
});
