import React, { useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import {
  fetchaddRendez,
  selectErrorAdd,
  selectLoadingAdd,
  selectRendez,
  fetchaddRendezsFinale,
  selectSuccesAdd
} from '../../redux/reducers/AddRendezSlice'
import {
  backgroundC,
  lastColor,
  secondColor,
  thirdColor
} from '../ConfigTheme'

export default function ConfirmationRendezVous ({ navigation }) {
  const route = useRoute()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoadingAdd)
  const error = useSelector(selectErrorAdd)
  const succes = useSelector(selectSuccesAdd)
  const { rendezVous } = route.params
  const rendez = useSelector(selectRendez)

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack()
      } else {
        navigation.navigate('nav')
      }

      return true // Return true to prevent default behavior (going back)
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove() // Cleanup function
  }, [navigation]) // Dependency array to ensure effect is re-run if navigation changes
  const handleSaveRdv = () => {
    if (rendezVous) {
      console.log(
        'Before slot:',
        rendezVous.centreId,
        rendezVous.date,
        rendezVous.creneauId
      )

      dispatch(
        fetchaddRendez(
          rendezVous.centreId,
          rendezVous.date,
          rendezVous.creneauId
        )
      )
    } else {
      console.log('Null rendezVous')
    }
  }
  useEffect(() => {
    if (!isLoading && !error && succes) {
      dispatch(fetchaddRendezsFinale())
      navigation.navigate('AlertSaveRendezVous', { rendez })
    }
  }, [isLoading, error])
  useEffect(() => {
    if (!isLoading && error) {
      Alert.alert(
        'error',
        'Une erreur est survenue lors de la création du rendez-vous. Veuillez réessayer plus tard.',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(fetchaddRendezsFinale())
              navigation.navigate('nav')
            }
          }
        ]
      )
    }
  }, [isLoading, error])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.alert}>
          <View style={styles.alertIcon}>
            <FeatherIcon color={backgroundC} name='check-circle' size={42} />
          </View>

          <Text style={styles.alertTitle}>Confirmation</Text>

          <Text style={styles.alertMessage}>
            Vous confirmez votre rendez-vous pour le{' '}
            <Text style={styles.bold}>{rendezVous.date}</Text>, au centre{' '}
            <Text style={styles.bold}>{rendezVous.centre}</Text>, de{' '}
            <Text style={styles.bold}>
              {rendezVous.heureDebut} à {rendezVous.heureFin}
            </Text>
            {'\n'}
            Votre rendez-vous sera enregistré sur votre compte. Assurez-vous
            d'être disponible et d'accéder à l'application 5 minutes avant
            l'heure de début.
          </Text>
          {isLoading
            ? (
              <ActivityIndicator size='large' color='#000' />
              )
            : (
              <TouchableOpacity onPress={handleSaveRdv}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Confirmer</Text>
                </View>
              </TouchableOpacity>
              )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  alert: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  alertIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: secondColor
  },
  alertTitle: {
    marginBottom: 16,
    fontSize: 32,
    fontWeight: '700',
    color: '#343e54',
    textAlign: 'center'
  },
  alertMessage: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: '#9a9a9a'
  },
  bold: {
    fontWeight: '700',
    color: '#000' // Changed text color to black
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: secondColor,
    borderColor: secondColor
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff'
  }
})
