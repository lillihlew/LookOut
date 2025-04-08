import { StyleSheet } from 'react-native';

const SharedStyles = StyleSheet.create({container: {
    flex: 1,
        // backgroundColor: '#ffdbe9',
        backgroundColor: '#f7b36d',
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
    footerTopButton: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      footerBottomButton: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderColor: "#c7e9c0",
        color: "#c7e9c0",
        borderRadius: 18,
        width: 316,
        height: 68,
        padding: 7,
        fontFamily: 'Arial',
        marginHorizontal: 20,
        alignItems: 'center',
    },
    buttonGreen:{
        width: 350,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
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
