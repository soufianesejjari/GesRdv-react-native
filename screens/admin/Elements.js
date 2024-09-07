import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectCenters } from '../../redux/reducers/CentresSlice'
import RBSheet from 'react-native-raw-bottom-sheet'
import { deleteCentre, fetchCentreInfo } from '../../services/centreService'
import { useNavigation } from '@react-navigation/native'
import {
  backgroundC,
  darkGreen,
  lastColor,
  secondColor,
  thirdColor
} from '../ConfigTheme'

export default function Elements ({ route }) {
  const navigation = useNavigation()
  const refRBSheet = useRef()

  const centers = useSelector(selectCenters)

  const [columns, setColumns] = useState([
    'Name',
    'Gender',
    'Breed',
    'Weight',
    'Age'
  ])
  const [direction, setDirection] = useState(null)
  const [centre, selectCenter] = useState('')
  const [selectedColumn, setSelectedColumn] = useState(null)
  const [pets, setPets] = useState([
    {
      Name: 'Charlie',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 12,
      Age: 3
    },
    {
      Name: 'Max',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 23,
      Age: 7
    },
    {
      Name: 'Lucy',
      Gender: 'Female',
      Breed: 'Cat',
      Weight: 5,
      Age: 4
    },
    {
      Name: 'Oscar',
      Gender: 'Male',
      Breed: 'Turtle',
      Weight: 13,
      Age: 23
    },
    {
      Name: 'Charlie',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 12,
      Age: 3
    },
    {
      Name: 'Max',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 23,
      Age: 7
    },
    {
      Name: 'Lucy',
      Gender: 'Female',
      Breed: 'Cat',
      Weight: 5,
      Age: 4
    },
    {
      Name: 'Oscar',
      Gender: 'Male',
      Breed: 'Turtle',
      Weight: 13,
      Age: 23
    },
    {
      Name: 'Charlie',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 12,
      Age: 3
    },
    {
      Name: 'Max',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 23,
      Age: 7
    },
    {
      Name: 'Lucy',
      Gender: 'Female',
      Breed: 'Cat',
      Weight: 5,
      Age: 4
    },
    {
      Name: 'Oscar',
      Gender: 'Male',
      Breed: 'Turtle',
      Weight: 13,
      Age: 23
    },
    {
      Name: 'Charlie',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 12,
      Age: 3
    },
    {
      Name: 'Max',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 23,
      Age: 7
    },
    {
      Name: 'Lucy',
      Gender: 'Female',
      Breed: 'Cat',
      Weight: 5,
      Age: 4
    },
    {
      Name: 'Oscar',
      Gender: 'Male',
      Breed: 'Turtle',
      Weight: 13,
      Age: 23
    },
    {
      Name: 'Charlie',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 12,
      Age: 3
    },
    {
      Name: 'Max',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 23,
      Age: 7
    },
    {
      Name: 'Lucy',
      Gender: 'Female',
      Breed: 'Cat',
      Weight: 5,
      Age: 4
    },
    {
      Name: 'Oscar',
      Gender: 'Male',
      Breed: 'Turtle',
      Weight: 13,
      Age: 23
    },
    {
      Name: 'Daisy',
      Gender: 'Female',
      Breed: 'Bird',
      Weight: 1.7,
      Age: 3
    },
    {
      Name: 'Ruby',
      Gender: 'Female',
      Breed: 'Dog',
      Weight: 6,
      Age: 3
    },
    {
      Name: 'Milo',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 11,
      Age: 7
    },
    {
      Name: 'Toby',
      Gender: 'Male',
      Breed: 'Dog',
      Weight: 34,
      Age: 19
    },
    {
      Name: 'Lola',
      Gender: 'Female',
      Breed: 'Cat',
      Weight: 4,
      Age: 3
    },
    {
      Name: 'Jack',
      Gender: 'Male',
      Breed: 'Turtle',
      Weight: 13,
      Age: 23
    },
    {
      Name: 'Bailey',
      Gender: 'Female',
      Breed: 'Bird',
      Weight: 2,
      Age: 4
    },
    {
      Name: 'Bella',
      Gender: 'Female',
      Breed: 'Dog',
      Weight: 6,
      Age: 10
    }
  ])
  const { columnss } = route.params
  useEffect(() => {
    setColumns(columnss)
    setPets(centers)
  }, [columnss, centers])
  const handleCreneaux = async () => {
    try {
      //   console.log('jjjj',item.id)

      const response = await fetchCentreInfo({ id: centre.id })
      const centerr = response.data
      console.log(centerr)
      if (centerr) {
        navigation.navigate('CenterDetails', { center: centerr })
      }
    } catch (error) {
      console.warn('error fetching cener details', error)
    }
  }
  const handleDeleteCentre = async (id) => {
    try {
      await deleteCentre(id)
      setPets(centers.filter((centre) => centre.id !== id))
    } catch (error) {
      console.error('Error deleting centre:', error)
    }
  }
  const handleUpdateCenter = async (centre) => {
    try {
      console.log('centre esr :; ', centre)
      navigation.navigate('CentreModifie', { centre })
    } catch (error) {
      console.error('Error deleting centre:', error)
    }
  }
  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc'
    const sortedData = _.orderBy(pets, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setPets(sortedData)
  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => sortTable(column)}
            >
              <Text style={styles.columnHeaderTxt}>
                {column + ' '}
                {selectedColumn === column && (
                  <MaterialCommunityIcons
                    name={
                      direction === 'desc'
                        ? 'arrow-down-drop-circle'
                        : 'arrow-up-drop-circle'
                    }
                  />
                )}
              </Text>
            </TouchableOpacity>
          )
        }
      })}
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        style={{ width: '95%' }}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={tableHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onLongPress={() => {
                selectCenter(item)

                refRBSheet.current.open()
              }}
            >
              <View
                style={{
                  ...styles.tableRow,
                  backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white'
                }}
              >
                <Text style={styles.columnRowTxt}>{item.nom}</Text>
                <Text style={styles.columnRowTxt}>{item.adresse}</Text>
                <Text style={styles.columnRowTxt}>{item.email}</Text>
                <Text style={styles.columnRowTxt}>{item.telephone}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <StatusBar style='auto' />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressBack
        closeOnPressMask
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: '#000'
          },
          container: {
            // Add rounded borders
            marginHorizontal: 1,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            backgroundColor: '#fff'
          },
          closeButton: {
            // Add hint to close dropdown
            alignItems: 'center',
            marginVertical: 10
          },
          closeButtonText: {
            color: '#000',
            fontSize: 14
          }
        }}
      >
        <View>
          <Text style={styles.section_text}>{centre.nom} </Text>
          <TouchableOpacity onPress={() => handleUpdateCenter(centre)}>
            <View
              style={{ backgroundColor: secondColor, ...styles.buttonModie }}
            >
              <Text style={styles.buttonText}>Modifie ce centre</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleCreneaux()
            }}
          >
            <View style={{ backgroundColor: lastColor, ...styles.buttonModie }}>
              <Text style={styles.buttonText}>Creneaux Infromation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteCentre(centre.id)}>
            <View style={{ backgroundColor: darkGreen, ...styles.buttonModie }}>
              <Text style={styles.buttonText}>Suprime ce centre </Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#37C2D0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center'
  },
  columnHeader: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold'
  },
  columnRowTxt: {
    width: '25%',
    textAlign: 'center'
  },
  section_text: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    alignSelf: 'center',
    color: '#000000'
  },

  textPrice: {
    color: '#000000',
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 3
  },

  buttonModie: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    //  backgroundColor:"blue",
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 8
  },

  buttonText: {
    fontSize: 24,
    color: '#fff'
  }
})
