export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  coverImage?: string;
  category: "Personality" | "Fun" | "Vibe" | "个性" | "趣味" | "氛围";
  duration: string;
  questions: Question[];
  resultLabel?: string;
  scoring: (answers: Record<string, number>) => { level: string; description: string; image?: string; quote?: string };
}

// Helper to calculate result based on frequency
const getDominantValues = (answers: Record<string, number>): number[] => {
  const counts: Record<number, number> = {};
  Object.values(answers).forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
  });
  
  let maxCount = 0;
  
  Object.values(counts).forEach(count => {
    if (count > maxCount) {
      maxCount = count;
    }
  });

  const dominantVals: number[] = [];
  Object.entries(counts).forEach(([val, count]) => {
    if (count === maxCount) {
      dominantVals.push(Number(val));
    }
  });
  
  return dominantVals.length > 0 ? dominantVals : [1];
};

const testsZh: Test[] = [
  {
    id: "kpop-chosengroup1",
    title: "谁是你的天选Kpop女团？",
    description: "C位出道的机会摆在你的面前！成为人间香奈儿，还是自信千金？化身元气甜心，还是旷野战士？10道题揭秘你的女团本命！",
    coverImage: "https://s41.ax1x.com/2026/02/21/pZjZgFs.png",
    instructions: [
      "想象你是一位即将出道的练习生，选择权就握在你的手中。",
      "凭直觉选择最符合你风格的选项。",
      "不要犹豫，展现最真实的自己！"
    ],
    category: "趣味",
    duration: "3 分钟",
    questions: [
      {
        id: "q1",
        text: "出道舞台，你会选择哪种风格的打歌服？",
        options: [
          { text: "奢华大牌混搭，酷飒且贵气逼人。", value: 1 }, // BP
          { text: "财阀千金风，精致的蕾丝、珍珠和蝴蝶结。", value: 2 }, // IVE
          { text: "色彩鲜艳，充满活力的元气运动风或亮片裙。", value: 3 }, // TWICE
          { text: "未来感机能风，金属光泽，利落剪裁。", value: 4 }, // aespa
          { text: "大胆前卫，打破常规的牛仔或概念服装。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q2",
        text: "你在团内想担任什么担当？",
        options: [
          { text: "气场全开的Rapper或时尚Icon。", value: 1 }, // BP
          { text: "天生C位，让人移不开眼的视觉中心。", value: 2 }, // IVE
          { text: "元气满满，凝聚团队的队长或活力素。", value: 3 }, // TWICE
          { text: "拥有独特世界观，实力强劲的ACE。", value: 4 }, // aespa
          { text: "亲自操刀词曲，掌控舞台的制作人。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q3",
        text: "你最喜欢的MV场景是？",
        options: [
          { text: "爆破场面、直升机、镶钻坦克的宏大场景。", value: 1 }, // BP
          { text: "华丽的豪宅、满是镜子的房间，尽显自恋美学。", value: 2 }, // IVE
          { text: "阳光沙滩、泳池派对，夏日感拉满。", value: 3 }, // TWICE
          { text: "在虚拟异次元空间大战巨兽。", value: 4 }, // aespa
          { text: "充满讽刺意味的玛丽莲梦露式舞台或百老汇。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q4",
        text: "你会把全球巡演的第一站选在哪个城市？",
        options: [
          { text: "巴黎：在时尚之都，开启一场奢华的视听盛宴。", value: 1 }, // BP
          { text: "首尔：在K-pop中心，展现最精致完美的千金舞台。", value: 2 }, // IVE
          { text: "东京：在巨蛋的粉色灯海中，与粉丝元气互动。", value: 3 }, // TWICE
          { text: "纽约：在时代广场的霓虹下，连接现实与虚拟世界。", value: 4 }, // aespa
          { text: "伦敦：在充满艺术气息的街头，释放自由不羁的灵魂。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q5",
        text: "朋友们通常怎么形容你？",
        options: [
          { text: "高冷、自信，有点让人不敢接近但很讲义气。", value: 1 }, // BP
          { text: "优雅、自信，有点小自恋但超有魅力。", value: 2 }, // IVE
          { text: "小太阳，开心果，有你在就不会冷场。", value: 3 }, // TWICE
          { text: "脑洞大，有点中二，酷酷的。", value: 4 }, // aespa
          { text: "直率、敢说敢做，很有主见。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q6",
        text: "终于休假了，你会去哪里？",
        options: [
          { text: "飞去巴黎看时装秀，或者去奢侈品店Shopping。", value: 1 }, // BP
          { text: "去做普拉提，或者享受精致的下午茶。", value: 2 }, // IVE
          { text: "和姐妹们聚餐，或者去游乐园。", value: 3 }, // TWICE
          { text: "宅家打游戏，看动漫，或者研究黑科技。", value: 4 }, // aespa
          { text: "关在工作室写歌，或者去没人认识的地方采风。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q7",
        text: "面对网上的恶评，你的态度是？",
        options: [
          { text: "无视。姐就是女王，自信放光芒。", value: 1 }, // BP
          { text: "不在乎。我爱我自己就够了。", value: 2 }, // IVE
          { text: "用微笑回应，更加努力证明自己。", value: 3 }, // TWICE
          { text: "踩碎它们，强力回击。", value: 4 }, // aespa
          { text: "写进歌里Diss回去。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q8",
        text: "出门必带的时尚单品是？",
        options: [
          { text: "黑超墨镜，大牌包包。", value: 1 }, // BP
          { text: "珍珠项链，精致发箍。", value: 2 }, // IVE
          { text: "可爱的应援棒，亮色配饰。", value: 3 }, // TWICE
          { text: "金属美甲，未来感墨镜。", value: 4 }, // aespa
          { text: "麦克风，或者酷酷的纹身贴。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q9",
        text: "舞台结束时的Ending Pose，你会做？",
        options: [
          { text: "酷飒眼神杀，外加一个甩头。", value: 1 }, // BP
          { text: "精致的Wink，或者飞吻。", value: 2 }, // IVE
          { text: "灿烂的笑容，比个大大的爱心。", value: 3 }, // TWICE
          { text: "凌厉的眼神，仿佛要看穿镜头。", value: 4 }, // aespa
          { text: "歪嘴一笑，或者不屑的表情。", value: 5 }, // IDLE
        ],
      },
      {
        id: "q10",
        text: "作为女团成员，你的终极目标是？",
        options: [
          { text: "成为世界级巨星和时尚Icon。", value: 1 }, // BP
          { text: "成为完美的、令人憧憬的偶像。", value: 2 }, // IVE
          { text: "成为人见人爱的国民女团。", value: 3 }, // TWICE
          { text: "开创全新的世界观，引领未来。", value: 4 }, // aespa
          { text: "用音乐表达自我，打破世俗偏见。", value: 5 }, // IDLE
        ],
      },
    ],
    scoring: (answers) => {
      const dominantValues = getDominantValues(answers);
      // If tie, pick random from winners
      const result = dominantValues[Math.floor(Math.random() * dominantValues.length)];
      
      if (result === 1) return { 
        level: "BLACKPINK", 
        description: "你是天生的主角！你拥有令人羡慕的自信和气场，既能驾驭奢华时尚，又能slay全场。你的存在本身就是一种态度，注定要成为世界级的Icon。",
        image: "https://s3.imagency.cn/e/b722a178408f45f725f6641062823d74.jpeg"
      };
      if (result === 2) return { 
        level: "IVE", 
        description: "你是自信千金！你拥有极致的优雅和自信，深知自己的魅力所在。你就像童话里走出的公主，但内心强大，坚持「我最爱我自己」。",
        image: "https://s3.imagency.cn/e/80aead03198e182e1cea0ae976f15071.jpeg"
      };
      if (result === 3) return { 
        level: "TWICE", 
        description: "你是国民甜心！你的笑容治愈力满分，充满活力和正能量。无论在哪里，你都是凝聚团队的温暖核心，人见人爱，花见花开。",
        image: "https://s3.imagency.cn/e/4bd78bf9a7b3ccc159d85fbad38192f7.jpg"
      };
      if (result === 4) return { 
        level: "aespa", 
        description: "你是旷野战士！你拥有打破常规的勇气和强悍的实力。你神秘、酷飒，不屑于走寻常路，注定要开创属于自己的新纪元，Next Level就是你。",
        image: "https://s3.imagency.cn/e/0c8347f8470a914101a98c235eb613f1.jpg"
      };
      return { 
        level: "I-DLE", 
        description: "你是概念女王！你直率、大胆，拥有独立的灵魂。你不愿做被包装的玩偶，而是要亲自操刀定义自己。你用实力打破偏见，是真正的Queencard。",
        image: "https://s3.imagency.cn/e/19d7871892961288d2afdd6a88772b76.jpg"
      };
    },
  },
  {
    id: "kpop-5generationtop",
    title: "谁是你潜意识pick的五女一？",
    description: "柳智敏还是张元英？结束这场纷争吧！10道潜意识测试，揭秘你内心深处认定的五女一人选！",
    coverImage: "https://s3.imagency.cn/e/e305007d43d63cfde6038b43ce829e59.png",
    resultLabel: "你pick的五女一",
    instructions: [
      "凭直觉快速选择，不要思考太久或揣测题目意图。",
      "想象这些场景真实发生在你眼前。",
      "答案没有对错，只有你内心的选择。"
    ],
    category: "趣味",
    duration: "3 分钟",
    questions: [
      {
        id: "q1",
        text: "第一眼看到一张神图，你更倾向于被哪种特质吸引？",
        options: [
          { text: "精致如CG般的不真实感，仿佛来自未来。", value: 1 }, // Karina
          { text: "明艳动人，充满生机与灵气的千金感。", value: 2 }, // Wonyoung
          { text: "清冷孤傲，如同高岭之花般难以接近。", value: 3 }, // Karina
          { text: "甜美可人，像童话里走出的洋娃娃。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q2",
        text: "你认为什么样的舞台瞬间最能击中人心？",
        options: [
          { text: "爆发力十足，每一个动作都精准卡点的瞬间。", value: 1 }, // Karina
          { text: "表情生动，眼神流转间摄人心魄的瞬间。", value: 2 }, // Wonyoung
          { text: "气场全开，仿佛掌控全场的女王降临。", value: 3 }, // Karina
          { text: "每一个发丝都在跳舞，连指尖都充满戏。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q3",
        text: "在一段关系中，你更倾向于成为哪种角色？",
        options: [
          { text: "让人捉摸不透，充满神秘吸引力的掌控者。", value: 1 }, // Karina
          { text: "备受宠爱，永远能激发保护欲的焦点。", value: 2 }, // Wonyoung
          { text: "外冷内热，只对特定的人展现温柔。", value: 3 }, // Karina
          { text: "自信闪耀，让对方时刻为你着迷。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q4",
        text: "你更欣赏哪种“美”的质感？",
        options: [
          { text: "哑光、高级，像精雕细琢的艺术品。", value: 1 }, // Karina
          { text: "水光、通透，像清晨沾着露水的花瓣。", value: 2 }, // Wonyoung
          { text: "冷冽、锋利，带有未来科技感的金属光泽。", value: 3 }, // Karina
          { text: "粉嫩、柔软，带有梦幻色彩的棉花糖质感。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q5",
        text: "在团队合作中，你通常会承担什么样的责任？",
        options: [
          { text: "默默照顾所有人，成为团队的精神支柱。", value: 1 }, // Karina
          { text: "积极展现自我，成为团队的对外门面。", value: 2 }, // Wonyoung
          { text: "用实力说话，关键时刻挺身而出的ACE。", value: 3 }, // Karina
          { text: "调节气氛，让大家都关注到团队亮点的中心。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q6",
        text: "周末的夜晚，你更想去哪里？",
        options: [
          { text: "充满科技感的艺术展或地下Livehouse。", value: 1 }, // Karina
          { text: "高级酒店的顶层露台或精致的私人派对。", value: 2 }, // Wonyoung
          { text: "一个人在深夜的城市街道漫步，享受孤独。", value: 3 }, // Karina
          { text: "和闺蜜们去网红餐厅打卡，拍美美的照片。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q7",
        text: "如果可以拥有一种超能力，你希望是？",
        options: [
          { text: "瞬间移动，穿梭于现实与虚拟之间。", value: 1 }, // Karina
          { text: "时间静止，永远停留在最美的瞬间。", value: 2 }, // Wonyoung
          { text: "读心术，看穿每个人内心深处的想法。", value: 3 }, // Karina
          { text: "魅惑术，让所有人都无法抗拒你的魅力。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q8",
        text: "你认为真正的强大来源于？",
        options: [
          { text: "温柔的包容力，以及私下里不经意流露的脆弱感。", value: 1 }, // Karina
          { text: "极致的自律，以及无论何时都保持完美的意志力。", value: 2 }, // Wonyoung
          { text: "面对非议时，依然坚持自我的勇气。", value: 3 }, // Karina
          { text: "无论跌倒多少次，都能笑着站起来的韧性。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q9",
        text: "如果必须选择一种颜色作为你的代表色，你会选？",
        options: [
          { text: "深邃的紫。", value: 1 }, // Karina
          { text: "热烈的粉。", value: 2 }, // Wonyoung
          { text: "冷冽的银。", value: 3 }, // Karina
          { text: "纯净的白。", value: 4 }, // Wonyoung
        ],
      },
      {
        id: "q10",
        text: "你心目中理想的“偶像”形态是？",
        options: [
          { text: "打破次元壁，拥有超越现实的完美与梦幻。", value: 1 }, // Karina
          { text: "天生明星，将自身的魅力发挥到极致。", value: 2 }, // Wonyoung
          { text: "引领潮流，创造属于自己独特世界观的先锋。", value: 3 }, // Karina
          { text: "完美无瑕，满足大众对美好一切幻想的化身。", value: 4 }, // Wonyoung
        ],
      },
    ],
    scoring: (answers) => {
      let karinaScore = 0;
      let wonyoungScore = 0;

      Object.values(answers).forEach((val) => {
        if (val === 1 || val === 3) karinaScore++;
        else if (val === 2 || val === 4) wonyoungScore++;
      });

      if (karinaScore > wonyoungScore + 1) {
        return {
          level: "柳智敏 (Karina)",
          description: "在你潜意识里，柳智敏才是当之无愧的五女一！你被她如CG般完美的建模脸和强大的舞台气场深深吸引。你欣赏那种打破次元壁的惊艳感，以及外表高冷内心可爱的反差萌。对你来说，她就是K-pop新纪元的女神。",
          image: "https://s3.imagency.cn/e/33125f692ea70abfd8dfaf64161f3e06.jpg", // Karina
          quote: "高阶风骨，清冷绝尘，岂容甜俗争锋"
        };
      } else if (wonyoungScore > karinaScore + 1) {
        return {
          level: "张元英 (Wonyoung)",
          description: "在你潜意识里，张元英才是当之无愧的五女一！你无法抗拒她天生爱豆的魅力和极致的自我管理。你欣赏她那种时刻保持完美、自信闪耀的姿态。对你来说，她就是“天生偶像”的代名词，是永远的C位。",
          image: "https://s3.imagency.cn/e/414019493311c33c28d62dc34b1d0736.jpg", // Wonyoung
          quote: "天生爱豆，元气倾世，冷傲不过虚浮"
        };
      } else {
        return {
          level: "绝代双骄",
          description: "彩蛋触发，你竟是百里挑一的端水大师！在你心中，柳智敏和张元英平分秋色。你既欣赏Karina的建模神颜和帅气，也沉迷于Wonyoung的千金氛围和甜美。你是人群中少有的同时欣赏两种美的审美专家。小孩子才做选择，你全都要！",
          image: "https://s3.imagency.cn/e/7b268db14d467b127b30c5a725b7ed2c.jpeg", // Both
          quote: "双姝并立，清冷灵动，皆为绝色风华"
        };
      }
    },
  },
];

export const getTests = (lang: 'zh' | 'en') => testsZh;
