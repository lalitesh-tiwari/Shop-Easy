import { useEffect, useState, useRef, memo } from "react";
import { getCategories } from "../api/api";
import { useSearchParams } from "react-router-dom";
import "./Filter.scss";

type Cat = { slug: string; name: string };

const groups: Record<string, string[]> = {
  Men:         ["mens-shirts", "mens-shoes", "mens-watches"],
  Women:       ["tops","womens-dresses", "womens-bags", "womens-shoes", "womens-watches", "womens-jewellery"],
  Sunglasses: ["sunglasses"],
  Electronics: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  Beauty: ["beauty", "fragrances", "skin-care"],
  Home:        ["furniture", "home-decoration", "kitchen-accessories"],
  Sports:      ["sports-accessories"],
  Vehicles:    ["vehicle", "motorcycle"],
  Other:       ["groceries"],
};

const Filter = () => {
  const [allCats, setAllCats] = useState<Cat[]>([]);
  const [params, setParams] = useSearchParams();
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selected = params.getAll("category");
  const sortVal = params.get("sort") || "";

  useEffect(() => {
    getCategories().then(setAllCats);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpenDrop(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const toggleCat = (slug: string) => {
    const curr = params.getAll("category");
    const next = new URLSearchParams(params);
    next.delete("category");
    if (curr.includes(slug)) {
      curr.filter(c => c !== slug).forEach(c => next.append("category", c));
    } else {
      [...curr, slug].forEach(c => next.append("category", c));
    }
    setParams(next);
  };

  const onSort = (val: string) => {
    const next = new URLSearchParams(params);
    val ? next.set("sort", val) : next.delete("sort");
    setParams(next);
  };

  const findCat = (slug: string) => allCats.find(c => c.slug === slug);
  const isGroupActive = (g: string) => groups[g].some(s => selected.includes(s));

  return (
    <>
      <div className="df-wrap">
        <div className="df-groups" ref={ref}>
          <button
            className={`df-pill ${selected.length === 0 ? "df-pill-active" : ""}`}
            onClick={() => { setParams({}); setOpenDrop(null); }}
          >
            All
          </button>

          {Object.keys(groups).map(g => (
            <div key={g} className="df-item">
              <button
                className={`df-pill ${isGroupActive(g) ? "df-pill-active" : ""}`}
                onClick={() => setOpenDrop(openDrop === g ? null : g)}
              >
                {g} <span className="df-arrow">{openDrop === g ? "▴" : "▾"}</span>
              </button>

              {openDrop === g && (
                <div className="df-drop">
                  {groups[g].map(slug => {
                    const cat = findCat(slug);
                    if (!cat) return null;
                    return (
                      <button
                        key={slug}
                        className={`df-drop-opt ${selected.includes(slug) ? "df-drop-opt-on" : ""}`}
                        onClick={() => toggleCat(slug)}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <select className="df-sort" value={sortVal} onChange={e => onSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="name_asc">Name: A–Z</option>
        </select>
      </div>

      <div className="mf-wrap">
        <button className="mf-trigger" onClick={() => setDrawer(true)}>
          ☰ Filters
          {selected.length > 0 && <span className="mf-badge">{selected.length}</span>}
        </button>

        <select className="df-sort" value={sortVal} onChange={e => onSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="name_asc">Name: A–Z</option>
        </select>
      </div>

      {drawer && (
        <div className="drw-overlay" onClick={() => setDrawer(false)}>
          <div className="drw" onClick={e => e.stopPropagation()}>
            <div className="drw-top">
              <span>Filters</span>
              <button onClick={() => setDrawer(false)}>✕</button>
            </div>

            <div className="drw-body">
              {Object.keys(groups).map(g => (
                <div key={g} className="drw-section">
                  <button
                    className="drw-section-title"
                    onClick={() => setOpenSection(openSection === g ? null : g)}
                  >
                    <span>{g}</span>
                    <span>{openSection === g ? "▴" : "▾"}</span>
                  </button>

                  {openSection === g && (
                    <div className="drw-opts">
                      {groups[g].map(slug => {
                        const cat = findCat(slug);
                        if (!cat) return null;
                        return (
                          <button
                            key={slug}
                            className={`drw-opt ${selected.includes(slug) ? "drw-opt-on" : ""}`}
                            onClick={() => toggleCat(slug)}
                          >
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="drw-footer">
              <button onClick={() => { setParams({}); setDrawer(false); }}>Clear</button>
              <button onClick={() => setDrawer(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Filter);