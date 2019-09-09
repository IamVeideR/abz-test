let section = document.querySelector('.users__block');
let profile = document.querySelector('.profile__in');
let showMore = document.querySelector('.users__more');
let total = 0;
let clicksAmount = 1;

function isEllipsisActive(element) {
    return element.offsetWidth < element.scrollWidth;
  }

let requestURL = `https://frontend-test-assignment-api.abz.agency/api/v1/users?count=6`;
let request = new XMLHttpRequest(); 
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  let user = request.response;
  total = user.total_users;
  let requestURLSecond = `https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${total}`;
  let requestSecond = new XMLHttpRequest(); 
  requestSecond.open('GET', requestURLSecond);
  requestSecond.responseType = 'json';
  requestSecond.send();
  requestSecond.onload = function() {
    let userSecond = requestSecond.response;
    showUsers(userSecond);
    Array.from(document.querySelectorAll('.item__mail')).forEach(element => {
      if (isEllipsisActive(element)) {
      element.title = element.innerText;
      }
    });
    Array.from(document.querySelectorAll('.item__name')).forEach(element => {
      if (isEllipsisActive(element)) {
      element.title = element.innerText;
      }
    });
  }
}

function showUsers(user) {
    let users = user.users;

    for (let i = 0; i < total; i++) {
      if(users[i].id == 1) {
        let userImage = document.createElement('div');
        let userBlock = document.createElement('div');
        let userName = document.createElement('p');
        let userMail = document.createElement('p');

        userImage.classList.value = 'profile__image';
        userBlock.classList.value = 'profile__block';
        userName.classList.value = 'profile__login';
        userMail.classList.value = 'profile__mail';

        userName.textContent = users[i].name;
        userImage.style = `background-image: url(${users[i].photo})`;
        userMail.textContent = users[i].email;

        

        userBlock.appendChild(userName);
        userBlock.appendChild(userMail);
        profile.appendChild(userBlock);
        profile.appendChild(userImage);
      }
    }

    let createUser = (i) => {
      let user = document.createElement('div');
      let userImage = document.createElement('div');
      let userBlock = document.createElement('div');
      let userName = document.createElement('h4');
      let userProfession = document.createElement('p');
      let userMail = document.createElement('p');
      let userPhone = document.createElement('p');
      

      user.classList.value = 'users__item';
      userImage.classList.value = 'item__image';
      userBlock.classList.value = 'item__block';
      userName.classList.value = 'item__name';
      userProfession.classList.value = 'item__profession';
      userMail.classList.value = 'item__mail';
      userPhone.classList.value = 'item__phone';
      
      userName.textContent = users[i].name;
      userImage.style = `background-image: url(${users[i].photo})`;
      userProfession.textContent = users[i].position;
      userMail.textContent = users[i].email;
      userPhone.textContent = users[i].phone;

      

      userBlock.appendChild(userName);
      userBlock.appendChild(userMail);
      userBlock.appendChild(userProfession);
      userBlock.appendChild(userPhone);
      user.appendChild(userImage);
      user.appendChild(userBlock);
      section.appendChild(user);
  }

  for (let i = 0; i < 6; i++) {
      createUser(i);
  }
  showMore.onclick = () => {
    if (clicksAmount < Math.ceil(total/6)-1) {
      for (let i = 6*clicksAmount; i < 6*(clicksAmount+1); i++) {
        createUser(i);
    } 
    clicksAmount++;
    
    }
    else {
      for (let i = 6*clicksAmount; i < total; i++) {
        try {
          createUser(i);
       }
       catch (e) {
       }        
    } 
    showMore.style.display = 'none';
    }
  }
}

const app = new Vue({
  el:'#app',
  data:{
    errors:[],
    name:null,
    mail:null,
    phone:null,
    profession:null,
    // photo:null,
  },
  methods:{
    checkForm:function(e) {
      // if(this.name && this.age) return true;
      // this.errors = [];
      // if(!this.name) this.errors.push("Name required.");
      // if(!this.age) this.errors.push("Age required.");
      // e.preventDefault();
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    submitFile(){
          let formData = new FormData();
          formData.append('file', this.file);
          axios.post( '/single-file',
              formData,
              {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
          ).then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    },
  }
})


// let thisToken = '';

// var formData = new FormData();
// // var fileField = document.querySelector('input[type="file"]');
// formData.append('position_id', 2);
// formData.append('name', 'Jhon');
// formData.append('email', 'Jhon@gmail.com');
// formData.append('phone', '+380955388485');
// // formData.append('photo', fileField.files[0]);

// fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
//  .then(function(response) {
//    return response.json();
//  })
//  .then(function(data) {
//     thisToken = data.token;
//    console.log(data);
//  })
//  .catch(function(error) {
//  });

// fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
//     method: 'POST',
//     body: formData,
//     headers: {
//       'Token': thisToken, // get token with GET api/v1/token method
//     },
//   })
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//     if(data.success) {
//       // process success response
//     } else {
//       // proccess server errors
//     }
//   })
//   .catch(function(error) {
//     // proccess network errors
//   });