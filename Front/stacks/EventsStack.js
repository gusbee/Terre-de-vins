import React from 'react';
import { View, StatusBar, Dimensions, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import Burger from '../components/Burger'
import AllEvents from '../screens/AllEvents'
import EventContent from "../screens/EventContent"
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window")

const Stack = createStackNavigator()

// Création du menu burger
function setBurger(navigationProps){
    return (
        <Burger 
            navigationProps={navigationProps}
        />
    )
}

function goBack(navigationProps, routeName) {
    return (
        <TouchableOpacity
            style={{ marginLeft: 30 }}
            onPress={() => navigationProps.navigate((routeName))}
        >
            <Image
            source={require("../images/go-back.png")}
            style={{width: 25, height: 25}}
        />
        </TouchableOpacity>
    )
}

export default function EventsStack(props){
    return(
        <View style={{flex:1}}>
            <StatusBar hidden={false}/>
            <Stack.Navigator
            initialRouteName="allEvents"
            headerMode="float"
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor:'#5A2A75',
             }}
            >
                <Stack.Screen 
                component={AllEvents}
                name="allEvents"
                    options={{
                    headerStyle:{
                        height: height < 550 ? 66 : 88,
                    },
                    headerTitleStyle:{
                        fontFamily: 'Sen-Bold',
                        fontSize: width < 400 ? 20 : 25,
                        color: '#5A2A75'
                        },
                    headerTitle: "Evénements",
                    headerRight: () => setBurger(props.navigation),
                    headerLeft: () => goBack(props.navigation, "Actualités")
                    
                }}
                />
                <Stack.Screen 
                component={EventContent}
                name="Evénement"
                options={{
                    headerStyle:{
                        height: height < 550 ? 66 : 88,
                    },
                    headerTitleStyle:{
                        fontFamily: 'Sen-Bold',
                        fontSize: width < 400 ? 20 : 25,
                        color: '#5A2A75'
                    },
                    headerRight: () => setBurger(props.navigation),
                    headerLeft: () => goBack(props.navigation, "allEvents")
                }}
                />
            </Stack.Navigator>
        </View>
    )
}