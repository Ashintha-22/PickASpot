import firebase from "@react-native-firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "expo-dev-client";
import { initializeApp } from "firebase/app";

//init  services
initializeApp({ projectId: "pick-a-spot-mobile" });
const db = getFirestore();

//collection references
const colRef = collection(db, "users");

//get collection data
getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs);
});
