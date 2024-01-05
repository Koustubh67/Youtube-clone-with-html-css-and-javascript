const videoContainer = document.querySelector(".video-container");

let api_key ="AIzaSyCwRxPLKjCJaTUyB_sC596NFGA7MKQPTBA";//later we get this 
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxresults: 50,
    regionCode: 'IN',
})).then(res => res.json())
.then(data => {
    data.items.forEach(items =>{
        getChannelIcon(items)

    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelID

    })).then(res => res.json())
    .then(data =>{
        video_data.channelThumbnail = data.items[0].snippet.thumbnail.default.url;
        makeVideoCard(video_data);
    })
}
const makeVideoCard = (data) =>{
    videoContainer.innerHTML += `
    <div class ="video" onclick= "location.href  = 'https://youtube.com/watch?v=$(data.id)'">
       < img src = "${data.propertyName}" class = "thumbnail" alt="">
          <div class ="content">
          <img src = "$(data.channelThumbnail)" class = "channel-icon" alt="">
        <div class ="info">
         <h4 class = "tittle"> $(data.snippet.tittle) </h4>
         <p class = "channel-name> $(data.sinppet.channelTittle) </p> 
         </div>
         <p class = "makeVideoCard">$(data.sinppet.channelTittle) </p>

     </div>
</div>
    `
        
  

    
}
///search logic /
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search.btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click",()=>{
    if(searchInput.Value.length){
        location.href = searchLink + searchInput.value;
    }
})
//"$(data.snippet.thumbnail.high.url)" 
// $(data.channelThumbnail)"