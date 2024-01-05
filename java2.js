const videoContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCwRxPLKjCJaTUyB_sC596NFGA7MKQPTBA"; // Replace with your actual API key
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
       <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
          <div class="content">
          <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        <div class="info">
         <h4 class="title">${data.snippet.title}</h4>
         <p class="channel-name">${data.snippet.channelTitle}</p> 
         </div>
     </div>
</div>
    `;
};

// Search logic
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search.btn");

searchBtn.addEventListener("click", () => {
    if (searchInput.value.length > 0) {
      location.href = `${searchLink}${encodeURIComponent(searchInput.value)}`;
    }
  });
//searchBtn.addEventListener("click", () => {
 // if (searchInput.value.length) {
  //  location.href = searchLink + searchInput.value;
//  }
//});
