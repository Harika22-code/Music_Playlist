document.addEventListener('DOMContentLoaded',()=>{
console.log('welcome to spotify');
//Initialise songIndex
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gef=document.getElementById('gif');
let mastersongname=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem')) ;
let songs=[
  {songName: "Perfect",filepath:"songs/1.mp3",coverpath:"covers/1.jpg"},
  {songName: "Bring me Back",filepath:"songs/2.mp3",coverpath:"covers/2.jpg"},
  {songName: "Racheal",filepath:"songs/3.mp3",coverpath:"covers/3.jpg"},
  {songName: "English poem",filepath:"songs/4.mp3",coverpath:"covers/4.jpg"},
  {songName: "The Adventures of Mr.Hardy",filepath:"songs/5.mp3",coverpath:"covers/5.jpg"}
]
songItems.forEach((element,i)=>{
  element.getElementsByTagName("img")[0].src=songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// edit duration
songItems.forEach((element, i) => {
  let audio = new Audio(songs[i].filepath);

  audio.addEventListener('loadedmetadata', () => {
    let totalSeconds = Math.floor(audio.duration);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    if (seconds < 10) seconds = '0' + seconds;
    element.getElementsByClassName("timestamp")[0].innerText = `${minutes}:${seconds}`;
  });
});

//Handle Play/Pause
masterplay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');

  } else {
    audioElement.pause();
    masterplay.classList.remove('fa-circle-pause');
    masterplay.classList.add('fa-circle-play');
    gif.style.opacity = 0;
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-pause');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-play');
  }
});

//Listen Event
audioElement.addEventListener('timeupdate',()=>{
  //update seekbar
  progress= parseInt((audioElement.currentTime/audioElement.duration)*100); 
  myProgressBar.value=progress;
})
myProgressBar.addEventListener('input', () => {
  const progress = parseFloat(myProgressBar.value);
  if (!isNaN(audioElement.duration)) {
    audioElement.currentTime = (progress / 100) * audioElement.duration;
  }
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    const clickedIcon = e.target;
    const clickedIndex = parseInt(clickedIcon.id);

    // If same song is playing
    if (!audioElement.paused && songIndex === clickedIndex) {
      audioElement.pause();
      clickedIcon.classList.remove('fa-circle-pause');
      clickedIcon.classList.add('fa-circle-play');
      masterplay.classList.remove('fa-circle-pause');
      masterplay.classList.add('fa-circle-play');
      gif.style.opacity = 0;
    } else {
      // Play the clicked song
      makeAllPlays(); // Reset all icons

      songIndex = clickedIndex;
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      mastersongname.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();

      clickedIcon.classList.remove('fa-circle-play');
      clickedIcon.classList.add('fa-circle-pause');
      gif.style.opacity = 1;
      masterplay.classList.remove('fa-circle-play');
      masterplay.classList.add('fa-circle-pause');
    }
  });
});
document.getElementById('next').addEventListener('click',()=>{
  makeAllPlays();
  if(songIndex>=4){
    songIndex=0;
  }
  else{
  songIndex+=1;
  }
   audioElement.src=`songs/${songIndex+1}.mp3`;
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
   mastersongname.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
  makeAllPlays();
  if(songIndex<=0){
    songIndex=0;
  }
  else{
  songIndex-=1;
  }
   audioElement.src=`songs/${songIndex+1}.mp3`;
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
   mastersongname.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})
});
