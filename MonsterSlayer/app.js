new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        turns: []
    },
    computed: {
        playerHealthStyle() {
            return {
                width: this.playerHealth + '%'
            }
        },
        monterHealthStyle() {
            return {
                width: this.monsterHealth + '%'
            }
        }
    },
    methods: {
        startTheGame() {
            this.gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        endTheGame() {
            this.gameRunning = false;
        },
        attack() {
            var damage = this.calculateDamage(3, 10);
            this.turns.unshift({ 
                isPlayer: true,
                message: 'Player hits Monster for ' + damage
             });
            this.monsterHealth -= damage;
            if(!this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack() {
            var damage = this.calculateDamage(10, 20)
            this.turns.unshift({ 
                isPlayer: true,
                message: 'Player hits Monster for ' + damage
             });
            this.monsterHealth -= damage;
            if(!this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({ 
                    isPlayer: true,
                    message: 'Player heals for ' + 10
                 });
            }

            this.monsterAttacks();
        },
        calculateDamage(min, max) {
            return damage = Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttacks() {
            var damage = this.calculateDamage(5, 12)
            this.turns.unshift({ 
                isPlayer: false,
                message: 'Monster hits Player for ' + damage
             });
            this.playerHealth -= damage;
            this.checkWin();
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startTheGame();
                } else {
                    this.gameRunning = false;
                }
                return false;
            } else if (this.playerHealth <= 0){
                if (confirm('You lost! New Game?')) {
                    this.startTheGame();
                } else {
                    this.gameRunning = false;
                }
                return false;
            }

            return true;
        }
    }
});
