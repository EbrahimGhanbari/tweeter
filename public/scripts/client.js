$( document ).ready(function() {

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
      const $tweeter = createTweetElement(tweets[tweet]);
      $('#tweets-container').prepend($tweeter);
    }

  }

  // this part resposible for getting data from text input
  $( "form" ).submit(function( event ) {
      
    // console.log($(this).serialize());
    event.preventDefault();
  });

  const loadTweets = () => {

    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
    
  };
      
  loadTweets();

}); //end of define query fun

