// IMPORT REACT
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { connect } from 'react-redux'
import Home from './Home'
import FavoritesStack from './FavoritesStack'
import EventsStack from "./EventsStack"
import DegustationStack from "./DegustationsStack"
import Axios from 'axios'
import Splash from '../screens/Splash'
import CustomDrawerContent from '../components/CustomDrawer'

const URL = "http://a17b71e23720.ngrok.io"

const mapStateToProps = (state) => {
    return {
        posts: state.contentReducer.posts,
        events: state.contentReducer.events,
        degustations: state.contentReducer.degustations
    }
}

/* Statut de chaque récupération de contenu (articles, événements et dégustations) : ne passe à TRUE que lorsque 
la récupération est terminée et que le format est correcte pour utilisation sans erreur*/
let isReady = {
    posts: false,
    events: false,
    degustations: false
}

/* Variables temporaires pour éviter les re-rendu en utilisant le state */
let posts = []
let events = []
let degustations = []

const Drawer = createDrawerNavigator()

class RootComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    // Récupération des articles
    getPosts = () => {
        // Récupération des 20 derniers articles
        Axios.get(URL + "/articles/20")
            .then(response => (
                posts = response.data,
                this.checkUpdates("posts")
            ))
            .catch(error => console.log(error))
    }

    // Récupération des événements
    getEvents = () => {
        Axios.get(URL + "/evenements")
            .then(response => (
                events = response.data,
                this.checkUpdates("events")
            ))
            .catch(error => console.log(error))
    }

    // Récupération des dégustations
    getDegustations = () => {
        Axios.get(URL + "/alldegustations")
            .then(response => (
                degustations = response.data,
                this.checkUpdates("degustations")
            ))
            .catch(error => console.log(error))
    }

    // Récupération de l'ensemble des données
    getData = () => {
        this.getPosts()
        this.getEvents()
        this.getDegustations()
    }

    //  Stockage des données articles dans le store redux
    tooglePosts = (data) => {
        const action = {
            type: "UPDATE_POSTS",
            value: {
                data : data
            }
        }
        this.props.dispatch(action)
    }

    // Stockage des données événements dans le store redux
    toogleEvents = (data) => {
        const action = {
            type: "UPDATE_EVENTS",
            value: {
                data : data
            }
        }
        this.props.dispatch(action)
    }

    // Stockage des données dégustations dans le store redux
    toogleDegustations = (data) => {
        const action = {
            type: "UPDATE_DEGUSTATIONS",
            value: {
                data : data
            }
        }
        this.props.dispatch(action)
    }

    /**
     * Comparaison des données récupérées et des données déjà persistées
     * Si différentes ou aucune données persistées : mise à jour du store redux
     */
    checkUpdates = (key) => {
        switch (key) {
            case "posts":
                if (typeof (posts) === "object") {
                    if (this.props.posts[0] == undefined || posts[0].id !== this.props.posts[0].id) {
                        console.log("Mise à jour des articles")
                        this.tooglePosts(posts)
                    } else {
                        console.log("Les articles sont à jour")
                    }
                    isReady.posts = true
                    this.isLoaded()
                } else {
                    this.getPosts()
                }
                break
            
            case "events":
                if (typeof (events) === "object") {
                    if (this.props.events[0] == undefined || events[0].id !== this.props.events[0].id) {
                        console.log("Mise à jour des événements")
                        this.toogleEvents(events)
                    } else {
                        console.log("Les événements sont à jour")
                    }
                    isReady.events = true
                    this.isLoaded()
                } else {
                    this.getEvents()
                }
                break
            
            case "degustations":
                if (typeof (degustations) === "object") {
                    if (this.props.degustations[0] == undefined || degustations[0].id !== this.props.degustations[0].id) {
                        console.log("Mise à jour des dégustations")
                        this.toogleDegustations(degustations)
                    } else {
                        console.log("Les dégustations sont à jour")
                    }
                    isReady.degustations = true
                    this.isLoaded()
                } else {
                    this.getDegustations()
                }
                break
        }
    }

    /**
     * Si tous les éléments sont chargés, changement du state pour re-rendu de l'application
     */
    isLoaded = () => {
        if (isReady.posts && isReady.events && isReady.degustations) {
            this.setState({isLoaded: true})
        }
    }
    
    render() {
        if (this.state.isLoaded) {
            return (
                <Drawer.Navigator
                    drawerContent={(props)=><CustomDrawerContent {...props} />}
                    initialRouteName='Home'
                    drawerPosition='right'
                    hideStatusBar={false}
                    statusBarAnimation='none'
                    backBehavior='initialRoute'
                    drawerContentOptions={{
                        activeTintColor: "#B6A962",
                        inactiveTintColor: "#FFF",
                        activeBackgroundColor: "#404040",
                        labelStyle: {
                            fontFamily: "Sen-Regular",
                            fontSize: 20,
                        }
                    }}

                >
                    <Drawer.Screen
                        component={Home}
                        name='Actualités'
                        options={{
                            drawerIcon: ({ focused }) => (
                                focused ? (
                                    <Image
                                    source={require('../images/icon-actuality-active.png')}
                                    style={style.icon}
                                />
                                ) : (
                                    <Image
                                            source={require('../images/icon-actuality-inactive.png')}
                                            style={style.icon}
                                    />
                                )
                            ) 
                        }}
                    />

                    <Drawer.Screen
                        component={FavoritesStack}
                        name='Favoris'
                        options={{
                            drawerIcon: ({ focused }) => (
                                focused ? (
                                    <Image
                                        source={require('../images/icon-favorites-active.png')}
                                        style={style.icon}
                                    />
                                ) : (
                                    <Image
                                        source={require('../images/icon-favorites-inactive.png')}
                                        style={style.icon}
                                    />
                                )
                            ) 
                        }}
                    />

                    <Drawer.Screen
                        component={EventsStack}
                        name='Evénements'
                        options={{
                            drawerIcon: ({ focused }) => (
                                focused ? (
                                    <Image
                                    source={require('../images/icon-event-active.png')}
                                    style={style.icon}
                                    />
                                ) : (
                                    <Image
                                        source={require('../images/icon-event-inactive.png')}
                                        style={style.icon}
                                    />
                                )
                            ) 
                        }}
                    />

                    <Drawer.Screen
                        component={DegustationStack}
                        name='Dégustations'
                        options={{
                            drawerIcon: ({ focused }) => (
                                focused ? (
                                    <Image
                                        source={require('../images/icon-degustation-active.png')}
                                        style={style.icon}
                                    />
                                ) : (
                                    <Image
                                        source={require('../images/icon-degustation-inactive.png')}
                                        style={style.icon}
                                    />
                                )
                            ) 
                        }}
                    />

                </Drawer.Navigator>
            )
        }
        else {
            return (
                // Afficahage du splashscreen tant que les données ne sont pas prête
                <Splash
                 getData = {this.getData}
                />
            )
        }
    }
}

export default connect(mapStateToProps)(RootComponent)

const style = StyleSheet.create({
    icon: {
        width: 15,
        height: 20,
    }
})