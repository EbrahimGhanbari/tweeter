/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  function createTweetElement(tweetData) {  
  
    const $tweet = 
    $(`
      <article class="article-tweet">
        <div class = "top-pre-tweet">
          <span class="center">
            <img class="avatar" src=${tweetData.user.avatars} > ${tweetData.user.name}
          </span>
          <span class="tweeter-id">
          ${tweetData.user.handle}
          </span>
        </div>
      <div class="article-sec-div">
        <p> ${tweetData.content.text}</p>
      </div>
      <div class="article-third-div">
        <span id="days">
          ${tweetData.created_at}
        </span>
        <span>
          icons here
        </span>
      </div>
      </article>
    `);
  
    return $tweet;
  };
  
  const renderTweets = function(tweets) {

    for (let tweet in tweets) {
      // console.log(tweets[tweet]);
      const $tweeter = createTweetElement(tweets[tweet]);
      $('#tweets-container').prepend($tweeter);
    }

  }
  
  
  renderTweets(data);

})