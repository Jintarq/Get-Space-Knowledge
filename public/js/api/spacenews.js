const newArticle = document.querySelector(".new-article");
const blogSection = document.querySelector(".blog-section");
const agenciesList = document.querySelector(".agencies-list");
const getmoreArticles = document.querySelector(".get-more-articles");
const getmoreBlogs = document.querySelector(".get-more-blogs");
const agencies = document.querySelector(".agencies");
const agenciesList2 = document.querySelector("#agencies-list2");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const pageText = document.querySelector(".page");
const agencyTitle = document.getElementById("title-agency");
const searchInput = document.getElementById("search-input");
const search = document.getElementById("search");
const response = document.querySelector(".response");
console.log(searchInput);
let limitArticles = 12;
let startArticles = limitArticles;
let limitBlogs = 12;
let startBlogs = limitArticles;
let pageNumber = 1;

function getinputValue() {
  const enteredWord = document.getElementById("search-input").value;
  if (enteredWord.includes(" ")) {
    enteredWord.replace(/\s/g, "");
  }
}
search.addEventListener("click", () => {
  const enteredWord = document.getElementById("search-input").value;
  if (enteredWord !== null || enteredWord !== "") {
    fetch(
      `https://lldev.thespacedevs.com/2.0.0/agencies/?search=${enteredWord}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.results);

        if (data.results.length > 1) {
          for (let i = 0; i < data.results.length; i++) {
            const div = document.createElement("div");
            const cardImg = document.createElement("img");
            const cardBody = document.createElement("div");
            const name = document.createElement("p");
            const countryCode = document.createElement("p");
            const administrator = document.createElement("p");
            const type = document.createElement("p");
            const foundingYears = document.createElement("p");
            const description = document.createElement("p");
            const spacecraft = document.createElement("p");
            const launchers = document.createElement("p");

            div.classList.add("card");
            cardImg.classList.add("card-img-top", "response-img");
            cardBody.classList.add("card-body");
            cardImg.src = data.results[i].image_url;
            name.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
            countryCode.innerText = `From ${data.results[i].country_code}.`;
            administrator.innerText = data.results[i].administrator;
            type.innerText = `Type: ${data.results[i].type}`;
            foundingYears.innerText = `Was founded in: ${data.results[i].founding_year}`;
            description.innerText = data.results[i].description;
            spacecraft.innerText = `Spacecraft: ${data.results[i].spacecraft}`;
            launchers.innerText = `Launchers: ${data.results[i].launchers}`;
            cardBody.appendChild(name);
            cardBody.appendChild(countryCode);
            cardBody.appendChild(administrator);
            cardBody.appendChild(type);
            cardBody.appendChild(foundingYears);
            cardBody.appendChild(description);
            cardBody.appendChild(spacecraft);
            cardBody.appendChild(launchers);
            div.appendChild(cardImg);
            div.appendChild(cardBody);
            response.appendChild(div);
          }
        } else {
          const div = document.createElement("div");
          const cardImg = document.createElement("img");
          const cardBody = document.createElement("div");
          const name = document.createElement("p");
          const countryCode = document.createElement("p");
          const administrator = document.createElement("p");
          const type = document.createElement("p");
          const foundingYears = document.createElement("p");
          const description = document.createElement("p");
          const spacecraft = document.createElement("p");
          const launchers = document.createElement("p");

          div.classList.add("card");
          cardImg.classList.add("card-img-top", "response-img");
          cardBody.classList.add("card-body");
          cardImg.src = data.results[0].image_url;
          name.innerText = `${data.results[0].abbrev} - ${data.results[0].name}`;
          countryCode.innerText = `From ${data.results[0].country_code}.`;
          administrator.innerText = data.results[0].administrator;
          type.innerText = `Type: ${data.results[0].type}`;
          foundingYears.innerText = `Was founded in: ${data.results[0].founding_year}`;
          description.innerText = data.results[0].description;
          spacecraft.innerText = `Spacecraft: ${data.results[0].spacecraft}`;
          launchers.innerText = `Launchers: ${data.results[0].launchers}`;
          cardBody.appendChild(name);
          cardBody.appendChild(countryCode);
          cardBody.appendChild(administrator);
          cardBody.appendChild(type);
          cardBody.appendChild(foundingYears);
          cardBody.appendChild(description);
          cardBody.appendChild(spacecraft);
          cardBody.appendChild(launchers);
          div.appendChild(cardImg);
          div.appendChild(cardBody);
          response.appendChild(div);
        }
      });
  }
});

fetch(`https://lldev.thespacedevs.com/2.0.0/agencies/?limit=200`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    function createLi(data) {
      for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i].abbrev);

        if (data.results[i].abbrev == "" || data.results[i].abbrev == null) {
          if (agenciesList.childNodes.length <= 50) {
            const agency = document.createElement("li");
            agency.classList.add("agency", "text-white");
            agency.innerText = `${data.results[i].name}`;
            agenciesList.appendChild(agency);
          } else {
            const agency = document.createElement("li");
            agency.classList.add("agency", "text-white");
            agency.innerText = `${data.results[i].name}`;
            agenciesList2.appendChild(agency);
          }
        } else {
          if (agenciesList.childNodes.length <= 50) {
            const agency = document.createElement("li");
            agency.classList.add("agency", "text-white");
            agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
            agenciesList.appendChild(agency);
          } else {
            const agency = document.createElement("li");
            agency.classList.add("agency", "text-white");
            agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
            agenciesList2.appendChild(agency);
          }
        }
      }
    }
    pageText.innerText = `Page ${pageNumber}`;

    if (pageNumber == 1) {
      console.log(data);
      prevBtn.classList.add("none");
      createLi(data);
    }
    nextBtn.addEventListener("click", () => {
      pageNumber++;
      agencyTitle.scrollIntoView();
      if (pageNumber == 2) {
        return fetch(data.next)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            prevBtn.classList.remove("none");
            agenciesList.innerHTML = "";
            agenciesList2.innerHTML = "";

            pageText.innerText = `Page ${pageNumber}`;
            createLi(data);
          });
      } else if (pageNumber == 3) {
        nextBtn.classList.add("none");
        return fetch(data.next)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return fetch(data.next);
          })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            prevBtn.classList.remove("none");
            agenciesList.innerHTML = "";
            agenciesList2.innerHTML = "";

            pageText.innerText = `Page ${pageNumber}`;
            createLi(data);
          });
      }
    });
    prevBtn.addEventListener("click", () => {
      agencyTitle.scrollIntoView();
      pageNumber--;
      pageText.innerText = `Page ${pageNumber}`;
      if (pageNumber == 1) {
        console.log(data);
        prevBtn.classList.add("none");
        agenciesList.innerHTML = "";
        agenciesList2.innerHTML = "";

        createLi(data);
      } else if (pageNumber == 2) {
        return fetch(data.next)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            nextBtn.classList.remove("none");
            prevBtn.classList.remove("none");
            agenciesList.innerHTML = "";
            agenciesList2.innerHTML = "";

            createLi(data);
          });
      } else if (pageNumber == 3) {
        nextBtn.classList.add("none");
        return fetch(data.next)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return fetch(data.next);
          })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            prevBtn.classList.remove("none");
            agenciesList.innerHTML = "";
            agenciesList2.innerHTML = "";
            pageText.innerText = `Page ${pageNumber}`;
            createLi(data);
          });
      }
    });
  });

