import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Train, Bus, Info, ArrowRight, Heart, CheckCircle, Navigation, ChevronLeft, ChevronRight, Utensils, ShoppingBag, ExternalLink } from 'lucide-react';

// --- 資料設定 (Data Configuration) ---

const tripData = {
  days: [
    { id: 1, title: 'Day 1', label: '名古・神宮', color: 'bg-blue-100 text-blue-800', mapColor: '#93C5FD', stroke: 'stroke-blue-400' },
    { id: 2, title: 'Day 2', label: '高山・古街', color: 'bg-green-100 text-green-800', mapColor: '#86EFAC', stroke: 'stroke-green-400' },
    { id: 3, title: 'Day 3', label: '秘境・二選一', color: 'bg-orange-100 text-orange-800', mapColor: '#FDBA74', stroke: 'stroke-orange-400' },
    { id: 4, title: 'Day 4', label: '伊勢・神宮', color: 'bg-purple-100 text-purple-800', mapColor: '#D8B4FE', stroke: 'stroke-purple-400' },
    { id: 5, title: 'Day 5', label: '犬山・城下', color: 'bg-yellow-100 text-yellow-800', mapColor: '#FDE047', stroke: 'stroke-yellow-400' },
    { id: 6, title: 'Day 6', label: '市區・散策', color: 'bg-slate-200 text-slate-700', mapColor: '#94A3B8', stroke: 'stroke-slate-400' },
  ],
  spots: {
    1: [
      { 
        id: '1-1', 
        name: '熱田神宮', 
        x: 55, y: 75, 
        desc: '供奉草薙神劍的古老神社，擁有清幽的森林步道與心靈寧靜，是名古屋的心靈支柱。', 
        price: '免費 (寶物館另計)', 
        time: '機場/車站出發約 30-40 分', 
        transport: 'rail', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Atsuta+Shrine+Torii',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Treasure+Hall',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Sacred+Wall'
        ],
        food: [
          { name: '宮碁子麵 (Kishimen)', url: 'https://centrip-japan.com/tch/spot/299.html' },
          { name: '熱田蓬萊軒 鰻魚飯三吃', url: 'https://monicaleecat.pixnet.net/blog/post/341695299' },
          { name: '喜與女茶寮 抹茶紅豆', url: 'https://www.google.com/search?q=熱田神宮+喜與女茶寮' }
        ],
        souvenir: [
          { name: '喜與女餅 (Kiyome Mochi)', url: 'https://www.google.com/search?q=喜與女餅+介紹' },
          { name: '白鳥守 (祈求開運)', url: 'https://www.google.com/search?q=熱田神宮+白鳥守' },
          { name: '神宮御神酒', url: 'https://www.google.com/search?q=熱田神宮+御神酒' }
        ]
      },
      { 
        id: '1-2', 
        name: '大須觀音＆商店街', 
        x: 50, y: 72, 
        desc: '充滿活力的商店街與莊嚴寺院，是體驗名古屋庶民文化、二手古著與街頭美食的最佳去處。', 
        price: '免費', 
        time: '熱田神宮出發約 15-20 分', 
        transport: 'subway', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Osu+Kannon+Temple',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Shopping+Street',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Lucky+Cat'
        ],
        food: [
          { name: '味仙 台灣拉麵', url: 'https://chubu-roo.com/chn/destination/misen/' },
          { name: '李先生的台灣名物屋台', url: 'https://www.google.com/search?q=大須+李先生的台灣名物屋台' },
          { name: '水果大福', url: 'https://www.google.com/search?q=大須+水果大福+介紹' },
          { name: '鯛福茶庵 鯛魚燒', url: 'https://www.google.com/search?q=鯛福茶庵+介紹' }
        ],
        souvenir: [
          { name: '青柳總本家 青蛙饅頭', url: 'https://bobbyfun.tw/nagoya-souvenir/' },
          { name: '大須外郎糕 (Uiro)', url: 'https://www.google.com/search?q=大須外郎糕' },
          { name: 'Alice on Wednesday', url: 'https://www.google.com/search?q=水曜日的愛麗絲+名古屋' }
        ]
      },
    ],
    2: [
      { 
        id: '2-1', 
        name: '高山老街 (三町)', 
        x: 50, y: 35, 
        desc: '保留江戶時代風貌的古街，兩旁林立著釀酒廠與味噌店，宛如穿越時空的小京都。', 
        price: '免費', 
        time: '名古屋出發約 2.5 小時', 
        transport: 'train', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Takayama+Old+Town',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Hida+Beef+Sushi',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Morning+Market'
        ],
        food: [
          { name: '飛驒牛握壽司 (こって牛)', url: 'https://www.adifferenttraveler.com/takayama-hida-beef/' },
          { name: '五平餅', url: 'https://www.google.com/search?q=高山老街+五平餅' },
          { name: '飛驒牛可樂餅', url: 'https://www.google.com/search?q=高山+飛驒牛可樂餅' },
          { name: '高山布丁', url: 'https://www.google.com/search?q=高山布丁亭' }
        ],
        souvenir: [
          { name: '猿寶寶 (Sarubobo)', url: 'https://www.google.com/search?q=飛驒高山+猿寶寶' },
          { name: '飛驒地酒 (舩坂酒造店)', url: 'https://www.google.com/search?q=舩坂酒造店' },
          { name: '朴葉味噌調理包', url: 'https://www.google.com/search?q=朴葉味噌+伴手禮' }
        ]
      },
      { 
        id: '2-2', 
        name: '飛驒國分寺', 
        x: 48, y: 33, 
        desc: '擁有樹齡超過1200年的大銀杏樹與古老三重塔，是高山市區最古老的寺院。', 
        price: '拜觀費約 300 円', 
        time: '老街步行約 10 分', 
        transport: 'walk', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Kokubunji+Pagoda',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Ginkgo+Tree',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Sarubobo+Dolls'
        ],
        food: [
          { name: '傳統喫茶店', url: 'https://www.google.com/search?q=高山+國分寺+咖啡' },
          { name: '高山拉麵', url: 'https://www.google.com/search?q=高山拉麵+推薦' }
        ],
        souvenir: [
          { name: '庚申堂護身符', url: 'https://www.google.com/search?q=飛驒國分寺+御守' },
          { name: '銀杏相關紀念品', url: 'https://www.google.com/search?q=高山+銀杏+伴手禮' }
        ]
      },
    ],
    4: [
      { 
        id: '4-1', 
        name: '伊勢神宮 外宮', 
        x: 45, y: 90, 
        desc: '供奉產業與食物之神豐受大御神，參拜伊勢神宮依照習俗需先由外宮開始，感受神聖莊嚴。', 
        price: '免費', 
        time: '名古屋出發約 1.5 小時', 
        transport: 'train', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Ise+Geku+Main',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Geku+Approach',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Magatama+Pond'
        ],
        food: [
          { name: '赤福餅 (外宮特設店)', url: 'https://www.iseshima-kanko.jp/zh-TW/see-and-do/1366' },
          { name: '丹下飯糰', url: 'https://www.google.com/search?q=伊勢外宮+丹下飯糰' }
        ],
        souvenir: [
          { name: '外宮參道 勾玉飾品', url: 'https://www.google.com/search?q=伊勢+勾玉' },
          { name: '伊勢木綿手帕', url: 'https://www.google.com/search?q=伊勢木綿' }
        ]
      },
      { 
        id: '4-2', 
        name: '內宮＆托福橫丁', 
        x: 48, y: 92, 
        desc: '日本地位最高的神社，參拜後可在托福橫丁享用赤福與伊勢烏龍麵，感受江戶時代的熱鬧氣氛。', 
        price: '免費', 
        time: '外宮出發約 10-15 分', 
        transport: 'bus', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Uji+Bridge',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Manekineko',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Sacred+Tree'
        ],
        food: [
          { name: '赤福餅 (本店)', url: 'https://www.gltjp.com/zh-hant/directory/item/14750/' },
          { name: '伊勢烏龍麵 (Fukusuke)', url: 'https://www.google.com/search?q=伊勢烏龍麵+福助' },
          { name: '豚捨 可樂餅', url: 'https://www.google.com/search?q=托福橫丁+豚捨' },
          { name: '松阪牛串燒', url: 'https://www.google.com/search?q=托福橫丁+松阪牛串燒' },
          { name: '赤福冰 (夏限定)', url: 'https://www.google.com/search?q=赤福冰' }
        ],
        souvenir: [
          { name: '赤福餅 (伴手禮盒)', url: 'https://www.iseshima-kanko.jp/zh-TW/see-and-do/1366' },
          { name: '托福犬 (Okage-inu)', url: 'https://chubu.letsgojp.com/archives/720933/' },
          { name: '伊勢珍珠飾品', url: 'https://www.google.com/search?q=伊勢志摩+珍珠+伴手禮' },
          { name: '五十鈴川 薰香', url: 'https://www.google.com/search?q=五十鈴川+薰香' }
        ]
      },
    ],
    5: [
      { 
        id: '5-1', 
        name: '犬山城', 
        x: 55, y: 60, 
        desc: '日本現存最古老木造天守閣，國寶五城之一，攀爬至頂層可360度俯瞰木曾川與濃尾平原絕景。', 
        price: '大人 550 円', 
        time: '名古屋出發約 30-35 分', 
        transport: 'train', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Inuyama+Keep',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Cherry+Blossom',
          'https://placehold.co/800x500/e2e8f0/64748b?text=River+View'
        ],
        food: [
          { name: '城前廣場 抹茶冰淇淋', url: 'https://www.google.com/search?q=犬山城+抹茶冰淇淋' }
        ],
        souvenir: [
          { name: '御朱印 (登城紀念)', url: 'https://www.google.com/search?q=犬山城+御朱印' },
          { name: '天守閣造型磁鐵', url: 'https://www.google.com/search?q=犬山城+紀念品' }
        ]
      },
      { 
        id: '5-2', 
        name: '城下町散策', 
        x: 55, y: 63, 
        desc: '充滿昭和風情的街道，有許多可愛的糰子與手作小物店鋪，適合穿著浴衣漫步拍照。', 
        price: '免費', 
        time: '犬山城步行約 10 分', 
        transport: 'walk', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Castle+Town',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Heart+Ema',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Dango'
        ],
        food: [
          { name: '山田五平餅店', url: 'https://gototravel.tw/inuyama-goheimochi/' },
          { name: '芳川屋 水果霜淇淋', url: 'https://www.google.com/search?q=犬山+芳川屋' },
          { name: '戀小町糰子', url: 'https://waitingangel0514.pixnet.net/blog/post/357830247' },
          { name: '醬油烤糰子', url: 'https://www.google.com/search?q=犬山+壽俵屋+醬油糰子' }
        ],
        souvenir: [
          { name: '犬山燒 (陶器)', url: 'https://www.google.com/search?q=犬山燒' },
          { name: '守口漬 (漬物)', url: 'https://www.google.com/search?q=犬山+守口漬' },
          { name: '拳骨糖 (Genkotsu)', url: 'https://www.google.com/search?q=犬山+拳骨糖' }
        ]
      },
    ],
    6: [
      { 
        id: '6-1', 
        name: '名古屋城公園', 
        x: 52, y: 68, 
        desc: '金鯱閃耀的名城，本丸御殿內部金碧輝煌的屏風畫作令人嘆為觀止，是德川家康的權力象徵。', 
        price: '大人 500 円', 
        time: '飯店出發約 20 分', 
        transport: 'subway', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Nagoya+Keep',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Hommaru+Palace',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Golden+Shachihoko'
        ],
        food: [
          { name: '金鯱燒 (人形燒)', url: 'https://chubu.letsgojp.com/archives/46472/' },
          { name: '金鯱橫丁 矢場炸豬排', url: 'https://www.google.com/search?q=金鯱橫丁+矢場豬排' },
          { name: '鳥開總本家 親子丼', url: 'https://www.google.com/search?q=名古屋城+鳥開總本家' }
        ],
        souvenir: [
          { name: '金鯱造型周邊', url: 'https://www.google.com/search?q=名古屋城+金鯱+紀念品' },
          { name: '德川家紋 紀念品', url: 'https://www.google.com/search?q=名古屋城+家紋+商品' }
        ]
      },
      { 
        id: '6-2', 
        name: '榮/名站購物', 
        x: 52, y: 70, 
        desc: '旅程最後的休閒時光，在綠洲21拍照或百貨公司採買伴手禮，將名古屋的美味帶回家。', 
        price: '依個人消費', 
        time: '名古屋城出發約 15 分', 
        transport: 'subway', 
        images: [
          'https://placehold.co/800x500/e2e8f0/64748b?text=Oasis+21',
          'https://placehold.co/800x500/e2e8f0/64748b?text=TV+Tower',
          'https://placehold.co/800x500/e2e8f0/64748b?text=Station+Towers'
        ],
        food: [
          { name: 'Komeda 咖啡 (早餐)', url: 'https://gogojp.tw/komeda-coffee/' },
          { name: '世界的山將 手羽先', url: 'https://www.google.com/search?q=世界的山將+手羽先' },
          { name: 'Harbs 水果千層蛋糕', url: 'https://www.google.com/search?q=HARBS+榮本店' },
          { name: '地雷也 炸蝦飯糰', url: 'https://www.google.com/search?q=地雷也+炸蝦飯糰' }
        ],
        souvenir: [
          { name: '坂角總本舖 蝦餅', url: 'https://www.gltjp.com/zh-hant/directory/item/11806/' },
          { name: '兩口屋是清 羊羹', url: 'https://www.google.com/search?q=兩口屋是清+推薦' },
          { name: '小倉吐司夾心餅乾', url: 'https://www.google.com/search?q=小倉吐司夾心餅乾' },
          { name: 'Calbee 雞翅口味薯條', url: 'https://www.google.com/search?q=Calbee+名古屋限定' }
        ]
      },
    ],
  },
  day3Options: {
    A: {
      title: '選項 A：神之故鄉 上高地',
      routeColor: '#FB923C', // Orange
      spots: [
        { 
          id: '3A-1', 
          name: '平湯溫泉轉運站', 
          x: 60, y: 28, 
          desc: '前往上高地的門戶，可在此稍作休息，享用溫泉蛋與足湯，舒緩旅途疲勞。', 
          price: '-', 
          time: '高山出發約 50 分', 
          transport: 'bus', 
          images: [
            'https://placehold.co/800x500/e2e8f0/64748b?text=Hirayu+Onsen',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Bus+Terminal',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Beef+Bun'
          ],
          food: [
            { name: '半熟溫泉蛋', url: 'https://www.google.com/search?q=平湯溫泉+溫泉蛋' },
            { name: '飛驒牛包子', url: 'https://www.google.com/search?q=平湯+飛驒牛包子' }
          ],
          souvenir: [
            { name: '平湯溫泉 濃縮湯花', url: 'https://www.google.com/search?q=平湯溫泉+湯花' },
            { name: '當地限定 地酒', url: 'https://www.google.com/search?q=奧飛驒+地酒' }
          ]
        },
        { 
          id: '3A-2', 
          name: '上高地 河童橋', 
          x: 70, y: 25, 
          desc: '日本阿爾卑斯山的絕景，清澈梓川與穗高連峰倒映水中，呼吸全日本最純淨的空氣。', 
          price: '入山免費', 
          time: '平湯出發約 30 分', 
          transport: 'bus', 
          images: [
            'https://placehold.co/800x500/e2e8f0/64748b?text=Kappa+Bridge',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Taisho+Pond',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Azusa+River'
          ],
          food: [
            { name: 'Trois Cinq 蘋果派', url: 'https://www.google.com/search?q=上高地+蘋果派' },
            { name: '河童燒', url: 'https://www.google.com/search?q=上高地+河童燒' },
            { name: '五千尺飯店 起司蛋糕', url: 'https://www.google.com/search?q=五千尺飯店+起司蛋糕' }
          ],
          souvenir: [
            { name: '信州蘋果汁', url: 'https://www.google.com/search?q=信州蘋果汁+推薦' },
            { name: '河童造型 玩偶吊飾', url: 'https://www.google.com/search?q=上高地+河童+紀念品' },
            { name: '蘋果年輪蛋糕', url: 'https://www.google.com/search?q=信州+蘋果年輪蛋糕' }
          ]
        },
      ]
    },
    B: {
      title: '選項 B：童話世界 合掌村',
      routeColor: '#FBBF24', // Amber/Yellowish
      spots: [
        { 
          id: '3B-1', 
          name: '白川鄉 合掌村', 
          x: 35, y: 25, 
          desc: '世界文化遺產，如同童話般的茅草屋聚落，走在田埂間感受日本原風景的純樸與感動。', 
          price: '入村免費', 
          time: '高山出發約 50 分', 
          transport: 'bus', 
          images: [
            'https://placehold.co/800x500/e2e8f0/64748b?text=Shirakawa-go',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Thatched+Houses',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Wada+House'
          ],
          food: [
            { name: '五平餅', url: 'https://bjsmile.tw/shirakawa-go/' },
            { name: '飛驒牛串燒', url: 'https://www.google.com/search?q=白川鄉+飛驒牛串燒' },
            { name: '濁酒布丁', url: 'https://www.google.com/search?q=白川鄉+濁酒布丁' }
          ],
          souvenir: [
            { name: '結米香 (Yui-Okoshi)', url: 'https://centrip-japan.com/tch/article/947.html' },
            { name: '紫蘇最中餅', url: 'https://www.google.com/search?q=白川鄉+紫蘇最中餅' },
            { name: '飛驒紅蕪菁漬物', url: 'https://www.google.com/search?q=飛驒紅蕪菁漬' }
          ]
        },
        { 
          id: '3B-2', 
          name: '城山展望台', 
          x: 33, y: 23, 
          desc: '俯瞰整個合掌村落的最佳視角，能拍出明信片般的經典全景，是攝影愛好者必訪之地。', 
          price: '接駁車 200 円', 
          time: '村內步行或接駁', 
          transport: 'walk', 
          images: [
            'https://placehold.co/800x500/e2e8f0/64748b?text=Shiroyama+View',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Winter+Lightup',
            'https://placehold.co/800x500/e2e8f0/64748b?text=Shuttle+Bus'
          ],
          food: [
            { name: '展望台 咖啡', url: 'https://www.google.com/search?q=城山展望台+咖啡' },
            { name: '熱甘酒', url: 'https://www.google.com/search?q=白川鄉+甘酒' }
          ],
          souvenir: [
            { name: '限定明信片', url: 'https://www.google.com/search?q=白川鄉+展望台+明信片' }
          ]
        },
      ]
    }
  }
};

