$( document ).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
        <p> ${escape(tweetData.content.text)}</p>
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
  };

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      $('#tweets-container').empty();
      renderTweets(data);
    });
  };

  //load the tweets here
  loadTweets();



  //validation section

 // this part resposible for getting data from text input
 
 $( ".button" ).on('click', function( event ) {

  const $button = $(this);
  const $form = $button.closest('form');
  const $counter = $form.find('.counter');
  counter = Number($counter.val());
  
  if (counter < 0) {
    $( ".warning-message" ).slideDown( "slow", function() {
      // Animation complete.
    });
    return;
  } else if (counter === 140) {
    alert("Invalid tweet, you need to enter something");
    return;
  }

});

  // this part resposible for getting data from text input
  $( "form" ).submit(function( event ) {

    
    event.preventDefault();
    const url = "/tweets/";
    $.ajax({
      type: "POST",
      url: url,
      data: $("form").serialize(),
      success: function(data)
      {
        loadTweets();
      }
    });

  });

}); //end of define query fun

