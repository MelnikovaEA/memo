(function (){

    let cards = [
        {
            name: 'bear',
            img: 'img/bear_up.png',
            id: 1,
        },
        {
            name: 'elephant',
            img: "img/elephant_up.png",
            id: 2,
        },
        {
            name: 'fox',
            img: "img/fox_up.png",
            id: 3,
        },
        {
            name: 'kitten',
            img: "img/kitten-pink_up.png",
            id: 4,
        },
        {
            name: 'piggy',
            img: "img/piggy_up.png",
            id: 5,
        },
        {
            name: 'rabbit',
            img: "img/rabbit_up.png",
            id: 6,
        },
        {
            name: 'rabbit-in-plate',
            img: "img/rabbit-in-plate_up.png",
            id: 7,
        },
        {
            name: 'shark',
            img: "img/shark_up.png",
            id: 8,
        },
        {
            name: 'sheep',
            img: "img/sheep_up.png",
            id: 9,
        },
        {
            name: 'polarbear',
            img: "img/polarbear_up.png",
            id: 10,
        },
        {
            name: 'puppy',
            img: "img/puppy_up.png",
            id: 11,
        },
        {
            name: 'caterpillar',
            img: "img/caterpillar_up.png",
            id: 12,
        },
    ];
    
    let Memory = {
        init: function (cards) {
            this.$game = $('.game');
            this.$modal = $('.modal');
            this.$overlay = $('.modal-overlay');
            this.$restartButton = $('button.restart');
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $('.card');
            this.paused = false;
            this.guess = null;
            this.blinding();
        },

        blinding: function () {
            this.$memoryCards.on('click', this.cardClicked);
            this.$restartButton.on('click', $.proxy(this.reset, this));
        },

        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find('.inside').hasClass('matched') && !$card.find('.inside').hasClass('picked')) {
                $card.find('.inside').addClass('picked');
                if (!_.guess) {
                    _.guess = $(this).attr('data-id');
                } else if (_.guess == $(this).attr('data-id') && !$(this).hasClass('picked')) {
                    $('.picked').addClass('matched');
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $('.picked').removeClass('picked');
                        Memory.paused = false;
                    }, 600);
                }
                if ($('.matched').length == $('.card').length) {
                    _.win();
                }
            }
        },

        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },

        showModal: function () {
            this.$overlay.show();
            this.$modal.fadeIn('slow');
        },

        hideModal: function () {
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function () {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show('slow');
        },

        shuffle: function (array) {
            let counter = array.length, temp, index;
            while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function () {
            var frag = '';
            this.$cards.each(function (k, v) {
                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
			<div class="front"><img src="' + v.img + '"\
			alt="' + v.name + '" /></div>\
			<div class="back"><img src="img/backside.png"\
			alt="backside" /></div></div>\
			</div>';
            });
            return frag
        }
    };

    Memory.init(cards);
})();

