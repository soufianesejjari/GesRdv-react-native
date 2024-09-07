import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCenters,
  selectCenters,
  selectLoading,
  selectError,
  centerSlice
} from '../redux/reducers/CentresSlice'
import { View, Text, FlatList } from 'react-native'
const Center = () => {
  const dispatch = useDispatch()
  // const centersa = useSelector(selectCenters);
  const count = useSelector((state) => state.counter.count)

  const centers = useSelector(selectCenters)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const UserItem = ({ user }) => {
    console.log(user, 'gggggggggggggggggggggggggggggggggg')

    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text>ID: {user.nom ? user.nom : 'hh'}</Text>
        <Text>
          Name: {user.adresse} {user.telephone}
        </Text>
        <Text>Email: {user.email}</Text>
        {/* You can display other user properties here as well */}
      </View>
    )
  }

  const UserList = () => {
    return (
      <FlatList
        data={centers}
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
      />
    )
  }

  return (
    <View>
      <Text>{count}</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : centers ? (
        <FlatList
          data={centers}
          renderItem={({ item }) => <UserItem user={item} />}
          keyExtractor={(item) => item.id.toString()} // Unique key for each item
        />
      ) : null}
    </View>
  )
}

export default Center
