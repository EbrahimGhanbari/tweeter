$(function () {
  $(".form__textarea").on('keyup', function() {
    const $textArea = $(this);
    const $form = $textArea.closest('form');
    const $counter = $form.find('.counter');

    const length = $textArea.val().length;

    if (140 - length < 0) {
      $counter.addClass("invalid-counter");
    } else {
      $counter.removeClass("invalid-counter");
    }
    $counter.html(140 - length);
       });
  })