// --- 組件 (Components) ---

// 0. 圖片輪播組件 (Image Carousel)
const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // 每次 images 改變時重置
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  return (
    <div className="group relative h-48 w-full bg-stone-200 sm:h-64">
      <img 
        src={images[currentIndex]} 
        alt={`${title} - photo ${currentIndex + 1}`} 
        className="h-full w-full object-cover transition-all duration-500 ease-in-out" 
      />
      
      {/* Left Arrow */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft size={20} />
      </button>
      
      {/* Right Arrow */}
      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={(e) => { e.stopPropagation(); goToSlide(slideIndex); }}
            className={`cursor-pointer rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-white w-2.5 h-2.5' : 'bg-white/50 w-2 h-2 hover:bg-white/80'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};


// 1. 投票與選項切換卡片
const VotingCard = ({ option, title, desc, img, isSelected, onSelect, votes }) => (
  <div
    onClick={onSelect}
    className={`cursor-pointer group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
      isSelected ? 'border-orange-400 bg-orange-50/50 shadow-md' : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'
    }`}
  >
    <div className="aspect-video w-full overflow-hidden">
      <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      {isSelected && (
        <div className="absolute top-2 right-2 rounded-full bg-orange-500 p-1 text-white shadow-sm">
          <CheckCircle size={20} />
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-stone-800">{title}</h3>
      <p className="mt-1 text-sm text-stone-500 line-clamp-2">{desc}</p>
      
      {/* 模擬投票條 */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-medium text-stone-600 mb-1">
          <span>團員偏好</span>
          <span>{votes}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isSelected ? 'bg-orange-400' : 'bg-stone-400'}`} 
            style={{ width: `${votes}%` }} 
          />
        </div>
      </div>
      
      <button className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${
        isSelected ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200'
      }`}>
        {isSelected ? '已選擇此方案' : '選擇此方案'}
      </button>
    </div>
  </div>
);

// 2. 景點詳情卡片
const SpotDetailCard = ({ spot, onClose }) => {
  if (!spot) return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center text-stone-400">
      <MapPin size={48} className="mb-4 opacity-50" />
      <p>點擊地圖上的節點<br/>查看詳細資訊</p>
    </div>
  );

  const getTransportIcon = (type) => {
    switch(type) {
      case 'train': return <Train size={16} />;
      case 'bus': return <Bus size={16} />;
      case 'subway': return <Train size={16} />; 
      default: return <Navigation size={16} />; 
    }
  };

  return (
    <div className="animate-fade-in-up flex flex-col h-full overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-lg shadow-stone-200/50">
      
      {/* 圖片輪播區 */}
      <div className="relative w-full bg-stone-200 shrink-0">
        <ImageCarousel images={spot.images} title={spot.name} />
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-stone-600 backdrop-blur-sm transition hover:bg-white hover:text-stone-900 shadow-sm"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* 內容區 - 可捲動 */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
        <h2 className="mb-2 text-2xl font-bold tracking-wide text-stone-800">{spot.name}</h2>
        <p className="mb-6 leading-relaxed text-stone-600 text-sm">{spot.desc}</p>
        
        {/* 基本資訊區 */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase">交通時間</p>
              <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                {getTransportIcon(spot.transport)}
                {spot.time}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
             <div className="rounded-lg bg-yellow-50 p-2 text-yellow-600">
              <Info size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase">票價參考</p>
              <p className="text-sm font-medium text-stone-700">{spot.price}</p>
            </div>
          </div>
        </div>

        {/* 美食與伴手禮區 (連結互動版) */}
        <div className="border-t border-stone-100 pt-6 space-y-6">
          
          {/* 必吃美食 */}
          {spot.food && spot.food.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="bg-red-50 p-1.5 rounded-full text-red-500">
                    <Utensils size={16} />
                 </div>
                 <h3 className="font-bold text-stone-800 text-sm">必吃美食 & 小吃</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {spot.food.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-600 border border-stone-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors group"
                  >
                    {item.name}
                    <ExternalLink size={10} className="text-stone-400 group-hover:text-red-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 推薦伴手禮 */}
          {spot.souvenir && spot.souvenir.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="bg-emerald-50 p-1.5 rounded-full text-emerald-600">
                    <ShoppingBag size={16} />
                 </div>
                 <h3 className="font-bold text-stone-800 text-sm">特色伴手禮推薦</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {spot.souvenir.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-600 border border-stone-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors group"
                  >
                    {item.name}
                    <ExternalLink size={10} className="text-stone-400 group-hover:text-emerald-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// 3. SVG 地圖組件
const StylizedMap = ({ activeSpots, activeDay, dayColor, onSpotClick, selectedSpotId }) => {
  // 簡化地圖的背景路徑 (Japan Outline abstract)
  // 這裡用簡單的 Path 模擬中部地區的形狀
  const mapOutline = "M 40 95 L 35 85 L 30 70 L 20 60 L 25 40 L 30 20 L 45 10 L 70 15 L 80 30 L 85 50 L 75 80 L 60 90 L 50 95 Z";
  
  // 繪製連接線
  const renderPath = () => {
    if (activeSpots.length < 2) return null;
    
    // 生成路徑點字符串 "M x1 y1 L x2 y2 ..."
    const pathD = activeSpots.reduce((acc, spot, index) => {
      return index === 0 ? `M ${spot.x} ${spot.y}` : `${acc} L ${spot.x} ${spot.y}`;
    }, "");

    return (
      <path
        d={pathD}
        fill="none"
        className={`${dayColor} transition-all duration-700 ease-out`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 2"
        style={{ animation: 'dash 30s linear infinite' }}
      />
    );
  };

  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto select-none p-4">
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-xl filter">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 背景地圖 - 抽象輪廓 */}
        <path d={mapOutline} fill="#F5F5F4" stroke="#E7E5E4" strokeWidth="1" />
        
        {/* 標示重要城市文字 (背景層) */}
        <text x="52" y="76" fontSize="3" fill="#A8A29E" textAnchor="middle" className="font-sans font-bold opacity-50">名古屋</text>
        <text x="50" y="40" fontSize="3" fill="#A8A29E" textAnchor="middle" className="font-sans font-bold opacity-50">高山</text>

        {/* 路線 */}
        {renderPath()}

        {/* 景點節點 */}
        {activeSpots.map((spot, index) => {
          const isSelected = selectedSpotId === spot.id;
          return (
            <g 
              key={spot.id} 
              onClick={() => onSpotClick(spot)}
              className="cursor-pointer group"
              style={{ transition: 'all 0.3s ease' }}
            >
              {/* 脈衝動畫圈圈 (僅選中時顯示) */}
              {isSelected && (
                <circle cx={spot.x} cy={spot.y} r="6" className={`${dayColor.replace('stroke-', 'fill-')} opacity-20 animate-ping`} />
              )}
              
              {/* 外圈 */}
              <circle 
                cx={spot.x} 
                cy={spot.y} 
                r={isSelected ? 3.5 : 2} 
                fill="white" 
                className={`${dayColor} transition-all duration-300`}
                strokeWidth="1"
              />
              
              {/* 內芯 */}
              <circle 
                cx={spot.x} 
                cy={spot.y} 
                r={isSelected ? 2 : 1.2} 
                className={`${dayColor.replace('stroke-', 'fill-')} transition-all duration-300`} 
              />

              {/* 景點名稱標籤 (Hover 或 Selected 顯示) */}
              <g className={`transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <rect 
                  x={spot.x - 12} 
                  y={spot.y - 8} 
                  width="24" 
                  height="5" 
                  rx="1"
                  fill="white" 
                  className="shadow-sm"
                />
                <text 
                  x={spot.x} 
                  y={spot.y - 4.5} 
                  fontSize="2.5" 
                  fill="#44403C" 
                  textAnchor="middle" 
                  className="font-sans font-bold"
                >
                  {spot.name}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --- 主應用 (Main App) ---

export default function NagoyaTripPlanner() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [day3Choice, setDay3Choice] = useState('A'); // 'A' or 'B'
  
  // 模擬投票數據
  const [votes, setVotes] = useState({ A: 63, B: 37 });

  // 取得當前顯示的景點列表
  const getActiveSpots = () => {
    if (currentDay === 3) {
      return tripData.day3Options[day3Choice].spots;
    }
    return tripData.spots[currentDay] || [];
  };

  // 取得當前顏色的 Class
  const getCurrentColor = () => {
    if (currentDay === 3) {
      return day3Choice === 'A' ? 'stroke-orange-400' : 'stroke-yellow-500'; // Day 3 特殊處理
    }
    return tripData.days.find(d => d.id === currentDay)?.stroke || 'stroke-slate-400';
  };

  // 當天數改變時，重置選中的景點，並自動選擇第一個景點
  useEffect(() => {
    const spots = getActiveSpots();
    if (spots.length > 0) {
      // 延遲一點點讓地圖先轉場
      const timer = setTimeout(() => setSelectedSpot(spots[0]), 300);
      return () => clearTimeout(timer);
    } else {
      setSelectedSpot(null);
    }
  }, [currentDay, day3Choice]);

  // 處理投票
  const handleVote = (choice) => {
    setDay3Choice(choice);
    // 簡單模擬投票變化
    if (choice === 'A') setVotes({ A: 65, B: 35 });
    else setVotes({ A: 45, B: 55 });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200">
      
      {/* 頂部導航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">名古屋・中部六日慢旅</h1>
              <p className="text-xs text-stone-500">人文・自然・美食｜六人精緻小團</p>
            </div>
            {/* 桌面版的天數指示器 */}
            <div className="hidden md:flex gap-1">
              {tripData.days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setCurrentDay(day.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentDay === day.id 
                      ? `${day.color} shadow-sm ring-1 ring-stone-200` 
                      : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                  }`}
                >
                  <span className="block text-xs font-bold uppercase tracking-wider">{day.title}</span>
                  <span className="block text-xs">{day.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 手機版 Day 切換 (橫向滾動) */}
        <div className="md:hidden overflow-x-auto pb-2 px-4 scrollbar-hide flex gap-2 border-t border-stone-50 bg-stone-50/50 pt-2">
           {tripData.days.map((day) => (
            <button
              key={day.id}
              onClick={() => setCurrentDay(day.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                 currentDay === day.id 
                  ? `${day.color} border border-stone-200` 
                  : 'bg-white text-stone-400 border border-stone-100'
              }`}
            >
              {day.title} {day.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 h-[calc(100vh-140px)] lg:h-[calc(100vh-180px)] min-h-[600px]">
          
          {/* 左側/上方：地圖互動區 */}
          <div className="lg:col-span-5 flex flex-col order-1 h-full">
            <div className="relative rounded-3xl bg-white p-6 shadow-xl shadow-stone-200/40 ring-1 ring-stone-100/50 overflow-hidden flex-1 flex flex-col justify-center">
              {/* 裝飾背景 */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-stone-50 blur-3xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-stone-50 blur-3xl opacity-50"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 text-center">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase mb-2 ${tripData.days[currentDay-1].color}`}>
                    {tripData.days[currentDay-1].title} Route
                  </span>
                  <h2 className="text-xl font-bold text-stone-800">
                    {currentDay === 3 ? (day3Choice === 'A' ? '上高地健行' : '合掌村散策') : tripData.days[currentDay-1].label}
                  </h2>
                </div>
                
                <StylizedMap 
                  activeSpots={getActiveSpots()} 
                  activeDay={currentDay}
                  dayColor={getCurrentColor()}
                  onSpotClick={setSelectedSpot}
                  selectedSpotId={selectedSpot?.id}
                />
                
                <p className="mt-4 text-xs text-stone-400 flex items-center gap-1">
                  <Info size={12} />
                  點擊節點查看詳細資訊
                </p>
              </div>
            </div>

            {/* Day 3 特殊投票區塊 (僅在 Day 3 顯示且在手機版置於地圖下方) */}
            {currentDay === 3 && (
              <div className="mt-4 p-4 rounded-xl bg-orange-50 border border-orange-100 animate-fade-in shrink-0">
                <div className="flex items-center gap-2 mb-3 text-orange-800">
                  <Heart size={18} className="text-orange-500 fill-orange-500" />
                  <h3 className="font-bold text-sm">行程票選中</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                   {/* 簡化版切換鈕 */}
                   <button 
                    onClick={() => handleVote('A')}
                    className={`p-2 text-xs rounded border text-center transition ${day3Choice === 'A' ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-stone-500 border-stone-200'}`}
                   >
                    上高地 ({votes.A}%)
                   </button>
                   <button 
                    onClick={() => handleVote('B')}
                    className={`p-2 text-xs rounded border text-center transition ${day3Choice === 'B' ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-stone-500 border-stone-200'}`}
                   >
                    合掌村 ({votes.B}%)
                   </button>
                </div>
              </div>
            )}
          </div>

          {/* 右側：詳細資訊與列表 */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 h-full overflow-hidden">
            
            {/* 1. 如果是 Day 3，顯示大張投票卡 */}
            {currentDay === 3 ? (
              <div className="space-y-6 overflow-y-auto pr-2">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-stone-800">Day 3 行程方案比較</h2>
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded">點選卡片切換地圖預覽</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <VotingCard 
                      option="A" 
                      title={tripData.day3Options.A.title}
                      desc="漫步神降之地，享受阿爾卑斯山脈的清新空氣與壯麗山景，適合喜愛自然健行的您。"
                      img={tripData.day3Options.A.spots[1].images[0]}
                      isSelected={day3Choice === 'A'}
                      onSelect={() => handleVote('A')}
                      votes={votes.A}
                    />
                    <VotingCard 
                      option="B" 
                      title={tripData.day3Options.B.title}
                      desc="探訪世界遺產合掌造聚落，走入時光隧道般的日本原風景，適合喜愛人文攝影的您。"
                      img={tripData.day3Options.B.spots[0].images[0]}
                      isSelected={day3Choice === 'B'}
                      onSelect={() => handleVote('B')}
                      votes={votes.B}
                    />
                 </div>
              </div>
            ) : (
              // 2. 其他天數：顯示景點列表摘要
              <div className="grid grid-cols-1 gap-4 shrink-0">
                <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                  <span className="h-6 w-1 bg-stone-800 rounded-full"></span>
                  當日行程概覽
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {getActiveSpots().map((spot, idx) => (
                      <div 
                        key={spot.id}
                        onClick={() => setSelectedSpot(spot)}
                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${
                          selectedSpot?.id === spot.id 
                          ? 'bg-white border-stone-400 shadow-md transform scale-[1.02]' 
                          : 'bg-stone-50 border-stone-100 hover:bg-white hover:border-stone-200'
                        }`}
                      >
                         <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-stone-200">
                           <img src={spot.images[0]} alt={spot.name} className="h-full w-full object-cover" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-800 text-[10px] font-bold text-white">{idx + 1}</span>
                              <h3 className="font-bold text-stone-800">{spot.name}</h3>
                            </div>
                            <p className="text-xs text-stone-500 mt-1 line-clamp-1">{spot.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {/* 詳細資訊卡片區 (固定在下方或右下方) */}
            <div className="flex-1 min-h-0">
               <SpotDetailCard spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
            </div>

          </div>
        </div>
      </main>

      {/* 底部 Footer */}
      <footer className="mt-6 border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        <p>© 2024 Nagoya Premium Tour Design. Designed for Family & Seniors.</p>
        <p className="mt-2">行程時間與票價僅供參考，實際情況依現場為主。</p>
      </footer>

      {/* CSS 動畫樣式補充 */}
      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}