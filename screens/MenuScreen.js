import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { firestore } from '../common/FirestoreConfig'
import {
    getDocs,
    collection,
    onSnapshot,
    query,
    where,
    orderBy
  } from 'firebase/firestore';
import * as Location from 'expo-location';
import getHashesNear from 'geohashes-near';

const MenuScreen = ({navigation}) => {

    const [locationAcquired, setLocationAcquired] = useState(false);
    const [neighborsAcquired, setNeighborsAcquired] = useState(false);
    
    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [neighbours, setNeighbours] = useState([]);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getLocation();
      }, []);
    
    useEffect(() => {
        if(locationAcquired===true){
            getNeighbours();
          }
    },[locationAcquired]);
    useEffect(() => {    
        if(neighborsAcquired===true){
          getEvents(firestore)
        }
    }, [neighborsAcquired]);

    const getLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
    
        let localLocation = await Location.getCurrentPositionAsync({});
        setLocation(localLocation);
        setLocationAcquired(true);
        return location;
    }

    const getNeighbours = () => {

        if(location!=null){
          const position = { latitude: location.coords.latitude, longitude: location.coords.longitude };
          const radius = 7500; // 20 meters
          const units = 'meters';
          const precision = 5;
          const hashesInRadius = getHashesNear(position, precision, radius, units); 
          setNeighbours(hashesInRadius);
          setNeighborsAcquired(true)
          return;
        }
    }

    const getEvents = async (dbx) => {

        let end = new Date(Date.now() + ( 3600 * 1000 * 25 ));
        const colRef = collection(dbx, 'events');
        const queryEvents = query(colRef, where('neighborhood', 'in', neighbours), where('curfew', '>', end), orderBy('curfew', 'desc'));
        onSnapshot(queryEvents, 
                (snapshot)=>{
                    //console.log("Snapshot: ", snapshot);
                    let evs = [];
                    snapshot.docs.forEach((doc)=>{
                        evs.push({...doc.data(), key: doc.id})
                    })
                    //console.log('Evs: ', evs);
                    setEvents(evs)
                    return evs;
                });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is Menu</Text>
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

export default MenuScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
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