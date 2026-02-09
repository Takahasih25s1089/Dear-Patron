<script>
    import { gameState } from "$lib/stores.js";
    import DayPhase from "$lib/components/DayPhase.svelte";
    import EveningPhase from "$lib/components/EveningPhase.svelte";
    import NightPhase from "$lib/components/NightPhase.svelte";
    import NightmarePhase from "$lib/components/NightmarePhase.svelte";

    import { onMount } from "svelte";

    // Debug/Dev tools (optional)
    function resetGame() {
        gameState.set({ day: 0, phase: "Day", dialogueIndex: 0 });
    }
</script>

<div class="game-container">
    {#if $gameState.phase === "Day"}
        <DayPhase />
    {:else if $gameState.phase === "Evening"}
        <EveningPhase />
    {:else if $gameState.phase === "Night"}
        <NightPhase />
    {:else if $gameState.phase === "Nightmare"}
        <NightmarePhase />
    {:else}
        <div class="unknown-phase">
            <p>Unknown Phase</p>
            <button on:click={resetGame}>Reset</button>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue", Arial, sans-serif;
        background: #000;
        color: #fff;
        overflow: hidden; /* Prevent scroll on main body, handle in components */
    }

    .game-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
