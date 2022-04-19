/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import { onNavigate } from '../lib/ViewController.js';
import { auth, provider } from './main.js';
import { insertDataUser } from './database.js';

// Función que almacena los campos del user al localStorage.
export const setUserLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify({ // para que se guarde en el localStorage debe ser un string y para eso utilizamos JSON.stringify
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  }));
};

// Función que nos devuelve los datos del user:
export const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));

// Función para registrarse sin google:
export const createUser = async (registerEmail, registerPassword, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
  const user = userCredential.user;
  user.displayName = name;
  user.photoURL = '../img/user.png';
  return user;
};

// Función para enviar enlace a correo.
export const sendEmail = (user) => sendEmailVerification(user);

// Función para inicio de sesión:
export const signIn = async (loginEmail, loginPassword) => {
  const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  const user = userCredential.user;
  console.log(user);
  return user;
};

// Autenticación con Google:
export const signGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      setUserLocalStorage(user);
      const dataUser = getUserLocalStorage();
      insertDataUser(dataUser);
      onNavigate('/home');
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// Función para cerrar sesión
export const signOutFun = () => signOut(auth);
