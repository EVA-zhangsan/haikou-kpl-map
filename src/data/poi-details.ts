import type { Poi } from "./pois";

export interface PoiDetail {
  description: string;
  videoText: string;
}

const specialDetails: Record<number, PoiDetail> = {
  // 骑楼老街 (id: 3)
  3: {
    description:
      "走进骑楼老街就像开了一个「时光回溯」Buff——百年南洋骑楼阵列控场，每一根廊柱都是一次完美的视野压制。在这里逛街相当于拿了「不灭之握」，越走越回血，拍照输出直接暴击。注意：骑楼的真实伤害来自钱包，路过椰子冻摊位闪现都躲不掉。",
    videoText: "KPL 高光时刻 — 骑楼老街赛前巡游实况",
  },
  // 糟粕醋火锅 (id: 11)
  11: {
    description:
      "糟粕醋火锅是海口美食界的「终极大龙Buff」——酸辣鲜香四重真实伤害，穿透一切味觉护甲。第一口就触发被动「上头」，越吃攻速越快根本停不下来。友方提示：此锅自带「控场」效果，吃完全队精神抖擞，适合赛前开团。打野选手必点的蓝Buff补给站。",
    videoText: "KPL 高光时刻 — 选手赛后糟粕醋火锅团建",
  },
  // 五源河体育场 (id: 1)
  1: {
    description:
      "五源河体育场——KPL春决的「水晶基地」，四万人同时在线的超级团战现场。当灯光亮起的那一刻，全场触发「战争迷雾」清除，选手在聚光灯下拥有100%暴击率。观众席就是最强辅助位，每一声呐喊都叠加一层「鼓舞」被动。这里不需要打野，因为整个体育场就是最大的主宰Buff。",
    videoText: "KPL 高光时刻 — 五源河体育场万人团战",
  },
};

const defaultVideoText = "KPL 高光时刻正在加载...";

export function getPoiDetail(poi: Poi): PoiDetail {
  if (specialDetails[poi.id]) {
    return specialDetails[poi.id];
  }

  const genericDescriptions: Record<string, string> = {
    eSports: `${poi.name}——电竞选手的秘密据点。据说在这里能获得「隐身」Buff，赛前来一趟胜率直接+10%。打完比赛记得来这里清一下「疲劳」debuff。`,
    tourism: `${poi.name}——海口旅游地图上的「视野守卫」，站在这里就能解锁整个海口的全景视野。拍照打卡相当于「插眼」，朋友圈输出值拉满。建议携带防晒装备，否则会吃到日光的「持续灼烧」效果。`,
    food: `${poi.name}——海口美食圈的「红Buff」刷新点，每一口都是暴击伤害。来这里吃饭就像在打「大龙」，需要全队配合才能吃完。温馨提示：此处自带「回血」光环，吃饱了原地满血复活。`,
  };

  return {
    description: genericDescriptions[poi.type] || `欢迎来到${poi.name}，这里有独特的海口风情等你探索。`,
    videoText: defaultVideoText,
  };
}
