document.addEventListener('DOMContentLoaded', () => {
  const btns = document.getElementsByClassName('btn');
  const popover = btn => {
    $(btn).popover({
      container: 'body'
    })
  }
  for (let i = 0; i < btns.length; i++) {
    console.log(btns[i])
    btns[i].addEventListener('mouseover', () => {popover(btns[i])})
  }
}, false);