document.addEventListener('DOMContentLoaded', () => {
  let selected = document.getElementsByTagName('select');

  const btnEventListener = arr => {
    arr[arr.length - 1].addEventListener('input', newSelect);
    for(let i = 0; i < arr.length - 1; i++) {
      arr[i].removeEventListener('input', newSelect);
      arr[i].addEventListener('input', checker);
    };
  };
  
  const newSelect = () => {
    if(selected.length < places.length){
      const div = document.getElementsByClassName('route')[0];
      const select = document.createElement('select');
      select.setAttribute('name', 'site');
      places.forEach(e => {
        const option = document.createElement('OPTION');
        option.value = e._id;
        option.text = e.name;
        select.appendChild(option);
      });
      div.appendChild(select);
      btnEventListener(document.getElementsByTagName('select'));
      checker();
    }
  }

  const checkPlace = () => {
    let arr = [];
    for(let i = 0; i < selected.length - 1; i++) arr.push(selected[i].value)
    return (new Set(arr)).size !== arr.length;
  };

  const disableSelect = () => {
    selected[selected.length - 1].disabled = true;
  }

  const enableSelect = () => {
    selected[selected.length - 1].disabled = false;
  }

  const checker = () => {
    checkPlace() ? disableSelect() : enableSelect();
  }

  newSelect();

});
