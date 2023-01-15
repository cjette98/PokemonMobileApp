import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import PokemonCard from '../component/PokemonCard'
const GridView = ({ data }: any) => {
    return (
        <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item }) => {
                return (
                    <View style={{ width: '50%' }}>
                        <PokemonCard pokemon={item} />
                    </View>
                )

            }


            }
        />
    )
}

export default GridView