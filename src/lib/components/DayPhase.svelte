<script>
    import { gameState, scenarios } from "$lib/stores.js";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    let currentScenario;
    let currentUniqueText = "";
    let textIndex = 0;

    // Unsubscribe is handled automatically in Svelte component destruction if using $store,
    // but here we might need manual logic for effects.

    $: day = $gameState.day;
    $: currentScenario =
        scenarios.find((s) => s.day === day) || scenarios[scenarios.length - 1];
    $: currentUniqueText = currentScenario
        ? currentScenario.text[$gameState.dialogueIndex]
        : "";

    function nextText() {
        if (
            currentScenario &&
            $gameState.dialogueIndex < currentScenario.text.length - 1
        ) {
            $gameState.dialogueIndex++;
        } else {
            // End of day text, move to Evening
            gameState.update((s) => ({
                ...s,
                phase: "Evening",
                dialogueIndex: 0,
            }));
        }
    }

    // Noise calculation based on day
    $: noiseLevel = day * 10; // 0% to ~70%
</script>

<div
    class="day-phase"
    on:click={nextText}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === "Enter" && nextText()}
>
    <div
        class="filter-layer"
        style="backdrop-filter: grayscale({noiseLevel}%) contrast({100 +
            noiseLevel}%);"
    ></div>
    <div class="background-school">
        <!-- Image placeholder -->
        <div class="character-sprite">
            <!-- Character placeholder -->
            <div class="sprite-body"></div>
        </div>
    </div>

    <div class="message-window" class:glitch={day >= 3}>
        <p>{currentUniqueText || "..."}</p>
        <span class="click-indicator">▼</span>
    </div>
</div>

<style>
    .day-phase {
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
        background-color: #f0f0f0;
        cursor: pointer;
    }

    .filter-layer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
        mix-blend-mode: multiply;
    }

    .background-school {
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #87ceeb 0%, #e0f7fa 100%);
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .character-sprite {
        width: 200px;
        height: 400px;
        background-color: #ffcccc; /* Skin tone placeholder */
        margin-bottom: 20vh;
        border: 2px solid #000;
    }

    .sprite-body {
        width: 100%;
        height: 100%;
    }

    .message-window {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 800px;
        height: 150px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid #fff;
        font-family: "Courier New", monospace;
        font-size: 1.2rem;
        z-index: 20;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .click-indicator {
        align-self: flex-end;
        animation: bounce 1s infinite;
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(5px);
        }
    }

    .glitch {
        animation: glitch-anim 2s infinite;
    }

    @keyframes glitch-anim {
        0% {
            transform: translateX(-50%);
        }
        2% {
            transform: translateX(-51%);
        }
        4% {
            transform: translateX(-49%);
        }
        6% {
            transform: translateX(-50%);
        }
        100% {
            transform: translateX(-50%);
        }
    }
</style>
