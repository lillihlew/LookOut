import { StyleSheet } from 'react-native';

const SharedStyles = StyleSheet.create({container: {
    flex: 1,
        backgroundColor: '#edc9f9',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textWhite: {
        color: '#fff',
    },
    textBlue: {
        color: '#9ff'
    },
    buttonLink: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputText:{
        borderWidth: 1,
        width: 200,
        margin: 10,
        height: 40,
        padding: 5,
    },
    buttonGreen:{
        width: 350,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    inputText: {
        color: "#beb2d5",
    },
    infoText: {
        color: "#beb2d5",
        fontSize: 20,
    },
    topLeftWhite:{
        color: '#fff',
        textAlign : 'left',
    },
});

export default SharedStyles;

