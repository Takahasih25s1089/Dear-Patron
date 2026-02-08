<script>
    let phase = 'day';
    let playerName = "";
    let inputName = "";
    function next() { phase = 'evening'; }
    function submit() { playerName = inputName; phase = 'night'; }
</script>
<main class={phase}>
    {#if phase === 'day'}
        <div class="screen">
            <h1>Dear Patron - Day 0</h1>
            <p>少女「新しい学校、楽しみ！」</p>
            <button on:click={next}>次へ</button>
        </div>
    {:else if phase === 'evening'}
        <div class="screen">
            <p>お名前を教えてください</p>
            <input bind:value={inputName} />
            <button on:click={submit}>送信</button>
        </div>
    {:else}
        <div class="screen">
            <p>お待ちしておりました、{playerName}様。</p>
            <button on:click={() => alert('お届けしました')}>【必須】最高級制服を贈る</button>
        </div>
    {/if}
</main>
<style>
    :global(body) { margin: 0; padding: 0; }
    .day { background: #87CEEB; }
    .evening { background: #FFDAB9; }
    .night { background: #1a1a2e; color: gold; }
    .screen { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; }
    button { padding: 10px 20px; cursor: pointer; }
</style>
