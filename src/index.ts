import { Movie } from "../script/model";
import { Runtime } from "../script/model";
import { Population } from "../script/model";
import { Flags } from "../script/model";
const style = require("./style.css");

const APIKey: number = 29629339;
const movieInput: Element | null = document.querySelector(".movieInput");
const searchButton: Element | null = document.querySelector(".searchButton");
const currencyAndFlag: Element | null =
  document.querySelector(".currencyAndFlag");
const movieTittle: Element | null = document.querySelector(".movieTittle");
const yearsAgo: Element | null = document.querySelector(".yearsAgo");
const actingField: Element | null = document.querySelector(".actingField");
const currencyAndFlagDiv: Element | null = document.querySelector(
  ".currencyAndFlagDiv"
);
const mainDiv: HTMLElement | null = document.querySelector(".mainDiv");

// this is creating a listener on click event and gets movie according our input value
searchButton?.addEventListener("click", function () {
  return getData((movieInput as HTMLInputElement).value);
});
movieInput?.addEventListener("keypress", function (e): void {
  let keyboardEvent = <KeyboardEvent>e;
  if (keyboardEvent.keyCode == 13) {
    return getData((movieInput as HTMLInputElement).value);
  }
});

// this function hadles specified movie data from using fetch
function getData(movieName: string) {
  fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=${APIKey}`)
    .then((data) => data.json())
    .then(displayResult);
}

// this function iterates data to html
function displayResult(movie: Movie) {
  const now = new Date();
  // creates array of countries and gets specified country where the movie was made
  const countryArr: Array<string> = [];
  movie.Country.split(",").forEach((x: string) => countryArr.push(x.trim()));
  for (let i = 0; i < countryArr.length; i++) {
    fetch(`https://restcountries.com/v3.1/name/${countryArr[i]}?fullText=true`)
      .then((data) => data.json())
      .then(currencyAndFlags)
      .catch(error);

    if (currencyAndFlagDiv != null) {
      currencyAndFlagDiv.innerHTML = "";
    }
  }

  // the code below filters fullnames and gets only first names of actors and actresses
  let nameArr: Array<string> = [];
  movie.Actors.split(",").forEach((x: string) => {
    let newArr = x.trim().substring(0, x.trim().indexOf(" "));
    nameArr.push(newArr);
  });
  const joinedNames: string = nameArr.join(", ");

  // iteration in HTML
  if (mainDiv != null) {
    mainDiv.style.cssText = `background: url(${movie.Poster} );background-repeat: no-repeat; background-size:100%`;
  }
  movieTittle ? (movieTittle.innerHTML = `Title: ${movie.Title}`) : null;
  yearsAgo
    ? (yearsAgo.innerHTML = `Released: ${
        now.getFullYear() - movie.Year.slice(-4)
      } years ago`)
    : null;
  actingField ? (actingField.innerHTML = `Actors: ${joinedNames}`) : null;
}

// this function merges several information from countries API and inserts in HTML element
function currencyAndFlags(x: Array<Flags>) {
  currencyAndFlagDiv
    ? (currencyAndFlagDiv.innerHTML +=
        `<div>${x[0].name.common}: ${Object.keys(x[0].currencies)}<img src='${
          x[0].flags.svg
        }' width=20 height=20/></div>,&nbsp&nbsp` || `Country: Old Country<br>`)
    : null;
}

function error() {
  currencyAndFlagDiv
    ? (currencyAndFlagDiv.innerHTML += `Country: Old Country`)
    : null;
}

// assignment 2
const resultSummerButton: Element | null =
  document.querySelector(".inputSummer");
const firstInput: Element | null = document.querySelector(".firstInput");
const secondInput: Element | null = document.querySelector(".secondInput");
const thirdInput: Element | null = document.querySelector(".thirdInput");
const getRuntime: Element | null = document.querySelector(".getRuntime");
const getPopulation: Element | null = document.querySelector(".getPopulation");

// adds click event on button for all input and redefines empty array
resultSummerButton?.addEventListener("click", function () {
  getResult(
    (firstInput as HTMLInputElement).value,
    (secondInput as HTMLInputElement).value,
    (thirdInput as HTMLInputElement).value
  );
  popArr = [];
  newArr2 = [];
});

// this function makes loop in fetch and takes data from each movie
function getResult(first: string, second: string, third: string) {
  const newArr: Array<string> = [];
  newArr.push(first, second, third);
  newArr.forEach((inputNames) => {
    fetch(`http://www.omdbapi.com/?t=${inputNames}&apikey=${APIKey}`)
      .then((data) => data.json())
      .then(displaySumResult);
  });
}

let newArr2: Array<number> = [];
// this function sums length of all movies
function displaySumResult(name: Runtime) {
  const runtime = +name.Runtime.split(" ")[0];
  newArr2.push(runtime);
  const newArr3 = newArr2.reduce((a, b) => a + b, 0);
  getRuntime ? (getRuntime.innerHTML = `Length: ${newArr3} minutes`) : null;
  console.log(newArr3);

  // this function takes all country data from API within forEach loop
  const populationArr: Array<string> = [];
  name.Country.split(",").forEach((x) => populationArr.push(x.trim()));
  populationArr.forEach((populationn: string) => {
    fetch(`https://restcountries.com/v3.1/name/${populationn}?fullText=true`)
      .then((data) => data.json())
      .then(getPopulations)
      .catch(popError);
  });
}
function popError() {
  getPopulation ? (getPopulation.innerHTML = `Old Country`) : null;
}
// gets movie data and adds last iteration to HTML
let popArr: Array<number> = [];
function getPopulations(countryName: Array<Population>) {
  popArr.push(countryName[0].population);
  const newPopArr = popArr.reduce((a, b) => a + b, 0);
  if (getPopulation != null) {
    getPopulation.innerHTML = `Population: ${newPopArr}`;
  }
}

// promise pollyfill
// const p1 = Promise.resolve(3);
// const p2 = 1000;
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("hey");
//   }, 2000);
// });

// function myPromise(...a) {
//   const promiseResults = [];
//   return new Promise((resolve, reject) => {
//     a.forEach((value, index) => {
//       Promise.resolve(value)
//         .then((res) => {
//           promiseResults[index] = res;
//           if (promiseResults.length === a.length) {
//             resolve(promiseResults);
//           }
//         })
//         .catch((err) => reject(err));
//     });
//   });
// }

// console.log(myPromise(p1, p2, p3).then((value) => console.log(value)));
