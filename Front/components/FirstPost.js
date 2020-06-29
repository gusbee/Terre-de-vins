import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width } = Dimensions.get("window")

export default function FirstPost(props){

    //Récupération du champs 'Description' de l'article
    const description = props.post.description.split('>') 
    //Récupération de la balise image dans la description
    const image = description[4].split(' ')[3]
    //Récupération de l'url de la source
    const source = image.split('"')[1]
    //Récupération de la catégorie principale
    const mainCategory = props.post.categories[1].name

    return(
        <View style={style.container}>
            <View style={style.line}></View>
            <TouchableOpacity
                onPress={() => props.onPress(props.post)}
            >
                <Image 
                    style={style.picture}
                    source={{uri: source}}
                />
                <View style={style.text}>
                    <Text style={style.title}>{props.post.title}</Text>
                    <Text style={style.category}>{mainCategory}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        maxWidth: '100%',
        marginHorizontal: 16,
    },
    line:{
        width: '90%',
        height: .5,
        backgroundColor: '#44355B',
        opacity: .2,
        marginVertical: 10,
    },
    picture:{
        width: '100%',
        height: 178,
    },
    text:{
        marginTop: 10,
        flexShrink: 1,
    },
    title:{
        flex: 1,
        fontFamily: 'Sen-Regular',
        fontSize: (width < 400) ? 14 : 18,
        color: '#404040',
    },
    category:{
        fontFamily: 'Sen-Regular',
        fontSize: 12,
        color: '#404040',
        textTransform: 'capitalize',
        marginTop: 10,
    }
})