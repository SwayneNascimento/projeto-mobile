import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import UserForm from '../front-end/components/UserForm'

export default function App() {
  const [users, setUsers] = useState([]);

  async function getUsers(){
    try {
      const usersBe = await fetch('http://172.26.47.121:3000/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json());
      
      setUsers(usersBe)
    } catch (error) {
      console.error(error);
    }
  }
  
  getUsers()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastros de usuários</Text>
      </View>
      <ScrollView contentContainerStyle={styles.users}>
        {
          users.map((user) => (
            <View style={styles.user} key={Math.random()}>
              <Text style={styles.label}>Nome: {user.name}</Text>
              <Text style={styles.label}>Idade: {user.age}</Text>
              <Text style={styles.label}>E-mail: {user.email}</Text>
            </View>
          ))
        }
      </ScrollView>
      <UserForm></UserForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: "#DC7F9B"
  },
  title: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold'
  },
  users: {
    alignItems: 'center',
  },
  user: {
    width: '90%',
    height: 100,
    backgroundColor: '#9AD4D6',
    justifyContent: 'center',
    textAlign: 'left',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  label: {
    fontSize: 18
  }
});
