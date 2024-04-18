const imageWrapper = document.querySelector('.ImageWrapper');
const imageItems = document.querySelectorAll('.ImageWrapper > *');
const pointsParent = document.querySelector('.Points');
const imageLength = imageItems.length;
const perView = 1;
let totalScroll = 1;
let canMove = true;

for (let i = 0; i < imageItems.length; i++)
{
  var newImg = document.createElement("img");
  newImg.src = '/Image/Slideshow/Other.png';
  newImg.onclick = function()
  {
    moveFromPoint(i+1);
  };

  pointsParent.appendChild(newImg);
}
const points = document.querySelectorAll('.Points > *');

for (let i = 0; i < totalScroll; i++)
{
  points[totalScroll - 1].src = '/Image/Slideshow/Other.png';
}

points[0].src = '/Image/Slideshow/Current.png';
imageWrapper.style.setProperty('--per-view', perView);
imageWrapper.insertAdjacentHTML('afterbegin', imageItems[imageItems.length - 1].outerHTML);
for(let i = 0; i < perView; i++) {
  imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML);
}
imageWrapper.style.transition = '0s';
const widthEl = document.querySelector('.ImageWrapper > :first-child').offsetWidth + 50;
imageWrapper.style.left = `-${totalScroll * widthEl}px`;

let autoScroll = setInterval(scrolling, 10000);


function whichTransitionEvent(){
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };

  for(t in transitions){
      if( el.style[t] !== undefined ){
          return transitions[t];
      }
  }
}

var transitionEnd = whichTransitionEvent();
imageWrapper.addEventListener(transitionEnd, theFunctionToInvoke, false);

function theFunctionToInvoke(){
  canMove = true;
}

function scrolling() {
  if (canMove)
  {
    totalScroll++;
    if(totalScroll == imageLength + 1) {
      clearInterval(autoScroll);
      totalScroll = 1;
      imageWrapper.style.transition = '0s';
      imageWrapper.style.left = '0';
      autoScroll = setInterval(scrolling, 10000);
    }
    canMove = false;
    const widthEl = document.querySelector('.ImageWrapper > :first-child').offsetWidth + 50;
    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
    imageWrapper.style.transition = '0.5s';
    
    setPoint(totalScroll);
  }
}

function changePicture(change){
  if (canMove)
  {
    totalScroll += change;
    console.log(totalScroll);
    if(totalScroll == imageLength + 1) {
      clearInterval(autoScroll);
      totalScroll = 1;
      imageWrapper.style.transition = '0s';
      imageWrapper.style.left = '0';
      autoScroll = setInterval(scrolling, 10000);
    }
    else if (totalScroll == -1)
    {
      clearInterval(autoScroll);
      totalScroll = 4;
      imageWrapper.style.transition = '0s';
      const widthEl = document.querySelector('.ImageWrapper > :first-child').offsetWidth + 50;
      imageWrapper.style.left = `-${5 * widthEl}px`;
      autoScroll = setInterval(scrolling, 10000);
    }
    canMove = false;

    const widthEl = document.querySelector('.ImageWrapper > :first-child').offsetWidth + 50;
    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
    imageWrapper.style.transition = '0.5s';
    setPoint(totalScroll);
  }
}

function setPoint(point){
    totalScroll = point;
    for (let i = 0; i < imageLength; i++)
    {
        points[i].src = '/Image/Slideshow/Other.png';
    }
    if (totalScroll == 0)
    {
      points[4].src = '/Image/Slideshow/Current.png';
    }
    else
    {
      points[totalScroll - 1].src = '/Image/Slideshow/Current.png';
    }
}
function moveFromPoint(point)
{
  if (canMove)
  {
    totalScroll = point;
    for (let i = 0; i < imageLength; i++)
    {
        points[i].src = '/Image/Slideshow/Other.png';
    }
    if (totalScroll == 0)
    {
      points[4].src = '/Image/Slideshow/Current.png';
    }
    else
    {
      points[totalScroll - 1].src = '/Image/Slideshow/Current.png';
    }
    canMove = false;

    imageWrapper.style.transition = '0.5s';
    const widthEl = document.querySelector('.ImageWrapper > :first-child').offsetWidth + 50;
    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
  }
}

