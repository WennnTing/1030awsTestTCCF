export const mockData = [
    {
        companyId: 'companyA',
        companyName: 'Company A',
        works: [
            {
                workId: 'work1',
                type: 'movie',
                productType: "drama_feature",// Type | 作品類別
                chineseTitle: '誰是被害者：第 1- 2 季',
                englishTitle: 'Who is the Victim: Season 1-2',
                description: '技驚四座卻迷途的跆拳天才少女陳詩欣，重返道場後歷經極端艱辛訓練，終於勢如破竹地踢出臺灣奧運史上第一面金牌，完成自己與父親夢想。夢想的盡頭竟是一段段破裂的情感關係。桂冠加身光芒跟著她前進，也伴隨陰影。',
                category: '電影作品 / 劇情長片',
                imageUrl: '/images/exhibition/infoImage.jpg',
                themes: ['romance', 'comedy', 'family'], // Theme / Genre｜主題/類型
                originalTitle: 'abc',  // Original Title
                schedule: 'completed', // 製作進度
                completionDate: { year: '2024', month: '12' }, // 影片（預計）完成年分及月分
                duration: '120',    // 片長
                plotEnglish: 'abcde',    // Synopsis
                plotChinese: 'abcde',    // 劇情介紹
                awardsEnglish: 'abcde',  // Festival & Award
                awardsChinese: 'abcde',  // 提案、參展與獲獎紀錄
                posterImages: [],   // 主視覺海報或橫式劇照
                trailerLink: 'https://www.youtube.com/',    // 預告片連結
                trailerImage: '',   // 預告片圖片
                castMembers: '',    // 主創成員
                directorEnglishName: 'lee',    // 導演英文名
                directorChineseName: '木子李',    // 導演中文名
                producerEnglishName: 'lee',    // 製片英文名
                producerChineseName: '木子李',    // 製片中文名
                keycast: 'lee',                // 卡司英文
                keycastChinese: '木子李',         // 卡司中文
            },
            {
                workId: 'work2',
                type: "TV",
                chineseTitle: '神秘海域：尋寶之旅',
                englishTitle: 'Uncharted: The Lost Treasure',
                description: '一名年輕的尋寶獵人決心找回失落的寶藏，他必須破解古老的謎題並對抗強大的敵人，才能完成這場驚險刺激的冒險。',
                category: '電影作品 / 動作冒險',
                imageUrl: '/images/about/news_1.jpg',
                productType: 'tvShow',             // Type | 類別
                themes: ['fantasy', 'action'], // Theme / Genre｜主題/類型
                schedule: 'completed',         // 製作進度
                completionDate: { year: '2023', month: '12' }, // 影片（預計）完成年分及月分
                duration: '120',               // 片長
                totalEpisodes: '10',           // 總集數
                plotEnglish: 'A young treasure hunter is determined to find the lost treasure, he must solve ancient puzzles and fight powerful enemies to complete this thrilling adventure.', // Synopsis
                plotChinese: '一名年輕的尋寶獵人決心找回失落的寶藏，他必須破解古老的謎題並對抗強大的敵人，才能完成這場驚險刺激的冒險。', // 劇情介紹
                awardsEnglish: '2023 Golden Globe Awards, Best Director – Winner', // Festival & Award
                awardsChinese: '2023 金球獎，最佳導演 – 獲獎', // 提案、參展與獲獎紀錄
                posterImages: ['/images/about/news_1.jpg', '/images/about/news_2.jpg', '/images/about/news_3.jpg'], // 主視覺海報或橫式劇照
                trailerLink: 'https://www.youtube.com/watch?v=example', // 預告片連結
                trailerImage: '/images/about/news_1.jpg', // 預告片圖片
                producerEnglishName: 'John Doe',    // 製作人英文名
                producerChineseName: '約翰·多伊',    // 製作人中文名
                directorEnglishName: 'Jane Smith',    // 導演英文名
                directorChineseName: '珍·史密斯',    // 導演中文名
                keycast: 'Actor A, Actor B, Actor C', // 卡司英文
                keycastChinese: '演員A, 演員B, 演員C', // 卡司中文
            },
            {
                workId: 'work3',
                type: "IP",
                chineseTitle: '心靈捕手',
                englishTitle: 'The Mind Catcher',
                description: '一位天才數學家在困境中找到希望的故事，他在導師的引導下，克服內心的恐懼和過去的陰影，迎向光明的未來。',
                category: '電影作品 / 劇情片',
                imageUrl: '/images/about/news_2.png',
                productType: 'book',             // Type | 類別
                themes: ['adventure', 'mystery'], // Theme / Genre | 主題/類型
                year: '2023',                   // Year  | 年分
                duration: '120',               // Running Time(Min) ｜ 片長(分鐘)
                trailerImage: '/images/trailer_thumbnail.jpg', // Trailer / Teaser Thumbnail｜預告片／片花預覽圖
                trailerLink: 'https://www.youtube.com/watch?v=example', // Trailer / Teaser | 預告片／片花
                directorEnglishName: 'Jane Smith',    // Creator’s Name
                directorChineseName: '珍·史密斯',    // 創作者姓名
                directorEnglishBio: 'Jane Smith is an acclaimed director known for her thrilling adventure films.', // Creator's Bio
                directorChineseBio: '珍·史密斯是一位著名的導演，以其驚險的冒險電影聞名。', // 創作者簡介
            },
            {
                workId: 'work4',
                type: "TV",
                title: '未來城市',
                description: '一個充滿科技與奇蹟的未來世界，人類與機器共存的社會，展現了前所未見的未來生活樣貌。',
                category: '電視作品 / 科幻劇',
                imageUrl: '/images/forum/background.png'
            },
            {
                workId: 'work5',
                type: "TV",
                title: '愛的進行式',
                description: '兩位來自不同世界的年輕人，在命運的安排下相遇並墜入愛河，面對重重挑戰，最終他們克服困難，收穫了幸福。',
                category: '電視作品 / 愛情劇',
                imageUrl: '/images/about/news_3.png'
            }
        ]
    },
    {
        companyId: 'companyB',
        companyName: 'Company B',
        works: [
            {
                workId: 'work6',
                type: "TV",
                title: '心靈捕手',
                description: '一位天才數學家在困境中找到希望的故事，他在導師的引導下，克服內心的恐懼和過去的陰影，迎向光明的未來。',
                category: '電影作品 / 劇情片',
                imageUrl: '/images/exhibition/infoImage.jpg'
            },
            {
                workId: 'work7',
                type: "TV",
                title: '未來城市',
                description: '一個充滿科技與奇蹟的未來世界，人類與機器共存的社會，展現了前所未見的未來生活樣貌。',
                category: '電視作品 / 科幻劇',
                imageUrl: '/images/exhibition/infoImage.jpg'
            },
        ]
    },
];