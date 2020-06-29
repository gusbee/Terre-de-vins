import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, PanResponder, Animated} from 'react-native'
import { connect } from 'react-redux'
import Post from '../components/Post'
import FirstPost from '../components/FirstPost'
import Slide from "../components/Slide"

let mapStateToProps = (state) => {
    return {
        posts: state.contentReducer.posts,
        events: state.contentReducer.events
    }
}

const { width } = Dimensions.get("window")

class Actuality extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            translate: new Animated.Value(0),
            page: 0
        }
    }

    UNSAFE_componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => false,
            onStartShouldSetPanResponderCapture: (event, gestureState) => false,
            onMoveShouldSetPanResponder: (event, gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: Animated.event([null, {dx: this.state.translate}]),
            onPanResponderRelease: this.endGesture.bind(this),
            onPanResponderTerminate: (event, gestureState) => {
                console.log("Terminate")
            }
        })
    }

    getStyle = () => {
        return {
            slider: {
                width: width * (5 + 2), //Nombre d'événements + 2 pour les images fictives
                height: 236,
                flexDirection: 'row',
                left: (this.state.page + 1) * -1 * width,
                transform: [{
                    translateX: this.state.translate
                }]
            }
        }
    }

    endGesture = (event, gestureState) => {
        let toValue = 0
        if (Math.abs(gestureState.dx) / width > 0.2) {
            if (gestureState.dx < 0) {
                toValue = width * -1
            } else {
                toValue = width
            }
        }
        Animated.timing(
            this.state.translate,
            {
                toValue:toValue,
                duration: 300,
                useNativeDriver: true
            }
        ).start(() => {
            this.state.translate.setValue(0)
            if (toValue < 0) {
                this.nextPage()
            } else if (toValue > 0) {
                this.prevPage()
            }
        })
    }

    nextPage = () => {
        let page = this.state.page + 1
        if (page >= 5) {
            page = 0
        }
        this.setState({page})
    }

    prevPage = () => {
        let page = this.state.page - 1
        if (page < 0) {
            page = 4 //getNextEvents.length - 1
        }
        this.setState({page})
    }

    // Envoi des données Posts vers le store Redux
    tooglePosts = (data) => {
        const action = {
            type: "UPDATE_POSTS",
            value: {
                data: data
            }
        }
        this.props.dispatch(action)
    }

    // Envoi des données Events vers le store Redux
    toogleEvents = (data) => {
        const action = {
            type: "UPDATE_EVENTS",
            value: {
                data: data
            }
        }
        this.props.dispatch(action)
    }

    // Envoi des données Degustations vers le store Redux
    toogleDegustations = (data) => {
        const action = {
            type: "UPDATE_DEGUSTATIONS",
            value: {
                data: data
            }
        }
        this.props.dispatch(action)
    }

    // Redirection vers la page PostContent
    goToPost = (post) => {
        this.props.navigation.navigate('Article', {post:post})
    }

    // Redirection vers la page EventContent
    goToEvent = (event) => {
        this.props.navigation.navigate('Evénements', {
            screen: "Evénement",
            params: {
                event: event,
            }
        })
    }

    /**
     * Récupération des n prochains événements à venir à partir de la date du jour
     * Présence d'une date de début et d'une image obligatoire pour apparaître dans le slider
     * Retourne un nouveau tableau d'événement de longueur n
     */
    getNextEvents = (events, number) => {
        let nextEvents = []
        events.map((event) => {
            // Gestion des exceptions pour les événements ne permettant pas de récupérer l'image ou la date de début
            try{
                const source = event.description.split('<')[5].split(',')[1].split(' ')[1]
                const startDate = event.startdate.split('@')[0]

                if(Date.parse(event.pubDate) > Date.now() && nextEvents.length < number){
                    nextEvents.push(event)
                }
            } catch {
                console.log("erreur format")
            }
        })
        return nextEvents
    }

    render() {
        console.log(this.state.page)
        return(
            <ScrollView style={style.container}>
                <Text style={style.topTitle}>Actualités</Text>
                
                {/* SLIDER EVENTS */}
                <Animated.View style={this.getStyle().slider} {...this.panResponder.panHandlers}>
                    <Slide
                        event={this.getNextEvents(this.props.events, 5)[4]}
                        onPress={this.goToEvent}
                    />
                    {this.getNextEvents(this.props.events, 5).map((event, k) => (
                            <Slide
                                key={k}
                                event={event}
                                onPress={this.goToEvent}
                            />
                    ))}
                    <Slide
                        event={this.getNextEvents(this.props.events, 5)[0]}
                        onPress={this.goToEvent}
                    />
                </Animated.View>

                <View style={{height: 20, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <View style={this.state.page == 0 ? style.activeDot : style.inactiveDot}></View>
                    <View style={this.state.page == 1 ? style.activeDot : style.inactiveDot}></View>
                    <View style={this.state.page == 2 ? style.activeDot : style.inactiveDot}></View>
                    <View style={this.state.page == 3 ? style.activeDot : style.inactiveDot}></View>
                    <View style={this.state.page == 4 ? style.activeDot : style.inactiveDot}></View>
                </View>

                {/* POSTS MAPPING */}
                {this.props.posts.map((post, index) => (
                    index === 0 ? (
                        <FirstPost 
                            key = {index}
                            post = {post}
                            onPress = {this.goToPost}
                        />
                    ) : (
                        <Post 
                            key = {index}
                            post = {post}
                            onPress = {this.goToPost}
                        />
                    )
                ))}
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Actuality)

const style = StyleSheet.create({
    container:{
        backgroundColor: '#FFFFFF',
    },
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
    },
    text:{
        fontFamily: 'Sen-Regular',
        fontSize: 18,
        color: '#404040'
    },
    activeDot: {
        width: 10,
        height: 10,
        backgroundColor: "#5A2A75",
        marginHorizontal: 5
    },
    inactiveDot: {
        width: 5,
        height: 5,
        backgroundColor: "#B6A962",
        marginHorizontal: 5
    },
})