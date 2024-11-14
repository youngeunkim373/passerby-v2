import firebasedb from './firebasedb';
import { getFirestore } from 'firebase/firestore';

const firestore = getFirestore(firebasedb.firebaseApp);
export default firestore;