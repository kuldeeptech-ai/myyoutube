const API_KEY = "AIzaSyAk-wgMeuum8pQVhhOTwv2j1lAMe0LcFy8";
let player;
let nextPageToken = "";
let mode = "home";

/* PLAYER INIT */
function onYouTubeIframeAPIReady(){
  player = new YT.Player("player",{
    height:"360",width:"100%",
    playerVars:{autoplay:0,controls:1}
  });
}

/* LIVE SUGGEST */
function liveSuggest(q){
 if(!q){suggestions.innerHTML="";return;}
 fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${q}&key=${API_KEY}`)
 .then(r=>r.json()).then(d=>{
  suggestions.innerHTML="";
  d.items.forEach(v=>{
   const div=document.createElement("div");
   div.textContent=v.snippet.title;
   div.onclick=()=>play(v.id.videoId);
   suggestions.appendChild(div);
  });
 });
}

/* SEARCH */
function search(){
 mode="search";
 nextPageToken="";
 feed.innerHTML="";
 loadMore();
}

/* LOAD HOME */
function loadHome(){
 mode="home";
 nextPageToken="";
 feed.innerHTML="";
 loadMore();
}

/* LOAD MORE (INFINITE) */
function loadMore(){
 let url;
 if(mode==="home"){
  url=`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&videoCategoryId=10&maxResults=12&pageToken=${nextPageToken}&key=${API_KEY}`;
 }else{
  const q=searchInput.value;
  url=`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${q}&maxResults=12&pageToken=${nextPageToken}&key=${API_KEY}`;
 }
 fetch(url).then(r=>r.json()).then(d=>{
  nextPageToken=d.nextPageToken||"";
  renderFeed(d.items);
 });
}

/* RENDER FEED */
function renderFeed(items){
 items.forEach(v=>{
  const id=v.id.videoId||v.id;
  const c=document.createElement("div");
  c.className="card";
  c.innerHTML=`<img src="${v.snippet.thumbnails.medium.url}">
               <span>${v.snippet.title}</span>`;
  c.onclick=()=>play(id);
  feed.appendChild(c);
 });
}

/* PLAY */
function play(id){
 player.loadVideoById(id);
}

/* INFINITE SCROLL */
window.onscroll=()=>{
 if(window.innerHeight+window.scrollY>=document.body.offsetHeight-200){
  loadMore();
 }
}

/* THEME */
function toggleTheme(){
 document.body.classList.toggle("dark");
 document.body.classList.toggle("light");
}

/* INIT */
loadHome();
