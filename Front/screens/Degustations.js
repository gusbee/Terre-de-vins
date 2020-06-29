import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from "react-redux"
import Degustation from "../components/DegustationPost"

const mapStateToProps = (state) => {
    return {
        degustations: state.contentReducer.degustations
    }
}

function Degustations(props) {

    const goToDegustationContent = (degustation) => {
        props.navigation.navigate('Dégustation', {degustation: degustation} )
    }

    return (
        <ScrollView
            style={style.scrollview}
        >
            {props.degustations.map((degustation, index) => (
                <Degustation
                    key={index}
                    onPress={goToDegustationContent}
                    degustation = {degustation}
                />
            ))}       
        </ScrollView>
    )
}

export default connect(mapStateToProps)(Degustations)

const style = StyleSheet.create({
    scrollview: {
        backgroundColor: "#FFFFFF"
    },
    image: {
        width: 100,
        height: 100,
    }
})