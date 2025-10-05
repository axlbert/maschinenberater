// Zentrale Konfiguration für Maschinenberater

export const verm = {
  "--verm-50": "#FFEDEA",
  "--verm-100": "#FFD2CB",
  "--verm-200": "#FFB8AF",
  "--verm-600": "#E34234",
  "--verm-700": "#C23A2D",
  "--verm-900": "#7A241D",
};

export const GROUP_IMG = {
  grob: { title: "Grobe Defekte (z. B. Grünstellen, mechanisch, Gammel, großer Maußbiss)", src: "/assets/groups/grob.jpg" },
  klein: { title: "Kleine Defekte (z. B. Drahtwurm, Schorf, kleiner Maußbiss)", src: "/assets/groups/klein.jpg" },
  besonders: { title: "Besonderes (z. B. alte Kartoffeln, Kartoffelförmige Steine, frische Mutterknollen, Sonnenbrand)", src: "/assets/groups/besonders.jpg" },
};

export const SUPER_IMG = {
  sorting: { coarse: "/assets/super/rough.png", fine: "/assets/super/fine.png", rock: "/assets/super/rock.png" },
  quality: {
    comparable: "/assets/super/fine.png",
    stable: "/assets/super/sleep.png",
    better: "/assets/super/hand.png",
    perfect: "/assets/super/holy.png",
  },
};

export const BANDS = [
  { id: "lt5", label: "unter 5 t/Woche", min: 0, max: 5 },
  { id: "5_20", label: "5–20 t/Woche", min: 5, max: 20 },
  { id: "20_50", label: "20–50 t/Woche", min: 20, max: 50 },
  { id: "50_100", label: "50–100 t/Woche", min: 50, max: 100 },
  { id: "gt100", label: ">100 t/Woche", min: 100, max: Infinity },
];

export const LEVELS = [
  { id: "low", label: "Unwichtig", val: 0 },
  { id: "med", label: "Wichtig", val: 70 },
  { id: "high", label: "Sehr wichtig", val: 98 },
  { id: "must", label: "Muss unbedingt immer raus", val: 100 },
];

export const DEFECTS = [
  { id: "green", group: "grob" }, { id: "mech", group: "grob" },
  { id: "rot", group: "grob" }, { id: "mouse_big", group: "grob" },
  { id: "wire", group: "klein" }, { id: "scab", group: "klein" },
  { id: "mouse_small", group: "klein" },
  { id: "old", group: "besonders" }, { id: "stone", group: "besonders" },
  { id: "mother", group: "besonders" }, { id: "sun", group: "besonders" },
];

export const MACHINES = [
  {
    id: "farmsort",
    name: "FarmSort",
    notes: "gut für alles, aber langsam",
    img: "/assets/machines/farmsort.png",
    cap: { green:95, mech:95, rot:95, mouse_big:95, wire:90, scab:90, mouse_small:90, old:85, stone:90, mother:85, sun:90 },
    max_tpw: 50, exit_min: 3, exit_max: 6,
  },
  {
    id: "fingersorter",
    name: "Fingersortierer",
    notes: "gut bei groben Defekten, schwächer bei kleinen",
    img: "/assets/machines/fingersorter.png",
    cap: { green:80, mech:82, rot:70, mouse_big:75, wire:60, scab:70, mouse_small:62, old:65, stone:80, mother:70, sun:70 },
    max_tpw: 100, exit_min: 2, exit_max: 2,
  },
  {
    id: "altec",
    name: "Mechanische Klutentrennung",
    notes: "günstig, zuverlässig, unverwüstbar",
    img: "/assets/machines/cls.png",
    cap: { green:0, mech:0,rot:0, mouse_big:0, wire:0, scab:0, mouse_small:0, old:0, stone:90, mother:0, sun:0 },
    max_tpw: 250, exit_min: 2, exit_max: 2,
  },
];


export const SUPER = {
  sortingType: {
    coarse: { farmsort: 80, fingersorter: 100, altec: 90 },
    rock:   { farmsort: 80, fingersorter: 80,  altec: 100 },
    fine:   { farmsort: 85, fingersorter: 60,  altec: 25 },
  },
  quality: {
    comparable: { farmsort: 90, fingersorter: 85, altec: 50 },
    stable:     { farmsort: 88, fingersorter: 70, altec: 50 },
    better:     { farmsort: 88, fingersorter: 65, altec: 50 },
    perfect:    { farmsort: 85, fingersorter: 60, altec: 50 },
  },
  functionality: {
    quality_only:     { farmsort: 85, fingersorter: 70, altec: 50 },
    size_and_quality: { farmsort: 88, fingersorter: 75, altec: 0 },
  },
};
