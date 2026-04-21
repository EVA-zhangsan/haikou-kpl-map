export type PoiType = "eSports" | "tourism" | "food";

export interface Poi {
  id: number;
  name: string;
  type: PoiType;
  x: number; // percentage (10-90)
  y: number; // percentage (10-90)
}

export const pois: Poi[] = [
  // eSports - 2 locations
  { id: 1, name: "五源河体育场", type: "eSports", x: 28, y: 22 },
  { id: 2, name: "狼队快闪店", type: "eSports", x: 62, y: 45 },

  // tourism - 6 locations
  { id: 3, name: "骑楼老街", type: "tourism", x: 55, y: 60 },
  { id: 4, name: "云洞图书馆", type: "tourism", x: 15, y: 50 },
  { id: 5, name: "假日海滩", type: "tourism", x: 20, y: 35 },
  { id: 6, name: "火山口公园", type: "tourism", x: 12, y: 75 },
  { id: 7, name: "钟楼", type: "tourism", x: 52, y: 52 },
  { id: 8, name: "世纪大桥", type: "tourism", x: 42, y: 38 },

  // food - 7 locations
  { id: 9, name: "泰龙城小吃街", type: "food", x: 68, y: 58 },
  { id: 10, name: "椰子鸡总店", type: "food", x: 75, y: 30 },
  { id: 11, name: "糟粕醋火锅", type: "food", x: 82, y: 65 },
  { id: 12, name: "老爸茶馆", type: "food", x: 45, y: 72 },
  { id: 13, name: "清补凉大排档", type: "food", x: 35, y: 85 },
  { id: 14, name: "海鲜广场", type: "food", x: 85, y: 45 },
  { id: 15, name: "辣汤饭老店", type: "food", x: 70, y: 80 },
];

export const typeConfig: Record<PoiType, { label: string; colors: string[]; glowColor: string }> = {
  eSports: {
    label: "电竞",
    colors: ["#ff2d55", "#0affed"],
    glowColor: "rgba(10, 255, 237, 0.6)",
  },
  tourism: {
    label: "文旅",
    colors: ["#00ff88", "#00cc6a"],
    glowColor: "rgba(0, 255, 136, 0.6)",
  },
  food: {
    label: "美食",
    colors: ["#ff8c00", "#ffb347"],
    glowColor: "rgba(255, 140, 0, 0.6)",
  },
};
