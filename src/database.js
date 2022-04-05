<<<<<<< HEAD
// eslint-disable-next-line import/no-unresolved
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
=======
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
>>>>>>> 54cbaae64cae8eeb5bc0faf8a4954490837d930c
import { app } from './main.js';

const db = getFirestore(app);

export async function insertData(publication) {
  try {
    const docRef = await addDoc(collection(db, 'publications'), publication);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
<<<<<<< HEAD
=======

// Esta función se encarga de traer los datos de la colección 'publications' de firestore:
export async function getData() {
  const querySnapshot = await getDocs(collection(db, 'publications'));
  return querySnapshot;
}
>>>>>>> 54cbaae64cae8eeb5bc0faf8a4954490837d930c