fetch(
  `https://spaceflightnewsapi.net/api/v2/articles?_limit=${limitArticles}&=nasa`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
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
      const articleImg = document.createElement("img");
      const date = document.createElement("a");
      // Add class to each HTML element (Bootstrap classes)
      card.classList.add("card", "text-center", "card-facts", "border-2");
      cardFooter.classList.add("card-footer");
      articleImg.classList.add("article-img");

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
      articleImg.src = "../../src/icons8-news.svg";
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
      navItem1.appendChild(articleImg);
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

    getmoreArticles.addEventListener("click", () => {
      limitArticles += 1;
      startArticles += limitArticles;
      fetch(
        `https://spaceflightnewsapi.net/api/v2/articles?_start=${startArticles}&_limit=${limitArticles}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
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
            const articleImg = document.createElement("img");

            // Add class to each HTML element (Bootstrap classes)
            card.classList.add("card", "text-center", "card-facts", "border-2");
            cardFooter.classList.add("card-footer");
            articleImg.classList.add("article-img");

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
            articleImg.src = "../../src/icons8-news.svg";
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
            navItem1.appendChild(articleImg);
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
    });
  });

fetch(`https://spaceflightnewsapi.net/api/v2/blogs?_limit=${limitBlogs}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
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
        const articleImg = document.createElement("img");
        articleImg.classList.add("article-img");
        articleImg.src = "../../src/icons8-news.svg";
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
        navItem1.appendChild(articleImg);
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
      getmoreBlogs.addEventListener("click", () => {
        limitBlogs += 1;
        startBlogs += limitArticles;

        fetch(
          `https://spaceflightnewsapi.net/api/v2/blogs?_limit=${limitBlogs}&_start=${startBlogs}`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
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
                const articleImg = document.createElement("img");

                const navItem1 = document.createElement("li");
                const navLink1 = document.createElement("a");
                const date = document.createElement("a");
                articleImg.classList.add("article-img");
                articleImg.src = "../../src/icons8-news.svg";
                // Add class to each HTML element (Bootstrap classes)
                card.classList.add(
                  "card",
                  "text-center",
                  "card-facts",
                  "border-2"
                );
                cardFooter.classList.add("card-footer");
                cardHeader.classList.add("card-header");
                cardheaderTabs.classList.add(
                  "nav",
                  "nav-tabs",
                  "card-header-tabs"
                );
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
                navItem1.appendChild(articleImg);
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
              // getmoreArticles.addEventListener("click", () => {
              //   limitBlogs += 1;
              //   startBlogs += limitArticles;
              // });
            }
          });
      });
    }
  });
