import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useIsDrawerOpen } from '@react-navigation/drawer'





export default function Burger(props){
    const isDrawerOpen = useIsDrawerOpen()
    return(
        <TouchableOpacity 
            style={style.button}
            onPress={isDrawerOpen ? (
                props.navigationProps.closeDrawer
            ) : (
                props.navigationProps.openDrawer
            )}    
        >
            <View style={isDrawerOpen ? style.firstcross : style.line}></View>
            <View style={isDrawerOpen ? style.secondcross : style.line}></View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button:{
        width: 33,
        height: 26,
        padding: 8,
        marginRight: 30,
        justifyContent: 'space-between',
    },
    line:{
        width: '100%',
        height: 1,
        borderColor: 'purple',
        borderWidth: 1
    },
    firstcross:{
        width: '100%',
        height: 1,
        transform:[
            {rotate: '45deg'},
            {translateY: 6}
        ],
        borderColor: 'purple',
        borderWidth: 1
    },
    secondcross:{
        width: '100%',
        height: 1,
        transform:[
            {rotate: '-45deg'},
            {translateY: -6}
        ],
        borderColor: 'purple',
        borderWidth: 1
    }
})