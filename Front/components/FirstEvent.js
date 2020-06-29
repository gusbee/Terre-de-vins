import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

/**
 * PROPS : 
 *  event (object)
 *  onPress (function)
 */

export default function FirstEvent(props){

    const source = props.event.description.split('<')[5].split(',')[1].split(' ')[1]
    
    const startDate = props.event.startdate.split('@')[0]


    return(
        <TouchableOpacity
            style={style.container}
            onPress={() => props.onPress(props.event)}
        >
            <Image 
                source={{uri: source}}
                style={style.picture}
            />
            <LinearGradient
                colors={['transparent' , 'rgba(0,0,0,0.7)']}
                start={[0, 0]}
                locations={[0, 0.4]}
                style={style.linearGradient}
            >
                <View style={style.information}>
                    <Text style={style.title}>{props.event.title}</Text>
                    <View style={style.placeAndDate}>
                        <Text style={style.place}>{props.event.city}</Text>
                        <Text style={style.date}>{startDate}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        position: 'relative',
        marginBottom: 15,
    },
    picture:{
        width: '100%',
        height: 225,
        backgroundColor: 'pink',
    },
    linearGradient: {
        width: "100%",
       marginHorizontal: 15,
        position: 'absolute',
        bottom: 0,
    },
    information:{
        width: "100%",
        padding: 8,
    },
    title:{
        fontFamily: 'Sen-Regular',
        fontSize: 18,
        color: '#FFFFFF',
    },
    placeAndDate:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    place:{
        fontFamily: 'Sen-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        backgroundColor: '#B6A962',
        padding: 2,
    },
    date:{
        fontFamily: 'Sen-Regular',
        fontSize: 12,
        color: '#FFFFFF'
    }
})