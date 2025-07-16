function emulateClick(x, y){
  const div = document.createElement('div');
  div.style.border = '1px solid #6F2FF5';
  div.style.position = 'absolute';
  div.style.zIndex = '99999999999999999999999999';

  div.style.top = `${y}px`;
  div.style.left = `${x}px`;
  document.body.appendChild(div);
}


//emulateClick(0,0)

function clickPlash() {
  const page = { width: window.innerWidth, height: window.innerHeight };
  const cords = { x: page.width - 302 + (Math.floor(Math.random() * 128)), y:page.height - 89 + (Math.floor(Math.random() * 36))}
  emulateClick(cords.x, cords.y)
}


setInterval(() => {
  clickPlash()
},10)