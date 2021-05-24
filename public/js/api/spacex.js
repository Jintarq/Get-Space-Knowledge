const historicalfactsDiv = document.querySelector(".historical-facts");

fetch("https://api.spacexdata.com/v4/rockets")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (let y = 0; y < data.length; y++) {
      const dataSection = document.querySelector(".data-section");
      const contentRocket = document.querySelector(".content-rocket");
      const rocket = document.createElement("div");
      rocket.classList.add("rocket");
      const rocketPresentation = document.createElement("div");
      rocketPresentation.classList.add("rocket-presentation");
      const rocketFacts = document.createElement("div");
      rocketFacts.classList.add("rocket-facts");
      const footer = document.createElement("div");
      footer.classList.add("footer");
      contentRocket.classList.add("content-rocket");
      const rocketName = document.createElement("h1");
      rocketName.classList.add("rocket-name");
      const rocketImg = document.createElement("img");
      rocketImg.classList.add("rocket-img");
      const mainInformations = document.createElement("a");
      mainInformations.classList.add("main-informations");
      const descriptionRocket = document.createElement("p");
      descriptionRocket.classList.add("description-rocket", "text-white");
      const facts = document.createElement("a");
      const footerText = document.createElement("a");
      footerText.classList.add("footer-text", "wiki");
      footerText.textContent = "Get more informations here";
      footerText.href = data[y].wikipedia;
      const wikipedia = document.createElement("img");
      wikipedia.src = "../../src/icons8-wikipedia.svg";
      wikipedia.classList.add("wikipedia-img");
      facts.classList.add("facts", "text-white");
      rocketName.textContent = data[y].name;
      rocketImg.src = data[y].flickr_images[0];
      mainInformations.textContent = `Developped by ${data[y].company} in ${data[y].country}.`;
      descriptionRocket.textContent = data[y].description;

      if (data[y].success_rate_pct !== 0) {
        facts.textContent = `First flight : ${data[y].first_flight}. Rocket measure : ${data[y].height.meters} meters (${data[y].height.feet} feet).
      Mass : ${data[y].mass.kg} kg (${data[y].mass.lb} lb). Diameter around : ${data[y].diameter.meters} meters (${data[y].diameter.feet} feet).
       Cost per launch : ${data[y].cost_per_launch} $. Estimated success rate : ${data[y].success_rate_pct}% `;
      } else {
        facts.textContent = `First flight : ${data[y].first_flight}. Rocket measure : ${data[y].height.meters} meters (${data[y].height.feet} feet).
    Mass : ${data[y].mass.kg} kg (${data[y].mass.lb} lb). Diameter around : ${data[y].diameter.meters} meters (${data[y].diameter.feet} feet).
     Cost per launch : ${data[y].cost_per_launch} $. `;
      }
      footer.appendChild(wikipedia);
      footer.appendChild(footerText);
      rocketFacts.appendChild(facts);
      rocketPresentation.appendChild(rocketName);
      rocketPresentation.appendChild(rocketImg);
      rocketPresentation.appendChild(mainInformations);
      rocketPresentation.appendChild(descriptionRocket);
      rocket.appendChild(rocketPresentation);
      rocket.appendChild(rocketFacts);
      rocket.appendChild(footer);
      contentRocket.appendChild(rocket);
    }
  });

fetch("https://api.spacexdata.com/v3/history")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      // Create the main div which represents a grid for an info
      const card = document.createElement("div");
      const cardFooter = document.createElement("div");
      const cardHeader = document.createElement("div");
      const cardBody = document.createElement("div");
      const cardTitle = document.createElement("h5");
      const cardText = document.createElement("p");
      const cardheaderTabs = document.createElement("ul");
      const navItem1 = document.createElement("li");
      const navItem3 = document.createElement("li");
      const navLink1 = document.createElement("a");
      const navLink3 = document.createElement("a");
      const articleImg = document.createElement("img");
      const redditImg = document.createElement("img");
      const wikipediaImg = document.createElement("img");
      const date = document.createElement("a");
      // Add class to each HTML element (Bootstrap classes)
      card.classList.add("card", "text-center", "card-facts", "border-2");
      cardFooter.classList.add("card-footer");
      cardHeader.classList.add("card-header");
      cardheaderTabs.classList.add("nav", "nav-tabs", "card-header-tabs");
      date.classList.add("text-muted");
      articleImg.classList.add("article-img");
      redditImg.classList.add("reddit-img");
      wikipediaImg.classList.add("wikipedia-img");
      navItem1.classList.add("nav-item");
      navItem3.classList.add("nav-item");
      navLink1.classList.add("nav-link");
      navLink3.classList.add("nav-link");
      cardBody.classList.add("card-body");
      cardTitle.classList.add("card-title", "card-facts-title");
      cardText.classList.add("card-text");
      // Some articles are too old to have a reddit page, so we check if there is one for each of them
      if (data[i].links.reddit !== null) {
        const navItem2 = document.createElement("li");
        const navLink2 = document.createElement("a");
        navItem2.classList.add("nav-item");
        navLink2.classList.add("nav-link");
        navLink2.innerHTML = "Reddit";
        navLink2.href = data[i].links.reddit;
        redditImg.src = "../../src/icons8-reddit.svg";
        navItem2.appendChild(redditImg);
        navItem2.appendChild(navLink2);
        cardheaderTabs.appendChild(navItem2);
      }
      navLink1.innerHTML = "Article";
      navLink3.innerHTML = "Wikipedia";
      articleImg.src = "../../src/icons8-news.svg";
      wikipediaImg.src = "../../src/icons8-wikipedia.svg";
      cardTitle.innerHTML = data[i].title;
      cardText.innerHTML = data[i].details;
      navLink1.href = data[i].links.article;
      navLink3.href = data[i].links.wikipedia;
      // Format the date to a more readable date
      const newdate = data[i].event_date_utc;
      // We split the year-month-day from the hour-minute-second part
      const dateFormated = newdate.split("T");
      date.innerHTML = dateFormated[0];
      // If the description of a news is too long, cut him at limit and replace it by "knowMore".
      const limit = 300;
      const knowMore = document.createElement("span");
      const reduceText = document.createElement("span");
      knowMore.innerText = "... Click to know more";
      knowMore.classList.add("text-details");
      reduceText.innerText = "Click to reduce";
      reduceText.classList.add("text-details");
      const actualText = cardText.innerText;
      if (actualText.length > 300) {
        cardText.innerText = actualText.substring(0, limit);
        cardText.appendChild(knowMore);
        knowMore.addEventListener("click", () => {
          // data[i].details remove knowMore, so we just need to append the reduceText element.
          cardText.innerText = data[i].details;
          cardText.appendChild(reduceText);
        });
        // When we click on reduceText, it reinitialized the former cardText element.
        reduceText.addEventListener("click", () => {
          cardText.innerText = actualText.substring(0, limit);
          cardText.appendChild(knowMore);
        });
      }

      // Append each HTML element to his respective parent
      // Here is the main card div
      navItem1.appendChild(articleImg);
      navItem3.appendChild(wikipediaImg);
      navItem1.appendChild(navLink1);
      navItem3.appendChild(navLink3);
      cardheaderTabs.appendChild(navItem1);
      cardheaderTabs.appendChild(navItem3);
      cardHeader.appendChild(cardheaderTabs);

      // Here is the card-body div
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardFooter.appendChild(date);
      historicalfactsDiv.appendChild(card);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);
    }
  });
