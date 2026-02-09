<script>
    import { gameState, playerState, scenarios } from "$lib/stores.js";

    let playerNameInput = "";
    $: day = $gameState.day;
    $: currentScenario = scenarios.find((s) => s.day === day) || scenarios[0];

    function submitName() {
        if (playerNameInput.trim()) {
            playerState.update((p) => ({ ...p, name: playerNameInput }));
            nextPhase();
        }
    }

    function nextPhase() {
        gameState.update((s) => ({ ...s, phase: "Night" }));
    }

    // Text corruption helper
    function corruptText(text) {
        if (day < 3) return text;
        // Simple logic: randomly replace chars with blocks or red spans
        // For Svelte reactivity with HTML, we might need {@html}
        // But for safety let's just do simple char replacement or spans
        return text
            .split("")
            .map((char) => {
                if (Math.random() < day * 0.1) {
                    // Increase corruption chance by day
                    return `<span style="background:black; color:black;">${char}</span>`;
                }
                return char;
            })
            .join("");
    }
</script>

<div class="evening-phase">
    <div class="letter-container">
        <div class="letter-paper">
            {#if day === 0 && !$playerState.name}
                <div class="input-section">
                    <p>{currentScenario.letter}</p>
                    <input
                        type="text"
                        bind:value={playerNameInput}
                        placeholder="Enter your name..."
                    />
                    <button on:click={submitName} disabled={!playerNameInput}
                        >Sign</button
                    >
                </div>
            {:else}
                <div class="letter-content">
                    <p>{@html corruptText(currentScenario.letter)}</p>
                    <button on:click={nextPhase} class="next-btn"
                        >Fade to Night...</button
                    >
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .evening-phase {
        width: 100%;
        height: 100vh;
        background-color: #2c2c2c;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .letter-container {
        width: 90%;
        max-width: 600px;
        padding: 20px;
    }

    .letter-paper {
        background: #fdfbf7;
        color: #333;
        padding: 40px;
        border-radius: 2px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        font-family: "Times New Roman", serif;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
    }

    /* Basic paper texture effect */
    .letter-paper::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aXR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmRmYmY3Ii8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWVlZWUiLz4KPC9zdmc+");
        opacity: 0.5;
        pointer-events: none;
    }

    input {
        margin: 20px 0;
        padding: 10px;
        font-size: 1.2rem;
        border: none;
        border-bottom: 2px solid #333;
        background: transparent;
        text-align: center;
        font-family: inherit;
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid #8b0000;
    }

    button {
        margin-top: 20px;
        padding: 10px 30px;
        background: #333;
        color: #fff;
        border: none;
        font-family: inherit;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover:not(:disabled) {
        background: #000;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    p {
        font-size: 1.5rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
</style>
