import firebase from "@react-native-firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

//init  services
const db = getFirestore();

//collection references
const colRef = collection(db, "users");

//get collection data
getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs);
});
