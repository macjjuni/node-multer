

const uploadName = document.querySelector(".upload-name"); 
const uploadInput = document.querySelector("#upload-input");
const submitBtn = document.querySelector("#submit");

uploadInput.addEventListener('change', (e)=>{
    uploadName.value = e.target.value;
})