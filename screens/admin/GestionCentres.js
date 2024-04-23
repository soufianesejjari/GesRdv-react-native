import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { deleteCentre, getAllCentres } from '../../services/centreService';

const GestionCentres = () => {
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const fetchedCentres = await getAllCentres();
        setCentres(fetchedCentres);
      } catch (error) {
        console.error('Error fetching centres:', error);
      }
    };

    fetchCentres();
  }, []);

  const handleDeleteCentre = async (id) => {
    try {
      await deleteCentre(id);
      setCentres(centres.filter((centre) => centre.id !== id));
    } catch (error) {
      console.error('Error deleting centre:', error);
    }
  };

  return (
    <View>
      <Text>Liste des centres :</Text>
      {centres.map((centre) => (
        <View key={centre.id}>
          <Text>{centre.nom}</Text>
          <Text>{centre.adresse}</Text>
          <Button title="Supprimer" onPress={() => handleDeleteCentre(centre.id)} />
          <Button
            title="Modifier"
            onPress={() => handleModifierCentre(centre.id)} // À implémenter dans un autre composant
          />
        </View>
      ))}
      <Button
        title="Ajouter un centre"
        onPress={() => handleAjouterCentre()} // À implémenter dans un autre composant
      />
    </View>
  );
};

export default GestionCentres;
