import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { Linking, Image, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomDrawerContent(props) {
    return (
        <View style={{ flex: 1, backgroundColor: "#404040" }}>
            <View style={{width: "100%", backgroundColor: "#FFF", alignItems: "center", paddingTop: 20}}>
                <Image
                    source={require('../images/logo.png')}
                    style={{width: 160, height: 40}}
                />
            </View>
            <View style={{position: "relative"}}>
                <Image
                    source={require('../images/menu-picture.png')}
                    style={{width: "100%", height: 160}}
                />
                <LinearGradient
                    colors={['transparent' , '#404040']}
                    start={[0, 0]}
                    locations={[0, 0.9]}
                    style={style.LinearGradient}
                >
                </LinearGradient>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Oenotoursime"
                    onPress={() => Linking.openURL("https://www.terredevins.com/oenotourisme")}
                    labelStyle={{
                        fontFamily: "Sen-Regular",
                        fontSize: 20,
                    }}
                    activeTintColor="#B6A962"
                    activeBackgroundColor="#404040"
                    inactiveTintColor="#FFF"
                    icon={() => (
                        <Image
                            source={require('../images/icon-oenotourisme.png')}
                            style={{width: 15, height: 20}}
                        />
                    )}
                />
            </DrawerContentScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    LinearGradient: {
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0,
    },
    input: {
        marginVertical: 20,
        backgroundColor: "#FFF",
        color: "rgba(112,112,112,0.4)",
        fontFamily: "Sen-Regular",
        fontSize: 17,
        textAlign: "center",
        borderRadius: 15,
        width: "80%",
        height: 30
    }
})