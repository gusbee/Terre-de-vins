import React from 'react'
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

/**
 * PROPS : 
 *      article : object  
 */

 const { width } = Dimensions.get('window')

export default function FavoritesPost(props){
    //Récupération de l'url de la source
    const source = props.post.description.split('>')[1].split(' ')[3].split('"')[1]

    function titleTroncate(title){
        if(title.length > 50){
            title = title.substring(0,50) + '...'
        }
        return title
    }
    
    return(
        <View style={style.container}>

            <TouchableOpacity 
                style={style.post}
                onPress={() => props.onPress(props.post)}
            >
                <Image 
                    style={style.picture}
                    source={{uri: source}}
                />
                <Text style={style.title}>{titleTroncate(props.post.title)}</Text>                    
            </TouchableOpacity>

            <TouchableOpacity 
                style={style.delete}
                onPress={() => props.toogleFavorite(props.post.id, props.post)}
            >
                <Image 
                    source={require('../images/trash.png')}
                    style={style.trash}
                />
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    container:{
        height: 130,
        marginVertical: 7.5,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    post:{
        maxWidth: "90%",
        flexDirection: "row",
        flexShrink: 1,
        
    },
    picture:{
        width: 100,
        height: 100,
        marginHorizontal: 15,
    },
    title:{
        fontFamily: "Sen-Bold",
        fontSize: (width < 400) ? 14 : 16,
        flexShrink: 1,
    },
    delete:{
        width: 44,
        height: "100%",
        backgroundColor: "#5A2A75",
        justifyContent: "center",
        alignItems: "center",
    },
    trash:{
        width: 20,
        height: 20,
    }
})