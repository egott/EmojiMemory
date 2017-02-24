$(document).ready(function() {
  var cards = {'1a': '😎', '1b': '😎', '2a':'👽', '2b': '👽', '3a': '👻', '3b': '👻', '4a': '😜', '4b': '😜', '5a': '😈', '5b': '😈', '6a': '🦄', '6b': '🦄', '7a': '🙈', '7b': '🙈', '8a': '🍭', '8b': '🍭', '9a': '💖', '9b': '💖', '10a': '🐣', '10b':'🐣' }
  var card_keys = Object.values(cards);
  var puzzle = {
    card_keys: card_keys,
    init: function() {
      $('.play-again-button').hide();
      puzzle.shuffle();
    },
    shuffle: function() {
      var random = 0;
      var temp = 0;
      //iterate over, kick out random number, set it equal to random
      //then will point to random index number, swap it out
      //store current index number into this.cards and set it into temp variable
      //then set this.current to random and then random back to temp
      for (i = 1; i < card_keys.length; i++) {
        random = Math.round(Math.random() * i);
        temp = puzzle.card_keys[i];
        console.log(temp)
        puzzle.card_keys[i] = puzzle.card_keys[random];
        puzzle.card_keys[random] = temp;
      }
      puzzle.assignCards();
      console.log('Shuffled Card Array: ' + puzzle.card_keys);
    },
    assignCards: function() {
      //needs to be shuffled, then assigned
      //pass in index number of each card, for first card it will look for first element in array
      //assign a data-card-value attribute equal to this.cards of that index
      $('.card').each(function(index) {
        $(this).attr('data-card-value', puzzle.card_keys[index]);
      });
      //dont want to click before it is assinged/shuffled
      puzzle.clickHandlers();
    },
    clickHandlers: function() {
      $('.card').on('click', function() {
        $(this).html('<div class="emoji-box"><p class="emoji">' + $(this).data('cardValue') + '</p></div>').addClass('selected');
        puzzle.checkMatch();
      });
    },
    checkMatch: function() {
      //how many cards have been selected
      //if 2 items have been selected we need to check the 2
      if ($('.selected').length === 2) {
        //if the 2 items match change the opacity to 0 (they look gone)
        //if not remove the selected class
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).animate({
              opacity: 0
              //set all cards to unmatched to count and see how many are left
              //when all classes are left you will see there are no unmatched cards left
            }).removeClass('unmatched');
          });
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          puzzle.checkWin();
        } else {
          //wait one second before it turns back over
          //flip the cards over
          //remove class
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).html('').removeClass('selected');
            });
          }, 1000);
        }
      }
    },
    checkWin: function() {
      //if the unmatched class length is 0, there are no more cards
      //append to container you won
      if ($('.unmatched').length === 0) {
        $('.container').html('<h1 class="winner">You Won!</h1>');
        $('.play-again-button').toggle();
      }
    }
  };
  puzzle.init();
});
