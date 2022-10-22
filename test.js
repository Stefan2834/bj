var playerCard = document.getElementById("playerCard");
var playerTotal = document.getElementById("playerTotal");
var dealerCard = document.getElementById("dealerCard");
var dealerTotal = document.getElementById("dealerTotal");
var statusBox = document.getElementById("statusBox");
var hitBtn = document.getElementById("hit");
var standBtn = document.getElementById("stand");
var doubleBtn = document.getElementById("double");
var insuranceNo = document.getElementById("insuranceNo");
var insuranceYes = document.getElementById("insuranceYes");
var player1;
var player2;
var acePlayer;
var aceDealer;
var sum;
var dealerSum;
var game;
var x = 0;
btnBlock();
insuranceYes.disabled = true;
insuranceNo.disabled = true;
class BlackJack {
    constructor(playerFirst,playerSecond,dealerFirst,dealerSecond = 0) {
        this.player1 = playerFirst;
        this.player2 = playerSecond;
        this.dealer1 = dealerFirst;
        this.dealer2 = dealerSecond;
        this.totalCard = 53;
        this.sum = sum;
    }
    generator() {
        this.totalCard -= 1;
        this.player = Math.floor(Math.random() * this.totalCard);
        this.delete = game.splice(this.player, 1);
        return this.delete[0];
    }
    player() {
        return this.player1[0] + ' and ' + this.player2[0];
    }
    totalPlayer() {
        return this.player1[1] +  this.player2[1];
    }
    dealer() {
        if(this.dealer2[0] === undefined) {
            this.dealer2 = '-';
        }
        return this.dealer1[0] + ' and ' + this.dealer2[0];
    } 
    totalDealer() {
        return this.dealer1[1];
    }
    insurance() {
        btnBlock();
        insuranceNo.disabled = false;
        insuranceYes.disabled = false;
    }
    status(sum) {
        sum;
        if(sum > 21) {
            btnBlock();
            return 'Bust!';
        } else if (sum === 21) {
            btnBlock();
            stand();
        } else {
            return '';
        }
    }
    dealerStatus(sum,dealerSum) {
        btnBlock();
        if(dealerSum > 21) {
            return 'Dealer Bust';
        } else if(dealerSum === sum) {
            return 'Draw';
        } else if(dealerSum < sum) {
            return 'You win';
        } else if(dealerSum > sum) {
            return 'You lose';
        }
    }
    aceCounter(number) {
        if(number[0].includes('As')) {
            return 1;
        }
    }
    acePlayer() {
        if(acePlayer > 0){
            while(sum > 21) {
                sum -= 10;
                acePlayer -= 1;
                if(acePlayer === 0) {
                    break;
                }
            }
        }
        return sum;
    }
    aceDealer() {
        if(aceDealer === 0){
            while(dealerSum > 21) {
                dealerSum -= 10;
                acePlayer -= 1;
                if(acePlayer === 0) {
                    break;
                }
            }
        }
        return dealerSum
    }
}

function newGame () {
    btnUnblock();
    insuranceNo.disabled = true;
    insuranceYes.disabled = true;
    game = [
        ['As&spades;', 11], ['As&hearts;', 11],
        ['2&spades;', 2], ['2&hearts;', 2],
        ['3&spades;', 3], ['3&hearts;', 3],
        ['4&spades;', 4], ['4&hearts;', 4],
        ['5&spades;', 5], ['5&hearts;', 5],
        ['6&spades;', 6],['6&hearts;', 6],
        ['7&spades;', 7], ['7&hearts;', 7],
        ['8&spades;', 8], ['8&hearts;', 8],
        ['9&spades;', 9], ['9&hearts;', 9],
        ['10&spades;', 10], ['10&hearts;', 10],
        ['J&spades;', 10], ['J&hearts;', 10],
        ['Q&spades;', 10], ['Q&hearts;', 10],
        ['K&spades;', 10], ['K&hearts;', 10],
        ['As&clubs;', 11], ['As&diams;', 11],
        ['2&clubs;', 2], ['2&diams;', 2],
        ['3&clubs;', 3], ['3&diams;', 3],
        ['4&clubs;', 4], ['4&diams;', 4],
        ['5&clubs;', 5], ['5&diams;', 5],
        ['6&clubs;', 6], ['6&diams;',6],
        ['7&clubs;', 7], ['7&diams;', 7],
        ['8&clubs;', 8], ['8&diams;', 8],
        ['9&clubs;', 9], ['9&diams;', 9],
        ['10&clubs;', 10], ['10&diams;', 10],
        ['J&clubs;', 10], ['J&diams;', 10],
        ['Q&clubs;', 10], ['Q&diams;', 10],
        ['K&clubs;', 10], ['K&diams;', 10]
    ] 
    aceDealer = 0;
    acePlayer = 0;
    let newBlackjack = new BlackJack();
    player1 = newBlackjack.generator();
    player2 = newBlackjack.generator();
    dealer1 = newBlackjack.generator();
    dealer2 = newBlackjack.generator();
    newBlackjack = new BlackJack(player1, player2, dealer1);
    playerCard.innerHTML = newBlackjack.player();
    sum = newBlackjack.totalPlayer();
    counter();
    playerTotal.innerHTML = newBlackjack.acePlayer();
    dealerCard.innerHTML = newBlackjack.dealer();
    dealerSum = newBlackjack.totalDealer();
    dealerTotal.innerHTML = newBlackjack.aceDealer();
    statusBox.innerHTML = '';
    if(dealer1[0].includes('As')) {
        new BlackJack(player1,player2,dealer1,dealer2).insurance();
    } else if(sum === 21) {
        let newBlackjack = new BlackJack(player1,player2,dealer1, dealer2);
        dealerCard.innerHTML = newBlackjack.dealer();
        dealerSum += dealer2[1];
        btnBlock();
        dealerTotal.innerHTML = dealerSum;
        if(dealerSum === sum) {
            statusBox.innerHTML = 'Draw';
        } else if(dealer1[1] !== 11 && dealer2 !== 11) {
            statusBox.innerHTML = 'You have BlackJack'
        } 
    } else if(dealer1[0] === 10 && dealer2[0] === 11) {
        let newBlackjack = new BlackJack(player1,player2,dealer1, dealer2);
        dealerCard.innerHTML = newBlackjack.dealer();
        dealerSum += dealer2[1];
        dealerTotal.innerHTML = dealerSum;
        btnBlock();
        statusBox.innerHTML = 'Dealer has BlackJack';
    }
}


