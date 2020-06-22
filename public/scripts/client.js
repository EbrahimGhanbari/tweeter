$( document ).ready(function() {

  //this us a scape function to make sure 
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //this func convert date in milli second to lapsed data

  const dateConverter = function(dateMilliseconds) {
    const today = new Date();
    const todayMilliseconds = today.getTime(); 
    const timeDifference = Math.trunc((todayMilliseconds - dateMilliseconds) / 86400000);

    if (timeDifference < 1) {
      return "Today";
    } else if (timeDifference < 30) {
      return `${timeDifference} days ago`;
    } else if (timeDifference < 60) {
      return `1 month ago`;
    } else if (timeDifference < 365) {
      const month = Math.trunc(timeDifference / 30);
      return `${month} months ago`;
    } else if (timeDifference < 730) {
      return `1 year ago`;
    }

    const year = Math.trunc(timeDifference / 365);
    return `${year} years ago`;
  };
  
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
          ${dateConverter(tweetData.created_at)}
        </span>
        <span id="icons">
          <img  src="https://img.icons8.com/pastel-glyph/64/000000/facebook-like.png"/>
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

  // this part resposible for getting data from text input
  $( "form" ).submit(function( event ) {
    event.preventDefault();
    const $form = $("form");
    const $counter = $form.find('.counter');
    counter = Number($counter.val());
  
  if (counter < 0) {
    $("#long-tweet").slideDown( "slow", function(){});
    return;
  } else if (counter === 140) {
    $("#empty-tweet").slideDown( "slow", function(){});
    return;
  }

    
    const url = "/tweets/";
    $.ajax({
      type: "POST",
      url: url,
      data: $("form").serialize(),
      success: function(data)
      {
        $("#long-tweet").empty();
        $("#empty-tweet").empty();
        loadTweets();
      }
    });

  });

}); //end of define query fun

