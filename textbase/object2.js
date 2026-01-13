let player = {
    name: "Hero",
    health: 100,
    gold: 15,
    reputation: 0,
    inventory: [],
    hasMap: false,
    betrayed: false,
    permanentScar: false,
    day: 1
};

const textEl = document.getElementById('game-text');
const choiceEl = document.getElementById('choices');
const logEl = document.getElementById('system-log');
const hpEl = document.getElementById('hp');
const goldEl = document.getElementById('gold');
const repEl = document.getElementById('rep');

function updateUI() {
    hpEl.innerText = player.health;
    goldEl.innerText = player.gold;
    repEl.innerText = player.reputation;
}

function writeStory(text) {
    const p = document.createElement('p');
    p.style.marginBottom = "18px";
    p.innerHTML = text;
    textEl.appendChild(p);
    textEl.scrollTop = textEl.scrollHeight;
}

function writeLog(msg) {
    const entry = document.createElement('div');
    entry.className = "log-entry";
    entry.innerText = `> ${msg}`;
    logEl.appendChild(entry);
    logEl.scrollTop = logEl.scrollHeight;
}

function clearChoices() {
    choiceEl.innerHTML = "";
}

function addChoice(text, action) {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.onclick = () => {
        player.day++;
        action();
    };
    choiceEl.appendChild(btn);
}

// --- THE GRIM TALE ---

function startGame() {
    player = { name: "Hero", health: 100, gold: 15, reputation: 0, inventory: [], hasMap: false, betrayed: false, permanentScar: false, day: 1 };
    updateUI();
    textEl.innerHTML = "";
    logEl.innerHTML = "";
    
    writeStory("📖 <b>Prologue: The Shadow of a Good Deed</b>");
    writeStory("Oakhaven was a village of secrets, and tonight, you were about to inherit one. You found an old traveler cornered by thugs. His eyes weren't filled with fear, but with a strange, predatory hunger. You intervened, but the cost was higher than you knew.");
    
    clearChoices();
    addChoice("Defend the old man.", () => {
        player.reputation += 10;
        player.health -= 20;
        player.hasMap = true;
        player.permanentScar = true;
        writeStory("The leader of the thugs slashed your face before fleeing. A <b>Permanent Scar</b> now runs across your eye—a mark of your 'heroism.'");
        writeStory("The traveler handed you a map that felt like human skin. 'The path is yours,' he whispered, laughing in a way that made your blood cold. 'But every path has a toll.'");
        writeLog("Gained the Cursed Map. HP -20. Marked for life.");
        updateUI();
        townGate();
    });

    addChoice("Ignore the pleas.", () => {
        player.betrayed = true; 
        writeStory("You watched them beat him. You felt a twinge of guilt, but it vanished as you realized you saved your own skin. However, as the man limped away, he looked back at you and pointed a gnarled finger. You felt a sudden, sharp pain in your chest.");
        writeLog("The traveler has cursed your name.");
        updateUI();
        townGate();
    });
}

function townGate() {
    clearChoices();
    writeStory("<br>📖 <b>Chapter 1: The Butcher's Gate</b>");
    writeStory("At the Great City, the air smelled of iron and rot. The guard at the gate wasn't looking for coin today; he was looking for 'volunteers' for the border wars.");

    addChoice("Bribe the Guard (10 Gold).", () => {
        if (player.gold >= 10) {
            player.gold -= 10;
            writeStory("The guard took your gold and spat on your boots. 'Lucky bastard. Get in before I change my mind.'");
            writeLog("Gold -10");
            updateUI();
            market();
        } else {
            writeStory("'Too poor for a bribe? Then you're just fodder.' He throws you into the pits.");
            player.health -= 40;
            writeLog("Beaten by guards. HP -40");
            updateUI();
            market();
        }
    });

    if (player.permanentScar) {
        addChoice("Use your 'Warrior's Mark'.", () => {
            writeStory("The guard saw the jagged scar on your face. He stepped back, mistaking it for a veteran's wound. 'A survivor of the northern front? My apologies, sir. Pass through.'");
            writeLog("Your injury became your pass.");
            market();
        });
    }
}

