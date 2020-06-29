import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Evenements(props){
    const event = props.route.params.event
    const source = event.description.split('<')[5].split(',')[1].split(' ')[1]
    const arrayContent = event.description.split('\n')
    const content = []

    arrayContent.forEach(element => {
        if(element[0] !== '<' && element.length > 0){
            element = '<p>' + element + '</p>'
            content.push(element)
        } else {
            if(element.search('<strong>') >= 0){
                content.push(element.slice(element.search('<strong>'), element.search('</strong>')))
            }
        }
    });

    function openURL(url){
        Linking.openURL(url).catch((err) => console.error('An error occurred', err))
    }

    function getEventDates(start, end){
        let startdate = start.replace(" min", "").replace("@", "à")
        let enddate = end.replace(" min", "").replace("@", "à")
        return "Du " + startdate + " au " + enddate
    }

    return (
        <ScrollView style={style.scrollview}>
            
            {/* HEADER TITLE */}
            <View style={style.header}>
                <Text style={style.title}>{event.title}</Text>
                <View style={style.addFavorite}></View>
            </View>

            <Image 
                source={{uri: source}}
                style={style.image}
            />

            <Text style={style.sectionTitle}>présentation</Text>

            {content.map((p, index) => (
                <HTMLView 
                    style={style.content} 
                    stylesheet={htmlstyles} 
                    key={index} 
                    value={p}
                />
            ))}

            <View style={style.information}>
                
                <Text style={style.sectionTitle}>informations</Text>
                
                <Text style={style.informationDates}>{getEventDates(event.startdate, event.enddate)}</Text>
                
                <View style={style.place}>
                    <Image source={require('../images/location.png')}/>
                    <Text style={style.informationPlace}>{event.location} {event.zip} {event.city}</Text>
                </View>

                <TouchableOpacity style={style.link} onPress={() => openURL(event.link)}>
                    <Text style={style.linkText}>Réserver</Text>
                </TouchableOpacity>

            </View>
            
        </ScrollView>
        
    )
}

const htmlstyles = StyleSheet.create({
    strong:{
        fontFamily: 'Sen-Bold',
    },
    p:{
        fontFamily: 'Sen-Regular',
        fontSize: 16,
    },
    a:{
        fontFamily: 'Sen-Bold',
        color: '#5A2A75',
        textDecorationLine: 'underline'
    }
})

const style = StyleSheet.create({
    scrollview:{
        backgroundColor: "#FFFFFF"
    },
    header:{
        width: "100%",
        flexDirection: "row",
        padding: 15,
    },
    title:{
        fontFamily: 'Sen-Bold',
        fontSize: 18,
        color:"#000000",
        flex: 10
    },
    addFavorite:{
        flex: 2,
    },
    image:{
        width: "100%",
        height: 225,
    },
    content:{
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    information:{
        marginHorizontal: 15,
        marginBottom: 50,
        padding: 20,
        backgroundColor: "#E6E6E6",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    sectionTitle:{
        fontFamily: "Sen-Regular",
        fontSize: 17,
        color: "#B6A962",
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 15,
    },
    informationDates:{
        fontFamily: "Sen-Bold",
        fontSize: 16,
        color: "#404040",
        textAlign: "center",
        paddingVertical: 20,
        paddingHorizontal: 50,
    },
    informationPlace:{
        fontFamily: "Sen-Regular",
        fontSize: 14,
        color: "#404040",
        textAlign: "center",
    },
    place:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    link:{
        width: 188,
        height: 31,
        backgroundColor: "#B6A962",
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        bottom: -31,
        // left: 0,
    },
    linkText:{
        fontFamily: "Sen-Regular",
        fontSize: 16,
        color: "#FFFFFF",
        textTransform: "uppercase",
    }
})