//main.js

import { Pokemon } from './Pokemon.js';
import { pokemons } from './pokemons.js';

class Game {
    constructor() {
        this.character = null;
        this.enemy = null;
        this.kickButtonCounter = this.createClickCounter(6);
        this.specialButtonCounter = this.createClickCounter(6);
        this.init();
    }

    init() {
        this.startGame();
        document.getElementById("btn-kick").addEventListener("click", () => {
            this.kickButtonCounter("Thunder Jolt", () => {
                this.character.attack(this.enemy, 10);
                this.enemyAttack();
            });
        });

        document.getElementById("btn-special").addEventListener("click", () => {
            this.specialButtonCounter("Special Attack", () => {
                this.character.specialAttack(this.enemy, 20);
                this.enemyAttack();
            });
        });
    }

    enemyAttack() {
        this.enemy.enemyAttack(this.character);
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
