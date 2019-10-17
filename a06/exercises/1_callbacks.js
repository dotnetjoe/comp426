import { heroData } from "./data";

/**
 * This function searches an array of heroes to find one with a particular id.
 *   By itself, this is an easy task. However, we're going to pretend that the
 *   search operation takes 1.5 seconds to complete and is asynchronous. That
 *   means the getHeroByIdCallback() function should NOT return the correct hero
 *   right away. Instead, it should pretend to be an asynchronous operation
 *   implemented with callbacks. Use the setTimeout() function to wait 1.5
 *   seconds (1500 ms) and then execute the callback function, passing in the
 *   correct hero as a parameter.
 *
 * @param {Array} heroData  The array of hero data to search. For us, this will
 *                          simply be the imported `heroData` from above.
 * @param {Number} id  The id of the hero to find
 * @param {Function} callback  The callback function that should be executed
 *                             after 1.5 seconds, passing back the result of the
 *                             "asynchronous" search operation (aka the hero
 *                             with the correct id)
 * @returns  This function need not return anything
 */
export function getHeroByIdCallback(heroData, id, callback) {
  var thisHero;

  // Find the hero with the given id.
  heroData.forEach( a => {
    if(a.id == id){
        thisHero = a;
    }
  });
  
  // Wait 1.5 seconds (See SetTimeout on the writeup) and use the callback function
  // First param is the hero.
  setTimeout(() => {
    callback(thisHero);
  }, 1500);
}

// Below is code to help you get the right solution.
getHeroByIdCallback(heroData, 2, (hero) => {
    console.log(`Found the hero with id ${hero.id}`, hero);
});