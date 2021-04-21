const newArticle = document.querySelector(".new-article");
const blogSection = document.querySelector(".blog-section");
const agenciesList = document.querySelector(".agencies-list");
const getmoreArticles = document.querySelector(".get-more-articles");
const getmoreBlogs = document.querySelector(".get-more-blogs");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const pageText = document.querySelector(".page");
const agencyTitle = document.querySelector("#title-agency");
let limitArticles = 12;
let startArticles = limitArticles;
let limitBlogs = 12;
let startBlogs = limitArticles;
let pageNumber = 1;

fetch(`https://lldev.thespacedevs.com/2.0.0/agencies/?limit=200`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    pageText.innerText = `Page ${pageNumber}`;

    if (pageNumber == 1) {
      console.log(data);
      prevBtn.classList.add("none");

      for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i].abbrev);

        if (data.results[i].abbrev == "" || data.results[i].abbrev == null) {
          const agency = document.createElement("li");
          agency.classList.add("agency", "text-white");
          agency.innerText = `${data.results[i].name}`;
          agenciesList.appendChild(agency);
        } else {
          const agency = document.createElement("li");
          agency.classList.add("agency", "text-white");
          agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
          agenciesList.appendChild(agency);
        }
      }
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
            pageText.innerText = `Pages ${pageNumber}`;
            for (let i = 0; i < data.results.length; i++) {
              if (
                data.results[i].abbrev == "" ||
                data.results[i].abbrev == null
              ) {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].name}`;
                agenciesList.appendChild(agency);
              } else {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
                agenciesList.appendChild(agency);
              }
            }
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
            pageText.innerText = `Pages ${pageNumber}`;
            for (let i = 0; i < data.results.length; i++) {
              if (
                data.results[i].abbrev == "" ||
                data.results[i].abbrev == null
              ) {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].name}`;
                agenciesList.appendChild(agency);
              } else {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
                agenciesList.appendChild(agency);
              }
            }
          });
      }
    });
    prevBtn.addEventListener("click", () => {
      agencyTitle.scrollIntoView();
      pageNumber--;
      if (pageNumber == 1) {
        console.log(data);
        prevBtn.classList.add("none");

        for (let i = 0; i < data.results.length; i++) {
          console.log(data.results[i].abbrev);

          if (data.results[i].abbrev == "" || data.results[i].abbrev == null) {
            const agency = document.createElement("li");
            agency.classList.add("agency", "text-white");
            agency.innerText = `${data.results[i].name}`;
            agenciesList.appendChild(agency);
          } else {
            const agency = document.createElement("li");
            agency.classList.add("agency", "text-white");
            agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
            agenciesList.appendChild(agency);
          }
        }
      } else if (pageNumber == 2) {
        return fetch(data.next)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            nextBtn.classList.remove("none");
            agenciesList.innerHTML = "";
            pageText.innerText = `Pages ${pageNumber}`;
            for (let i = 0; i < data.results.length; i++) {
              if (
                data.results[i].abbrev == "" ||
                data.results[i].abbrev == null
              ) {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].name}`;
                agenciesList.appendChild(agency);
              } else {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
                agenciesList.appendChild(agency);
              }
            }
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
            pageText.innerText = `Pages ${pageNumber}`;
            for (let i = 0; i < data.results.length; i++) {
              if (
                data.results[i].abbrev == "" ||
                data.results[i].abbrev == null
              ) {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].name}`;
                agenciesList.appendChild(agency);
              } else {
                const agency = document.createElement("li");
                agency.classList.add("agency", "text-white");
                agency.innerText = `${data.results[i].abbrev} - ${data.results[i].name}`;
                agenciesList.appendChild(agency);
              }
            }
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
        const articleImg = document.createElement("img");
        articleImg.classList.add("article-img");
        articleImg.src = "../../src/icons8-news.svg";
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
                articleImg.classList.add("article-img");
                articleImg.src = "../../src/icons8-news.svg";
                const navItem1 = document.createElement("li");
                const navLink1 = document.createElement("a");
                const date = document.createElement("a");
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
