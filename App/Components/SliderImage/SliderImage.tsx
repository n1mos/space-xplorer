import React from 'react'
import { View, Text, Image } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'

import Styles from './SliderImage.style'
import Touchable from '../Touchable/Touchable'

const SliderImage = (props) => {
    React.useEffect(() => {
        props.onLoadEnd()
    }, [])

    const isLiked = props.liked[props.source.uri];
    
    return (
        <View style={Styles.container}>
            <TapGestureHandler
            maxDelayMs={250}
            numberOfTaps={2}
            onActivated={() => props.onDoubleTap(props.source)}
            >
                <View>
                    <Image style={[props.style, Styles.container]} source={props.source} />

                    <View style={Styles.likeContainer}>
                        <Touchable>
                            <Image
                                source={
                                    isLiked
                                    ? require("../../Images/heart.png")
                                    : require("../../Images/heart-outline.png")
                                }
                                resizeMode="cover"
                            />
                        </Touchable>
                    </View>
                </View>
            </TapGestureHandler>
        </View>
    )
   
}

export default SliderImage