<script>
    import { gameState } from "$lib/stores.js";
    import { onMount, onDestroy } from "svelte";

    // Game state
    let enemies = [];
    let score = 0;
    let timeRemaining = 15; // 15 seconds survival
    let gameInterval;
    let spawnInterval;
    let nextId = 0;

    onMount(() => {
        // Start game loop
        gameInterval = setInterval(() => {
            timeRemaining--;
            if (timeRemaining <= 0) {
                endNightmare();
            }
        }, 1000);

        spawnInterval = setInterval(spawnEnemy, 800); // Spawn every 800ms

        return () => {
            clearInterval(gameInterval);
            clearInterval(spawnInterval);
        };
    });

    function spawnEnemy() {
        const id = nextId++;
        const x = Math.random() * 80 + 10; // 10% to 90% width
        const duration = Math.random() * 2 + 2; // 2-4s duration to fall
        const size = Math.random() * 40 + 40; // 40-80px

        enemies = [...enemies, { id, x, y: -10, duration, size }];

        // Auto remove after animation (simplified logic: check boundaries in animation end or timer)
        // For CSS animation, we just let them fall. If they aren't clicked, they "hit" (visual only for now)
        setTimeout(() => {
            removeEnemy(id, false);
        }, duration * 1000);
    }

    function removeEnemy(id, killedByPlayer) {
        if (killedByPlayer) {
            score++;
        }
        enemies = enemies.filter((e) => e.id !== id);
        if (enemies.length === 0 && timeRemaining <= 0) {
            endNightmare();
        }
    }

    function handleInteraction(id) {
        removeEnemy(id, true);
    }

    function endNightmare() {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        // Proceed to next day
        gameState.update((s) => ({
            ...s,
            day: s.day + 1,
            phase: "Day",
            dialogueIndex: 0,
        }));
    }
</script>

<div class="nightmare-phase">
    <div class="timer">SURVIVE: {timeRemaining}s</div>

    <div class="game-area">
        {#each enemies as enemy (enemy.id)}
            <button
                class="enemy"
                style="left: {enemy.x}%; width: {enemy.size}px; height: {enemy.size}px; animation-duration: {enemy.duration}s;"
                on:mousedown|preventDefault={() => handleInteraction(enemy.id)}
                on:touchstart|preventDefault={() => handleInteraction(enemy.id)}
                aria-label="Destroy enemy"
            >
                👻
            </button>
        {/each}
    </div>
</div>

<style>
    .nightmare-phase {
        width: 100%;
        height: 100vh;
        background-color: #1a0000;
        overflow: hidden;
        position: relative;
        cursor: crosshair;
        user-select: none;
    }

    .timer {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: red;
        font-size: 2rem;
        font-weight: bold;
        z-index: 100;
    }

    .game-area {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .enemy {
        position: absolute;
        top: -50px; /* Start above screen */
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        animation-name: fall;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }

    .enemy::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 50%;
        opacity: 0.1;
        animation: pulse 0.5s infinite;
    }

    @keyframes fall {
        to {
            transform: translateY(110vh) rotate(360deg);
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
