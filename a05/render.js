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
export const renderHeroCard = function (hero) {
    var date = getFormattedDate(hero.firstSeen);
    let heroCard = document.createElement('div');
    heroCard.classList.add("column", "is-one-quarter");
    heroCard.id = hero.id;
    heroCard.innerHTML = `
    <div class="card">
        <div class="card-image" style="background-color: ${hero.backgroundColor}">
            <figure style="text-align: center">
                <img src="${hero.img}" alt="Hero" />
            </figure>
            <p class="title is-3" style="text-align: center">
                <span class="is-family-monospace" style="color:${hero.color}">${hero.name}</span>
            </p>
        </div>
        <div class="card-content" style="background-color: lightgray">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5 is-family-monospace" style="text-align: center">"${hero.subtitle}"</p>
                    <p style="color: black"><span class="has-text-weight-bold">Alter Ego:</span> ${hero.first} ${hero.last}</p>
                    <p style="color: black"><span class="has-text-weight-bold">First Appearance:</span> ${date}</p>
                </div>
            </div>
            <div class="content">
                ${hero.description}
            </div>
        </div>
        <footer class="card-footer">
            <button id="edit" class="button is-danger is-outlined is-rounded" >Edit</button>
        </footer>
    </div>`;
    return heroCard;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    var date = getFormattedEditDate(hero.firstSeen);
    let editForm = document.createElement('div');
    editForm.classList.add("column", "is-one-quarter");
    editForm.id = hero.id;
    editForm.innerHTML = `
        <div class="card">
            <div class="card-image" style="background-color: ${hero.backgroundColor}">
                <figure style="text-align: center">
                    <img src="${hero.img}" alt="Hero" />
                </figure>
            </div>


            <form class="card-content" style="background-color: lightgray">
                <div class="field">
                    <label class="label">Hero Name</label>
                    <div class="control">
                        <input class="input" type="text" value="${hero.name}" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input class="input" type="text" value="${hero.first}" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input class="input" type="text" value="${hero.last}" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Subtitle</label>
                    <div class="control">
                        <input class="input" type="text" value="${hero.subtitle}" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">First Date Seen</label>
                    <div class="control">
                        <input class="input" type="date" value="${date}" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea">${hero.description}</textarea>
                    </div>
                </div>

                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button id="submit" type="submit" class="button is-danger">Save</button>
                    </div>
                    <div class="control">
                        <button id="cancel" type="cancel" class="button is-light">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;
    return editForm;

};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let currentCard = event.currentTarget.parentNode.parentNode.parentNode;
    let foundHero = heroicData.filter(hero => hero.id === +currentCard.id).shift();
    let currentCardParent = currentCard.parentNode;
    let newEditForm = renderHeroEditForm(foundHero);
    newEditForm.id = currentCard.id;
    currentCardParent.replaceChild(newEditForm, currentCard);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let currentForm = event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode;
    let foundHero = heroicData.filter(hero => hero.id === +currentForm.id).shift();
    let currentFormParent = currentForm.parentNode;
    let newCard = renderHeroCard(foundHero);
    newCard.id = currentForm.id;
    currentFormParent.replaceChild(newCard, currentForm);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    let currentForm = event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode;
    let foundHero = heroicData.filter(hero => hero.id === +currentForm.id).shift();
    let currentFormParent = currentForm.parentNode;
    let heroIndex = heroicData.findIndex((obj => obj.id == currentForm.id));

    let nameValue = document.getElementsByClassName("input")[0].value;
    foundHero.name = nameValue;
    heroicData[heroIndex].name = nameValue;

    let firstValue = document.getElementsByClassName("input")[1].value;
    foundHero.first = firstValue;
    heroicData[heroIndex].first = firstValue;

    let lastValue = document.getElementsByClassName("input")[2].value;
    foundHero.last = lastValue;
    heroicData[heroIndex].last = lastValue;

    let subtitleValue = document.getElementsByClassName("input")[3].value;
    foundHero.subtitle = subtitleValue;
    heroicData[heroIndex].subtitle = subtitleValue;

    let dateValue = document.getElementsByClassName("input")[4].value;
    let year = Number(dateValue.substring(0,4));
    let month = Number(dateValue.substring(5, 7));
    month = month - 1;
    dateValue = new Date(year, month);
    foundHero.firstSeen = dateValue;
    heroicData[heroIndex].firstSeen = dateValue;

    let descriptionValue = document.getElementsByClassName("textarea")[0].value;
    foundHero.description = descriptionValue;
    heroicData[heroIndex].description = descriptionValue;


    let newCard = renderHeroCard(foundHero);
    newCard.id = currentForm.id;
    currentFormParent.replaceChild(newCard, currentForm);
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    let heroesRendered = document.createElement('div');
    heroesRendered.classList.add("columns", "is-multiline")
    for (var i = 0; i < heroes.length; i++) {
        heroesRendered.append(renderHeroCard(heroes[i]));
    }
    $root.append(heroesRendered);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on('click', '#edit', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', '#submit', handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', '#cancel', handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
};

function getFormattedEditDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
};