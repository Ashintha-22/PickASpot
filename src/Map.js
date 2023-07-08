import React, { useState, useEffect } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  AnimatedRegion,
  Animated,
} from "react-native-maps";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, colRef } from "../shared/firebase";
import styles from "../shared/styles";
import { getDatabase, set, get, ref, off, onValue } from "firebase/database";

//get collection data
getDocs(colRef).then((snapshot) => {});

export default function Map({ route, navigation }) {
  //const route = useRoute();
  const { user, userEmail, firstName } = route.params;

  const db = getDatabase();

  const [tableData, setTableData] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [fName, setfName] = useState();
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [available, setavailable] = useState();

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

  const [selectRegion, setSelectRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (db) {
      const dataRef = ref(db, "Location");
      const fetchData = (snapshot) => {
        const data = snapshot.val();
        const dataArray = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            dataArray.push({
              username: key,
              ...data[key],
            });
          }
        }
        setTableData(dataArray);
        console.log(dataArray);
      };

      onValue(dataRef, fetchData);

      return () => {
        off(dataRef, fetchData);
      };
    }
  }, [db]);

  const GOOGLE_MAPS_APIKEY = "AIzaSyBgbQMq_fhvXt9fmP2KBYgYvHVw0xx0YqE";
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    console.log("Marker coordinates:", marker.coordinate);
  };

  useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {}
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
          // setPin({
          //   latitude: details.geometry.location.lat,
          //   longitude: details.geometry.location.lng,
          // });
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
          listView: { backgroundColor: "white" },
          textInputContainer: {
            backgroundColor: "#EDEDED",
            // borderRadius: 20,
            padding: 10,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 40,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
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
        <MapViewDirections
          origin={region}
          destination={selectRegion}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="red"
          mode="WALKING"
          onReady={(result) => {
            setDistance(result.distance);
            setDuration(result.duration);
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
          }}
        />
        {tableData.map((data, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(data.latitude),
              longitude: Number(data.longtitude),
            }}
            title={data.username}
            description={`Total: ${data.total}, Available: ${data.available}, Distance: ${distance} km`}
            onPress={() => {
              setLatitude(data.latitude);
              setLongitude(data.longtitude);
              setfName(data.username);

              setSelectRegion({
                latitude: Number(data.latitude),
                longitude: Number(data.longtitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
              console.log(
                "Marker coordinates:",
                data.latitude,
                data.longtitude,
                data.username,
                data.available
              );
            }}
          />
        ))}

        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          <Callout>
            <Text>Destination</Text>
          </Callout>
        </Marker>
        <Marker pinColor="blue" coordinate={pin}>
          <Callout>
            <Text>User Location</Text>
          </Callout>
        </Marker>
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={500}
          fillColor="rgba(250, 20, 125, 0.2)"
          strokeWidth={0}
        />
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={1000}
          fillColor="rgba(0, 255, 0, 0.2)"
          strokeWidth={0}
        />
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
          onPress={() => {
            navigation.navigate("BookSpotDetails", {
              latitude: latitude,
              longitude: longitude,
              userEmail: userEmail,
              firstName: fName,
              tableData: tableData,
            });
          }}
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
    backgroundColor: "#49DF9D",
    elevation: 2,
  },
  searchbar: {},
});
