import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import firestore from 'firestore';

export const getActiveUser = async (email: string) => {
  const usersRef = collection(firestore, 'users');

  const q = query(
    usersRef,
    where('email', '==', email),
    where('status', '==', 'ACTIVE'),
    limit(1),
  );

  const activeUsersSnapshot = await getDocs(q);

  if (activeUsersSnapshot.empty) {
    return [];
  }

  const activeUsers = activeUsersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return activeUsers;
};
