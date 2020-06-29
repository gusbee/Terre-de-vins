import React from "react"
import { Dimensions, StyleSheet, View, Text, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

/**
 * PROPS : 
 *  degustation
 */

const { width } = Dimensions.get("window")

export default function Degustation(props) {
    
    const source = props.degustation.description.split('<')[2].split('=')[3].split('"')[1]
    const mainCategory = props.degustation.categories[0].name

    return (
        <View style={style.container}>
            <View style={style.line}></View>
            <TouchableOpacity 
                style={style.post}
                onPress={() => props.onPress(props.degustation)}
            >
                <Image 
                    style={style.picture}
                    source={{uri: source}}
                />
                <View style={style.text}>
                    <Text style={style.title}>{props.degustation.title}</Text>
                    <View style={{flexDirection: "row", justifyContent:"flex-end"}}>
                        <Text style={style.category}>{mainCategory}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: '90%',
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
        color: '#FFFFFF',
        textAlign: 'right',
        textTransform: 'capitalize',
        backgroundColor: "#B6A962",
        padding: 4,
    }
})