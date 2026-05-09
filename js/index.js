let addBtn = document.querySelector(".nav-button")
let form = document.getElementById("form")
let xToggle = document.querySelector(".input-form header button")



addBtn.addEventListener("click" , function(){
  form.classList.remove("d-none")
})
xToggle.addEventListener("click" , function(){
  form.classList.add("d-none")
})


let imageInput = document.getElementById("input-img")
let nameInput = document.getElementById("nameInput")
let phoneInput = document.getElementById("numInput")
let emailInput = document.getElementById("mailInput")
let addressInput = document.getElementById("addressInput")
let groupInput = document.getElementById("selectInput")
let noteInput = document.getElementById("notesInput")
let favoriteInput = document.getElementById("checkInput1")
let emergencyInput = document.getElementById("checkInput2")
let saveButton = document.getElementById("saveButton")
let favoritCount = document.getElementById("favCount")
let emergencyCount = document.getElementById("emergCount")
let editeButton = document.getElementById("editeButton")
let cancelButton =document.getElementById("cancelButton")
let currentIndex = 0
let colors = ["bg-red-linear" , "bg-pink-linear" , "bg-blue-linear" , "bg-purble" , "bg-green-linear"]
let oldIndex = -1
let color
let searchInput = document.getElementById("search")



let contactList = []

if (localStorage.getItem("contactsData") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactsData"))
  displayContact()
  displayFav()
  displayEmergency()
  
}


form.addEventListener("submit" , function(e){
  e.preventDefault()
  form.classList.add("d-none")
  addContact()
})


cancelButton.addEventListener("click" , cancelation )

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cancelation();
  }
});

function cancelation(){
  clear()
  form.classList.add("d-none")
}


editeButton.addEventListener("click" , function(){
  updateContact()
  clear()
  saveButton.classList.remove("d-none")
  editeButton.classList.add("d-none")
  form.classList.add("d-none")
  displayContact()
  displayEmergency()
  displayFav()
})

searchInput.addEventListener("input" , function(){
    displayContact()
  })

nameInput.addEventListener("input" , function(){
  validation(this)
})
phoneInput.addEventListener("input" , function(){
  validation(this)
})
emailInput.addEventListener("input" , function(){
  validation(this)
})

function addContact(){
   let isNameValid = validation(nameInput);
  let isPhoneValid = validation(phoneInput);
  let isEmailValid = validation(emailInput);
  let phone = phoneInput.value
  
let exists = false;
let existName = "";

for (let i = 0; i < contactList.length; i++) {
  if (contactList[i].phone == phone) {
    exists = true;
    existName = contactList[i].name;
    break;
  }
}

if (exists) {

  Swal.fire({
    icon: "error",
    title: "Duplicate Phone Number",
    text: `A contact with this phone number already exists: ${existName}`,
    confirmButtonText: "OK"
  });
clear()

}
else{
   if (isNameValid && isPhoneValid && isEmailValid) {
    
  let contact = {
    image : imageInput.files[0] ? `images/${imageInput.files[0].name}` : nameInput.value.trim().split(" ", 2).map(w => w[0]).join("").toUpperCase(), 
    name : nameInput.value.trim(),
    phone : phoneInput.value.trim(),
    mail : emailInput.value.trim(),
    address : addressInput.value.trim(),
    group : groupInput.value.trim(),
    groupStyle : groupInput.value == "Family" ? "text-primary bg-primary-subtle " : groupInput.value == "Friends" ? "text-success bg-success-subtle"  
    : groupInput.value == "School" ? "text-warning bg-warning-subtle" : groupInput.value == "work" ? "text-purble bg-lpurble" : "text-secondary bg-secondary-subtle" ,
    note : noteInput.value.trim(),
    isFavorite : favoriteInput.checked,
    isEmergency : emergencyInput.checked,
    color : colors[getRandomIndex()]
  }
  searchInput.value = ""
  contactList.push(contact)
  displayContact()
  localStorage.setItem("contactsData" , JSON.stringify(contactList))
  clear()
  displayFav()
  localStorage.setItem("contactsData" , JSON.stringify(contactList))
  displayEmergency()
  localStorage.setItem("contactsData" , JSON.stringify(contactList))
  

    Swal.fire({
      icon: "success",
      title : "Added",
      text: "Contact has been added successfully",
      timer: 1500,
      showConfirmButton: false
    });
  }else{
    let error =
      ! isNameValid ? { title: "Name", message: "Name should contain only letters and spaces (2-50 characters)" } :
      !isPhoneValid ? { title: "Phone", message: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)" } :
       { title: "Email", message: "Please enter a valid email address" };
    Swal.fire({
  title: `Invalid ${error.title}`,
  text: error.message,
  icon: 'error',
  confirmButtonText: 'ok'
})
form.classList.remove("d-none")
  }
}
}

