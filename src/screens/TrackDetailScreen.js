import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext';
import MapView, {Polyline, Circle} from 'react-native-maps';
import { onCameraDidChangeTrackingState } from 'expo/build/AR';

const TrackDetailScreen = ( {navigation} ) => {
    const {state} = useContext(TrackContext);
    const _id = navigation.getParam('_id');
    const track = state.find(t => t._id === _id);
    const initialCoords = track.locations[0].coords;
    return <>
        <Text style = {{fontSize : 48}}> {track.name} </Text>
        <MapView
            style = {styles.map}
            initialRegion={{
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
                ...initialCoords
            }}
        >
            <Circle
            center = {initialCoords}
            radius = {20}
            strokeColor="rgba(255,0,0,1.0)"
            fillColor="rgba(255,0,0,1.0)"
            />
            <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
        </MapView>
        </>
}

const styles = StyleSheet.create({
    map : {
        height: 300
    }
});

export default TrackDetailScreen;