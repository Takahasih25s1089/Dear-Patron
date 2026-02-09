<script>
    import { gameState, scenarios, playerState } from "$lib/stores.js";

    $: day = $gameState.day;
    $: currentScenario = scenarios.find((s) => s.day === day) || scenarios[0];
    $: choices = currentScenario.choices || [];
    $: playerName = $playerState.name;

    function purchase(item) {
        if (!item.available) return;

        // Logic for "buying"
        // In this prototype, buying the 'bad' item (id 1) advances the game or triggers nightmare
        // The others are always Sold Out as per spec, but if we had logic:
        // if (price > money) return;

        // For now, any click on available item advances the day or triggers nightmare
        // If it's day 3 or 5, go to Nightmare, else next Day

        // Add item to inventory (optional for now)

        if (currentScenario.nightmare) {
            gameState.update((s) => ({ ...s, phase: "Nightmare" }));
        } else {
            gameState.update((s) => ({
                ...s,
                day: s.day + 1,
                phase: "Day",
                dialogueIndex: 0,
            }));
        }
    }
</script>

<div class="night-phase">
    <header>
        <h1>DEAR PATRON</h1>
        <div class="user-info">Welcome, {playerName}</div>
    </header>

    <main>
        <div class="concierge-message">
            <p>I have been waiting for you, {playerName}.</p>
            <p>What would you like to gift her tonight?</p>
        </div>

        <div class="product-grid">
            {#each choices as item}
                <div
                    class="product-card"
                    class:sold-out={!item.available}
                    on:click={() => purchase(item)}
                    role="button"
                    tabindex="0"
                    on:keydown={(e) => e.key === "Enter" && purchase(item)}
                >
                    <div class="product-image-placeholder"></div>
                    <div class="product-info">
                        <h3>{item.label}</h3>
                        <span class="price">{item.price}</span>
                        {#if !item.available}
                            <span class="sold-out-badge">SOLD OUT</span>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </main>
</div>

<style>
    .night-phase {
        width: 100%;
        min-height: 100vh;
        background-color: #0a0a0a;
        color: #cb9b51; /* Gold */
        font-family: "Playfair Display", serif; /* Luxury font if available, fallback serif */
    }

    header {
        padding: 20px 40px;
        border-bottom: 1px solid #cb9b51;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: 1.5rem;
        letter-spacing: 2px;
        margin: 0;
    }

    main {
        padding: 40px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .concierge-message {
        text-align: center;
        margin-bottom: 60px;
        font-size: 1.2rem;
        font-style: italic;
    }

    .product-grid {
        display: flex;
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;
    }

    .product-card {
        border: 1px solid #333;
        padding: 20px;
        width: 250px;
        transition: all 0.3s ease;
        cursor: pointer;
        background: #111;
        position: relative;
    }

    .product-card:hover:not(.sold-out) {
        border-color: #cb9b51;
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(203, 155, 81, 0.2);
    }

    .product-card.sold-out {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(100%);
    }

    .product-image-placeholder {
        width: 100%;
        height: 200px;
        background: #222;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
    }

    .product-info h3 {
        font-size: 1rem;
        margin: 0 0 10px 0;
        color: #fff;
    }

    .price {
        font-size: 1.1rem;
        color: #cb9b51;
    }

    .sold-out-badge {
        display: block;
        color: #ff4444;
        font-weight: bold;
        margin-top: 5px;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        header {
            padding: 15px 20px;
        }

        .product-grid {
            flex-direction: column;
            align-items: center;
        }

        .product-card {
            width: 100%;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 10px;
        }

        .product-image-placeholder {
            width: 80px;
            height: 80px;
            margin-bottom: 0;
        }

        .product-info {
            flex: 1;
        }
    }
</style>
