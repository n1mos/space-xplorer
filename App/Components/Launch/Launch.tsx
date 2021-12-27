import React from 'react'
import { View, Text, Image } from 'react-native'
import moment from 'moment'

import Styles from './Launch.style'
import Touchable from '../Touchable/Touchable'

const Launch = ({ data, onPress }) => {
    const image = data.links.flickr_images[0] || `https://via.placeholder.com/450?text=${data.mission_name}`
    const launchDate = moment(data.launch_date_local).format("MMMM Do YYYY, h:mm:ss a")
    
    return (
        <Touchable onPress={onPress}>
            <View style={Styles.container}>
                <View style={Styles.imageContainer}>
                    <Image style={Styles.image} source={{ uri: image }} />
                </View>
                <View style={Styles.bottomContainer}>
                    <Text style={Styles.title}>
                        {data.mission_name}
                    </Text>
                    <Text style={Styles.subtitle}>
                        {launchDate}
                    </Text>
                </View>
            </View>
        </Touchable>
    )
}

export default Launch