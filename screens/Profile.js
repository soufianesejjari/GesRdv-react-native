import React, { useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { fetchlougOut } from '../redux/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundC, secondColor } from './ConfigTheme';

export default  function Profile() {
    const dispatch=useDispatch()

    const [userName, setUserName] = React.useState("");
    const [mail, setMail] = React.useState("");


   useEffect(() => {
        async function fetchData() {
            try {
                const userName = await AsyncStorage.getItem('userName');
                const mail = await AsyncStorage.getItem('mail');
                setUserName(userName || "Faild to load");
                setMail(mail || "Faild to load");
            } catch (error) {
                console.error("Error fetching data from AsyncStorage:", error);
            }
        }
        fetchData();
    }, []);

    function getFirstLetters(inputString) {
        // Split the input string by space
        const words = inputString.split(' ');
      
        // Initialize an empty string to store the first letters
        let firstLetters = '';
      
        // Iterate over the words array
        words.forEach(word => {
          // Get the first character of each word and append it to the firstLetters string
          firstLetters += word.charAt(0);
        });
      
        // Return the resulting string of first letters
        return firstLetters;
      }
    const navigation=useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundC }}>
      <View style={styles.container}>
        <View style={styles.profile}>
            <View style={styles.profileAvatar}>
                <Text style={{fontWeight:600, fontSize:24}}>{userName?getFirstLetters(userName):"AA"}</Text>
            </View>

          <Text style={styles.profileName}>{userName?userName:"Faild to load"}</Text>

          <Text style={styles.profileEmail}>{mail?mail:"Faild to load"}</Text>

          <TouchableOpacity
            onPress={() => {
                dispatch(fetchlougOut());
             
                // Refresh the app
            }}>
            <View style={styles.profileAction}>
                
              <Text style={styles.profileActionText}>Lougout</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: {backgroundC},
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 120,
    backgroundColor: "#fceecc",
    justifyContent:"center",
    alignItems:"center"
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondColor,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});