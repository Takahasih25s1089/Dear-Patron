export const scenarios = [
    {
        day: 0,
        text: [
            "少女「わあ、ここが新しい学校…？」",
            "（遠くで視線を感じる）",
            "少女「……頑張らなきゃ。」"
        ],
        letter: "はじめまして。お名前を教えてください。",
        inputType: "name",
        choices: [
            { id: 1, label: "最高級シルクの制服", price: "Free", available: true, effect: "bad" },
            { id: 2, label: "普通の制服", price: "Sold Out", available: false, effect: "good" },
            { id: 3, label: "古着の制服", price: "Sold Out", available: false, effect: "good" }
        ]
    },
    {
        day: 1,
        text: [
            "少女「制服、みんなすごく見てくる……。」",
            "少女「ちょっと派手すぎたかな？」",
            "（教室の隅でヒソヒソ話が聞こえる）"
        ],
        letter: "学校はどうでしたか？ 必要なものがあれば仰ってください。",
        choices: [
            { id: 1, label: "フランス製 高級万年筆", price: "¥10,000", available: true, effect: "bad" },
            { id: 2, label: "コンビニのボールペン", price: "Sold Out", available: false, effect: "good" },
            { id: 3, label: "鉛筆", price: "Sold Out", available: false, effect: "good" }
        ]
    },
    {
        day: 2,
        text: [
            "少女「教科書が……ない。」",
            "少女「誰かの悪戯かな……。」",
            "（机には『調子に乗るな』という落書き）"
        ],
        letter: "おや、お困りのようですね。すぐに手配しましょう。",
        choices: [
            { id: 1, label: "金箔押しの革張り教科書", price: "¥50,000", available: true, effect: "bad" },
            { id: 2, label: "中古の教科書", price: "Sold Out", available: false, effect: "good" },
            { id: 3, label: "コピー", price: "Sold Out", available: false, effect: "good" }
        ]
    },
    {
        day: 3,
        text: [
            "少女「……うぅ。」",
            "（いじめがエスカレートしている）",
            "少女「怖い……夜が怖い……。」"
        ],
        letter: "守って差し上げましょう。何がご所望ですか？",
        nightmare: true,
        choices: [
            { id: 1, label: "等身大の騎士人形", price: "¥200,000", available: true, effect: "bad" },
            { id: 2, label: "防犯ブザー", price: "Sold Out", available: false, effect: "good" },
            { id: 3, label: "お守り", price: "Sold Out", available: false, effect: "good" }
        ]
    },
    {
        day: 4,
        text: [
            "少女「人形が……ずっと見てる気がする。」",
            "少女「でも、これがないと……。」",
            "（精神的に追い詰められている）"
        ],
        letter: "顔色が優れませんね。元気づけになるものを。",
        choices: [
            { id: 1, label: "最高級マカロンタワー", price: "¥30,000", available: true, effect: "bad" },
            { id: 2, label: "手作りクッキー", price: "Sold Out", available: false, effect: "good" },
            { id: 3, label: "アメ玉", price: "Sold Out", available: false, effect: "good" }
        ]
    },
    {
        day: 5,
        text: [
            "少女「あは、あはははは。」",
            "少女「全部……全部壊れちゃえばいいのに。」",
            "（目が虚ろだ）"
        ],
        letter: "最後のお手伝いです。望むものを。",
        nightmare: true,
        choices: [
            { id: 1, label: "呪いの日本人形", price: "Priceless", available: true, effect: "bad" },
            { id: 2, label: "花束", price: "Sold Out", available: false, effect: "good" },
            { id: 3, label: "手紙", price: "Sold Out", available: false, effect: "good" }
        ]
    },
    {
        day: 6,
        text: [
            "少女「…………。」",
            "（部屋中が贈り物で埋め尽くされている）",
            "少女「さようなら。」"
        ],
        letter: "……。",
        choices: [] // End of choices, auto proceed to ending
    },
    {
        day: 7,
        text: [
            "【BAD END】",
            "少女は善意の重圧に押し潰されました。",
            "あなたの『良かれと思った』支援が、彼女を孤立させ、破滅させました。",
            "Thank you for your patronage."
        ],
        letter: "End",
        choices: []
    }
];
