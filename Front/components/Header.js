import React from "react"
import { View, Text, StyleSheet } from "react-native"

/**
 *  PROPS :
 *  title (string)
 *  backbutton (function)
 *  burgerbutton (function)
 */


export default function Header(props) {
    return (
        <View style={style.container}>
            <View style={style.headerLeft}></View>
            <Text style={style.title}>{props.title}</Text>
            <View style={style.headerRight}></View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 88,
    },
    headerLeft: {

    },
    headerRight: {

    },
    title: {
        
    }
})