function market() {
    clearChoices();
    writeStory("<br>📖 <b>Chapter 2: The Black Market</b>");
    writeStory("You found a stall hidden in an alley. A merchant was selling a 'Vial of Black Blood' and a 'Serrated Blade.'");
    
    addChoice("Buy Black Blood (5 Gold).", () => {
        if (player.gold >= 5) {
            player.gold -= 5;
            player.inventory.push("Black Blood");
            writeStory("The vial was warm. Drinking it didn't heal you; it made you stop feeling pain entirely. Your eyes turned a deep, inky black.");
            writeLog("Consumed Black Blood. You feel empty.");
            updateUI();
        }
    });

    addChoice("Buy Serrated Blade (10 Gold).", () => {
        if (player.gold >= 10) {
            player.gold -= 10;
            player.inventory.push("Serrated Blade");
            writeStory("This blade wasn't made for honor; it was made to cause suffering. It felt heavy and hungry in your hand.");
            writeLog("Purchased the Serrated Blade.");
            updateUI();
        }
    });

    addChoice("Leave for the Forest.", forest);
}

function forest() {
    clearChoices();
    writeStory("<br>📖 <b>Chapter 3: The Forest of Lost Souls</b>");
    writeStory("The woods were silent. No birds sang. As you walked, you realized the trees were growing in the shape of screaming men. Suddenly, the 'Old Traveler' from the prologue appeared, floating inches above the ground.");
    writeStory("'Did you enjoy my map?' he hissed. 'It wasn't a map of the forest. It was a map of your sins.'");

    if (player.hasMap) {
        addChoice("Realize the Truth.", () => {
            writeStory("The map in your pocket began to burn. You realized the traveler was the <b>Forest Wraith</b>. He didn't want your help; he wanted a host. He lunged into your chest!");
            if (player.inventory.includes("Black Blood")) {
                writeStory("The Black Blood in your veins acted as a poison to the spirit. He shrieked as he touched your heart and vanished into smoke, but your humanity was gone.");
                player.reputation -= 50;
                writeLog("The Wraith failed to possess you. You are no longer human.");
                mountain();
            } else {
                player.health -= 50;
                writeStory("He tore through your spirit. You survived, but your mind is fractured.");
                writeLog("Possession attempt. HP -50");
                updateUI();
                mountain();
            }
        });
    } else {
        writeStory("Because you ignored him, he simply watched you from the trees, waiting for the mountain to finish you off.");
        mountain();
    }
}

function mountain() {
    clearChoices();
    writeStory("<br>📖 <b>Chapter 4: The Dragon's Truth</b>");
    writeStory("At the summit, there was no dragon. There was only a mirror sitting on a pile of ash. As you looked into it, you saw the person you had become.");

    addChoice("Break the Mirror.", () => {
        writeStory("You shattered the glass, refusing to accept your fate. The mountain began to crumble. You fell into the abyss, clutching nothing but your pride.");
        player.health = 0;
        ending();
    });

    addChoice("Accept your reflection.", () => {
        writeStory("You stared at your scarred, black-eyed reflection. You realized you were the monster people would tell stories about now.");
        ending();
    });
}

function ending() {
    clearChoices();
    writeStory("<br>🏁 <b>The Final Page</b>");
    
    if (player.health <= 0) {
        writeStory("<i>Death was a mercy. Your body was never found, but the Forest Wraith now wears your face, walking back toward Oakhaven to find another 'hero.'</i>");
    } else if (player.inventory.includes("Black Blood") && player.reputation < 0) {
        writeStory("<i>You returned to the city and took the throne by force. You are the Dark Sovereign. You do not feel joy or pain, only the cold weight of the crown.</i>");
    } else if (player.permanentScar && player.reputation > 0) {
        writeStory("<i>You retired to a small cottage. Children ask about your scar, but you never tell them the truth. You know that somewhere, the Traveler is still waiting for you to finish the map.</i>");
    } else {
        writeStory("<i>You survived, but you are a ghost of your former self. You wander the world, forever looking over your shoulder.</i>");
    }

    addChoice("Reopen the Book", startGame);
}