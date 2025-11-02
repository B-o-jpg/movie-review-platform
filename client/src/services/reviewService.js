import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const reviewService = {
  createReview: async (data) => {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  },

  getMovieReviews: async (movieId) => {
    const q = query(collection(db, 'reviews'), where('movieId', '==', movieId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  getUserReviews: async (userId) => {
    const q = query(collection(db, 'reviews'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  updateReview: async (reviewId, updates) => {
    const docRef = doc(db, 'reviews', reviewId);
    await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
  },

  deleteReview: async (reviewId) => {
    await deleteDoc(doc(db, 'reviews', reviewId));
  },
};

export default reviewService;
