import { View, Text } from "react-native";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

initializeApp({ projectId: "pick-a-spot-mobile" });
//init  services
const db = getFirestore();

//collection references
const colRef = collection(db, "users");

export { db, colRef };
