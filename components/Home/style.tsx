import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        paddingTop:"5%"
    },
    locationContainer: {
        alignItems:"center",
    },
    locationText: {
        fontWeight:"bold", 
        fontSize:16
    },
    refreshButton: {
        alignSelf:"flex-end", 
        paddingRight:"5%",
        paddingTop:15
    },
    loadingIconContainer: {
        alignItems:"center", 
        width:"100%",
        height:225
    },
    loadingIcon: {
        width: 125,
        height: 125,
    },
    errorMessageContainer: {
        alignSelf:"center"
    },
    errorMessage: {
        fontWeight:"bold"
    }
});

export default styles;