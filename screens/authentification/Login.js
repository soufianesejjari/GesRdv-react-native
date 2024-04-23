import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MyLocalImage from '../../assets/imageForLogin.png'

import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuthError, selectAuthLoading, selectIsAuthenticated } from '../../redux/reducers/authSlice';
import { lastColor, secondColor } from '../ConfigTheme';

export default function LoginComponent({ navigation }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const errorAuth =useSelector(selectAuthError)

  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = () => {
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    dispatch(login({ email: form.email, password: form.password }))
      .catch(() => {
        setError("email et/ou mot de passe incorrect(s)");
      });
      if(!isAuthenticated){
        setError("email et/ou mot de passe incorrect(s)");

      }
      else{
        navigation.navigate('nav')
      }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.headerImg}
              source={MyLocalImage}
            />
            <Text style={styles.title}>
              Connectez-vous à votre compte
            </Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour prendre rendez-vous dans les centres médicaux
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adresse e-mail</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="exemple@centremedical.ma"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <TextInput
                autoCorrect={false}
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignIn}>
                <View style={styles.btn}>
                  <Text style={styles.btnText} disabled={isLoading}>Se connecter</Text>
                  {isLoading && <Text>Loading...</Text>}
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SingUp')}>
              <Text style={styles.formFooter}>
                Vous n'avez pas de compte ? <Text style={styles.link}>Inscrivez-vous</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
  },
  scrollView: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginVertical: 36,
    alignItems: 'center',
  },
  headerImg: {
    width: 80,
    height: 80,
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: secondColor,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  errorContainer: {
    backgroundColor: '#ffccc7',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    textAlign: 'center',
    color: '#ff4d4f',
    fontWeight: 'bold',
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: secondColor,
    borderColor: secondColor,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  link: {
    textDecorationLine: 'underline',
    color: lastColor,
  },
});
