$(document).ready(function() {
  var puzzle = {
    cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10],
    init: function() {
      this.shuffle();
    },
    shuffle: function() {
      var random = 0;
      var temp = 0;
      //iterate over, kick out random number, set it equal to random
      //then will point to random index number, swap it out
      //store current index number into this.cards and set it into temp variable
      //then set this.current to random and then random back to temp
      for (i = 1; i < puzzle.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = puzzle.cards[i];
        puzzle.cards[i] = puzzle.cards[random];
        puzzle.cards[random] = temp;
      }
      puzzle.assignCards();
      console.log('Shuffled Card Array: ' + puzzle.cards);
    },
    assignCards: function() {
      //needs to be shuffled, then assigned
      //pass in index number of each card, for first card it will look for first element in array
      //assign a data-card-value attribute equal to this.cards of that index
      $('.card').each(function(index) {
        $(this).attr('data-card-value', puzzle.cards[index]);
      });
      //dont want to click before it is assinged/shuffled
      puzzle.clickHandlers();
    },
    clickHandlers: function() {
      $('.card').on('click', function() {
        //set html equal to a pargraph tag
        $(this).html('<p>'+ $(this).data('cardValue')+'</p>').addClass('selected');
      });
    },
    checkMatch: function() {
      //how many cards have been selected
      //if 2 items have been selected we need to check the 2
      if($('.selected').length == 2) {
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          
        }
      }
    },
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        $('.container').html('<h1>You Won!</h1>');
      }
    }
  };
  puzzle.init();
});
