import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Récupération de la largeur de la fenêtre
const { width } = Dimensions.get("window")

export default function Event(props){

    // Récupération de l'url de l'image
    const source = props.event.description.split('<')[2].split('=')[3].split('"')[1]

    // Récupération des dates de début et de fin de l'événement
    function getDates() {
        const startDate = props.event.startdate.split(" ")
        const endDate = props.event.enddate.split(" ")
        return (
            "Du " +
            startDate[1] + " " + startDate[0] +
            " au " +
            endDate[1] + " " + endDate[0]
        )
    }

    // Récupération des heures de début et de fin de l'événement
    function getTimes() {
        const startDate = props.event.startdate.split(" ")
        const endDate = props.event.enddate.split(" ")
        return (
            startDate[3] + "h" + startDate[5] +
            "-" + endDate[3] + "h" + endDate[5]
        )
    }

    return(
        <TouchableOpacity
        style={style.container}
        onPress={() => props.onPress(props.event)}    
        >
            <Image 
            source={{uri: source}}
            style={style.image}
            />
            <View style={style.texts}>
                <Text style={style.title}>{props.event.title}</Text>
                <Text style={style.date}>{getDates()}</Text>
                <Text style={style.date}>{getTimes()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: "#FFFFFF",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    image:{
        width: 100,
        height: 100,
        marginRight: 15,
    },
    title: {
        fontFamily: "Sen-Bold",
        fontSize: width < 400 ? 13 : 15,
        color: "#404040",
        textAlign: "right",
    },
    texts: {
        flexShrink: 1,
    },
    date: {
        fontFamily: "Sen-Regular",
        fontSize: 15,
        color: "#7B7B7B",
        textAlign: "right",
    }
})