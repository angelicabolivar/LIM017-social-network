/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable eol-last */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js';
import { app } from './main.js';

const storage = getStorage(app);

<<<<<<< HEAD
export const storageFunction = (imageUpload, image) => {
  storageRef = ref(storage, '/imagenes');
  // Creamos una referencia para el nombre de la imagen que queremos subir a firestorage:
  const imageRef = ref(storage, `imagenes/${imageUpload.name}`);
  return uploadBytes(imageRef, imageUpload).then((snapshot) => {
    console.log('Ya se subio la foto a nuestra carpeta storage');
    return getDownloadURL(imageRef)
      .then((url) => {
        image.setAttribute('src', url);
        image.style.objectFit = 'contain';
        image.style.border = 'none';
        image.style.background = 'white';
        console.log(url);
        return new Promise((resolve, reject) => {
          resolve(url);
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log('El archivo no existe');
            break;
          case 'storage/unauthorized':
            console.log('El usuario no tiene permiso para acceder al objeto');
            break;
          case 'storage/canceled':
            console.log('El usuario canceló la carga');
            break;
          case 'storage/unknown':
            console.log('Error desconocido, inspecciona el servidor');
            break;
          default:
            console.log('Otro error');
        }
      });
  });
};
=======
// Aquí vamos a almacenar la url para usarla en otro módulo.
// Cambié el nombre de la función, preguntar
export const uploadAndDownloadImage = async (imageUpload, image) => {
  let getImageUrl; // En esta variable vamos almacenar la Url de la imagen que nos regresa storage.
  try {
    const storageRef = await ref(storage, '/imagenes');
    const imageRef = await ref(storage, `imagenes/${imageUpload.name}`); // Estamos creando una referencia para el nombre de la imagen que queremos subir a firestorage:
    const snapshot = await uploadBytes(imageRef, imageUpload);
    getImageUrl = await getDownloadURL(imageRef);
    image.style.objectFit = 'contain';
    image.style.border = 'none';
    image.style.background = 'white';
    image.setAttribute('src', getImageUrl);
    return getImageUrl;
  } catch (error) {
    switch (error.code) {
      case 'storage/object-not-found':
        console.log('El archivo no existe');
        break;
      case 'storage/unauthorized':
        console.log('El usuario no tiene permiso para acceder al objeto');
        break;
      case 'storage/canceled':
        console.log('El usuario canceló la carga');
        break;
      case 'storage/unknown':
        console.log('Error desconocido, inspecciona el servidor');
        break;
      default:
        console.log('Otro error');
    }
  }
  console.log(getImageUrl);
  return getImageUrl;
};
>>>>>>> 697af306ccd17e81613475bbad7b6a150d97e11a
