//React stuff & styles
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, SafeAreaView, Pressable, RefreshControl, StatusBar, ActivityIndicator } from 'react-native';
import styles from '../common/styles';

//Redux logic

import { useSelector } from 'react-redux';

//Firebase 
import {auth, firestore} from '../common/FirestoreConfig';
import {
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';

//Location

import * as Location from 'expo-location';
import getHashesNear from 'geohashes-near';

//Own components
import ListElement from '../components/ListElement';



//Timeout
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  


const OffersScreen = ({navigation}) => {

    //Traemos la ubicación desde el inicio porque de eso depende todo el funcionamiento
    //Hay que mover este bloque a la pantalla de inicio
    const location = useSelector( state => state.location);
    const [newGeohash, setNewGeohash] = useState('');

    const saveGeohash = () => {
        if(newGeohash === '') return;

        dispatch(updateGeohash(newGeohash));
    }

    //Arrays para poblar la lista
    const [offers, setOffers] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    //Traemos los items desde firebase Restaurant 
    //Hay que llenar el id del restaurante en la pantalla anterior 
    //Id: 6AF9PrvtWenCPookMI7J

    const getOffers = async (dbx) => {

        let restraurantID = '6AF9PrvtWenCPookMI7J';
        const colRef = collection(dbx, 'menus');
        const queryEvents = query(colRef, where('restaurantId', '==', restraurantID), where('offer','==', true)); //, orderBy('curfew', 'desc'));
        onSnapshot(queryEvents, 
                (snapshot)=>{
                    let evs = [];
                    snapshot.docs.forEach((doc)=>{
                        evs.push({...doc.data(), key: doc.id})
                    })
                    console.log('Menus: ', evs)
                    setOffers(evs);
                    return evs;
                });
      }


    //Refresher
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {setRefreshing(false)
          getEvents(firestore);});
      }, []);

    //Actual events
      useEffect(() => {
        getOffers(firestore)
      }, []);



    /////////////////////////Render list item
    const renderItem = ({item}) => {
                
        return (
            <Pressable onPress={() => navigation.push('Event', {eventId: item.key})}>
                <ListElement
                    title = {item.name}
                    image= {item.image} 
                    category = {item.category}
                    price = {item.price}
                    priceOffer = {item.priceOffer}
                />
            </Pressable>
        )
    }
    /////////////////////////End of render list item


    return (
        <SafeAreaView style={localStyles.flatListContainer}>
            <StatusBar
                animated={true}
                barStyle="light-content" />
            <FlatList
                data = {offers}
                renderItem = {renderItem}        
                keyExtractor = {(item) => item.key} 
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    )

}

export default OffersScreen;

const localStyles = StyleSheet.create({
    flatListContainer: {
      flex: 1,
      backgroundColor: '#EEE',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });