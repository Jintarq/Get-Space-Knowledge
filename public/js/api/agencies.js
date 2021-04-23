const agencies = document.querySelector(".agencies");
const agenciesList = document.querySelector(".agencies-list");
const agenciesList2 = document.querySelector("#agencies-list2");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const pageText = document.querySelector(".page");
const agencyTitle = document.getElementById("title-agency");
const searchInput = document.getElementById("search-input");
const search = document.getElementById("search");
const response = document.querySelector(".response");
const clearBtn = document.querySelector(".clear-btn");
let pageNumber = 1;

search.addEventListener("click", () => {
  clearBtn.classList.remove("none");
  agencies.classList.add("none");
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

            div.classList.add("card", "response-card");
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

clearBtn.addEventListener("click", () => {
  response.innerHTML = "";
  clearBtn.classList.add("none");
  agencies.classList.remove("none");
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