function clear(){
  imageInput.value = null
  nameInput.value = null
  phoneInput.value = null
  emailInput.value = null
  addressInput.value = null
  groupInput.value = null
  noteInput.value = null
  favoriteInput.checked = false
  emergencyInput.checked = false

  nameInput.classList.remove("border-danger")
  phoneInput.classList.remove("border-danger")
  emailInput.classList.remove("border-danger")
  
}

function displayContact(){
  let hideContact = document.getElementById("hideContactBac")
  let tirm = searchInput.value
  let total = document.getElementById("allCount")
  let totalCount = document.getElementById("totalCount")
  let count = 0
  let cartona = ""
  for (let i = 0; i < contactList.length; i++) {
    count++
    if (contactList[i].name.toLowerCase().includes(tirm.toLowerCase()) || contactList[i].phone.includes(tirm) || contactList[i].mail.toLowerCase().includes(tirm.toLowerCase())   ) {
      cartona+= getCartona(i)
      
    
    

  }}

  if (count > 0) {
    hideContact.classList.add("d-none") 
  }else{
    hideContact.classList.remove("d-none")
  }
  total.innerHTML = count
  totalCount.innerHTML = count
  document.getElementById("innerData").innerHTML = cartona
  
}

function getCartona(i){
  
  let photoContent = "";
    if (contactList[i].image.length <= 2) {
        
        photoContent = `<span>${contactList[i].image}</span>`;
    } else {
       
        photoContent = `<img class="w-100 h-100 rounded-3 object-fit-cover" src="${contactList[i].image}" alt="${contactList[i].name}">`;
    }
  
  return `<div class="col-12 col-md-6">
  <div class="card bg-white rounded-4 border border-2 border-color">
                        <div class="inner p-3">
                          <div class="d-flex align-items-center gap-3">
                            <div
                              class="pic position-relative text-white ${contactList[i].color} d-flex align-items-center justify-content-center fw-semibold fs-5 text-uppercase">
                              
                             ${photoContent}
                              <div
                                class="heart ${contactList[i].isEmergency? "" : "d-none"} position-absolute d-flex align-items-center  rounded-circle  border border-2 border-white">
                                <i class="fa-solid fa-heart-pulse text-white fs-8"></i></div>
                              <div
                                class="star  ${contactList[i].isFavorite? "" : "d-none"} position-absolute d-flex align-items-center  rounded-circle  border border-2 border-white bg-warning">
                                <i class="fa-solid fa-star text-white fs-8"></i></div>
                            </div>
                            <div>
                              <p class="fw-semibold m-0 lh-lg">${contactList[i].name}</p>
                              <p class="fs-14 d-flex align-items-center m-0 gap-2 text-secondary"><i
                                  class="fa-solid fa-phone text-primary bg-primary-subtle p-2 rounded-3 fs-10"></i>
                                ${contactList[i].phone}</p>
                            </div>
                          </div>
                          <div class="mt-3 d-flex align-items-center gap-2">
                            <i class="fa-solid fa-envelope text-purble bg-lpurble p-2 rounded-3 fs-10"></i>
                            <p class="text-secondary fs-14 m-0">${contactList[i].mail}</p>
                          </div>
                          <div class="my-2 d-flex align-items-center gap-2">
                            <i class="fa-solid fa-location-dot text-success bg-success-subtle p-2 rounded-3 fs-10"></i>
                            <p class="text-secondary fs-14 m-0">${contactList[i].address}</p>
                          </div>
                          <div class="mt-3 d-flex align-items-center gap-2">
                            <span
                              class="${contactList[i].groupStyle} fs-10 text-primary bg-primary-subtle py-1 px-2 rounded-2 fw-semibold ">${contactList[i].group}</span>
                            <span
                           
                            <span class="${contactList[i].isEmergency? "" : "d-none"} fs-10 text-danger bg-danger-subtle py-1 px-2 rounded-2 fw-semibold "><i
                                class="fa-solid fa-heart-pulse text-danger fs-10 me-1"></i>Emergency</span>

                          </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                          <div>
                          <a href="tel:${contactList[i].phone}"><i class="fa-solid fa-phone p-2 text-success bg-success rounded-3"></i></a>
                          <a href="mailto:${contactList[i].mail}"><i class="fa-solid fa-envelope p-2 text-purble bg-lpurble rounded-3"></i></a>
                            
                            
                          </div>
                          <div>
                            <button onClick="toggleUnFavorite(${i})" class="border-0 bg-white bg-opacity-10 p-0 ${contactList[i].isFavorite ? "" : "d-none"}"> <i
                                class=" fa-solid fa-star icon-star p-2 text-warning bg-warning-subtle  rounded-3"></i></button>
                            <button onClick="toggleFavorite(${i})" class="border-0 bg-white bg-opacity-10 p-0 ${contactList[i].isFavorite ? "d-none" : ""} "> <i class="fa-regular fa-star icon-star2 p-2 text-secondary   rounded-3"></i></button>
                            <button onClick="toggleUnEmergency(${i})" class="border-0 bg-white bg-opacity-10 p-0 ${contactList[i].isEmergency ? "" : "d-none"}"> <i
                                class=" fa-solid fa-heart-pulse p-2 text-danger bg-danger-subtle  rounded-3"></i></button>
                            <button onClick="toggleEmergency(${i})" class="border-0 bg-white bg-opacity-10 p-0 ${contactList[i].isEmergency ? "d-none" : ""}"> <i class=" fa-regular fa-heart p-2 text-secondary icon-heart  rounded-3"></i></button>
                            <button onClick="editeContact(${i})" class="border-0 bg-white bg-opacity-10 p-0"><i class="fa-solid fa-pen p-2 text-secondary rounded-3"></i></button>
                           <button onClick="deleteContact(${i})" class="border-0 bg-white bg-opacity-10 p-0"><i  class="fa-solid fa-trash p-2 text-secondary  rounded-3"></i></button>
                          </div>
                        </div>

                      </div>
                       </div>`
}

