import React from 'react';
import { StyleSheet, View,  ScrollView, TouchableOpacity } from 'react-native';
import { useRoute ,useNavigation} from '@react-navigation/native';
import { backgroundC, darkGreen, lastColor, secondColor, thirdColor } from './ConfigTheme';
import { Text, Button, Card } from 'react-native-paper';

const CenterDetaillScreen = () => {
  const navigation=useNavigation();
  const route = useRoute();
  const { center } = route.params;

  // Créer un objet pour regrouper les créneaux par date
  const creneauxParDate = center.creneaux.reduce((acc, creneau) => {
    // Si la date du créneau n'existe pas encore dans l'objet, la créer
    if (!acc[creneau.date]) {
      acc[creneau.date] = [];
    }
    // Ajouter le créneau à la liste des créneaux de cette date
    acc[creneau.date].push(creneau);
    return acc;
  }, {});
const handleRdv = (creneau) =>{

    const normalizedRDV ={
      centreId:center.id,
      centre:center.nom,
      date: creneau.date,
      creneauId: creneau.id,
      heureDebut:creneau.heureDebut,
      heureFin:creneau.heureFin,
      capacite: creneau.capacite,
    }
    console.log(normalizedRDV)
    navigation.navigate('ConfirmationRenderVous', { rendezVous: normalizedRDV});


}
return (
  <ScrollView style={styles.container}>
    <Card style={styles.centerInfo}>
      <Card.Content>
        <Text style={styles.centerName}>{center.nom}</Text>
        <Text style={styles.centerAddress}>{center.adresse}</Text>
        <Text style={styles.centerContact}>{center.telephone}</Text>
        <Text style={styles.centerContact}>{center.email}</Text>
        <Text style={styles.centerContact}>{center.siteWeb}</Text>
      </Card.Content>
    </Card>
    {Object.entries(creneauxParDate).map(([date, creneaux]) => (
      <View key={date} style={styles.creneauContainer}>
        <Text style={styles.creneauTitle}>{date}</Text>
        {creneaux.map((creneau, index) => (
          <Card key={index} style={styles.creneauItem}>
            <Card.Content>
              <Text style={styles.creneauTime}>
                {creneau.heureDebut} - {creneau.heureFin}
              </Text>
              <Text style={styles.creneauCapacite}>Capacité : {creneau.capacite}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleRdv(creneau)}>Réserver</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    ))}
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  
  flex: 1,
  padding: 15,
  backgroundColor: backgroundC,
},
centerInfo: {
  marginTop:30,
  marginBottom: 20,
},
centerName: {
  color:secondColor,
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 5,
},
centerAddress: {
  color:darkGreen,
  fontSize: 18,
  marginBottom: 5,
},
centerContact: {
  color:darkGreen,
  fontSize: 16,
  marginBottom: 5,
},
creneauContainer: {
  marginBottom: 20,
},
  creneauItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  creneauTime: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  creneauCapacite: {
    fontSize: 16,
  }
  ,creneauTitle: {
    margin:5,
    fontSize:25,
    color:secondColor,

  }
});

export default CenterDetaillScreen;
