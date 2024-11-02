// main.js

import { Pokemon } from './Pokemon.js';
import { pokemons } from './pokemons.js';

class Game {
    constructor() {
        this.character = null;
        this.enemy = null;
        this.init();
    }

    init() {
        this.startGame();
        this.setButtonHandlers();
    }

    setButtonHandlers() {
        const kickButton = document.getElementById("btn-kick");
        const specialButton = document.getElementById("btn-special");

        const newKickButton = kickButton.cloneNode(true);
        const newSpecialButton = specialButton.cloneNode(true);

        kickButton.parentNode.replaceChild(newKickButton, kickButton);
        specialButton.parentNode.replaceChild(newSpecialButton, specialButton);

        this.kickButtonCounter = this.createClickCounter(6);
        this.specialButtonCounter = this.createClickCounter(6);

        newKickButton.addEventListener("click", () => {
            this.kickButtonCounter("Thunder Jolt", () => {
                this.character.attack(this.enemy, 10);
                this.checkGameOver();
                this.enemyAttack();
            });
        });
    
        newSpecialButton.addEventListener("click", () => {
            this.specialButtonCounter("Special Attack", () => {
                this.character.specialAttack(this.enemy, 20);
                this.checkGameOver();
                this.enemyAttack();
            });
        });
    }
    

    enemyAttack() {
        this.enemy.enemyAttack(this.character);
        this.checkGameOver();
    }

    checkGameOver() {
        if (this.character.health <= 0) {
            alert("Гру завершено! Ви програли!");
            this.restartGame();
        } else if (this.enemy.health <= 0) {
            alert("Вітаємо! Ви перемогли!");
            this.restartGame();
        }
    }

    restartGame() {
        this.character = null;
        this.enemy = null;
        document.getElementById("logs").innerHTML = "";
        document.getElementById("debug-logs").innerHTML = "";

        this.startGame();
        this.setButtonHandlers();
    }

    startGame() {
        this.character = this.getRandomPokemon(false);
        this.enemy = this.getRandomPokemon(true);
        this.updatePokemonDisplay(this.character, 'character');
        this.updatePokemonDisplay(this.enemy, 'enemy');
    }

    getRandomPokemon(isEnemy) {
        const randomIndex = Math.floor(Math.random() * pokemons.length);
        const pokemonData = pokemons[randomIndex];
        const prefix = isEnemy ? 'enemy' : 'character';

        return new Pokemon(
            pokemonData.name,
            1,
            pokemonData.hp,
            `progressbar-${prefix}`,
            `health-${prefix}`,
            pokemonData.attacks
        );
    }

    updatePokemonDisplay(pokemon, type) {
        const nameElement = document.getElementById(`name-${type}`);
        const imgElement = document.querySelector(`.${type} .sprite`);

        nameElement.textContent = pokemon.name;
        imgElement.src = pokemon.img;
    }

    createClickCounter(limit) {
        let count = 0;

        return function(buttonName, action) {
            if (count < limit) {
                count++;
                const message = `Кнопку '${buttonName}' натиснуто ${count} раз(ів). Залишилось: ${limit - count} натискань.`;
                this.logDebug(message);
                action();
            } else {
                const message = `Кнопка '${buttonName}' досягла ліміту у ${limit} натискань.`;
                this.logDebug(message);
            }
        }.bind(this);
    }

    logDebug(message) {
        const debugLogs = document.getElementById("debug-logs");
        const debugEntry = document.createElement("div");
        debugEntry.textContent = message;
        debugLogs.prepend(debugEntry);
    }
}

const game = new Game();
