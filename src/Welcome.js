import { View, Text, Button } from "react-native";
import React from "react";
import { user } from "./Login";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text style={styles.text}> Welcome, {user.displayName}</Text>
      </View>
      <Button style={{ marginTop: 300 }} title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Welcome;
