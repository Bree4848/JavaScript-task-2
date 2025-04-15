
        const cards = document.querySelectorAll('.card');
        let flippedCards = [];
        let lockBoard = false;

        function flipCard() {
            if (lockBoard) return;
            if (this === flippedCards[0]) return;

            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }

        function checkForMatch() {
            const [card1, card2] = flippedCards;
            const isMatch = card1.dataset.letter === card2.dataset.letter;

            if (isMatch) {
                disableCards();
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            flippedCards.forEach(card => card.removeEventListener('click', flipCard));
            resetBoard();
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.remove('flipped'));
                resetBoard();
            }, 1000);
        }

        function resetBoard() {
            [flippedCards, lockBoard] = [[], false];
        }

        cards.forEach(card => card.addEventListener('click', flipCard));
        function checkWinCondition() {
            const allFlipped = Array.from(cards).every(card => card.classList.contains('flipped'));
            if (allFlipped) {
                setTimeout(() => alert('Congratulations!'), 500);
            }
        }

        cards.forEach(card => card.addEventListener('click', () => {
            checkWinCondition();
        }));