import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch, useSelector } from 'react-redux';
import {selectUser,inscreption, selectAuthLoading, selectIsAuthenticated } from '../../redux/reducers/authSlice';
import { backgroundC, lastColor, secondColor, thirdColor } from '../ConfigTheme';

export default function Inscription({ navigation }) {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const user = useSelector(selectUser)

    const [succe, setSucce] = useState('');

    const [error, setError] = useState('');

  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone : '',
    password: '',
  });
  const [role, setRole] = useState('visiteur'); // Ajout du rôle avec la valeur par défaut "visiteur"

  const handleSignUp = () => {
    if ( !form.email || !form.password || !form.prenom || !form.nom || !form.telephone ) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Veuillez utiliser une adresse e-mail valide.');
      return;
    }
try {
  dispatch(inscreption (form))
} catch (error) {
  
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log("waaaaaaaaaaaaaaaaaaaaaaaaa",errorMessage)
  setError('les information sont inccorect.');
  return ;
}
   



};

if(isAuthenticated){
  
  navigation.navigate('nav')
}

  return (
    <View style={{ flex: 1, backgroundColor: backgroundC }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
                navigation.goBack();
                // handle onPress
            }}
            style={styles.backBtn}>
            <FeatherIcon
              color={secondColor}
              name="arrow-left"
              size={24}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Créer un compte</Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
           

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Prénom</Text>

              <TextInput
                onChangeText={prenom => setForm({ ...form, prenom })}
                placeholder="ex. Ahmed"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.prenom}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Nom de famille</Text>

              <TextInput
                onChangeText={nom => setForm({ ...form, nom })}
                placeholder="nom"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.nom}
              />
            </View>
   
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adresse e-mail</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="exemple@ucd.ac.ma"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Telephone</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                onChangeText={telephone => setForm({ ...form, telephone })}
                placeholder="06......"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.telephone}
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
{/*             <View style={styles.input}>
                  <Text style={styles.inputLabel}>Rôle</Text>
                  <View style={styles.roleButtons}>
                    <TouchableOpacity
                      style={[styles.roleButton, role === 'visiteur' && styles.selectedRoleButton]}
                      onPress={() => setRole('visiteur')}>
                      <Text style={styles.roleButtonText}>Visiteur</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.roleButton, role === 'organisateur' && styles.selectedRoleButton]}
                      onPress={() => setRole('organisateur')}>
                      <Text style={styles.roleButtonText}>Organisateur</Text>
                    </TouchableOpacity>
                  </View>
                </View> */}
                            {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>

                 </View>
      ) : null}
      {succe ? (
        <Text style={styles.successMessage}>
         Votre compte a été créé avec succès
        </Text>
      ) : (null
      )}
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignUp}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>S'inscrire</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.formFooter}>
              En cliquant sur "S'inscrire", vous acceptez nos
              <Text style={{ color: thirdColor, fontWeight: '600' }}>
                {' '}
                Conditions générales{' '}
              </Text>
              et notre
              <Text style={{ color: lastColor, fontWeight: '600' }}>
                {' '}
                Politique de confidentialité
              </Text>
              .
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: secondColor,
    marginBottom: 36,
  },
  /** Form */
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    color: '#9fa5af',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#24262e',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: secondColor,
    borderColor: secondColor,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  roleButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  selectedRoleButton: {
    backgroundColor: '#FD6B68',
    borderColor: '#FD6B68',
  },
  roleButtonText: {
    color: '#1c1c1e',
  },
  errorContainer: {
    backgroundColor: '#ffccc7',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    textAlign:'center',
    color: '#ff4d4f',
    fontWeight: 'bold',
  },
  errorTextt: {
    color: 'blue',
    fontWeight: 'bold',
  },
   buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  successMessage: {
    textAlign:'center',

    fontSize: 18,
    color: 'green',
    textAlign: 'center',
  },
});