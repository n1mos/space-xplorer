import React, { useCallback, useState } from 'react'
import { Linking, SafeAreaView, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from 'react-native-image-slider-box'

import Styles from './DetailsScreen.style'
import Props from './DetailsScreen.interface'
import SliderImage from '../../Components/SliderImage/SliderImage'
import Touchable from '../../Components/Touchable/Touchable';

const DetailsScreen = ({ route }: Props) => {
    const { data } = route.params
    const [launchImages, setLaunchImages] = useState([]);
    const [liked, setLiked] = useState({});

    React.useEffect(() => {
        const images = []
    
        data.links.flickr_images.map((img, index) => {
            if (index < 3)
                images.push(img)
        })

        if (data.links.flickr_images.length === 0)
            images.push(`https://via.placeholder.com/450?text=No+Image+Available`)

        setLaunchImages(images)

        console.log(data);
        

        getData()
    }, [])

    const onLinkPress = () => {
        Linking.openURL(data.links.article_link)
    }

    const onDoubleTap = ({ uri }) => {
        const newLiked = { ...liked, [uri]: !liked[uri] }
        setLiked(newLiked)
        storeData(newLiked)
    };


    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@liked')
            return jsonValue != null ? setLiked(JSON.parse(jsonValue)) : null;
        } catch(e) {
            console.error(e)
        }
    }
  
    
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@liked', jsonValue)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SafeAreaView style={Styles.container}>
            <SliderBox 
                ImageComponent={(imageProps) => <SliderImage {...imageProps} liked={liked} onDoubleTap={onDoubleTap} />} 
                images={launchImages} 
                sliderBoxHeight={400} 
                dotColor="blue"
                imageLoadingColor='#000'
            />

            <Text style={Styles.title}>🚀 {data.rocket.rocket_name}</Text>

            {data.links.article_link &&
                <Touchable onPress={onLinkPress}>
                    <Text style={Styles.article}>
                        Go to article link
                    </Text>
                </Touchable>
            }
        </SafeAreaView>
    )
}

export default DetailsScreen