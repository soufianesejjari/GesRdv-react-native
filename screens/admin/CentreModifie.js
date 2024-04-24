import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateCentre } from '../../services/centreService';
import { backgroundC, secondColor } from '../ConfigTheme';
import { useNavigation } from '@react-navigation/native';

export default function CentreModifie({ route }) {
    const navigation=useNavigation()
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  const { centre } = route.params;
  const [form, setForm] = useState({
    nom: centre.nom,
    adresse: centre.adresse,
    telephone: centre.telephone,
    email: centre.email,
    siteWeb: centre.siteWeb,
  });

  const handleModification = async() => {
    if (!form.nom || !form.adresse || !form.telephone || !form.email ) {
        setErrorMessage('Veuillez remplir tous les champs.');
        return;
      } 
   try {
    await updateCentre(centre.id,form)
    // Effectuer l'action de modification avec les données du formulaire
    setSuccessMessage('Le centre a été modifie avec succès.');
    setErrorMessage('')
   } catch (error) {
    
    setErrorMessage('Veuillez essayer plus tard ')

   }

  };
useEffect(() => {
  const backAction = () => {  
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("nav");
    }

    return true; // Return true to prevent default behavior (going back)
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );

  return () => backHandler.remove(); // Cleanup function

}, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundC }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                // Gérer l'action de retour
              }}
              style={styles.headerBack}>
              <FeatherIcon
                color="#1D2A32"
                name="chevron-left"
                size={30} />
            </TouchableOpacity>

            <Text style={styles.title}>Modifier le Centre</Text>

            <Text style={styles.subtitle}>
              Modifiez les informations ci-dessous.
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
              <TouchableOpacity onPress={handleModification}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Modifier</Text>
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
