start();
function start() {
  const title = document.querySelector('h1');
  typeWriter(title);
}

function typeWriter(element) {
  const textArray = element.innerHTML.split('')
  element.innerHTML = '';
  textArray.forEach((letter, i) => {
    setTimeout(() => element.innerHTML += letter, 90 * i)
    
  });
}