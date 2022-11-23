import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CouponsScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is Coupons</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.push('Wildcard')}
                >
                    <Text style={styles.buttonText}>Ir a wildcard 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={() => navigation.push('WildcardBis')}
                >
                    <Text style={styles.buttonOutlineText}>Ir a wildcard 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.push('UserStack')}
                >
                    <Text style={styles.buttonText}>Ir a User</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default CouponsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    button: {
        backgroundColor: '#57CC99',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        padding: 15,
        borderRadius: 10
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#57CC99',
        marginTop: 5,
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#57CC99',
        fontWeight: '700',
        fontSize: 16
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }
})