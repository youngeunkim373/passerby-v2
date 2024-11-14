import { collection, getDocs, query, where } from 'firebase/firestore';
import firestore from 'firestore';

export const getActiveUsers = async (email: string) => {
  const usersRef = collection(firestore, 'users');

  const q = query(
    usersRef,
    where('email', '==', email),
    where('status', '==', 'ACTIVE'),
  );

  const activeUsersSnapshot = await getDocs(q);

  console.log('activeUsersSnapshot');
  console.log(activeUsersSnapshot);

  const activeUsers = activeUsersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log('activeUsers');
  console.log(activeUsers);

  return activeUsers;
};
