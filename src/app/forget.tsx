import { View, Text, StyleSheet, TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Link} from "expo-router";

const forget = () =>{
    return(
     <View style={styles.container}>
            <View style={styles.topIcon}>
                <View style={styles.circle}><Ionicons name="lock-closed" style={styles.lockIcon}/></View>
            </View>

            <View>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>Enter your mobile number or email to receive a password reset link.</Text>
            </View>

            <View style={styles.TextInput}>
                <Ionicons
                name="phone-portrait-outline"
                size={30}
                style={styles.InputIcon}
                />

                <View style={styles.content}>
                    <Text style={styles.label}>Mobile Number / Email</Text>

                    <TextInput 
                    placeholder="Enter Mobile Number or Email"
                    style={styles.input}
                    />
                </View>

            </View>

            <View style={styles.resetBtn}>
                <Text style={{color : "#fff" , fontSize: 17}}>Send Reset Link</Text>
            </View>

            <View>
                <Link href="/login" style={styles.bottomText}>Back to Login</Link>
            </View>
     </View>   
    )
};

export default forget;

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor : "#fff",
    },
    topIcon:{
        alignItems : "center",
        marginTop: 40,
    },
    circle:{
        height: 110,
        width : 110,
        backgroundColor : "#E5F0FE",
        justifyContent : "center",
        alignItems : "center",
        borderRadius: 100,
    },
    lockIcon:{
        color : "#0365FC",
        fontSize: 60,
    },
    title:{
        fontSize : 24,
        fontWeight: "600",
        textAlign : "center",
        marginTop : 20,
        color : "#0C32A6",
        letterSpacing : 2,
    },
    subtitle:{
        textAlign : "center",
        marginHorizontal : 30,
        marginTop : 10,
        fontWeight :"600",
    },
    TextInput:{
        flexDirection : "row",
        alignItems : "center",
        height : 70,
        borderWidth : 1,
        borderColor : "#1F48C4",
        margin : 20,
        borderRadius : 12,
        paddingHorizontal : 20,
        marginTop : 40,
    },
    InputIcon:{
        marginRight : 10,
        color : "#1F48C4",
    },
    content:{
        flex:1,
        justifyContent : "center",
    },
    input:{
        padding :0,
    },
    label:{
        fontSize : 15,
        fontWeight : "600",
    },
    resetBtn:{
        height : 50,
        backgroundColor : "#009355",
        margin : 20,
        borderRadius: 12,
        alignItems :"center",
        justifyContent : "center",
    },
    bottomText:{
        textAlign : "center",
        color :"#1F48C4",
        fontWeight : "600",
        fontSize : 18,
    }
});