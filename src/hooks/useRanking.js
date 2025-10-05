import { useMemo } from "react";
import { BANDS, DEFECTS, MACHINES, SUPER } from "../config";
import {
  buildReqMap, computePerDefects, computeDefectScore, computeGroupSummaries,
  superScoreFor, throughputStatus, exitsStatus, overallScore
} from "../logic/score";

export default function useRanking(ans) {
  const reqMap = useMemo(() => buildReqMap(DEFECTS, ans), [ans.grob, ans.klein, ans.besonders]);

  const ranked = useMemo(() => {
    return MACHINES.map((m) => {
      const per = computePerDefects(DEFECTS, m.cap, reqMap);
      const defectScore = computeDefectScore(per);
      const groups = computeGroupSummaries(per, ans);
      const superScore = superScoreFor(m.id, SUPER, ans);

      const tp = throughputStatus(BANDS, ans.throughput, m.max_tpw);
      const ex = exitsStatus(ans.exits, m);

      const score = overallScore(defectScore, superScore, {
        throughputOk: tp.ok,
        exitsOk: ex.ok,
      });

      const allOk = per.every((x) => x.ok) && tp.ok && ex.ok;

      return {
        ...m,
        per,
        groups,
        defectScore,
        superScore,
        score,
        throughputOk: tp.ok,
        exitsOk: ex.ok,
        tpCap: tp.tpCap,
        tpReq: tp.tpReq,
        allOk,
      };
    }).sort((a, b) => Number(b.allOk) - Number(a.allOk) || b.score - a.score);
  }, [ans, reqMap]);

  return { ranked };
}
