// variables
let previousSong = document.getElementById('previousSong');
let masterPlay = document.getElementById('masterPlay');
let nextSong = document.getElementById('nextSong');
let audioElement = new Audio('asset/songs/1.mp3');
let songInfo = document.getElementById('songInfo');
let playingGIF = songInfo.getElementsByTagName('img')[0];
let currentPlayingSongName = songInfo.querySelector('.songName');
let myProgressBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemContainer = document.querySelector('.songItemContainer');
let cover = document.querySelector('.container');
let currentSongIndex = 0;


let songs = [
    {songName:'A', coverSrc:'./asset/covers/1.jpg',audioFileSrc:'./asset/songs/1.mp3'},
    {songName:'B', coverSrc:'./asset/covers/2.jpg',audioFileSrc:'./asset/songs/2.mp3'},
    {songName:'C', coverSrc:'./asset/covers/3.jpg',audioFileSrc:'./asset/songs/3.mp3'},
    {songName:'D', coverSrc:'./asset/covers/4.jpg',audioFileSrc:'./asset/songs/4.mp3'},
    {songName:'E', coverSrc:'./asset/covers/5.jpg',audioFileSrc:'./asset/songs/5.mp3'},
    {songName:'F', coverSrc:'./asset/covers/6.jpg',audioFileSrc:'./asset/songs/6.mp3'},
    {songName:'G', coverSrc:'./asset/covers/7.jpg',audioFileSrc:'./asset/songs/7.mp3'},
    {songName:'H', coverSrc:'./asset/covers/8.jpg',audioFileSrc:'./asset/songs/8.mp3'},
    {songName:'I', coverSrc:'./asset/covers/9.jpg',audioFileSrc:'./asset/songs/9.mp3'},
    {songName:'J', coverSrc:'./asset/covers/10.jpg',audioFileSrc:'./asset/songs/10.mp3'}
];


// display the song as list on the page.
songItem.forEach((Element,i)=>{
    Element.getElementsByTagName('img')[0].src = songs[i].coverSrc;
    Element.querySelector('.songName').innerHTML = songs[i].songName;
    Element.id = i;
});

let previousPlayingSong = document.getElementById('0').querySelector('i');


songItemContainer.addEventListener('click',(event)=>{
    if(event.target===previousPlayingSong){
        if(audioElement.paused){
            playSong(previousPlayingSong);
        }else{
            pauseSong(previousPlayingSong);
        }
    }else if(event.target.tagName==='I'){
        currentSongIndex = parseInt(event.target.parentElement.parentElement.id);
        pauseSong(previousPlayingSong);
        audioElement = new Audio(songs[currentSongIndex].audioFileSrc);
        playSong(event.target);
        previousPlayingSong = event.target;  
    }
});

function playSong(src){
    currentPlayingSongName.innerHTML = songs[currentSongIndex].songName;
    audioElement.play();
    src.innerHTML = 'pause_circle';
    masterPlay.innerHTML = 'pause_circle';
    playingGIF.style.opacity=1;
    let path = songs[currentSongIndex].coverSrc;
    cover.style.backgroundImage = "url('" + path + "')";
    audioElement.addEventListener('timeupdate',updateSeekBar);
}

function pauseSong(src){
    audioElement.pause();
    src.innerHTML = 'play_circle';
    masterPlay.innerHTML = 'play_circle';
    playingGIF.style.opacity=0;
}

// event listener
previousSong.addEventListener('click',()=>{
    playPreviousSong();
})

masterPlay.addEventListener('click',()=>{
    masterPlayPause();
})
nextSong.addEventListener('click',()=>{
    playNextSong();
})


document.addEventListener('keydown', (event)=>{
    if(event.key===' '){
        masterPlayPause();
    }else if(event.key==="ArrowRight" || event.key==="ArrowDown"){
        playNextSong();
    }else if(event.key==="ArrowLeft" || event.key==="ArrowUp"){
        playPreviousSong();
    }
});



myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = parseInt(myProgressBar.value*audioElement.duration/100);
})

const updateSeekBar = ()=>{
    let progressPercent = parseInt(audioElement.currentTime/audioElement.duration*100);
    myProgressBar.value = progressPercent;
}
function playPreviousSong(){
    pauseSong(previousPlayingSong);
    currentSongIndex = (currentSongIndex-1+songs.length)%songs.length;
    audioElement = new Audio(songs[currentSongIndex].audioFileSrc);
    let nextListSong = document.getElementById(currentSongIndex).querySelector('i');
    playSong(nextListSong);
    previousPlayingSong = nextListSong;
}

function playNextSong(){
    pauseSong(previousPlayingSong);
    currentSongIndex = (currentSongIndex+1)%songs.length;
    audioElement = new Audio(songs[currentSongIndex].audioFileSrc);
    let nextListSong = document.getElementById(currentSongIndex).querySelector('i');
    playSong(nextListSong);
    previousPlayingSong = nextListSong;
}

function masterPlayPause(){
    if(audioElement.paused || audioElement.currentTime<=0){
        playSong(previousPlayingSong);
    }else{
        pauseSong(previousPlayingSong);
    }
}

