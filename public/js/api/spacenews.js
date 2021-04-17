const newArticle = document.querySelector(".new-article");
const blogSection = document.querySelector(".blog-section");

fetch("https://test.spaceflightnewsapi.net/api/v2/articles")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      // Create the main div which represents a grid for an info
      const card = document.createElement("div");
      const cardHeader = document.createElement("div");
      const cardFooter = document.createElement("div");
      const cardBody = document.createElement("card-body");
      const cardTitle = document.createElement("h5");
      const cardImg = document.createElement("img");
      const cardText = document.createElement("p");
      const cardheaderTabs = document.createElement("ul");
      const navItem1 = document.createElement("li");
      const navLink1 = document.createElement("a");
      const date = document.createElement("a");
      // Add class to each HTML element (Bootstrap classes)
      card.classList.add("card", "text-center", "card-facts", "border-2");
      cardFooter.classList.add("card-footer");

      cardHeader.classList.add("card-header");
      cardheaderTabs.classList.add("nav", "nav-tabs", "card-header-tabs");
      date.classList.add("text-muted");
      navItem1.classList.add("nav-item");
      navLink1.classList.add("nav-link");
      cardBody.classList.add("card-body");
      cardImg.classList.add("card-img-articles");
      cardTitle.classList.add("card-title", "card-facts-title");
      cardText.classList.add("card-text");
      // Fill the elements of their data
      cardImg.src = data[i].imageUrl;
      navLink1.innerHTML = "Article";
      cardTitle.innerHTML = data[i].title;
      cardText.innerHTML = data[i].summary;
      navLink1.href = data[i].url;
      // Format the date to a more readable date
      const newdate = data[i].publishedAt;
      // We split the year-month-day from the hour-minute-second part
      const dateFormated = newdate.split("T");
      date.innerHTML = dateFormated[0];

      // Append each HTML element to his respective parent
      // Here is the main card div
      navItem1.appendChild(navLink1);
      cardheaderTabs.appendChild(navItem1);
      cardHeader.appendChild(cardheaderTabs);

      // Here is the card-body div
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardImg);
      cardBody.appendChild(cardText);
      cardFooter.appendChild(date);
      newArticle.appendChild(card);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);
    }
  });

fetch("https://test.spaceflightnewsapi.net/api/v2/blogs?_limit=850")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      if (data[i].summary !== "") {
        // Create the main div which represents a grid for an info
        const card = document.createElement("div");
        const cardHeader = document.createElement("div");
        const cardFooter = document.createElement("div");
        const cardBody = document.createElement("card-body");
        const cardTitle = document.createElement("h5");
        const cardImg = document.createElement("img");
        const cardText = document.createElement("p");
        const cardheaderTabs = document.createElement("ul");
        const navItem1 = document.createElement("li");
        const navLink1 = document.createElement("a");
        const date = document.createElement("a");
        // Add class to each HTML element (Bootstrap classes)
        card.classList.add("card", "text-center", "card-facts", "border-2");
        cardFooter.classList.add("card-footer");

        cardHeader.classList.add("card-header");
        cardheaderTabs.classList.add("nav", "nav-tabs", "card-header-tabs");
        date.classList.add("text-muted");
        navItem1.classList.add("nav-item");
        navLink1.classList.add("nav-link");
        cardBody.classList.add("card-body");
        cardImg.classList.add("card-img-articles");
        cardTitle.classList.add("card-title", "card-facts-title");
        cardText.classList.add("card-text");

        cardImg.src = data[i].imageUrl;
        navLink1.innerHTML = "Article";
        cardTitle.innerHTML = data[i].title;
        cardText.innerHTML = data[i].summary;
        navLink1.href = data[i].url;
        // Format the date to a more readable date
        const newdate = data[i].publishedAt;
        // We split the year-month-day from the hour-minute-second part
        const dateFormated = newdate.split("T");
        date.innerHTML = dateFormated[0];

        // Append each HTML element to his respective parent
        // Here is the main card div
        navItem1.appendChild(navLink1);
        cardheaderTabs.appendChild(navItem1);
        cardHeader.appendChild(cardheaderTabs);

        // Here is the card-body div
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardImg);
        cardBody.appendChild(cardText);
        cardFooter.appendChild(date);
        blogSection.appendChild(card);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
      }
    }
  });
