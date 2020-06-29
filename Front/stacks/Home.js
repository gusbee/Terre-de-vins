import React from 'react'
import { View, StatusBar, Dimensions, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import Burger from '../components/Burger'
import Actuality from '../screens/Actuality'
import PostContent from "../screens/PostContent"

// Création du menu burger
function setBurger(navigationProps){
    return (
        <Burger 
            navigationProps={navigationProps}
        />
    )
}

// Insertion du logo dans le header
function LogoTitle() {
    return (
        <Image
            source={require('../images/logo.png')}
            style={{width: 160, height: 40}}
        />
    )
}

function goBack(navigationProps, routeName) {
    return (
        <TouchableOpacity
            style={{ marginLeft: 30 }}
            onPress={() => navigationProps.navigate(routeName)}
        >
            <Image
            source={require("../images/go-back.png")}
            style={{width: 25, height: 25}}
        />
        </TouchableOpacity>
    )
}

const { width, height } = Dimensions.get("window")

const Stack = createStackNavigator();

export default function Home(props) {
    return(
        <View style={{flex:1}}>
            <StatusBar hidden={false} />
            <Stack.Navigator
            headerMode="float"
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor:'#5A2A75',
            }}
            >
                <Stack.Screen 
                component={Actuality}
                name="Actuality"
                options={{
                    headerStyle:{
                        height: height < 550 ? 66 : 88,
                    },
                    headerTitleStyle:{
                        fontFamily: 'Sen-Bold',
                        fontSize: width < 400 ? 20 : 25,
                        color: '#5A2A75'
                    },
                    headerTitle: props => <LogoTitle {...props}/>,
                    headerRight: () => setBurger(props.navigation)
                }}
                />
                <Stack.Screen 
                component={PostContent}
                name="Article"
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
                    headerLeft: () => goBack(props.navigation, "Actuality")
                }}
                />

            </Stack.Navigator>
        </View>
    )
}