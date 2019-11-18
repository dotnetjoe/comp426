function birdhouse() {
    return $(`
    <div id="root">
        <section id="header"> 
            <div><i class="fab fa-twitter"></i> Twitter 426</div>
            <div class="buttons has-addons is-centered">
                <button class="refresh_button button is-small is-light is-info is-outlined is-rounded">  Refresh  </button>
                <button class="makeNewPost_button button is-small is-light is-info is-outlined is-right is-rounded"> New Tweet </button>
            </div>
        </section>
        <br>
        <section id="main_board">
            <div id="tweet_board">
            <div>
        </section>
    </div>
    `);
}

async function loadTimeline() {
    const tweets = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });

    for(let i = 0; i < 50; i++) {
        let tweet = tweets.data[i];
        $('#tweet_board').append(tweetWidget(tweet));
    }
}

export const tweetWidget = function(tweet){
    const tweet_widget = $(`
        <div class="tweet_widget" id="${tweet.id}">
        </div>
    `);

    tweet_widget.append(timeline(tweet));
    return tweet_widget;
}

export const timeline = function(tweet) {
    const new_time = new Date(tweet.updatedAt).toLocaleTimeString("en-US") +"   " +new Date(tweet.updatedAt).toLocaleDateString("en-US");
    const interact_widget = $(`
        <div tweetId="${tweet.id}">
            <div class="user_name">${tweet.author}</div>
            <br>
            <div>${tweet.body}</div>
            <br>
            <p class="new_time">${new_time}</p>
        </div>`
    );
    
    if(tweet.isMine) {
        interact_widget.append($(`<button class="delete_button button is-small is-rounded is-light is-danger">Delete</button>`));
        interact_widget.append($(`<button class="edit_button button is-small is-rounded is-light is-info">Edit</button>`));
    } else {
        if(tweet.isLiked) {
            interact_widget.append($(`
                <button class="unlike_button button is-small is-rounded is-light is-warning is-outlined" type="submit">${tweet.likeCount} Likes</button>   
            `));
        } else {
            interact_widget.append($(`
                <button class="like_button button is-small is-rounded is-light is-info is-outlined" type="submit">${tweet.likeCount} Likes</button>
            `));
        }

        interact_widget.append($(`<button class="retweet_button button is-small is-rounded is-outlined is-light is-info">${tweet.retweetCount} Retweets</button>`));
    }
    return interact_widget;
}

export const edit_widget = function(tweet) {
    return $(`
        <div class="edit_form">
            <div class="user_name">${tweet.author}</div>
            <br>
            <form>
                <textarea rows="5" cols="50" id="edit_input_body">${tweet.body}</textarea>
                <footer>
                    <div class="buttons has-addons is-right">
                        <button class="button is-small is-light is-info is-rounded is-outlined" id="edit_submit" tweetId="${tweet.id}" type="submit">Save</button>
                        <button class="button is-small is-light is-info is-rounded is-outlined" id="cancel">Cancel</button>
                    </div>
                </footer>
            </form>
        </div>
    `);
}

export const post_widget = function() {
    return $(`
        <div class="tweet_widget">
            <div class="post_form">
                <div class="user_name">New Post</div>
                <br>
                <form>
                    <textarea rows="5" cols="50" id="post_body" placeholder="What's Happening?"></textarea>              
                    <footer>
                        <div class="buttons has-addons is-right">
                            <button class="button is-small is-rounded is-outlined is-info is-rounded" id="post_submit" type="submit">Tweet</button>
                            <button class="button is-small is-rounded is-outlined is-info is-rounded" id="cancel">Cancel</button>
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    `);
}

export const retweet_widget = function(id) {
    return $(`
        <div class="reweet_form">
            <form>
                <div class="user_name">Retweet</div>
                <br>
                <textarea rows="5" cols="50" id="retweet_input_body" placeholder="Add a comment"></textarea>              
                <footer>
                    <div class="buttons has-addons is-right">
                        <button class="button is-small is-rounded is-light is-info is-outlined" id="retweet_submit" tweetId="${id}" type="submit">Tweet</button>
                        <button class="button is-small is-rounded is-light is-info is-outlined" id="cancel">Cancel</button>
                    </div>
                </footer>
            </form>
        </div>
    `);
}

export const handleLikeButton = async function(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('tweetId');

    const result1 =  await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id+'/like',
        withCredentials: true,
    });
    reloadTimeline();
}

export const handleUnlikeButton = async function(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('tweetId');

    const result =  await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id+'/unlike',
        withCredentials: true,
    });
    reloadTimeline();
}

export const handleRetweetButton = async function(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('tweetId');
    const tweet_widget = $('#'+ id);
    tweet_widget.empty();

    tweet_widget.append(retweet_widget(id));
}

export const handleEditButton = async function(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('tweetId');
    const tweet_widget = $('#'+ id);
    tweet_widget.empty();

    const tweet = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });

    tweet_widget.append(edit_widget(tweet.data));
}

export const handleEditSubmitButton = async function(event) {
    event.preventDefault();
    const id = event.target.getAttribute('tweetId');
    const update_body = $('#edit_input_body').val();

    const update = await axios({
        method: 'put',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
        data: {
            "body": ""+update_body,
        },
    });
    reloadTimeline();
}

export const handleRetweetSubmitButton = async function(event) {
    event.preventDefault();
    const id = event.target.getAttribute('tweetId');
    const update_body = $('#retweet_input_body').val();

    const update = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": ""+id,
            "body": ""+update_body,
        },
    });
    reloadTimeline();
}

export const handleDeleteButton = async function(event) {
    event.preventDefault();
    const id = event.target.parentNode.getAttribute('tweetId');

    const delete_post = await axios({
        method: 'delete',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets/'+id,
        withCredentials: true,
    });
    reloadTimeline();
}

export const handleNewPostButton = function(event) {
    event.preventDefault();
    const tweet_board = $('#tweet_board');
    tweet_board.empty();
    tweet_board.append(post_widget());
}

export const handlePostSubmitButton = async function(event) {
    event.preventDefault();
    const body = $('#post_body').val();
    
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: ""+body,
        }
    });
    reloadTimeline();
}

export const handleRefreshButton = function(event) {
    event.preventDefault();
    reloadTimeline();
}

function reloadTimeline(){
    let tweet_board = $('#tweet_board');
    tweet_board.empty();
    loadTimeline();
}

function initializePage(){
    let body = $('body');
    body.empty();
    body.append(birdhouse());

    loadTimeline();
    
    body.on('click', '.like_button', handleLikeButton);
    body.on('click', '.unlike_button', handleUnlikeButton);
    body.on('click', '.edit_button', handleEditButton);
    body.on('click', '.retweet_button', handleRetweetButton);
    body.on('click', '.delete_button', handleDeleteButton);
    body.on('click', '.makeNewPost_button', handleNewPostButton);
    body.on('click', '.refresh_button', handleRefreshButton);
    body.on('click', '#edit_submit', handleEditSubmitButton);
    body.on('click', '#retweet_submit', handleRetweetSubmitButton);
    body.on('click', '#post_submit', handlePostSubmitButton);
}

$(document).ready(initializePage());