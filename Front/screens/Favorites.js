import React from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import {connect} from 'react-redux'
import FavoritesPost from '../components/FavoritesPost'

const {height} = Dimensions.get('window')

const mapStateToProps = (state) => {
    return {
        favoritesIds: state.favoritesReducer.favoritesIds,
        favoritesPosts: state.favoritesReducer.favoritesPosts
    }
}

function Favorites(props){

    function goToArticle(post){
        props.navigation.navigate('Actualités', {
            screen: "Article",
            params:{post: post}
        })
    }

    function toogleFavorite(post_id, post){
        const action = {
            type: "TOOGLE_FAVORITE",
            value: {
                id: post_id,
                post: post
            }
        }
        props.dispatch(action)
    }

    if(props.favoritesPosts.length != 0){
        return(
            <ScrollView contentContainerStyle={style.container}>
                {props.favoritesPosts.map((post, index) => (
                    <FavoritesPost 
                        key={index}
                        post={post}
                        onPress={goToArticle}
                        toogleFavorite={toogleFavorite}
                    />
                ))}
            </ScrollView>
        )
    } else {
        return(
            <View style={style.empty}>
                <Text style={style.text}>Vous n'avez pas sauvegardé de favoris.</Text>
                <Text style={style.text}>Cliquez sur l'icône ci-dessous pour enregistrer vos articles préférés.</Text>
                <Text style={style.text}>Vous pourrez les consulter plus tard, même hors ligne</Text>
                <Image 
                    source={require('../images/favoris.png')}
                    style={style.image}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Favorites)

const style = StyleSheet.create({
    container:{
        minHeight: height - 88,
        backgroundColor: "#606060",
        alignItems: "center",
        paddingTop: 7.5,
        paddingHorizontal: 15,
    },
    empty:{
        flex: 1,
        backgroundColor: "#404040",
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        width: "90%",
        fontFamily: "Sen-Regular",
        fontSize: 14,
        color:"#FFFFFF",
        textAlign: "center"
    },
    image:{
        marginVertical: 20,
    }
})