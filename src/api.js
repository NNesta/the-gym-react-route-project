import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCrkG5vK6jk2OgRV86OyErQL8NQhgoBIRQ",
  authDomain: "vanlife-5fa50.firebaseapp.com",
  projectId: "vanlife-5fa50",
  storageBucket: "vanlife-5fa50.appspot.com",
  messagingSenderId: "685123767110",
  appId: "1:685123767110:web:7934f183829dc3a2bc3347",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");

const getVans = async () => {
  const querySnapshot = await getDocs(vansCollectionRef);
  const vanArray = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vanArray;
};
const getVan = async (id) => {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  return { ...vanSnapshot.data(), id: vanSnapshot.id };
};
const getHostVans = async () => {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const vanArray = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vanArray;
};

export async function loginUser(creds) {
  const userRef = doc(db, "user", ...creds);
  const userSnapshot = await getDoc(userRef);
  const userData = userSnapshot.data();
  return userData;
}

export { getVans, getVan, getHostVans };
