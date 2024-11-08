export class Pokemon {
    constructor(name, level, maxHealth, progressBarId, healthTextId, attacks) {
        this.name = name;
        this.level = level;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.progressBar = document.getElementById(progressBarId);
        this.healthText = document.getElementById(healthTextId);
        this.attacks = attacks;
    }

    attack(target) {
        const damage = this.calculateDamage();
        target.takeDamage(damage);
        this.logAction(`${this.name} атакує та завдає ${damage} пошкоджень ${target.name}! ${target.name} має ${target.health} HP залишилося.`);
    }

    specialAttack(target) {
        const damage = this.calculateDamage(true);
        target.takeDamage(damage);
        this.logAction(`${this.name} використовує Special Attack і завдає ${damage} пошкоджень ${target.name}! ${target.name} має ${target.health} HP залишилося.`);
    }

    calculateDamage(isSpecial = false) {
        const attack = isSpecial ? this.attacks[1] : this.attacks[0];
        return Math.floor(Math.random() * (attack.maxDamage - attack.minDamage + 1)) + attack.minDamage;
    }

    enemyAttack(target) {
        if (this.attacks.length === 0) {
            console.error(`${this.name} не має доступних атак!`);
            return;
        }
        this.attack(target);
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        this.updateHealth();
    }

    updateHealth() {
        if (!this.progressBar || !this.healthText) {
            console.error(`Не вдалося оновити здоров'я для ${this.name}. Елементи не знайдено.`);
            return;
        }
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.progressBar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }

    logAction(message) {
        const logEntry = document.createElement("div");
        logEntry.textContent = message;
        const logs = document.getElementById("logs");
        logs.prepend(logEntry);
    }
}