function hit() {
    let newBlackJack = new BlackJack();
    let hit = newBlackJack.generator();
    if(hit.includes('As')) {
        acePlayer += 1;
    }
    playerCard.innerHTML += ' and ' + hit[0];
    sum += hit[1];
    playerTotal.innerHTML = sum;
    if(acePlayer !== 0 ) {
        if(sum > 21) {
            while(acePlayer > 0) {
                acePlayer -= 1;
                sum -= 10;
                playerTotal.innerHTML = sum;
            }
            if(acePlayer === 0) {
                return;
            }
        }
    }
    statusBox.innerHTML = newBlackJack.status(sum);
}
function stand() {
    let newBlackjack = new BlackJack(player1,player2, dealer1, dealer2);
    dealerCard.innerHTML = newBlackjack.dealer();
    dealerSum += dealer2[1];
    if(aceDealer === 2) {
        dealerSum -= 10;
        aceDealer -= 1;
    }
    dealerTotal.innerHTML = dealerSum;
    while(dealerSum < 17) {
        let newBlackjack = new BlackJack(player1,player2, dealer1, dealer2);
        let gen = newBlackjack.generator();
        if(gen[0].includes("As")) {
            aceDealer += 1;
        }
        dealerSum += gen[1];
        dealerCard.innerHTML += ' and ' + gen[0];
        while(dealerSum > 21) {
            while(aceDealer > 0) {
                console.log(aceDealer);
                dealerSum -= 10;
                aceDealer -= 1;
                dealerTotal.innerHTML = sum;
                dealerTotal.innerHTML = dealerSum;
            }
        }
    }
    dealerTotal.innerHTML = dealerSum;
    statusBox.innerHTML = newBlackjack.dealerStatus(sum,dealerSum);
}
function btnBlock () {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    doubleBtn.disabled = true;
}
function btnUnblock () {
    hitBtn.disabled = false;
    standBtn.disabled = false;
    doubleBtn.disabled = false; 
}
function ins () {
    if(dealer2[1] === 10) {
        if(sum !== 21) {
            statusBox.innerHTML = 'Dealer has BlackJack';
        } else if(sum === 21) {
            statusBox.innerHTML = 'Draw';
        }
        let newBlackJack = new BlackJack(player1,player2,dealer1,dealer2)
        dealerCard.innerHTML = newBlackJack.dealer();
        dealerSum += dealer2[1];
        dealerTotal.innerHTML = dealerSum; 
        btnBlock();
    } else if(sum === 21){
        btnBlock();
        statusBox.innerHTML = 'You have BlackJack';
        let newBlackJack = new BlackJack(player1,player2,dealer1,dealer2);
        dealerCard.innerHTML = newBlackJack.dealer();
    } else{
        statusBox.innerHTML = 'Dealer don\' Have BlackJack';
        btnUnblock();
    }
    insuranceNo.disabled = true;
    insuranceYes.disabled = true;
}

function counter () {
    if(player1[0].includes('As')) {
        acePlayer += 1;
    } if(player2[0].includes('As')) {
        acePlayer += 1;
    } if(dealer1[0].includes('As')) {
        aceDealer += 1;
    } if(dealer2[0].includes('As')) {
        aceDealer += 1;
    }
}
function double () {
    btnBlock();
    hit();
    if(sum < 22) {
        stand();
    } 
}