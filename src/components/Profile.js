/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { Menu } from './Menu.js';
import { getUserLocalStorage } from '../authentication.js';
import { getPublicationsUser } from '../database.js';

export const profile = () => {
  // Aquí llamamos y almacenamos la función de localStorage que nos devuelva datos del user.
  const user = getUserLocalStorage();

  // Aquí llamamos y almacenamos la función de database que nos dará los post por user.
  const postByUser = getPublicationsUser(user.uid);

  const profileSection = document.createElement('section');
  profileSection.setAttribute('id', 'profile-section');

  const divNav = document.createElement('div');
  divNav.setAttribute('class', 'div-nav');
  const profileTitle = document.createElement('h1');
  profileTitle.textContent = 'Perfil';

  const menu = Menu();
  divNav.appendChild(profileTitle);
  divNav.appendChild(menu);

  profileSection.appendChild(divNav);
  const divProfile = document.createElement('div');
  divProfile.setAttribute('id', 'profile-container');

  const iconDefault = '../img/user.png';
  const divProfileTemplate = `
                        <div id = "div-left-profile">
                            <h1>Datos personales</h1>                                
                                <img id = "photo-profile" src = ${user.photoURL ? user.photoURL : iconDefault}>
                            <p id = "name-profile">${user.displayName}</p>
                            <p id = "email-profile">${user.email}</p>
                        </div>`;
  const divRightProfile = document.createElement('div');
  divRightProfile.setAttribute('id', 'div-right-profile');
  divRightProfile.innerHTML = `
       <h1 class="publication-title" >Mis publicaciones</h1>
  `;
  const divPostProfile = document.createElement('div');
  divPostProfile.setAttribute('id', 'post-profile');

  // Llamamos la variable que nos devuelve los posts por usuario.
  postByUser.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const templatePostUser = `<div class="perfilPost"> 
      <div class = "div-category-post">
      <p class = "category-post ${doc.data().Categoría}">${doc.data().Categoría}</p>
    </div>
      <div class ="container-post">
        <div class = "title-and-icons">
          <div class ="div-title">
            <p>${doc.data().Título}</p>
          </div>
        </div>
        <div class = "div-img-post">
          <img class = "img-post" src = ${doc.data().Foto}>
        </div>
      </div>
      </div>`;
      divPostProfile.innerHTML += templatePostUser;
    });
  });

  divProfile.innerHTML = divProfileTemplate;
  divRightProfile.appendChild(divPostProfile);
  divProfile.appendChild(divRightProfile);
  profileSection.appendChild(divProfile);

  return profileSection;
};
