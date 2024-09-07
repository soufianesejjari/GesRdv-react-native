import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useRoute, useNavigation } from '@react-navigation/native'
import { backgroundC, lastColor, secondColor } from '../ConfigTheme'

export default function AlertSaveRendezVous () {
  const route = useRoute()
  const navigation = useNavigation()
  const { rendez } = route.params

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: secondColor }}>
      <View style={styles.container}>
        <View style={styles.alert}>
          <View style={styles.alertContent}>
            <View style={styles.alertTop}>
              <FeatherIcon color='#fae4a8' name='check-circle' size={14} />
              <Text style={styles.alertTopText}>Tout est fait !</Text>
            </View>

            <Text style={styles.alertTitle}>Rendez-vous créé avec succès</Text>

            <Text style={styles.alertMessage}>
              Merci pour votre utilisation.
              {'\n'}
              Vous trouverez les informations de votre rendez-vous dans votre
              e-mail ou dans la section Profil.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('nav')
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Retourner</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  /** Alert */
  alert: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  alertContent: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  alertTop: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertTopText: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 4,
    color: backgroundC,
    textAlign: 'center'
  },
  alertTitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center'
  },
  alertMessage: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: backgroundC,
    textAlign: 'center',
    marginBottom: 36
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: lastColor,
    borderColor: lastColor
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000'
  }
})
