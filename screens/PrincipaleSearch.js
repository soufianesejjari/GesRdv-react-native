import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCenters } from '../redux/reducers/CentresSlice';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getAvalaibleCreneau } from '../services/RendezVousService';
import generateRendezVousPDF from '../services/generateRendezVousPDF';
import { fetchRendezs, selectError, selectLoading, selectRendezs } from '../redux/reducers/RdvSlice';
import { fetchaddRendez, selectErrorAdd, selectLoadingAdd, selectRendez } from '../redux/reducers/AddRendezSlice';
import { Card, Button as BtnR} from 'react-native-paper';
import { backgroundC, darkGreen, secondColor, thirdColor } from './ConfigTheme';

const SearchSlotsScreen = ({navigation}) => {

  useEffect(() => {
    const backAction = () => {
     setResulMode(false)
     setCentreId(null)
     setCentre(null)
     setCreneau(null)

      return true; // Return true to prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup function

  }, [navigation]); // Dependency array to ensure effect is re-run if navigation changes

  const dispatch=useDispatch();
  const availableCreneau=useSelector(selectRendezs)
  const isloading=useSelector(selectLoading)
  const error=useSelector(selectError)

const [isStart,setIsStart]= useState(false)
  const [centre, setCentre] = useState('');
  const [centreId, setCentreId] = useState();

  const [date, setDate] = useState('');
  const [creneau, setCreneau] = useState();
  const [searchResult, setSearchResult] = useState([]);
const [resultMode,setResulMode]= useState(false);


  const centres = useSelector(selectCenters);

  //pickel for date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    // Format the date if needed
    setDate(date.toISOString().split('T')[0]); // Adjust the format as per your requirement

    // Extract the time from the date and format it as HH:mm
    // const formattedTime = `${date.getHours()}h:${date.getMinutes()}min`;

    hideDatePicker();
  };
  const creneaus = [
    { id: 1, name: '9:00 - 10:00', startDate:"09:00" },
    { id: 2, name: '10:00 - 11:00', startDate:"10:00" },
    { id: 3, name: '11:00 - 12:00', startDate: "11:00" },
    { id: 4, name: '12:00 - 13:00', startDate: "12:00" },
    { id: 5, name: '13:00 - 14:00', startDate: "13:00" },
    { id: 6, name: '14:00 - 15:00', startDate: "14:00" },
    { id: 7, name: '15:00 - 16:00', startDate: "15:00" },
    { id: 8, name: '16:00 - 17:00', startDate: "16:00" },
    { id: 9, name: '17:00 - 18:00', startDate: "17:00" },

  ];
  const searchSlots = async () => {

    if(!centreId || !date ){

      return
    }

    /*   try {
        const data = await getAvalaibleCreneau(centre, date, creneau);
        if (data && data.length > 0) {
        } else {
         // setSearchResult([]); // Clear previous search results
          alert('Pas de créneau disponible pour cette date'); // Display custom message
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        alert('Pas de créneau disponible pour cette date'); // Display custom message
      } */

      dispatch(fetchRendezs(centreId, date, creneau))
   setResulMode(true)
    };
    useEffect(() => {
      if (!isloading && availableCreneau.length > 0) {
        setSearchResult(availableCreneau);
      }
    }, [isloading, availableCreneau]);
    useEffect(() => {
      if (selectRendez.length >0) {
        console.log('added succesfuly')
       // alert(selectRendez);
      }
    }, [selectRendez]);

    const handleBookSlot = async (slot) => {
      const normalizedRDV ={
        centreId:centreId,
        centre:centre,
        date: slot.date,
        creneauId: slot.id,
        heureDebut:slot.heureDebut,
        heureFin:slot.heureFin,
        capacite: slot.capacite,
      }
      console.log(normalizedRDV)
      navigation.navigate('ConfirmationRenderVous', { rendezVous: normalizedRDV});

      // Logic to handle booking the selected slot
    
    /*     try {
          const pdfPath = await generateRendezVousPDF(slot.heureDebut, slot.date, slot.capacite);
          console.log('PDF generated at:', pdfPath);
          // Do something with the PDF path (e.g., display a link to download or open the PDF)
        } catch (error) {
          console.error('Error generating PDF:', error);
        } */
      /*   console.log('before slot:', centre);
    
        dispatch(fetchaddRendez(centre, date, slot.id));
        console.log('Booking slot:', slot); */
    };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>Réserver un Rendez-Vous</Text>

     
     
     
      </View>
     {resultMode?  <View style={styles.formFooter}>
        {searchResult.map((slot) => (
          <View key={slot.id} style={styles.slotItem}>
      <Card>
      <Card.Content>
        <Text>Capacity: {slot.capacite}</Text>
      </Card.Content>
      <Card.Title
        title={slot.date}
        subtitle={`${slot.heureDebut} - ${slot.heureFin}`}
        right={() => (
          <View style={styles.rightContainer}>
                <Card.Actions>
        <BtnR contentStyle={{color:'#00353F'}} style={{backgroundColor:backgroundC}} onPress={() => handleBookSlot(slot)}>réserver</BtnR>
      </Card.Actions>
            {/* Add any additional content you want to display on the right side */}
          </View>
        )}
      />
  
    </Card>
         
          
          </View>
        ))}
      </View>
      :
      <View style={styles.form}>
      <Text   style={styles.inputLabel}
    >Select Centre </Text>
    <Picker
  selectedValue={centre}
  onValueChange={(itemValue, itemIndex) => {
    console.log("item value :", itemValue.nom, " item id : ", itemIndex);
    setCentre(itemValue.nom); // Set the selected center's name
    console.log("vvvvvvvvvvvvvvvvvvv, ", itemIndex);
    setCentreId(itemIndex); // Set the selected center's index
  }}
  style={styles.inputControl}
>
  <Picker.Item label={centre?centre:"Select Centre"}  value="" />
  {centres.map((center, index) => ( // Add index parameter to map function
    <Picker.Item key={index} label={center.nom} value={center} /> // Use index as key
  ))}
</Picker>


      <View style={styles.TextInput}>
      <Text   style={styles.inputLabel}
    >Select Date </Text>
      <TouchableOpacity onPress={showDatePicker}>
      <TextInput
          style={styles.inputControl}
          placeholder="choisir une  Date"
          value={date}
          onChangeText={setDate}
          editable={false} 
        />
      </TouchableOpacity>
      
     </View>
  
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        
      <Text   style={styles.inputLabel}
    >Select Creneau (Optional)</Text>
      
    
        <Picker
        selectedValue={creneau}
        onValueChange={(itemValue, itemIndex) => setCreneau(itemValue)}
        style={styles.inputControl}
      >
        <Picker.Item label="Creneaux" value="" />
        {creneaus.map((creneau) => (
          <Picker.Item key={creneau.id} label={creneau.name} value={creneau.startDate} />
        ))}
      </Picker>
                <View style={styles.btn}>
                  <TouchableOpacity onPress={()=>{searchSlots()}}>
                 <Text style={styles.btnText} >Rechercher </Text>

                  </TouchableOpacity>

      </View>
</View>
      
      } 
   
     
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#e8ecf4',
  },
  title: {
    alignContent:'center',
    marginTop:28,
    textAlign:'center',
    fontSize: 32,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical:10,
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
    paddingVertical: 12,
    margin:5,
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

  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slotItem: {
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

});

export default SearchSlotsScreen;
