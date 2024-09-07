import React, { useState, useRef, useEffect } from 'react'
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Animated
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {
  fetchCenters,
  selectCenters,
  selectLoading,
  selectError,
  centerSlice
} from '../redux/reducers/CentresSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCenter,
  selectLoadingCenter,
  fetchCenterInfo,
  fetchCenterrelaod
} from '../redux/reducers/CenterInfoSlice'
import { fetchCentreInfo } from '../services/centreService'
import { backgroundC, darkGreen, secondColor } from './ConfigTheme'
import { Card, Title, Paragraph } from 'react-native-paper'

function CentersScreen ({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('')

  const centers = useSelector(selectCenters)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  //
  const isLoadingCenter = useSelector(selectLoadingCenter)
  const centerInfo = useSelector(selectCenter)
  const isStart = useSelector(fetchCenterrelaod)

  const dispatch = useDispatch()
  const scrollY = useRef(new Animated.Value(0)).current

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp'
  })

  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: 'clamp'
  })

  const handleCenterPress = async (item) => {
    try {
      const response = await fetchCentreInfo({ id: item.id })
      const center = response.data
      navigation.navigate('CenterDetails', { center })
    } catch (error) {
      console.warn('error fetching cener details', error)
    }

    /*        if(!isStart){
        console.log('handle')
    dispatch(fetchCenterInfo(item.id)); */
  }

  const renderItem = ({ item }) => {
    //

    return (
      <Card style={{ margin: 10 }}>
        <Card.Content>
          <TouchableOpacity onPress={() => handleCenterPress(item)}>
            <Title style={{ color: darkGreen }}>
              {' '}
              {item.nom ? item.nom : 'hh'}
            </Title>
            <Paragraph>Adresse: {item.adresse}</Paragraph>
            <Paragraph>Téléphone: {item.telephone}</Paragraph>
            <Paragraph>Email: {item.email}</Paragraph>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    )
  }

  // Fonction pour filtrer les centres par nom
  const searchCentresByName = (centres, searchTerm) => {
    const searchTermLowerCase = searchTerm.toLowerCase()
    return centres.filter((centre) =>
      centre.nom.toLowerCase().includes(searchTermLowerCase)
    )
  }

  // Filtrer les centres à chaque fois que le terme de recherche change
  const filteredCentres = searchCentresByName(centers, searchTerm)

  return (
    <View style={{ backgroundColor: backgroundC }}>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: translateHeader }] }
        ]}
      >
        <Animated.Text
          style={[
            styles.headerTitle,
            { opacity: opacityTitle },
            { transform: [{ translateY: translateTitle }] }
          ]}
        >
          Rechercher {'\n'}sur un centre
        </Animated.Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Entrez le nom de centre...'
            placeholderTextColor='#05141c'
            style={styles.input}
            onChangeText={(text) => {
              //   setSelectedBlocks([""]);

              setSearchTerm(text)
            }}
          />

          <View style={styles.inputIcon}>
            <FeatherIcon color='#FF8911' name='search' size={16} />
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: backgroundC }
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
        scrollEventThrottle={1}
      >
        {/*     // <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1F2937' : '#e8ecf4' }]}>
         */}
        <FlatList
          data={filteredCentres}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingTop: 200, // Set the paddingTop to the height of the header
    padding: 6,
    backgroundColor: '#fff'
  },
  /** Header */
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 200,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: secondColor
  },
  headerTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: '#fff',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222'
  },
  inputWrapper: {
    position: 'relative',
    width: '100%'
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blockItem: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10
  },
  selectedBlock: {
    backgroundColor: '#a0a0a0'
  },
  placeItem: {
    padding: 10,
    margin: 5,
    backgroundColor: '#c0c0c0',
    borderRadius: 10
  },
  /** Stats */
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    elevation: 3 // Pour l'ombre sur Android
  },
  selectedBlock: {
    backgroundColor: '#6366F1' // Couleur de fond lorsqu'un bloc est sélectionné
  },
  darkModeItem: {
    backgroundColor: '#4B5563' // Couleur de fond en mode sombre
  },
  darkModeText: {
    color: '#FDBF60' // Couleur du texte en mode sombre
  },
  statsItemLabel: {
    marginLeft: 8,
    marginRight: 'auto',
    fontSize: 15,
    fontWeight: '600',
    color: '#7F27FF'
  },
  statsItemLabeli: {
    marginLeft: 8,
    marginRight: 'auto',
    fontSize: 15,
    fontWeight: '600',
    color: '#4e4a6d'
  },
  statsItemValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4e4a6d'
  },
  placeItem: {
    padding: 16,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 3 // Pour l'ombre sur Android
  },
  darkModePlaceItem: {
    backgroundColor: '#374151'
  },
  placeItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  darkModeText: {
    color: '#ffffff'
  }
})

export default CentersScreen
