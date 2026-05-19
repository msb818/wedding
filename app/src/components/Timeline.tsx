import { useMemo, useState } from "react";
import { TIMELINE, type Phase } from "../data/timeline";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WEDDING_DATE = new Date("2027-09-04T16:30:00-06:00");

function daysUntil(): number {
  const ms = WEDDING_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function Timeline() {
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(
    "timeline.done",
    {}
  );
  const [openPhases, setOpenPhases] = useLocalStorage<Record<string, boolean>>(
    "timeline.open",
    { p1: true }
  );
  const [hideCompleted, setHideCompleted] = useState(false);

  const totals = useMemo(() => {
    let total = 0;
    let complete = 0;
    TIMELINE.forEach((p) => {
      p.tasks.forEach((t) => {
        total++;
        if (done[t.id]) complete++;
      });
    });
    return { total, complete };
  }, [done]);

  const toggleTask = (id: string) =>
    setDone((d) => ({ ...d, [id]: !d[id] }));
  const togglePhase = (id: string) =>
    setOpenPhases((o) => ({ ...o, [id]: !o[id] }));

  const percent = totals.total
    ? Math.round((totals.complete / totals.total) * 100)
    : 0;

  return (
    <div className="timeline">
      <div className="summary">
        <div className="summary-row">
          <div>
            <div className="big-num">{daysUntil()}</div>
            <div className="muted">days to go</div>
          </div>
          <div>
            <div className="big-num">{totals.complete} / {totals.total}</div>
            <div className="muted">tasks complete</div>
          </div>
          <div>
            <div className="big-num">{percent}%</div>
            <div className="muted">overall progress</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <label className="hide-toggle">
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => setHideCompleted(e.target.checked)}
          />
          Hide completed tasks
        </label>
      </div>

      {TIMELINE.map((phase) => (
        <PhaseCard
          key={phase.id}
          phase={phase}
          isOpen={!!openPhases[phase.id]}
          onToggle={() => togglePhase(phase.id)}
          done={done}
          onToggleTask={toggleTask}
          hideCompleted={hideCompleted}
        />
      ))}
    </div>
  );
}

function PhaseCard({
  phase,
  isOpen,
  onToggle,
  done,
  onToggleTask,
  hideCompleted,
}: {
  phase: Phase;
  isOpen: boolean;
  onToggle: () => void;
  done: Record<string, boolean>;
  onToggleTask: (id: string) => void;
  hideCompleted: boolean;
}) {
  const completed = phase.tasks.filter((t) => done[t.id]).length;
  const tasks = hideCompleted
    ? phase.tasks.filter((t) => !done[t.id])
    : phase.tasks;
  const allDone = completed === phase.tasks.length;

  return (
    <section className={`phase ${allDone ? "phase-done" : ""}`}>
      <button className="phase-header" onClick={onToggle}>
        <div>
          <div className="phase-title">
            {allDone && <span className="check">✓ </span>}
            {phase.title}
          </div>
          <div className="phase-window">{phase.window}</div>
          <div className="phase-subtitle">{phase.subtitle}</div>
        </div>
        <div className="phase-meta">
          <div className="phase-count">
            {completed} / {phase.tasks.length}
          </div>
          <div className="chev">{isOpen ? "▾" : "▸"}</div>
        </div>
      </button>
      {isOpen && (
        <ul className="task-list">
          {tasks.map((t) => {
            const isDone = !!done[t.id];
            return (
              <li
                key={t.id}
                className={`task ${isDone ? "task-done" : ""}`}
                onClick={() => onToggleTask(t.id)}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggleTask(t.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="task-body">
                  <div className="task-text">{t.text}</div>
                  {t.detail && <div className="task-detail">{t.detail}</div>}
                </div>
              </li>
            );
          })}
          {tasks.length === 0 && (
            <li className="empty">All tasks in this phase complete.</li>
          )}
        </ul>
      )}
    </section>
  );
}
