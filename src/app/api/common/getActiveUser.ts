import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import firestore from 'firestore';

export const getActiveUser = async (email: string) => { 
  try {
    const usersRef = collection(firestore, 'users');

    const q = query(
      usersRef,
      where('email', '==', email),
      where('status', '==', 'ACTIVE'),
      limit(1),
    );
  
    const activeUsersSnapshot = await getDocs(q);
  
    const activeUsers = activeUsersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return activeUsers;
  } catch(err) {
    console.error('An error occurs: ', err);
    throw err; 
  }
};
