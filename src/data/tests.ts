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
  category: "Personality" | "Wellness" | "Career" | "个性" | "健康" | "职业";
  duration: string;
  questions: Question[];
  scoring: (score: number) => { level: string; description: string };
}

const testsEn: Test[] = [
  {
    id: "burnout-check",
    title: "Burnout Self-Assessment",
    description: "Evaluate your current stress levels and risk of burnout with this quick check-in based on common indicators.",
    category: "Wellness",
    duration: "3 min",
    questions: [
      {
        id: "q1",
        text: "How often do you feel tired or drained of energy?",
        options: [
          { text: "Rarely", value: 0 },
          { text: "Sometimes", value: 1 },
          { text: "Often", value: 2 },
          { text: "Always", value: 3 },
        ],
      },
      {
        id: "q2",
        text: "Do you find yourself becoming more cynical or critical at work?",
        options: [
          { text: "Not really", value: 0 },
          { text: "Occasionally", value: 1 },
          { text: "Frequently", value: 2 },
          { text: "Constantly", value: 3 },
        ],
      },
      {
        id: "q3",
        text: "How often do you feel a lack of accomplishment or productivity?",
        options: [
          { text: "Rarely", value: 0 },
          { text: "Sometimes", value: 1 },
          { text: "Often", value: 2 },
          { text: "Always", value: 3 },
        ],
      },
      {
        id: "q4",
        text: "Do you have trouble sleeping due to work-related stress?",
        options: [
          { text: "Never", value: 0 },
          { text: "Occasionally", value: 1 },
          { text: "Often", value: 2 },
          { text: "Every night", value: 3 },
        ],
      },
      {
        id: "q5",
        text: "Do you feel overwhelmed by your daily tasks?",
        options: [
          { text: "Rarely", value: 0 },
          { text: "Sometimes", value: 1 },
          { text: "Often", value: 2 },
          { text: "Always", value: 3 },
        ],
      },
    ],
    scoring: (score) => {
      if (score <= 5) return { level: "Low Risk", description: "You seem to be managing stress well. Keep up your healthy habits!" };
      if (score <= 10) return { level: "Moderate Risk", description: "You are showing some signs of stress. Consider taking breaks and reviewing your workload." };
      return { level: "High Risk", description: "You may be experiencing significant burnout. It is highly recommended to prioritize rest and seek support." };
    },
  },
  {
    id: "creative-style",
    title: "Creative Archetype",
    description: "Discover your primary creative style and how you best approach problem-solving and innovation.",
    category: "Personality",
    duration: "5 min",
    questions: [
      {
        id: "q1",
        text: "When starting a new project, what excites you most?",
        options: [
          { text: "Planning the details", value: 1 },
          { text: "Brainstorming wild ideas", value: 2 },
          { text: "Collaborating with others", value: 3 },
          { text: "Just getting started and experimenting", value: 4 },
        ],
      },
      {
        id: "q2",
        text: "How do you handle roadblocks?",
        options: [
          { text: "Analyze the root cause systematically", value: 1 },
          { text: "Look for an unconventional workaround", value: 2 },
          { text: "Ask for advice and feedback", value: 3 },
          { text: "Try different solutions until one works", value: 4 },
        ],
      },
      {
        id: "q3",
        text: "What is your preferred work environment?",
        options: [
          { text: "Quiet and organized", value: 1 },
          { text: "Inspiring and chaotic", value: 2 },
          { text: "Buzzing with people", value: 3 },
          { text: "Flexible and mobile", value: 4 },
        ],
      },
      {
        id: "q4",
        text: "What is your biggest strength?",
        options: [
          { text: "Consistency and reliability", value: 1 },
          { text: "Vision and originality", value: 2 },
          { text: "Empathy and communication", value: 3 },
          { text: "Adaptability and speed", value: 4 },
        ],
      },
    ],
    scoring: (score) => {
      if (score <= 6) return { level: "The Architect", description: "You build systems and structures. You value order, logic, and long-term planning." };
      if (score <= 10) return { level: "The Visionary", description: "You see the big picture. You are driven by ideas, novelty, and future possibilities." };
      if (score <= 13) return { level: "The Connector", description: "You thrive on relationships. Your creativity comes from synthesis and collaboration." };
      return { level: "The Maker", description: "You learn by doing. You are hands-on, experimental, and pragmatic." };
    },
  },
];

