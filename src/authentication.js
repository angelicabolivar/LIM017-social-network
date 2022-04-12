/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import { onNavigate } from './lib/ViewController.js';
import { app } from './main.js';

export const auth = getAuth();
console.log(auth);
const user1 = auth.currentUser;
console.log(user1);
const provider = new GoogleAuthProvider(app);

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     console.log(user);
//   } else {
//     console.log('no hay usuario');
//   }
// });

// función para obtener datos del usuario
export const getDataUser = () => {
  const user = auth.currentUser;
  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     console.log(JSON.parse(JSON.stringify(user)));
  //     return JSON.parse(JSON.stringify(user));
  //   }
  //   console.log('no hay usuario');
  // });
  return user;
};
const setUserLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  }));
};
export const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));
// Función que actualice los datos de usuario:

export const updatedDataUser = async (name, photo) => updateProfile(auth.currentUser, {
  displayName: name,
  photoURL: photo,
}).then(() => {
  console.log('Se guardaron los datos');
}).catch((error) => {
  console.log('No se pudo agregar sus datos');
});

// Función para registrar usuario:
export const createUser = async (
  registerEmail,
  registerPassword,
  wrongEmail,
  minPassword,
  registerErrorDefault,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerEmail.value,
      registerPassword.value,
    );
    const user = userCredential.user;
    console.log('usuario registrado', user);
    await sendEmailVerification(user);

    // Creamos un párrafo con mensaje para que el usuario vaya a su correo y verifique el link.
    const pMessage = document.createElement('p');
    pMessage.innerText = 'Hemos enviado un enlace a tu correo electrónico. ';
    (onNavigate('/login')).appendChild(pMessage);
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        wrongEmail.innerText = 'El correo ingresado ya está en uso';
        registerEmail.style.borderColor = '#F62D2D';
        break;
      case 'auth/weak-password':
        minPassword.style.color = 'red';
        minPassword.innerText = 'Debe ingresar al menos 6 caracteres.';
        registerPassword.style.borderColor = '#F62D2D';
        break;
      case 'auth/invalid-email':
        wrongEmail.textContent = 'El correo ingresado es inválido';
        registerEmail.style.borderColor = '#F62D2D';
        break;
      default:
        registerErrorDefault.innerText = errorCode;
    }
  }
};

// Función para inicio de sesión:
export const signIn = (
  loginEmail,
  loginPassword,
  invalidEmail,
  invalidPassword,
  loginErrorDefault,
  verifiedEmail,
) => {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      setUserLocalStorage(user);
      if (user.emailVerified) {
        onNavigate('/home');
      } else {
        verifiedEmail.innerText = 'Por favor verifica tu correo para ingresar a Slowly';
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          invalidEmail.innerText = 'No hay usuario registrado con ese correo., verifica e intente de nuevo.';
          loginEmail.style.borderColor = '#F62D2D';
          break;
        case 'auth/wrong-password':
          invalidPassword.innerText = 'La contraseña no es válida, verifica e intente de nuevo.';
          loginPassword.style.borderColor = '#F62D2D';
          break;
        case 'auth/email-already-exists':
          invalidEmail.innerText = 'El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
          loginEmail.style.borderColor = '#F62D2D';
          break;
        default:
          loginErrorDefault.innerText = errorCode;
      }
    });
};

// Autenticación con Google:
export const signGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // para que esto se guarde en el localStorage debe ser
      // un string y para eso utilizamos JSON.stringify
      setUserLocalStorage(user);
      onNavigate('/home');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// Función para cerrar sesión
export const signOutFun = () => {
  signOut(auth).then(() => {
    console.log('Usted cerró sesión');
    onNavigate('/');
  }).catch((error) => {
    console.log('No se pudo cerrar seción');
  });
};
