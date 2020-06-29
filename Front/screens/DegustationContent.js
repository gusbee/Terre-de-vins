import React from 'react'
import { Text, StyleSheet, Image, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HTMLView from 'react-native-htmlview'

export default function DegustationContent(props) {
    const degustation = props.route.params.degustation
    const source = degustation.description.split("<")[5].split('"')[5]
    const cats = degustation.categories
    const arrayContent = degustation.content.split('\n')
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
    return (
        <ScrollView style={style.scrollview}>
            <Text style={style.title}>{degustation.title}</Text>
            <Image
                source={{ uri: source }}
                style={style.image}
            />
            <View style={style.categories}>
                {degustation.categories.map((cat, index) => (
                    <Text key={index} style={style.category}>{cat.name}</Text>
                ))}
            </View>

            {/* CONTENT */}
            {content.map((p, index) => (<HTMLView style={style.content} stylesheet={htmlstyles} key={index} value={p} />))}
       </ScrollView>
    )
}

const htmlstyles = StyleSheet.create({
    strong:{
        fontFamily: 'Sen-Bold',
        fontSize: 16,
        color: "#404040"
    },
    p:{
        fontFamily: 'Sen-Regular',
        fontSize: 16,
        color: "#404040"
    },
    a:{
        fontFamily: 'Sen-Bold',
        color: '#5A2A75',
        textDecorationLine: 'underline'
    }
})

const style = StyleSheet.create({
    scrollview: {
        backgroundColor: "#FFFFFF"
    },
    image: {
        width: "100%",
        height: 236,
        marginBottom: 10,
    },
    title: {
        fontFamily: "Sen-Bold",
        fontSize: 18,
        paddingVertical: 4,
        paddingHorizontal: 15,
        backgroundColor: "#B6A962",
        color: "#FFFFFF"
    },
    categories: {
        paddingHorizontal: 15,
        flexWrap: "wrap",
        flexDirection: "row",
    },
    category: {
        fontFamily: 'Sen-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        backgroundColor: '#7B7B7B',
        padding: 4,
        margin: 4,
        textTransform: 'capitalize'

    },
    content:{
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
})