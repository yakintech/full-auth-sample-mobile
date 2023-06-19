import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../store/loginSlice';

const ConfirmCodeScreen = ({ route }: any) => {
    const [code, setCode] = useState('');

    
    let { email } = route.params;

    let dispatch = useDispatch();

    const onSubmit = (code: any) => {

        axios.post("http://localhost:3000/api/user/confirm", { email, code })
            .then(res => {
                console.log('TOKEN', res.data);
                
                AsyncStorage.setItem("token", res.data?.token)
                .then(res => {

                    //bu bölgede global state güncelleyeceğiz ve app.tsx yeniden çalışıp bizi dashbboard redirect edecek!
                    dispatch(login())

                })
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
                />
            </View>
            <Text style={styles.title}>Two-Factor Authentication</Text>
            <Text style={styles.description}>
                Enter the code sent to your email to complete the login process.
            </Text>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Code"
                    keyboardType="number-pad"
                    value={code}
                    onChangeText={setCode}
                    maxLength={6}
                />
                <TouchableOpacity style={styles.button} onPress={() => onSubmit(code)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoContainer: {
        overflow: 'hidden',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    description: {
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        shadowColor: '#00CED1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#00CED1',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ConfirmCodeScreen;