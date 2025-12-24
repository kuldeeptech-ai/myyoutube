// 🔴 PUT YOUR YOUTUBE DATA API KEY HERE
const API_KEY = "AIzaSyAk-wgMeuum8pQVhhOTwv2j1lAMe0LcFy8";

let player;

/* INIT YOUTUBE PLAYER */
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1
    }
  });
}

/* SEARCH FUNCTION */
function search() {
  const q = document.getElementById("searchInput").value.trim();
  if (!q) return;

  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
      q
    )}&key=${API_KEY}`
  )
    .then(res => res.json())
    .then(data => renderResults(data.items));
}

/* SHOW RESULTS */
function renderResults(items) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  items.forEach(v => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${v.snippet.thumbnails.medium.url}">
      <span>${v.snippet.title}</span>
    `;
    card.onclick = () => player.loadVideoById(v.id.videoId);
    results.appendChild(card);
  });
}

/* DARK / LIGHT TOGGLE */
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}
