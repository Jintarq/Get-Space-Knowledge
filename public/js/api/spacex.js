const historicalfactsDiv = document.querySelector(".historical-facts");

console.log(historicalfactsDiv);
fetch("https://api.spacexdata.com/v4/history")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      // Create the main div which represents a grid for an info
      const card = document.createElement("div");
      const cardFooter = document.createElement("div");
      const cardHeader = document.createElement("div");
      const cardBody = document.createElement("card-body");
      const cardTitle = document.createElement("h5");
      const cardText = document.createElement("p");
      const cardheaderTabs = document.createElement("ul");
      const navItem1 = document.createElement("li");
      const navItem3 = document.createElement("li");
      const navLink1 = document.createElement("a");
      const navLink3 = document.createElement("a");
      const date = document.createElement("a");
      // Add class to each HTML element (Bootstrap classes)
      card.classList.add("card", "text-center", "card-facts", "border-2");
      cardFooter.classList.add("card-footer");
      cardHeader.classList.add("card-header");
      cardheaderTabs.classList.add("nav", "nav-tabs", "card-header-tabs");
      date.classList.add("text-muted");
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
        navItem2.appendChild(navLink2);
        cardheaderTabs.appendChild(navItem2);
      }
      navLink1.innerHTML = "Article";
      navLink3.innerHTML = "Wikipedia";
      cardTitle.innerHTML = data[i].title;
      cardText.innerHTML = data[i].details;
      navLink1.href = data[i].links.article;
      navLink3.href = data[i].links.wikipedia;
      // Format the date to a more readable date
      const newdate = data[i].event_date_utc;
      // We split the year-month-day from the hour-minute-second part
      const dateFormated = newdate.split("T");
      date.innerHTML = dateFormated[0];

      // Append each HTML element to his respective parent
      // Here is the main card div
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
