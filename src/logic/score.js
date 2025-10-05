// score.js – reine Logik (keine React-Imports)

export function buildReqMap(DEFECTS, ans) {
  const map = {};
  for (const d of DEFECTS) {
    const v = ans[d.group];
    map[d.id] = typeof v === "number" ? v : 0;
  }
  return map;
}

export function computePerDefects(DEFECTS, cap, reqMap) {
  return DEFECTS.map((d) => {
    const req = reqMap[d.id] || 0;
    const c = cap[d.id] || 0;
    return { id: d.id, g: d.group, req, cap: c, ok: c >= req };
  });
}

export function average(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

export function computeDefectScore(per) {
  if (!per.length) return 0;
  return per.reduce((a, x) => a + Math.min(100, (x.cap / Math.max(1, x.req || 1)) * 100), 0) / per.length;
}

export function computeGroupSummaries(per, ans) {
  const groups = ["grob", "klein", "besonders"];
  return groups.map((g) => {
    const items = per.filter((x) => x.g === g);
    const capAvg = average(items.map((i) => i.cap));
    const req = ans[g] || 0;
    const state =
      capAvg >= req
        ? { k: "ok", t: "erfüllt", b: "mb-badge--ok" }
        : capAvg >= Math.max(0, req - 10)
        ? { k: "close", t: "knapp", b: "mb-badge--close" }
        : { k: "fail", t: "nicht erfüllt", b: "mb-badge--fail" };
    const label = g === "grob" ? "Grobe Defekte" : g === "klein" ? "Kleine Defekte" : "Besonderes";
    return { id: g, capAvg, req, s: state, label };
  });
}

export function superScoreFor(machineId, SUPER, ans) {
  const t = ans.super.sortingType;
  const q = ans.super.quality;
  const f = ans.super.functionality;
  const parts = [];
  if (t) parts.push((SUPER.sortingType[t] || {})[machineId] || 0);
  if (q) parts.push((SUPER.quality[q] || {})[machineId] || 0);
  if (f) parts.push((SUPER.functionality[f] || {})[machineId] || 0);
  return parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 0;
}

export function throughputStatus(BANDS, ansThroughput, machineMaxTpw) {
  const band = BANDS.find((b) => b.id === ansThroughput);
  if (!band) return { ok: true, tpCap: 100, tpReq: 100, need: null };
  const need = band.max === Infinity ? 9999 : band.max;
  const ok = machineMaxTpw >= need;
  const tpCap = Math.min(100, (machineMaxTpw / need) * 100);
  return { ok, tpCap, tpReq: 100, need };
}

export function exitsStatus(ansExits, machine) {
  const rng =
    ansExits === "2" ? [2, 2] : ansExits === "2_4" ? [2, 4] : ansExits === "4_8" ? [4, 8] : null;
  if (!rng) return { ok: true };
  const [nmin, nmax] = rng;
  const ok = !(machine.exit_max < nmin || machine.exit_min > nmax);
  return { ok, rng };
}

export function overallScore(defectScore, superScore, penalties) {
  let s = 0.7 * defectScore + 0.3 * superScore;
  if (!penalties.throughputOk) s *= 0.75;
  if (!penalties.exitsOk) s *= 0.75;
  return s;
}
