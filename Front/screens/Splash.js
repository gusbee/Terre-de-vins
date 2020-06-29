import React from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'

export default function Splash(props){
    return(
        <View style={style.container}>
            {props.getData()}
            <Image 
                source={require('../images/logo.png')}
            />
            <ActivityIndicator
                color="#5A2A75"
                size="large"
                style={style.indicator}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        position: "relative"
    },
    indicator: {
        position: "absolute",
        bottom: 50,
    }
})