function deleteContact(index){
Swal.fire({
  title: "Delete Contact?",
  text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33" ,
  cancelButtonColor: "#606773",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
  contactList.splice(index,1)
localStorage.setItem("contactsData",JSON.stringify(contactList))
displayContact()
displayFav()
displayEmergency()

Swal.fire({
    title: "Deleted!",
    text: "Contact has been deleted.",
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
  }

});

}

function displayFav(){
  let hideFavBac = document.getElementById("hidefav")
  let favBox = ""
  let countFav = 0
  for (let i = 0; i < contactList.length; i++) {
    
   if (contactList[i].isFavorite) {
    
    countFav++
    
     let photoContent = "";
    if (contactList[i].image.length <= 2) {
        
        photoContent = `<span">${contactList[i].image}</span>`;
    } else {
       
        photoContent = `<img class="w-100 h-100 rounded-3 object-fit-cover" src="${contactList[i].image}" alt="${contactList[i].name}">`;
    }
    favBox+= ` <div class="col-12 col-md-6 col-xl-12 ">
                        <div
                          class="inner p-2 bg-gray rounded-3 d-flex align-items-center justify-content-between gap-3 mb-3">
                          <div class="d-flex align-items-center justify-content-center gap-3">
                            <div class=" rounded-3 text-white  ${contactList[i].color}  fw-semibold d-flex align-items-center justify-content-center text-uppercase" style="height: 40px; width: 40px;">
                            ${photoContent}
                            </div>
                            <div>
                              <p class="fw-semibold m-0 fs-14">${contactList[i].name}</p>
                              <p class="fs-12 d-flex align-items-center m-0  gap-2 text-secondary">${contactList[i].phone}</p>
                            </div>
                          </div>
                          <a href="tel:${contactList[i].phone}"> <i
                              class="fa-solid fa-phone phone-green text-success bg-success-subtle p-2 rounded-3 "></i>
                          </a>
                        </div>
                      </div>`
    
    
   }
  }
  
  if (countFav >0) {
    hideFavBac.classList.add("d-none")
  }
  else{
    hideFavBac.classList.remove("d-none")
  }
  
  favoritCount.innerHTML = countFav
  document.getElementById("favData").innerHTML = favBox
 
}


function displayEmergency(){
  let hideEmergBac = document.getElementById("hideEmerg")
  let emergencyBox = ""
  let countEmerg = 0
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].isEmergency) {
      countEmerg++
      

      let imageContent = ""
      if (contactList[i].image.length <=2) {
        imageContent = `<span>${contactList[i].image}</span>`

      }else{
        imageContent = `<img class="w-100 h-100 rounded-3 object-fit-cover" src="${contactList[i].image}" alt="${contactList[i].name}">`;
    }
      
  
      emergencyBox+= ` <div class="col-12 col-md-6 col-xl-12">
                        <div
                          class="inner p-2 bg-gray rounded-3 d-flex align-items-center justify-content-between gap-3 mb-3">
                          <div class="d-flex align-items-center justify-content-center gap-3">
                            <div class=" rounded-3 text-white ${contactList[i].color}    fw-semibold text-uppercase d-flex align-items-center justify-content-center text-uppercase" style="height: 40px; width: 40px;">
                            ${imageContent}
                            </div>
                            <div>
                              <p class="fw-semibold m-0 fs-14">${contactList[i].name}</p>
                              <p class="fs-12 d-flex align-items-center m-0  gap-2 text-secondary">${contactList[i].phone}</p>
                            </div>
                          </div>
                          <a href="tel:${contactList[i].phone}"><i
                              class="fa-solid fa-phone phone-red text-danger bg-danger-subtle p-2 rounded-3 "></i> </a>
                        </div>
                      </div>`
          
    } }

    if (countEmerg >0) {
      hideEmergBac.classList.add("d-none")  
    }else{
      hideEmergBac.classList.remove("d-none")
    }
  emergencyCount.innerHTML = countEmerg
  document.getElementById("emergData").innerHTML = emergencyBox
  
}

