// housesData.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './components/FirebaseConfig';

export async function fetchHousesData() {
  const housesCollection = collection(db, 'approved'); // Replace 'houses' with your Firestore collection name
  const housesSnapshot = await getDocs(housesCollection);
  const housesData = housesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return housesData;
}
