import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, userProfile: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Fetch or create user profile
          const userDocRef = doc(db, 'users', user.uid);
          let userDoc;
          try {
            userDoc = await getDoc(userDocRef);
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
            return;
          }
          
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // Create initial profile
            const initialProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email?.split('@')[0],
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
              city: 'Jakarta',
              bio: 'Jiwa lokal yang baru bergabung.'
            };
            try {
              await setDoc(userDocRef, initialProfile);
              // Wait a bit for the profile to be readable (optional, or just fetch again)
              const updatedDoc = await getDoc(userDocRef);
              setUserProfile(updatedDoc.data());
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
            }
          }
        } catch (globalErr) {
          console.error("Auth context initialization error", globalErr);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
