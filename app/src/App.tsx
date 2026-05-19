import { useState } from "react";
import { Timeline } from "./components/Timeline";
import { Vendors } from "./components/Vendors";
import { Guests } from "./components/Guests";
import "./App.css";

type Tab = "timeline" | "vendors" | "guests";

const WEDDING_DATE = "Saturday, September 4, 2027";
const LOCATION = "Colorado foothills";

function App() {
  const [tab, setTab] = useState<Tab>("timeline");

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div>
            <div className="header-title">Our Wedding</div>
            <div className="header-sub">{WEDDING_DATE} · {LOCATION}</div>
          </div>
          <nav className="tabs">
            <button
              className={tab === "timeline" ? "active" : ""}
              onClick={() => setTab("timeline")}
            >
              Timeline
            </button>
            <button
              className={tab === "vendors" ? "active" : ""}
              onClick={() => setTab("vendors")}
            >
              Vendors
            </button>
            <button
              className={tab === "guests" ? "active" : ""}
              onClick={() => setTab("guests")}
            >
              Guests
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {tab === "timeline" && <Timeline />}
        {tab === "vendors" && <Vendors />}
        {tab === "guests" && <Guests />}
      </main>

      <footer className="app-footer">
        Your data is stored locally in this browser. Export your guest list
        regularly so you don't lose it.
      </footer>
    </div>
  );
}

export default App;
