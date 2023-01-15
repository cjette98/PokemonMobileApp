import React, { useMemo, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
//COMPONENT
import PokemonCard from '../../component/PokemonCard'
//CONTROLLER
import useController from './controller/index.controller'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import GridView from '../../component/GridView'
const Home = ({ navigation }) => {
  const { list, isGettingMoreData } = useSelector((state) => state.pokemon.pokemons)
  const { isLoading, isCloseToBottom, onSearch, onNextPage } = useController()
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [sortAscending, setSortAscending] = useState(false);
  const [isGridView, setGridView] = useState(true)
  useMemo(() => {
    setData(list)
  }, [list])

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      //localeCompare method is used to compare the values of the properties used for sorting.
      return sortAscending ? a.number.localeCompare(b.number) : b.number.localeCompare(a.number);
    });
    setData(sortedData);
    setSortAscending(!sortAscending);
  }


  return (
    <View style={{ flex: 1 }}>

      <View style={styles.headerContainer}>
        <TextInput
          style={{ width: '85%' }}
          label="Search Pokemon"
          mode="outlined"
          value={text}
          onChangeText={(text) => {
            setText(text)
            setData([...onSearch(text)])
          }}
        />
        <TouchableOpacity
          style={[styles.fitlerContainer, { backgroundColor: sortAscending ? '#EE8130' : 'transparent' }]}
          onPress={sortData}>
          <MaterialCommunityIcons name={'sort'} size={28} />
        </TouchableOpacity>

      </View>
      <View style={[styles.row, { justifyContent: 'space-between', paddingHorizontal: 10 }]}>
        <Text style={styles.lstLbl}>List of Pokemons</Text>
        <View style={styles.row}>
          <Feather
            onPress={() => setGridView(true)}
            name={'grid'} size={26
            } style={styles.iconSpace}
            color={isGridView ? '#EE8130' : 'black'}
          />
          <Feather
            onPress={() => setGridView(false)}
            name={'list'}
            size={26}
            style={styles.iconSpace}
            color={!isGridView ? '#EE8130' : 'black'} />
        </View>
      </View>
      {isGridView ? <GridView data={data.length > 0 ? data : list} /> : <FlatList
        data={data.length > 0 ? data : list}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        Enable this if you want to implement infinite scrolling
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && isGettingMoreData) {
            onNextPage()
          }
        }}
      />}


    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fitlerContainer: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 10,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  lstLbl: {
    fontWeight: 'bold',
    fontSize: 20
  },
  iconSpace: {
    padding: 5,
    marginHorizontal: 4
  }
})

export default Home