function toggleUnFavorite(index) {
    contactList[index].isFavorite = !contactList[index].isFavorite;
    localStorage.setItem("contactsData", JSON.stringify(contactList));

    displayContact(); 
    displayFav(); 
    


   
}
function toggleFavorite(index) {
    contactList[index].isFavorite = !contactList[index].isFavorite;
    localStorage.setItem("contactsData", JSON.stringify(contactList));

    displayContact(); 
    displayFav(); 
    hideFavBac.classList.add("d-none")
  


}

function toggleUnEmergency(index){
  contactList[index].isEmergency = !contactList[index].isEmergency
  localStorage.setItem("contactsData" , JSON.stringify(contactList))
  displayContact()
  displayEmergency()




}

function toggleEmergency(index){
  contactList[index].isEmergency = !contactList[index].isEmergency
  localStorage.setItem("contactsData" , JSON.stringify(contactList))
  displayContact()
  displayEmergency()
  


}

function editeContact(index){
  currentIndex = index
  nameInput.value = contactList[index].name
  phoneInput.value = contactList[index].phone
  emailInput.value = contactList[index].mail
  addressInput.value = contactList[index].address
  groupInput.value = contactList[index].group
  noteInput.value = contactList[index].note
  favoriteInput.checked = contactList[index].isFavorite
  emergencyInput.checked = contactList[index].isEmergency
  color = contactList[index].color

  form.classList.remove("d-none")
  editeButton.classList.remove("d-none")
  saveButton.classList.add("d-none")

}

function updateContact(){

  let contact = {
    image : imageInput.files[0] ? `images/${imageInput.files[0].name}` : nameInput.value.trim().split(" ", 2).map(w => w[0]).join("").toUpperCase(), 
    name : nameInput.value.trim(),
    phone : phoneInput.value.trim(),
    mail : emailInput.value.trim(),
    address : addressInput.value.trim(),
    group : groupInput.value.trim(),
    groupStyle : groupInput.value == "Family" ? "text-primary bg-primary-subtle " : groupInput.value == "Friends" ? "text-success bg-success-subtle"  
    : groupInput.value == "School" ? "text-warning bg-warning-subtle" : groupInput.value == "work" ? "text-purble bg-lpurble" : "text-secondary bg-secondary-subtle" ,
    note : noteInput.value.trim(),
    isFavorite : favoriteInput.checked,
    isEmergency : emergencyInput.checked,
    color : contactList[currentIndex].color
  }
  contactList.splice(currentIndex,1,contact)
   localStorage.setItem("contactsData" , JSON.stringify(contactList))
  displayContact()
  clear()
  displayFav()
  displayEmergency()

}


function getRandomIndex(){
  let newIndex
do{
  newIndex = Math.floor(Math.random()*colors.length)
}while (oldIndex === newIndex) ;
  oldIndex = newIndex
  return newIndex
}


function validation(elemnt){

  let text = elemnt.value
  let regex = {
    nameInput :  /^[A-Za-z\u0600-\u06FF ]{2,50}$/,
    numInput : /^01[0125][0-9]{8}$/,
    mailInput : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }

  if (regex[elemnt.id].test(text)) {
    elemnt.classList.remove("border-danger")
    elemnt.nextElementSibling.classList.add("d-none")
    return true;
   
  }else{
    elemnt.classList.add("border-danger")
    elemnt.nextElementSibling.classList.remove("d-none")
      return false
}

}


