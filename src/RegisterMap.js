import React, { useState, useEffect } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import styles from "../shared/styles";

export default function RegisterMap({ route, navigation }) {
  const { userEmail, userPassword } = route.params || {}; // Add a null check here

  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();

  const [pin, setPin] = useState({
    latitude: 6.866925545004668,
    longitude: 79.95915320203108,
  });
  const [region, setRegion] = useState({
    latitude: 6.866925545004668,
    longitude: 79.95915320203108,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onSelect = () => {
    navigation.navigate("GetDetails", {
      latitude: latitude,
      longitude: longitude,
      userEmail: userEmail,
      userPassword: userPassword,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //console.log(location);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: "AIzaSyBgbQMq_fhvXt9fmP2KBYgYvHVw0xx0YqE",
          language: "en",
          components: "country:lk",
          types: "establishment",
          radius: 30000,
          location: "${region.latitude},${region.longitude}",
        }}
        styles={{
          container: {
            flex: 1,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          textInputContainer: {
            backgroundColor: "#EDEDED",
            borderRadius: 20,
            padding: 10,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 40,
            color: "#5d5d5d",
            fontSize: 16,
          },
        }}
        renderLeftButton={() => (
          <View style={{ paddingRight: 10 }}>
            <Image
              source={require("../assets/search.png")}
              style={{ width: 20, height: 20, marginTop: 10 }}
            />
          </View>
        )}
      />
      <MapView
        style={mapstyles.map}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          //console.log("onUserLocationchange",e.nativeEvent.coordinate);
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragEnd={(e) => {
            console.log(e.nativeEvent.coordinate);
            setlatitude(e.nativeEvent.coordinate.latitude);
            setlongitude(e.nativeEvent.coordinate.longitude);
            console.log("Latitude: ", e.nativeEvent.coordinate.latitude);
            console.log("Longitude: ", e.nativeEvent.coordinate.longitude);
          }}
        >
          <Callout>
            <Text style={{ fontWeight: "bold" }}>Spot Location</Text>
          </Callout>
        </Marker>

        <Marker pinColor="blue" coordinate={pin}>
          <Callout>
            <Text>User Location</Text>
          </Callout>
        </Marker>
      </MapView>
      <View
        style={{
          marginTop: -100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={[newStyle.locationButton, { marginTop: 20, marginBottom: 20 }]}
          activeOpacity={0.5}
          onPress={onSelect}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            SELECT SPOT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

const newStyle = StyleSheet.create({
  locationButton: {
    height: 50,
    width: 180,
    borderRadius: 150,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#BE1D1D",
    elevation: 2,
  },
});
