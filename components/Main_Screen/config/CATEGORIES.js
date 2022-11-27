import TOURS from "./data/MARKERS";
import NEWS from "./data/NEWS";
import EVENTS from "./data/EVENTS";

export default [
  {
    id: 1,
    title: "Điểm đến",
    tours: [...TOURS],
  },
  {
    id: 2,
    title: "Tin tức",
    tours: [...NEWS],
  },
  {
    id: 3,
    title: "Sự kiện",
    tours: [...EVENTS],
  },
];
