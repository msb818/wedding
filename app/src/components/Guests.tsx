import { useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type RSVP = "pending" | "yes" | "no" | "maybe";
type Side = "partner1" | "partner2" | "both";

type Guest = {
  id: string;
  name: string;
  email: string;
  side: Side;
  group: string;
  plusOne: boolean;
  plusOneName: string;
  rsvp: RSVP;
  dietary: string;
  notes: string;
};

const RSVP_LABELS: Record<RSVP, string> = {
  pending: "Pending",
  yes: "Yes",
  no: "No",
  maybe: "Maybe",
};

const SIDE_LABELS: Record<Side, string> = {
  partner1: "Side A",
  partner2: "Side B",
  both: "Both",
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Guests() {
  const [guests, setGuests] = useLocalStorage<Guest[]>("guests", []);
  const [search, setSearch] = useState("");
  const [rsvpFilter, setRsvpFilter] = useState<"all" | RSVP>("all");

  const add = () => {
    setGuests((g) => [
      ...g,
      {
        id: uid(),
        name: "",
        email: "",
        side: "both",
        group: "",
        plusOne: false,
        plusOneName: "",
        rsvp: "pending",
        dietary: "",
        notes: "",
      },
    ]);
  };

  const update = (id: string, patch: Partial<Guest>) => {
    setGuests((g) => g.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const remove = (id: string) => {
    if (!confirm("Remove this guest?")) return;
    setGuests((g) => g.filter((x) => x.id !== id));
  };

  const stats = useMemo(() => {
    const headcount = (rsvp: RSVP) =>
      guests
        .filter((g) => g.rsvp === rsvp)
        .reduce((n, g) => n + 1 + (g.plusOne ? 1 : 0), 0);
    return {
      total: guests.reduce((n, g) => n + 1 + (g.plusOne ? 1 : 0), 0),
      yes: headcount("yes"),
      no: headcount("no"),
      maybe: headcount("maybe"),
      pending: headcount("pending"),
    };
  }, [guests]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return guests.filter((g) => {
      if (rsvpFilter !== "all" && g.rsvp !== rsvpFilter) return false;
      if (!s) return true;
      return (
        g.name.toLowerCase().includes(s) ||
        g.email.toLowerCase().includes(s) ||
        g.group.toLowerCase().includes(s) ||
        g.notes.toLowerCase().includes(s)
      );
    });
  }, [guests, search, rsvpFilter]);

  const exportCSV = () => {
    const header = [
      "Name",
      "Email",
      "Side",
      "Group",
      "Plus-one",
      "Plus-one name",
      "RSVP",
      "Dietary",
      "Notes",
    ];
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const rows = guests.map((g) =>
      [
        g.name,
        g.email,
        SIDE_LABELS[g.side],
        g.group,
        g.plusOne ? "Yes" : "No",
        g.plusOneName,
        RSVP_LABELS[g.rsvp],
        g.dietary,
        g.notes,
      ].map(escape).join(",")
    );
    const csv = [header.map(escape).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guest-list-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="guests">
      <div className="guest-stats">
        <div><div className="big-num">{stats.total}</div><div className="muted">invited (incl. +1s)</div></div>
        <div><div className="big-num">{stats.yes}</div><div className="muted">yes</div></div>
        <div><div className="big-num">{stats.no}</div><div className="muted">no</div></div>
        <div><div className="big-num">{stats.maybe}</div><div className="muted">maybe</div></div>
        <div><div className="big-num">{stats.pending}</div><div className="muted">pending</div></div>
      </div>

      <div className="guests-toolbar">
        <input
          placeholder="Search by name, email, group…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={rsvpFilter}
          onChange={(e) => setRsvpFilter(e.target.value as typeof rsvpFilter)}
        >
          <option value="all">All RSVPs</option>
          {Object.entries(RSVP_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <button onClick={exportCSV} disabled={guests.length === 0}>Export CSV</button>
        <button className="btn-primary" onClick={add}>+ Add guest</button>
      </div>

      {filtered.length === 0 && guests.length === 0 && (
        <div className="empty-state">
          <p>No guests yet. Tip: start by typing in family members and the wedding party.</p>
          <button className="btn-primary" onClick={add}>+ Add your first guest</button>
        </div>
      )}

      {filtered.length === 0 && guests.length > 0 && (
        <div className="empty-state"><p>No guests match this filter.</p></div>
      )}

      <div className="guest-table">
        {filtered.map((g) => (
          <div key={g.id} className={`guest-row rsvp-${g.rsvp}`}>
            <div className="guest-main">
              <input
                className="guest-name"
                placeholder="Full name"
                value={g.name}
                onChange={(e) => update(g.id, { name: e.target.value })}
              />
              <input
                placeholder="Email"
                value={g.email}
                onChange={(e) => update(g.id, { email: e.target.value })}
              />
            </div>
            <div className="guest-secondary">
              <select value={g.side} onChange={(e) => update(g.id, { side: e.target.value as Side })}>
                {Object.entries(SIDE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <input
                placeholder="Group (e.g. college friends)"
                value={g.group}
                onChange={(e) => update(g.id, { group: e.target.value })}
              />
              <select value={g.rsvp} onChange={(e) => update(g.id, { rsvp: e.target.value as RSVP })}>
                {Object.entries(RSVP_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>RSVP: {v}</option>
                ))}
              </select>
            </div>
            <div className="guest-secondary">
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={g.plusOne}
                  onChange={(e) => update(g.id, { plusOne: e.target.checked })}
                />
                +1
              </label>
              {g.plusOne && (
                <input
                  placeholder="Plus-one name (optional)"
                  value={g.plusOneName}
                  onChange={(e) => update(g.id, { plusOneName: e.target.value })}
                />
              )}
              <input
                placeholder="Dietary (e.g. veg, GF, nut allergy)"
                value={g.dietary}
                onChange={(e) => update(g.id, { dietary: e.target.value })}
              />
              <button
                className="btn-icon"
                onClick={() => remove(g.id)}
                aria-label="Remove guest"
              >
                ×
              </button>
            </div>
            <input
              placeholder="Notes"
              value={g.notes}
              onChange={(e) => update(g.id, { notes: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
