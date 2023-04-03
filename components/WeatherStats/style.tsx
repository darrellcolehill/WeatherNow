import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        width:"100%",
    },
    textContainer: {
        alignItems:"center", 
        width:"100%"
    },
    weatherConditionText: {
        fontWeight:"bold", 
        fontSize:16
    },
    temperature: {
        fontWeight:"bold", 
        fontSize:50
    },
    weatherIconImageContainer: {
        alignItems:"center", 
        width:"100%"
    },
    weatherIconImage: {
        width: 125, 
        height: 125
    }
});

export default styles;