const testsZh: Test[] = [
  {
    id: "burnout-check",
    title: "职业倦怠自测",
    description: "通过这个快速自测，评估你当前的压力水平和职业倦怠风险。",
    category: "健康",
    duration: "3 分钟",
    questions: [
      {
        id: "q1",
        text: "你是否经常感到疲惫或精力耗尽？",
        options: [
          { text: "很少", value: 0 },
          { text: "有时", value: 1 },
          { text: "经常", value: 2 },
          { text: "总是", value: 3 },
        ],
      },
      {
        id: "q2",
        text: "你是否发现自己对工作变得更加愤世嫉俗或挑剔？",
        options: [
          { text: "没有", value: 0 },
          { text: "偶尔", value: 1 },
          { text: "经常", value: 2 },
          { text: "总是", value: 3 },
        ],
      },
      {
        id: "q3",
        text: "你是否经常感到缺乏成就感或效率低下？",
        options: [
          { text: "很少", value: 0 },
          { text: "有时", value: 1 },
          { text: "经常", value: 2 },
          { text: "总是", value: 3 },
        ],
      },
      {
        id: "q4",
        text: "你是否因工作压力而难以入睡？",
        options: [
          { text: "从不", value: 0 },
          { text: "偶尔", value: 1 },
          { text: "经常", value: 2 },
          { text: "每晚", value: 3 },
        ],
      },
      {
        id: "q5",
        text: "你是否感到被日常任务压得喘不过气？",
        options: [
          { text: "很少", value: 0 },
          { text: "有时", value: 1 },
          { text: "经常", value: 2 },
          { text: "总是", value: 3 },
        ],
      },
    ],
    scoring: (score) => {
      if (score <= 5) return { level: "低风险", description: "你似乎很好地管理了压力。保持健康的习惯！" };
      if (score <= 10) return { level: "中度风险", description: "你表现出一些压力迹象。建议适当休息并调整工作量。" };
      return { level: "高风险", description: "你可能正经历严重的职业倦怠。强烈建议优先休息并寻求支持。" };
    },
  },
  {
    id: "creative-style",
    title: "创造力原型测试",
    description: "发现你的主要创造力风格，以及你如何最好地解决问题和创新。",
    category: "个性",
    duration: "5 分钟",
    questions: [
      {
        id: "q1",
        text: "当开始一个新项目时，什么最让你兴奋？",
        options: [
          { text: "规划细节", value: 1 },
          { text: "构思疯狂的点子", value: 2 },
          { text: "与他人合作", value: 3 },
          { text: "直接开始尝试", value: 4 },
        ],
      },
      {
        id: "q2",
        text: "你如何处理遇到的障碍？",
        options: [
          { text: "系统地分析根本原因", value: 1 },
          { text: "寻找非常规的变通方法", value: 2 },
          { text: "寻求建议和反馈", value: 3 },
          { text: "尝试不同的解决方案直到奏效", value: 4 },
        ],
      },
      {
        id: "q3",
        text: "你偏好的工作环境是怎样的？",
        options: [
          { text: "安静且有条理", value: 1 },
          { text: "充满灵感和混乱", value: 2 },
          { text: "充满人气的热闹环境", value: 3 },
          { text: "灵活且可移动", value: 4 },
        ],
      },
      {
        id: "q4",
        text: "你最大的优势是什么？",
        options: [
          { text: "一致性和可靠性", value: 1 },
          { text: "远见和原创性", value: 2 },
          { text: "同理心和沟通能力", value: 3 },
          { text: "适应力和速度", value: 4 },
        ],
      },
    ],
    scoring: (score) => {
      if (score <= 6) return { level: "建筑师", description: "你构建系统和结构。你重视秩序、逻辑和长期规划。" };
      if (score <= 10) return { level: "梦想家", description: "你着眼于大局。你被想法、新奇事物和未来的可能性所驱动。" };
      if (score <= 13) return { level: "连接者", description: "你在关系中茁壮成长。你的创造力来自于综合和协作。" };
      return { level: "实干家", description: "你在实践中学习。你亲力亲为，乐于实验且务实。" };
    },
  },
];

export const getTests = (lang: 'zh' | 'en') => lang === 'zh' ? testsZh : testsEn;
