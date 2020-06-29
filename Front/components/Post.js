import React from 'react'
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

/**
 * PROPS : 
 *      post : object  
 */

const { width } = Dimensions.get("window")

export default function Post(props){
    //Récupération du champs 'Description' de l'article
    const description = props.post.description.split('>') 
    //Récupération de la balise image dans la description
    const image = description[1].split(' ')[3]
    //Récupération de l'url de la source
    const source = image.split('"')[1]
    //Récupération de la catégorie principale
    const mainCategory = props.post.categories[1].name
    
    return(
        <View style={style.container}>
            <View style={style.line}></View>
            <TouchableOpacity 
                style={style.post}
                onPress={() => props.onPress(props.post)}
            >
                <Image 
                    style={style.picture}
                    source={{uri: source}}
                />
                <View style={style.text}>
                    <Text style={style.title}>{props.post.title}</Text>
                    <View>
                        <Text style={style.category}>{mainCategory}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        maxWidth: '100%',
        marginHorizontal: 16,
        alignItems: 'center',
    },
    line:{
        width: '90%',
        height: .5,
        backgroundColor: '#44355B',
        opacity: .2,
        marginVertical: 10,
    },
    post:{
        maxWidth: '100%',
        flexDirection: 'row'
    },    
    picture:{
        width: 100,
        height: 100,
        marginRight: 15
    },
    text:{
        flexShrink: 1,
    },
    title:{
        flex: 1,
        fontFamily: 'Sen-Regular',
        fontSize: (width < 400) ? 14 : 18,
        color: '#404040',
        textAlign: 'right'
    },
    category:{
        fontFamily: 'Sen-Regular',
        fontSize: 12,
        color: '#404040',
        textAlign: 'right',
        textTransform: 'capitalize'
    }
})