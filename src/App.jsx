import React, { useMemo, useState } from "react";

const QUESTIONS = [
  { id: 1, text: "우리는 어떤 문제를 차분하게 함께 이야기한다.", reverse: false },
  { id: 2, text: "우리 중 한 사람이 비꼬거나 빈정거린다.", reverse: true },
  { id: 3, text: "우리는 집안일, 취미, 자녀 양육 등 어떤 일을 함께 한다.", reverse: false },
  {
    id: 4,
    text: "우리 중 한 사람이 정상적인 방식으로 대화하지 않는다. (예: 소리를 지르거나, 말을 하지 않는다)",
    reverse: true,
  },
  { id: 5, text: "우리는 함께 웃는다.", reverse: false },
  { id: 6, text: "우리는 지적인 대화를 나눈다.", reverse: false },
  { id: 7, text: "우리는 중요한 문제에 대해 의견이 다르다.", reverse: true },
  { id: 8, text: "우리 중 한 사람이 비판적이되고 상대를 깎아내린다.", reverse: true },
  { id: 9, text: "우리는 함께 즐거운 시간을 보낸다.", reverse: false },
  { id: 10, text: "우리 중 한 사람이 화를 낸다.", reverse: true },
];

const OPTIONS = [
  { label: "거의 안 한다", value: 1 },
  { label: "가끔", value: 2 },
  { label: "꽤 자주", value: 3 },
  { label: "매우 자주", value: 4 },
  { label: "거의 항상", value: 5 },
];

function scoreItem(raw, reverse) {
  if (!raw) return 0;
  return reverse ? 6 - raw : raw;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function App() {
  const [answers, setAnswers] = useState(() => ({}));
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalCount = QUESTIONS.length;
  const progress = useMemo(() => {
    return totalCount === 0 ? 0 : Math.round((answeredCount / totalCount) * 100);
  }, [answeredCount, totalCount]);

  const totalScore = useMemo(() => {
    return QUESTIONS.reduce((sum, q) => {
      const raw = answers[q.id];
      return sum + scoreItem(raw, q.reverse);
    }, 0);
  }, [answers]);

  const avgScore = useMemo(() => {
    const avg = totalScore / totalCount;
    return Number.isFinite(avg) ? avg : 0;
  }, [totalScore, totalCount]);

  const avgDisplay = useMemo(() => avgScore.toFixed(2), [avgScore]);

  const interpretation = useMemo(() => {
    const a = clamp(avgScore, 1, 5);
    if (a >= 4.2) return "전반적으로 상호작용이 매우 긍정적인 편입니다.";
    if (a >= 3.4) return "전반적으로 안정적인 편이지만, 일부 영역은 조정 여지가 있어 보입니다.";
    if (a >= 2.6) return "긍정/부정 상호작용이 섞여 있을 수 있어요. 반복되는 패턴을 함께 점검해보세요.";
    return "현재 상호작용에서 스트레스 요인이 큰 편일 수 있어요. 필요하면 전문가 도움을 고려해보세요.";
  }, [avgScore]);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const canSubmit = answeredCount === totalCount;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {!submitted ? (
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-neutral-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-semibold">부부 상호작용 체크리스트</h1>
                  <p className="text-sm text-neutral-600 mt-2">
                    10문항 · 5점 척도 · 제출하면 평균 점수가 계산됩니다.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-600">진행</div>
                  <div className="text-lg font-semibold">{progress}%</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                  <div
                    className="h-full bg-neutral-100/90"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-neutral-600">
                  {answeredCount}/{totalCount} 문항 응답
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-base leading-relaxed">
                      <span className="text-neutral-600 mr-2">{q.id}.</span>
                      {q.text}
                    </p>
                    {/* <span
                      className={`text-[10px] font-medium whitespace-nowrap ${
                        q.reverse ? "text-red-600" : "text-blue-600"
                      }`}
                    >
                      {q.reverse ? "역문항" : "정문항"}
                    </span> */}
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {OPTIONS.map((opt) => {
                      const checked = answers[q.id] === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={`cursor-pointer select-none rounded-xl border px-3 py-2 text-sm transition ${
                            checked
                              ? "border-neutral-100 bg-neutral-900 text-white"
                              : "border-neutral-200 bg-neutral-50 hover:border-neutral-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${q.id}`}
                            value={opt.value}
                            checked={checked}
                            onChange={() => handleChange(q.id, opt.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-between gap-2">
                            <span>{opt.label}</span>
                            <span className={`text-xs ${checked ? "text-neutral-700" : "text-neutral-600"}`}>
                              {opt.value}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
              <button
                disabled={!canSubmit}
                onClick={() => setSubmitted(true)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  canSubmit
                    ? "bg-neutral-900 text-white hover:bg-neutral-200"
                    : "bg-neutral-200 text-neutral-600 cursor-not-allowed"
                }`}
              >
                결과 보기
              </button>
            </div>

              {!canSubmit && (
                <p className="text-xs text-neutral-600">
                  모든 문항에 응답하면 결과 보기 버튼이 활성화됩니다.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-neutral-200">
              <h2 className="text-xl md:text-2xl font-semibold">피드백</h2>
              <p className="text-sm text-neutral-600 mt-2">평균 점수는 1~5점 범위입니다.</p>
            </div>

            <div className="p-6 md:p-8 space-y-5">
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs text-neutral-600">평균점수</div>
                    <div className="text-3xl font-semibold mt-1">{avgDisplay}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-600">총점</div>
                    <div className="text-lg font-semibold mt-1">{totalScore} / 50</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                    <div
                      className="h-full bg-neutral-100/90"
                      style={{ width: `${(avgScore / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-neutral-700 mt-3">{interpretation}</p>
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  본 체크리스트는 Gilford &amp; Bengtson(1979)의 상호작용 척도
                  (Marital Satisfaction Scale)를 바탕으로 제작되었습니다. 이 테스트는
                  전문적인 심리 진단 도구가 아니며, 현재의 만족도를 점검해보는 참고용
                  자료입니다. 정확한 진단과 상담은 전문가를 찾으시기 바랍니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl border border-neutral-200 px-4 py-3 text-sm hover:border-neutral-600"
                >
                  답변 수정하기
                </button>

                <button
                  onClick={reset}
                  className="rounded-xl bg-neutral-900 text-white px-5 py-3 text-sm font-semibold hover:bg-neutral-200"
                >
                  다시 하기
                </button>
              </div>

              <details className="text-xs text-neutral-600">
                <summary className="cursor-pointer select-none">Scoring 방법 보기</summary>
                <div className="mt-2 leading-relaxed">
                  <div>1, 3, 5, 6, 9번: 거의 안 한다=1점, 가끔=2점, 꽤 자주=3점, 매우 자주=4점, 거의 항상=5점</div>
                  <div className="mt-1">2, 4, 7, 8, 10번: 거의 안 한다=5점, 가끔=4점, 꽤 자주=3점, 매우 자주=2점, 거의 항상=1점</div>
                  <div className="mt-1">총점을 10으로 나눠 평균 점수 계산</div>
                </div>
              </details>
            </div>
          </div>
        )}

        <div className="mt-6 text-xs text-neutral-600">
          ⓘ 프로토타입: 단일 파일(App.jsx) · 점수 계산(정/역문항) · 결과 화면
        </div>
      </div>
    </div>
  );
}
