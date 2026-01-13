let player = {
    name: "Hero",
    health: 100,
    gold: 15,
    reputation: 0,
    inventory: [],
    hasMap: false,
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
    p.style.marginBottom = "15px"; // Adds space between book-style paragraphs
    p.innerHTML = text;
    textEl.appendChild(p);
    textEl.scrollTop = textEl.scrollHeight;
}

function writeLog(msg) {
    const entry = document.createElement('div');
    entry.className = "log-entry";
    entry.innerText = `> ${msg} (Day ${player.day})`;
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

// --- STORY ACTS ---

function startGame() {
    player = { name: "Hero", health: 100, gold: 15, reputation: 0, inventory: [], hasMap: false, day: 1 };
    updateUI();
    textEl.innerHTML = "";
    logEl.innerHTML = "";
    
    writeStory(" <b>Prologue: The Dust of Oakhaven</b>");
    writeStory("The sun hung low over the village of Oakhaven, casting long, amber shadows across the cobblestones. You stood by the old stone well, the iron scent of wet earth filling your lungs. Your journey was supposed to begin tomorrow, but destiny rarely waits for the sunrise.");
    writeStory("Near the village square, the silence was shattered by the harsh laughter of three local thugs. They had cornered an elderly traveler, his white hair disheveled as they pulled at his tattered cloak. 'Hand over the coin, old man,' one sneered, flashing a rusted dagger.");
    
    clearChoices();
    addChoice("Intervene: 'Leave him alone!'", () => {
        player.reputation += 5;
        player.health -= 15;
        player.hasMap = true;
        player.inventory.push("Old Map");
        writeStory("You stepped forward, your heart hammering against your ribs. The fight was short and brutal; you took a heavy blow to the shoulder, but your fury surprised them. They scrambled into the shadows, cursing your name.");
        writeStory("The old man gripped your hand, his eyes bright with gratitude. 'You have the heart of a lion,' he whispered, pressing a weathered, leather-bound scroll into your palm. It was an <b>Old World Map</b>, showing paths long forgotten by modern cartographers.");
        writeLog("Gained the Traveler's Map. HP -15");
        updateUI();
        townGate();
    });

    addChoice("Observe: Stay in the shadows.", () => {
        writeStory("You remained motionless, tucked away in the gloom of an alleyway. You watched as the thugs took the traveler's meager bag of bread and kicked him into the dust. The world was a cruel place, you reminded yourself, and a dead hero cannot finish a journey.");
        writeStory("Once the thugs vanished, the old man limped away, weeping quietly into the night. You felt a cold weight in your chest, but your skin remained unbruised.");
        writeLog("Chose safety over honor.");
        updateUI();
        townGate();
    });

    addChoice("Opportunist: Help the thugs.", () => {
        player.reputation -= 10;
        player.gold += 15;
        writeStory("You stepped out, not to save the man, but to claim a seat at the table. With your help, the thugs stripped the traveler of everything. They tossed you a small purse of silver for your trouble.");
        writeStory("'You’ve got a sharp eye for profit,' the leader laughed, clapping you on the back. You walked away with heavy pockets, though the coins felt strangely cold against your thigh.");
        writeLog("Stole from the traveler. Gold +15, Rep -10");
        updateUI();
        townGate();
    });
}

function townGate() {
    clearChoices();
    writeStory("<b>Chapter 1: The Iron Gates</b>");
    writeStory("Morning found you at the towering gates of the Great City. The air here was different—thick with the smell of coal smoke and the roar of a thousand voices. A guard stood at the entrance, his armor tarnished and his expression one of bored malice.");
    writeStory("'Entry tax is five gold,' he grunted, not even looking up from his ledger. 'No coin, no city. Unless you want to try your luck with the rats in the drainage tunnels.'");

    addChoice("Pay the Bribe: Hand over 5 gold.", () => {
        if (player.gold >= 5) {
            player.gold -= 5;
            writeStory("You dropped the coins into his open palm. He didn't thank you, merely kicked the small iron gate open with his boot. 'Move along, peasant,' he muttered. You stepped into the city, the heavy gate clanging shut behind you like a prison cell.");
            writeLog("Paid the toll. Gold -5");
            updateUI();
            market();
        } else {
            writeLog("Not enough coin in your purse.");
        }
    });

    addChoice("Sewer Path: Slip into the darkness.", () => {
        player.health -= 25;
        writeStory("The smell hit you first—a nauseating wave of rot and stagnant waste. You climbed down into the darkness of the city's underbelly. For hours, you waded through knee-deep filth, the sound of scratching claws echoing off the damp brick walls.");
        writeStory("When you finally climbed a ladder back to the surface, you were shivering and ill, your boots ruined. You had entered the city, but at a terrible cost to your spirit.");
        writeLog("Traversed the sewers. HP -25");
        updateUI();
        market();
    });

    if (player.reputation >= 5) {
        addChoice("Renown: 'Look at my badge.'", () => {
            writeStory("The guard squinted at you, then noticed the seal on your cloak—a mark of the man who saved the traveler in Oakhaven. His posture straightened slightly. 'I heard of you. One of the few good ones left. Pass through, friend. Keep your gold.'");
            writeLog("Reputation opened the gate.");
            market();
        });
    }
}

function market() {
    clearChoices();
    writeStory("<b>Chapter 2: The Gilded Market</b>");
    writeStory("The city's Great Market was a labyrinth of colorful silk awnings and shouting merchants. You found yourself drawn to a blacksmith's forge, where the rhythmic <i>cling-clang</i> of the hammer acted as the city's heartbeat.");
    writeStory("You knew the road ahead led to the Whispering Woods. To go unarmed would be a fool's errand. Next to the forge, an apothecary stirred a bubbling cauldron of crimson liquid, the steam smelling of mountain herbs and honey.");
    
    addChoice("Steel Sword (10 Gold)", () => {
        if (player.gold >= 10) {
            player.gold -= 10;
            player.inventory.push("Steel Sword");
            writeStory("The sword was balanced perfectly. As you gripped the leather hilt, you felt a surge of confidence. 'Forged in the fires of the northern peaks,' the smith grunted. You strapped the scabbard to your waist, feeling the weight of the steel against your hip.");
            writeLog("Purchased a Steel Sword.");
            updateUI();
        }
    });

    addChoice("Healing Potion (5 Gold)", () => {
        if (player.gold >= 5) {
            player.gold -= 5;
            player.health = 100;
            writeStory("The liquid was thick and tasted of sun-warmed earth. Almost immediately, the soreness in your muscles vanished, and the color returned to your cheeks. You felt whole again.");
            writeLog("Health fully restored.");
            updateUI();
        }
    });

    addChoice("Depart: Head for the Forest.", forest);
}

function forest() {
    clearChoices();
    if (player.health <= 0) return ending();
    writeStory("<b>Chapter 3: The Whispering Woods</b>");
    writeStory("The forest was a wall of ancient, gnarled oaks that seemed to lean toward you as you passed. The light was dim here, filtered through a canopy so thick it choked the sun. Somewhere deep in the thicket, a low, guttural growl vibrated through the ground.");
    writeStory("A Shadow Stalker—a beast made of fur and malice—stepped onto the path. Its eyes were twin embers of yellow fire, and its breath came in ragged, frosty clouds.");
    
    if (player.hasMap) {
        addChoice("The Map's Secret: Take the high path.", () => {
            writeStory("You remembered the traveler's map. Consulting the yellowed parchment, you found a notation for a hidden deer trail that bypassed the hollow. You climbed a rocky ridge, watching from above as the beast prowled the main road, unaware of your passage.");
            writeLog("Used the map to avoid conflict.");
            mountain();
        });
    }

    addChoice("Confront: Draw your weapon.", () => {
        if (player.inventory.includes("Steel Sword")) {
            writeStory("As the beast lunged, you drew your steel in a single, fluid motion. The blade caught the dim light as it sliced through the air. With a roar of your own, you drove the monster back. It fled into the undergrowth, leaving a trail of dark blood behind.");
            player.gold += 25;
            writeStory("You found a discarded adventurer's pack nearby, filled with 25 gold coins. A grim reward for a grim victory.");
            writeLog("Defeated the Stalker. Gold +25");
            updateUI();
            mountain();
        } else {
            player.health -= 60;
            writeStory("You had nothing but your bare hands to defend yourself. The beast's claws tore through your tunic, leaving deep gashes across your chest. You only survived by rolling down a steep embankment, losing the monster in the brambles.");
            writeLog("Narrowly survived the beast. HP -60");
            updateUI();
            if (player.health <= 0) ending(); else mountain();
        }
    });
}

function mountain() {
    clearChoices();
    writeStory("<b>Chapter 4: The Frozen Peak</b>");
    writeStory("The air grew thin and biting as you ascended the Frozen Peak. At the very summit lay the Dragon's Sanctum—a cavern of blue ice and ancient stone. Inside, the sheer scale of the treasure hoard took your breath away; mountains of gold coins and jewels sparkled in the ethereal light.");
    writeStory("In the center of the gold sat a single, pulsing Blue Gemstone. It hummed with a low frequency that resonated in your very bones. There was no dragon in sight, but the heat of its presence lingered in the air like a warning.");
    
    addChoice("Greed: Fill your bags with gold.", () => {
        player.gold += 150;
        player.reputation -= 15;
        writeStory("You fell to your knees and began shoveling gold into your pack. The clinking of the coins sounded like music. You were rich beyond your wildest dreams, but as you turned to leave, you saw your reflection in the ice. Your eyes looked hollow, and your shadow seemed darker than before.");
        writeLog("Chose wealth over all. Gold +150");
        updateUI();
        ending();
    });

    addChoice("Mystery: Take the Blue Gemstone.", () => {
        player.inventory.push("Dragon Soul Gem");
        writeStory("You reached out and touched the gemstone. It was freezing cold, then burning hot. As you lifted it, the cave rumbled. You felt the soul of the mountain tether itself to yours. This was not a jewel; it was a fragment of a god.");
        writeLog("Acquired the Dragon Soul Gem.");
        ending();
    });

    addChoice("Peace: Leave it all behind.", () => {
        player.reputation += 20;
        writeStory("You stood amidst the greatest wealth in the world and closed your eyes. You realized that your journey was not about what you could take, but what you could become. You turned your back on the gold and walked out into the crisp, morning air, feeling a sense of freedom no coin could buy.");
        writeLog("Chose the path of the sage. Rep +20");
        updateUI();
        ending();
    });
}

function ending() {
    clearChoices();
    writeStory("<b>Epilogue: The Traveler's Rest</b>");
    
    let result = "";
    if (player.health <= 0) {
        result = "Your story ends not with a roar, but with a whisper in the snow. You died far from home, another skeleton for the mountain to keep.";
    } else if (player.inventory.includes("Dragon Soul Gem")) {
        result = "You returned to Oakhaven not as a man, but as a legend. With the power of the Soul Gem, you became the Eternal Guardian, protecting the weak for a thousand years.";
    } else if (player.gold > 100) {
        result = "You lived out your days in a marble palace, surrounded by silk and servants. You were the richest person in the land, but in the quiet hours of the night, you often wondered who that young traveler at the well might have been.";
    } else {
        result = "You returned to your village with a few scars and a lifetime of stories. You lived a quiet, happy life, teaching the children of Oakhaven that the greatest adventure is simply being kind.";
    }

    writeStory(`<i style="color: #4a90e2">${result}</i>`);
    addChoice("Write a New Story", startGame);
}