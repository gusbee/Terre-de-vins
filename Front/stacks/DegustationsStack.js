import React from 'react'
import { Dimensions, View, StatusBar, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import Degustation from "../screens/Degustations"
import DegustationContent from "../screens/DegustationContent"
import Burger from '../components/Burger'

const { width, height } = Dimensions.get("window")
const DegustationsStack = createStackNavigator()

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

export default function DegustationStack(props) {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={false} />
            <DegustationsStack.Navigator
            initialRouteName="AllDégustations"
            headerMode="float"
            screenOptions={{
                headerTitleAlign: "center",
                headerTintColor:'#5A2A75',
                }}
            >
                
                <DegustationsStack.Screen
                component={Degustation}
                name="AllDégustations"
                options={{
                    headerStyle:{
                        height: height < 550 ? 66 : 88,
                    },
                    headerTitleStyle:{
                        fontFamily: 'Sen-Bold',
                        fontSize: width < 400 ? 20 : 25,
                        color: '#5A2A75'
                    },
                    headerTitle: "Dégustations",
                    headerRight: () => setBurger(props.navigation),
                    headerLeft: () => goBack(props.navigation, "Actualités")
                }}
                />

                <DegustationsStack.Screen
                component={DegustationContent}
                name="Dégustation"
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
                    headerLeft: () => goBack(props.navigation, "AllDégustations")
                }}
                />
            </DegustationsStack.Navigator>
        </View>
    )
}