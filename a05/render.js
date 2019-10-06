/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */


/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    return `
    <div id="${hero.id}" class="heroes" style = "color:${hero.color}; background-color:${hero.backgroundColor};">
        <img class="image" src="${hero.img}">
        <h1 class="heroname">Hero Name: ${hero.name}</h1>
        <h2 class="name">Normie Name: ${hero.first} ${hero.last}</h2>
        <p class="description"> Descritpion: ${hero.description}<p>
        <span class="first sceen"> First Comic: ${hero.firstSeen}<span>
        <button type ="button" class ="button" style = "border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">Edit</Button>
    </div>
    `;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    return `
    <form id="form">
        <label class="label">Name</label>
        <input name= name type="text"value ="${hero.name}"></input>
            
        <label class="label">First Name</label>
        <input name=first type="text" value="${hero.first}"></input>
            
        <label class="label">Last Name</label>
        <input name=last type="text"value ="${hero.last}"></input>

        <label class="label">Description</label>
        <textarea name="description">${hero.description}</textarea>

        <label class="label">First Seen</label>
        <input type="text" value ="${hero.firstSeen}" name="firstSeen"></input>
            
        <label class="label">Last Seen</label>
            <button id="${hero.id}" class ="cancel" style = "border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">Cancel </Button>
            <button type ="submit" class ="button" style = "border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">Save </Button>  
        
        <p id ="workaround">${hero.id}</p>
    </form>
    `
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    const $root = $('#root');
    let hero = heroicData.filter( a => a.id == event.id)[0];

    $(`#${hero.id}`).remove();
    $root.append(renderHeroEditForm(hero));
};


/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    const $root = $('#root');
    let thisHero= heroicData.filter(a => a.id == event.id)[0];

    $(`#form`).remove();
    $root.append(renderHeroCard(thisHero));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    const $root = $('#root');
    var thisHero;
    let thisId = parseInt(document.getElementById('workaround').innerHTML);
    let form = $('#form').serializeArray();
    var newDate = new Date(form[4].value)
    newDate = new Date(newDate.getFullYear(), newDate.getMonth())
    heroicData.forEach( a => {
        if(a.id == thisId){
            a.name = form[0].value;
            a.first = form[1].value;
            a.last = form[2].value;
            a.description = form[3].value;
            a.firstSeen = newDate;
            thisHero = a;
        }
    });
    $('#form').remove();
    $root.append(renderHeroCard(thisHero))
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    $('body').addClass('has-background-info');

    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    let heroArray = $('<div class="columns is-multiline is-centered is-mobile" />');
    for (let i = 0; i < heroes.length; i++) {
        heroArray.append(renderHeroCard(heroes[i]));
    }

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    $root.addClass('container hero-body').append(heroArray);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $(document).on('click', '.heroes', function(){  
        handleEditButtonPress(this)
    });

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $(document).on('submit', '#form', function(){
        handleEditFormSubmit(this)     
    });

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $(document).on('click', '.cancel', function(){
        handleCancelButtonPress(this);
    });
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
