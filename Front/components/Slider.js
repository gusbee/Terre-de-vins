import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import Slide from "../components/Slide"


let slide_index = 0

const { width } = Dimensions.get("window")

export default class Slider extends React.Component {
    render() {
        return (
            <View style={style.slider}>
                {/* {this.getNextEvents(this.props.events, 5).map((event, index) => ( */}
                <Slide
                    // key={index}
                    event={this.props.getNextEvents(this.props.events, 5)[slide_index]}
                    onPress={this.goToEvent}
                />
                {/* ))}                     */}
                <Text style={style.topTitle}>Actualités</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    topTitle:{
        width: '100%',
        fontFamily: 'Sen-Bold',
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingVertical: 6,
        backgroundColor: '#B6A962',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
    },
    text:{
        fontFamily: 'Sen-Regular',
        fontSize: 18,
        color: '#404040'
    },
    slider: {
        height: 236,
        flexDirection: 'row',
        transform: [{
            translateX: -1 * slide_index * width
        }]
        // borderColor: "blue",
        // borderWidth: 2,
    },
})