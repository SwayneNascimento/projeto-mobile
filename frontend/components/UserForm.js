import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [cpf, setCpf] = useState('');

  const handleSubmit = async () => {

    console.log(name, email, age, cpf)
    let body = {
      name: name,
      email: email,
      age: parseInt(age),
      cpf: cpf
    };
    
    try {
      console.log(body)
      const response = await fetch('http://172.26.47.121:3000/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },  
        body: JSON.stringify(body)
      });
    
      const data = await response.json();
      console.log(data); // Verifique se a resposta contém o objeto 'user'
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 18}}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={{fontSize: 18}}>Cpf:</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          placeholder="Digite seu cpf"
          maxLength={11}
        />
      </View>


      <View style={styles.inputContainer}>
        <Text style={{fontSize: 18}}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={{fontSize: 18}}>Idade:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Digite sua idade"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 24}}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:`center`,
    width: '100%',
  },
  input: {
    backgroundColor: '#d9d9d9',
    width: '90%',
    height: 50
  },
  btn: {
    width: 200,
    height: 60,
    backgroundColor: '#DC7F9B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  inputContainer: {
    width: '100%',
    alignItems: "center",
  }
})