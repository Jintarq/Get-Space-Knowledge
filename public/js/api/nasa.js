const divtest = document.querySelector(".divtest");
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1;
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
const cardImg = document.querySelector(".card-img");

newdate = year + "-" + month + "-" + day;
fetch(
  `https://api.nasa.gov/planetary/apod?api_key=5GG7sTiEUFHDGgZSjrOrUHlj7fVmeIuJiuGccl70&date=${newdate}`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.media_type == "image") {
      const img = document.createElement("img");
      img.classList.add("apod-img");
      cardImg.appendChild(img);
      img.src = data.hdurl;
    }
    if (data.media_type == "video") {
      const video = document.createElement("iframe");
      video.classList.add("apod-img");
      video.src = data.url;
      cardImg.appendChild(video);
    }
    const title = document.querySelector(".title");
    const descripton = document.querySelector(".description");
    const date = document.querySelector(".date");
    console.log(data);

    title.innerHTML = data.title;
    descripton.innerHTML = data.explanation;
    date.innerHTML = data.date;
  });
