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
console.log(process.env);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);
// process.env
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");
const usersCollectionRef = collection(db, "users");

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
  console.log({ creds });
  const q = query(
    usersCollectionRef,
    where("email", "==", creds.email),
    where("password", "==", creds.password)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length) {
    const data = querySnapshot.docs[0].data();
    localStorage.setItem("isLoggedIn", true);
    return data;
  } else return null;
}

export { getVans, getVan, getHostVans };
