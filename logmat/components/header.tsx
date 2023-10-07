import React, { FC } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import logo from "../assets/images/fab-logo.png"


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


const Header: FC<any> = () => {
    return (
        <View style={style.header}>
            <View style={style.icon_box}>
                <Image source={logo} style={style.icon} />
            </View>
            <View style={style.identification}>
                <Text>SAI - Seção de Análise e Implementação</Text>
                <Text>Sgt Calixto</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        flexDirection: "row",
        verticalAlign: "middle",
        height: "100%"
    },

    icon_box: {
        marginHorizontal: 10,
    },

    icon: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    identification: {
        flex: 1,
        justifyContent: "center",
        height: "100%",
    }
})

export default Header