import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectIsAuthenticated, selectAuthLoading} from '../redux/reducers/authSlice'

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const [email, setEmail] = useState('');
  const [motDePasse, setmotDePasse] = useState('');

  const handleLogin = () => {
    dispatch(login({ email, motDePasse }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="motDePasse"
        value={motDePasse}
        onChangeText={(text) => setmotDePasse(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={isLoading} />
      {isLoading && <Text>Loading...</Text>}
      {isAuthenticated && <Text>Logged in successfully!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
