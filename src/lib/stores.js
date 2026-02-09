import { writable } from 'svelte/store';

// ゲームの状態管理
export const gameState = writable({
    day: 0,
    phase: 'day', // 'day', 'evening', 'night', 'nightmare'
    sanity: 100
});

// プレイヤー情報
export const playerState = writable({
    name: "",
    history: []
});

// シナリオデータ
export const scenarios = [
    {
        day: 0,
        text: [
            "少女「わあ、ここが私の新しい学校…？」",
            "立派な門構え。遠くで生徒たちがこちらを見ている。",
            "（まだ、ただの好奇の目のようだ）"
        ],
        letter: "はじめまして、あしながおじ様。\n無事に学校に着きました。\nこれからよろしくお願いします。\n\n追伸：お名前を教えてください。",
        inputType: "name",
        choices: [
            { id: 1, label: "最高級シルクの制服", price: "提供", available: true }
        ]
    },
    {
        day: 1,
        text: [
            "少女「おはようございます！」",
            "挨拶をするが、誰も返してくれない。",
            "生徒A「…何あれ、あの制服。特注？」",
            "生徒B「田舎者が無理しちゃって。似合わないわね」"
        ],
        letter: "みんな私の制服をジロジロ見てたわ！\nきっとこの生地が素敵すぎるからね。\nおじ様のおかげです！",
        choices: [
            { id: 2, label: "高級マナーブックとティーセット", price: "提供", available: true },
            { id: 99, label: "普通の文房具", price: "Sold Out", available: false }
        ]
    },
    {
        day: 2,
        text: [
            "お茶会の授業。",
            "カチャ、カチャ…震える手でカップを持つ。",
            "教師「あら、使い方もご存じないの？ 育ちが出ますわね」",
            "教室中にクスクスという笑い声が響く。"
        ],
        letter: "今日は少し失敗しちゃった。\nでも大丈夫。次はもっと上手くやるから。\n…友達、できるかな。",
        choices: [
            { id: 3, label: "宝石のような高級菓子セット", price: "提供", available: true }
        ]
    },
    {
        day: 3,
        text: [
            "勇気を出してお菓子を配ろうとした。",
            "バシャッ！",
            "手ごとはたき落とされる。",
            "生徒C「媚び売ってんじゃないわよ、庶民が」",
            "美しいお菓子が、泥靴で踏みにじられていく。"
        ],
        letter: "お菓子、落としちゃった…ごめんなさい\nごめんなさいごめんなさい\n（文字が少し乱れている）",
        choices: [
            { id: 4, label: "お守り（高級ぬいぐるみ）", price: "提供", available: true }
        ]
    }
];
