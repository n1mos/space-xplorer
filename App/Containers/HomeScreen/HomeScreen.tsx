import React from 'react'
import { SafeAreaView, Text } from 'react-native'

import LaunchesList from '../../Components/LaunchesList/LaunchesList'
import Styles from './HomeScreen.style'

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={Styles.container}>
            <LaunchesList navigation={navigation} />
        </SafeAreaView>
    )
}

export default HomeScreen