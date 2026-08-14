// MaDenMusic — альбомная версия
// MP3 намеренно не входят в этот пакет. После загрузки на GitHub сайт сам определит доступность трека.

const albumOrder = ["Моя", "Новый", "Мой ангел", "Новая веха", "Remixes", "Люмейя"];

const albumMeta = {
    "Моя": { cover: "covers/album_moya.jpg", subtitle: "6 композиций" },
    "Новый": { cover: "covers/album_novyi.jpg", subtitle: "7 композиций" },
    "Мой ангел": { cover: "covers/My angel.PNG", subtitle: "5 композиций" },
    "Новая веха": { cover: "covers/album_novaya_veha.jpg", subtitle: "5 композиций" },
    "Remixes": { cover: "covers/album_remixes.jpg", subtitle: "4 композиции" },
    "Люмейя": { cover: "covers/album_lumeya.jpg", subtitle: "5 композиций" },
};

const songs = [
    {
        id: 1,
        title: "Жизнь моей души",
        artist: "MaDen",
        release: "2026-08-02",
        album: "Моя",
        audio: "Моя – Жизнь моей души.mp3",
        cover: "covers/track_zhizn_moei_dushi.jpg",
        lyrics: `
Здесь будет текст песни "Жизнь моей души"
        `
    },
    {
        id: 2,
        title: "Наша жизнь — это сила",
        artist: "MaDen",
        release: null,
        album: "Моя",
        audio: "Наша жизнь — это сила.mp3",
        cover: "covers/album_moya.jpg",
        lyrics: `
Здесь будет текст песни "Наша жизнь — это сила"
        `
    },
    {
        id: 3,
        title: "Ты лилия",
        artist: "MaDen",
        release: null,
        album: "Моя",
        audio: "ты лилия.mp3",
        cover: "covers/album_moya.jpg",
        lyrics: `
Здесь будет текст песни "Ты лилия"
        `
    },
    {
        id: 4,
        title: "Смыслом жизнь полна",
        artist: "MaDen",
        release: null,
        album: "Моя",
        audio: "Смыслом жизнь полна.mp3",
        cover: "covers/album_moya.jpg",
        lyrics: `
Здесь будет текст песни "Смыслом жизнь полна"
        `
    },
    {
        id: 5,
        title: "Эсфирь",
        artist: "MaDen",
        release: "2026-08-03",
        album: "Моя",
        audio: "Моя – Эсфирь.mp3",
        cover: "covers/track_esfir.jpg",
        lyrics: `
Здесь будет текст песни "Эсфирь"
        `
    },
    {
        id: 6,
        title: "10.01",
        artist: "MaDen",
        release: null,
        album: "Моя",
        audio: "10.01.mp3",
        cover: "covers/album_moya.jpg",
        lyrics: `
Здесь будет текст песни "10.01"
        `
    },
    {
        id: 7,
        title: "Твой взгляд",
        artist: "MaDen",
        release: "2026-08-05",
        album: "Новый",
        audio: "tvoy vzglayd.mp3",
        cover: "covers/track_tvoy_vzglyad.jpg",
        lyrics: `
Здесь будет текст песни "Твой взгляд"
        `
    },
    {
        id: 8,
        title: "Танец жизни",
        artist: "MaDen",
        release: null,
        album: "Новый",
        audio: "Танец жизни.mp3",
        cover: "covers/album_novyi.jpg",
        lyrics: `
Здесь будет текст песни "Танец жизни"
        `
    },
    {
        id: 9,
        title: "Ты мой кофе",
        artist: "MaDen",
        release: "2026-08-05",
        album: "Новый",
        audio: "kofe.mp3",
        cover: "kofe.jpg",
        lyrics: `
Здесь будет текст песни "Ты мой кофе"
        `
    },
    {
        id: 10,
        title: "Взрыв далёкой звезды",
        artist: "MaDen",
        release: null,
        album: "Новый",
        audio: "Взрыв далекой звезды.mp3",
        cover: "covers/album_novyi.jpg",
        lyrics: `
Здесь будет текст песни "Взрыв далёкой звезды"
        `
    },
    {
        id: 11,
        title: "Целого мира мало",
        artist: "MaDen",
        release: null,
        album: "Новый",
        audio: "Целого мира мало.mp3",
        cover: "covers/album_novyi.jpg",
        lyrics: `
Здесь будет текст песни "Целого мира мало"
        `
    },
    {
        id: 12,
        title: "Комета",
        artist: "MaDen",
        release: "2026-07-30",
        album: "Новый",
        audio: "Комета.mp3",
        cover: "Comet.png",
        lyrics: `
Здесь будет текст песни "Комета"
        `
    },
    {
        id: 13,
        title: "Моих желаний аромат",
        artist: "MaDen",
        release: null,
        album: "Новый",
        audio: "Моих желаний аромат.mp3",
        cover: "covers/album_novyi.jpg",
        lyrics: `
Здесь будет текст песни "Моих желаний аромат"
        `
    },
    {
        id: 14,
        title: "Одним воздухом дышать",
        artist: "MaDen",
        release: "2026-08-05",
        album: "Мой ангел",
        audio: "Одним воздухом дышать.mp3",
        cover: "Одним воздухом дышать.png",
        lyrics: `
Здесь будет текст песни "Одним воздухом дышать"
        `
    },
    {
        id: 15,
        title: "Петербург — город любви",
        artist: "MaDen",
        release: null,
        album: "Мой ангел",
        audio: "Петербург — город любви.mp3",
        cover: "covers/album_moi_angel.jpg",
        lyrics: `
Здесь будет текст песни "Петербург — город любви"
        `
    },
    {
        id: 16,
        title: "Мой ангел",
        artist: "MaDen",
        release: "2026-07-31",
        album: "Мой ангел",
        audio: "Moy angel.mp3",
        cover: "covers/track_moy_angel.jpg",
        lyrics: `
Здесь будет текст песни "Мой ангел"
        `
    },
    {
        id: 17,
        title: "Мой свет, гори 🔥",
        artist: "MaDen",
        release: "2026-08-01",
        album: "Мой ангел",
        audio: "Moy svet.mp3",
        cover: "covers/track_moy_svet.jpg",
        lyrics: `
Здесь будет текст песни "Мой свет, гори 🔥"
        `
    },
    {
        id: 18,
        title: "Папина дочка",
        artist: "MaDen",
        release: "2026-08-04",
        album: "Мой ангел",
        audio: "Папина дочка.mp3",
        cover: "Папина дочка.png",
        lyrics: `
Здесь будет текст песни "Папина дочка"
        `
    },
    {
        id: 19,
        title: "Сегодня мы считаем звёзды",
        artist: "MaDen",
        release: "2026-07-20",
        album: "Новая веха",
        audio: "сегодня мы считаем звёзды.mp3",
        cover: "IMG_3387.jpeg",
        lyrics: `
Здесь будет текст песни "Сегодня мы считаем звёзды"
        `
    },
    {
        id: 20,
        title: "Когда мы вместе",
        artist: "MaDen",
        release: null,
        album: "Новая веха",
        audio: "Когда мы вместе.mp3",
        cover: "covers/album_novaya_veha.jpg",
        lyrics: `
Здесь будет текст песни "Когда мы вместе"
        `
    },
    {
        id: 21,
        title: "Мы растворяемся вдвоём",
        artist: "MaDen",
        release: "2026-08-06",
        album: "Новая веха",
        audio: "Растворяемся вдвоем.mp3",
        cover: "мы растворяемся вдвоем.png",
        lyrics: `
Здесь будет текст песни "Мы растворяемся вдвоём"
        `
    },
    {
        id: 22,
        title: "Гармония",
        artist: "MaDen",
        release: null,
        album: "Новая веха",
        audio: "Гармония.mp3",
        cover: "covers/album_novaya_veha.jpg",
        lyrics: `
Здесь будет текст песни "Гармония"
        `
    },
    {
        id: 23,
        title: "История Любви",
        artist: "MaDen",
        release: "2026-07-10",
        album: "Новая веха",
        audio: "История любви.mp3",
        cover: "Screenshot_20260803-134440-display-0.png.png",
        lyrics: `
Здесь будет текст песни "История Любви"
        `
    },
    {
        id: 24,
        title: "Ты лилия (Remix)",
        artist: "MaDen",
        release: "2026-08-13",
        album: "Remixes",
        audio: "ты лилия (nordic remix).mp3",
        cover: "IMG_1576.jpeg",
        lyrics: `
Здесь будет текст песни "Ты лилия (Remix)"
        `
    },
    {
        id: 25,
        title: "Мы растворяемся вдвоём (Remix)",
        artist: "MaDen",
        release: "2026-08-13",
        album: "Remixes",
        audio: "мы растворяемся вдвоём (remix).mp3",
        cover: "мы растворяемся вдвоем (nordic remix).jpg",
        lyrics: `
Здесь будет текст песни "Мы растворяемся вдвоём (Remix)"
        `
    },
    {
        id: 26,
        title: "История любви (Nordic Remix)",
        artist: "MaDen",
        release: "2026-08-13",
        album: "Remixes",
        audio: "история любви (nordic remix).mp3",
        cover: "история любви (nordic remix).jpg",
        lyrics: `
Здесь будет текст песни "История любви (Nordic Remix)"
        `
    },
    {
        id: 27,
        title: "Одним воздухом дышать (Remix)",
        artist: "MaDen",
        release: "2026-08-13",
        album: "Remixes",
        audio: "13.08-2.mp3",
        cover: "Одним воздухом дышать (Remix).jpg",
        lyrics: `
Здесь будет текст песни "Одним воздухом дышать (Remix)"
        `
    },
    {
        id: 28,
        title: "Ритмы Люмейя",
        artist: "MaDen",
        release: null,
        album: "Люмейя",
        audio: "Ритмы Люмейя.mp3",
        cover: "covers/album_lumeya.jpg",
        lyrics: `
Здесь будет текст песни "Ритмы Люмейя"
        `
    },
    {
        id: 29,
        title: "Народ Люмейя",
        artist: "MaDen",
        release: null,
        album: "Люмейя",
        audio: "Народ Люмейя.mp3",
        cover: "covers/album_lumeya.jpg",
        lyrics: `
Здесь будет текст песни "Народ Люмейя"
        `
    },
    {
        id: 30,
        title: "Lum",
        artist: "MaDen",
        release: null,
        album: "Люмейя",
        audio: "Lum.mp3",
        cover: "covers/album_lumeya.jpg",
        lyrics: `
Здесь будет текст песни "Lum"
        `
    },
    {
        id: 31,
        title: "Soliah",
        artist: "MaDen",
        release: null,
        album: "Люмейя",
        audio: "Soliah.mp3",
        cover: "covers/album_lumeya.jpg",
        lyrics: `
Здесь будет текст песни "Soliah"
        `
    },
    {
        id: 32,
        title: "Одно сердце",
        artist: "MaDen",
        release: null,
        album: "Люмейя",
        audio: "Одно сердце.mp3",
        cover: "covers/album_lumeya.jpg",
        lyrics: `
Здесь будет текст песни "Одно сердце"
        `
    }
];
