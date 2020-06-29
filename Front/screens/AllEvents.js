import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Event from '../components/Event'
import FirstEvent from '../components/FirstEvent'

const mapStateToProps = (state) => {
    return {
        events: state.contentReducer.events
    }
}

function getNextEvents(events){
    if(events[0] !== undefined){
        let nextEvents = []
        events.map((event) => {
            // Gestion des exceptions pour les événements ne permettant pas de récupérer l'image ou la date de début
            try{
                const source = event.description.split('<')[2].split('=')[3].split(' ')[0]
                const startDate = event.startdate.split('@')[0]

                if(Date.parse(event.pubDate) > Date.now()){
                    nextEvents.push(event)
                }
            } catch {
                console.log("erreur format")
            }
        })
        return nextEvents
    }
}

function Events(props) {

    function goToEventContent(event) {
        props.navigation.navigate("Evénement", {event: event})
    }

    return (
        <ScrollView contentContainerStyle={{backgroundColor: "#FFFFFF"}}>
            {Object.prototype.toString.call(props.events) == '[object Array]' ? (
                getNextEvents(props.events).map((event, index) => (
                    index === 0 ? (
                        <FirstEvent 
                        key={index}
                        event={event}
                        onPress={goToEventContent}    
                        />
                    ) : (
                        <Event 
                        key={index}
                        event={event}
                        onPress={goToEventContent}    
                        />
                    )
                ))
            ) : (
                <Text>Plantage complet</Text>
            )}
        </ScrollView>
    )
}

export default connect(mapStateToProps)(Events)