import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createOneCentre } from '../../services/centreService';
import { secondColor } from '../ConfigTheme';
import { useDispatch } from 'react-redux';
import { fetchCenters } from '../../redux/reducers/CentresSlice';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AddCentre() {
  const dispatch=useDispatch()
  const [form, setForm] = useState({
    nom: '',
    adresse: '',
    telephone: '',
    email:'',
    siteWeb:'',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation()

  const handleCreate = async() => {
    setErrorMessage('');

    if (!form.nom || !form.adresse || !form.telephone || !form.email || !form.siteWeb) {
        setErrorMessage('Veuillez remplir tous les champs.');
      // ...
    }
   
          try {
            await createOneCentre(form)
            console.log("start add centres");
            // Afficher un message de succès
            setSuccessMessage('Le centre a été ajouté avec succès.');
            setErrorMessage('');
            dispatch(fetchCenters());
            // Rediriger vers une autre page après un délai de 2 secondes
            setTimeout(() => {
              navigation.navigate('Dashboard');
            }, 1000);

            console.log('Create du centre avec les données:', form);
          } catch (error) {
            console.log("start add centres", error);
          }
        };

 

   
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
     

            <Text style={styles.title}>Nouveau Centre</Text>

            <Text style={styles.subtitle}>
              Ajoutez les informations ci-dessous.
            </Text>
          </View>
          {errorMessage !== '' && (
            <View style={styles.errorMessageContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}
          {successMessage !== '' && (
            <View style={styles.successMessageContainer}>
              <Text style={styles.successMessage}>{successMessage}</Text>
            </View>
          )}
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Nom</Text>

              <TextInput
                clearButtonMode="while-editing"
                onChangeText={nom => setForm({ ...form, nom })}
                placeholder="Nom du centre"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.nom} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adresse</Text>

              <TextInput
                clearButtonMode="while-editing"
                onChangeText={adresse => setForm({ ...form, adresse })}
                placeholder="Adresse du centre"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.adresse} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Téléphone</Text>

              <TextInput
                clearButtonMode="while-editing"
                onChangeText={telephone => setForm({ ...form, telephone })}
                placeholder="Numéro de téléphone"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.telephone} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="Adresse email"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Site Web</Text>

              <TextInput
                clearButtonMode="while-editing"
                onChangeText={siteWeb => setForm({ ...form, siteWeb })}
                placeholder="Site web du centre"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.siteWeb} />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleCreate}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Ajoutez</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: secondColor,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
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
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
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
  successMessageContainer: {
    backgroundColor: 'lightgreen',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
