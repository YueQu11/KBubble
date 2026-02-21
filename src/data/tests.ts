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
  scoring: (answers: Record<string, number>) => { level: string; description: string; image?: string };
}

// Helper to calculate result based on frequency
const getDominantValue = (answers: Record<string, number>): number => {
  const counts: Record<number, number> = {};
  Object.values(answers).forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
  });
  
  let maxCount = 0;
  let dominantVal = 1; // Default to 1
  
  Object.entries(counts).forEach(([val, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantVal = Number(val);
    }
  });
  
  return dominantVal;
};

const testsZh: Test[] = [
  {
    id: "kpop-group",
    title: "测一测谁是你的天选K-pop女团？",
    description: "你是人间香奈儿，还是自信千金？是元气甜心，还是旷野战士？10道题揭秘你的女团本命！",
    coverImage: "https://s41.ax1x.com/2026/02/21/pZjZgFs.png",
    instructions: [
      "想象你是一位即将出道的练习生。",
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
        text: "哪句歌词最能代表你的心声？",
        options: [
          { text: "Look at you, now look at me. ", value: 1 }, // BP
          { text: "I love myself. ", value: 2 }, // IVE
          { text: "Cheer up baby! ", value: 3 }, // TWICE
          { text: "I'm on the next level. ", value: 4 }, // aespa
          { text: "I'm a Queencard. ", value: 5 }, // IDLE
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
      const result = getDominantValue(answers);
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
];

export const getTests = (lang: 'zh' | 'en') => testsZh;
