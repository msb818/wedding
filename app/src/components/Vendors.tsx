import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type VendorStatus =
  | "researching"
  | "contacted"
  | "quoted"
  | "booked"
  | "passed";

type Vendor = {
  id: string;
  category: string;
  name: string;
  contact: string;
  status: VendorStatus;
  estimate: string;
  quoted: string;
  booked: string;
  notes: string;
};

const STATUS_LABELS: Record<VendorStatus, string> = {
  researching: "Researching",
  contacted: "Contacted",
  quoted: "Quoted",
  booked: "Booked",
  passed: "Passed",
};

const CATEGORIES = [
  "Venue",
  "Photographer",
  "Videographer",
  "Caterer",
  "Bar",
  "Florist",
  "DJ / Band",
  "Officiant",
  "Hair & Makeup",
  "Cake / Dessert",
  "Transportation",
  "Planner / Coordinator",
  "Rentals",
  "Stationery",
  "Other",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Vendors() {
  const [vendors, setVendors] = useLocalStorage<Vendor[]>("vendors", []);
  const [filter, setFilter] = useState<"all" | VendorStatus>("all");

  const add = () => {
    setVendors((v) => [
      ...v,
      {
        id: uid(),
        category: "Venue",
        name: "",
        contact: "",
        status: "researching",
        estimate: "",
        quoted: "",
        booked: "",
        notes: "",
      },
    ]);
  };

  const update = (id: string, patch: Partial<Vendor>) => {
    setVendors((v) => v.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const remove = (id: string) => {
    if (!confirm("Delete this vendor?")) return;
    setVendors((v) => v.filter((x) => x.id !== id));
  };

  const visible = vendors.filter((v) =>
    filter === "all" ? true : v.status === filter
  );

  const totalBooked = vendors
    .filter((v) => v.status === "booked")
    .reduce((sum, v) => sum + (parseFloat(v.booked.replace(/[^0-9.-]/g, "")) || 0), 0);

  const totalQuoted = vendors
    .filter((v) => v.status === "quoted" || v.status === "booked")
    .reduce(
      (sum, v) =>
        sum +
        (parseFloat(v.booked.replace(/[^0-9.-]/g, "")) ||
          parseFloat(v.quoted.replace(/[^0-9.-]/g, "")) ||
          0),
      0
    );

  return (
    <div className="vendors">
      <div className="vendors-toolbar">
        <div className="vendor-stats">
          <span><strong>{vendors.length}</strong> vendors</span>
          <span>${totalQuoted.toLocaleString()} quoted/booked</span>
          <span>${totalBooked.toLocaleString()} booked</span>
        </div>
        <div className="vendors-actions">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <button className="btn-primary" onClick={add}>+ Add vendor</button>
        </div>
      </div>

      {visible.length === 0 && (
        <div className="empty-state">
          <p>No vendors yet. Start with venues — that's your Phase 1 work.</p>
          <button className="btn-primary" onClick={add}>+ Add your first vendor</button>
        </div>
      )}

      <div className="vendor-cards">
        {visible.map((v) => (
          <div key={v.id} className={`vendor-card status-${v.status}`}>
            <div className="vendor-row">
              <select
                value={v.category}
                onChange={(e) => update(v.id, { category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={v.status}
                onChange={(e) => update(v.id, { status: e.target.value as VendorStatus })}
              >
                {Object.entries(STATUS_LABELS).map(([k, l]) => (
                  <option key={k} value={k}>{l}</option>
                ))}
              </select>
              <button
                className="btn-icon"
                onClick={() => remove(v.id)}
                aria-label="Delete vendor"
              >
                ×
              </button>
            </div>
            <input
              className="vendor-name"
              placeholder="Vendor name"
              value={v.name}
              onChange={(e) => update(v.id, { name: e.target.value })}
            />
            <input
              placeholder="Contact (email, phone, website)"
              value={v.contact}
              onChange={(e) => update(v.id, { contact: e.target.value })}
            />
            <div className="vendor-row">
              <label>
                Estimate
                <input
                  placeholder="$"
                  value={v.estimate}
                  onChange={(e) => update(v.id, { estimate: e.target.value })}
                />
              </label>
              <label>
                Quoted
                <input
                  placeholder="$"
                  value={v.quoted}
                  onChange={(e) => update(v.id, { quoted: e.target.value })}
                />
              </label>
              <label>
                Booked
                <input
                  placeholder="$"
                  value={v.booked}
                  onChange={(e) => update(v.id, { booked: e.target.value })}
                />
              </label>
            </div>
            <textarea
              placeholder="Notes — pricing details, what they include, impressions after the call…"
              value={v.notes}
              onChange={(e) => update(v.id, { notes: e.target.value })}
              rows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
