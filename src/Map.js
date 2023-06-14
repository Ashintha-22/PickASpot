import React, { useState } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { StyleSheet, View, Text, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const [pin, setPin] = React.useState({
    latitude: 6.866925545004668,
    longitude: 79.95915320203108,
  });

  const [region, setRegion] = React.useState({
    latitude: 6.866925545004668,
    longitude: 79.95915320203108,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  React.useEffect(() => {
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
            flex: 0,
            position: "absolute",
            width: "95%",
            zIndex: 1,
            alignSelf: "center",
          },
          listView: { backgroundColor: "white" },
          textInputContainer: {
            backgroundColor: "#EDEDED",
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            alignItems: "center",
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            marginTop: 5,
            alignSelf: "center",
            height: 38,
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
              style={{ width: 20, height: 20 }}
            />
          </View>
        )}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 6.866925545004668,
          longitude: 79.95915320203108,
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
        >
          <Callout>
            <Text>Destination</Text>
          </Callout>
        </Marker>
        <Marker
          draggable={true}
          onDragStart={(e) => {
            //console.log("Drag start", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            //console.log("Drag end", e.nativeEvent.coordinate)
          }}
          pinColor="blue"
          coordinate={pin}
        >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
