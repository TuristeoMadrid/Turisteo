const updateBtns = document.getElementsByClassName('updateBtn');
const updatePrevBtn = document.getElementsByClassName('updatePrevBtn');
const changeToForm = ele => {
  const pArr = document.getElementsByClassName(`${ele.id}p`);
  const inputArr = document.getElementsByClassName(`${ele.id}input`);
  const bArr = document.getElementsByClassName(`${ele.id}b`);
  for(let i = 0; i < pArr.length; i++){
    inputArr[i].removeAttribute('hidden');
    pArr[i].setAttribute('hidden', 'hidden');
    ele.setAttribute('hidden', 'hidden');
    ele.nextSibling.nextSibling.removeAttribute('hidden');
  };
};
const eventAdd = arr => {
  for(let i = 0; i < arr.length; i++) arr[i].addEventListener('click', () => { changeToForm(arr[i])});
}
document.addEventListener('DOMContentLoaded', () => {
  eventAdd(updatePrevBtn);
}, false);
