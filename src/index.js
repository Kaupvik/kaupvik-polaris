"use client";
import * as React from "react";
import { createElement as h, useId, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export function BrandFooter({ children, href = "https://kaupvik.com" }) {
  return h(
    "footer",
    { className: "kp-footer" },
    children && h("div", null, children),
    h(
      "span",
      null,
      "Built by ",
      h(
        "s-link",
        { href, target: "_blank", rel: "noopener noreferrer" },
        "Kaupvik",
      ),
    ),
  );
}
export function EmptyState({ title, description, action, kind = "companies" }) {
  return h(
    "section",
    { className: "kp-empty", "aria-label": title },
    h(
      "svg",
      {
        viewBox: "0 0 180 140",
        className: "kp-empty-art",
        "aria-hidden": true,
      },
      h("ellipse", {
        cx: 90,
        cy: 85,
        rx: 70,
        ry: 50,
        fill: "var(--kp-surface-subdued)",
      }),
      h("path", {
        d: "M45 112V45h60v67M105 62h30v50M58 62h10m12 0h10M58 80h10m12 0h10M58 98h10m12 0h10M115 80h10m-10 18h10",
        fill: "var(--kp-surface)",
        stroke: "var(--kp-ink-subdued)",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      h("circle", { cx: 134, cy: 111, r: 18, fill: "var(--kp-accent)" }),
      h("path", {
        d: kind === "tasks" ? "M126 111l6 6 11-13" : "M125 111h18m-9-9v18",
        stroke: "white",
        strokeWidth: 3,
        fill: "none",
      }),
    ),
    h("s-heading", { fontSize: "base" }, title),
    h("s-paragraph", { color: "subdued" }, description),
    action && h("div", { className: "kp-empty-action" }, action),
  );
}
export function BentoGrid({ children }) {
  return h("div", { className: "kp-bento" }, children);
}
function stageArtwork(kind, featured) {
  const accent =
    kind === "pricing"
      ? "#005BD3"
      : kind === "commissions" || kind === "statements"
        ? "#0C7B43"
        : kind === "restock" || kind === "receivables"
          ? "#B25E09"
          : kind === "sales"
            ? "#67309E"
            : kind === "credit"
              ? "#3D4D5D"
              : "#303030";
  const soft =
    kind === "pricing"
      ? "#EEF5FF"
      : kind === "commissions" || kind === "statements"
        ? "#ECF8F1"
        : kind === "restock" || kind === "receivables"
          ? "#FFF5E8"
          : kind === "sales"
            ? "#F5F0FA"
            : kind === "credit"
              ? "#EEF2F5"
              : "#F4F5F7";

  if (featured) {
    const labels = {
      import: ["Match columns", "Verify catalog", "Publish"],
      sales: ["Assigned rep", "Draft quote", "Checkout ready"],
      restock: ["Order pulse", "Due cycle", "One-click basket"],
      pricing: ["Price group", "Margin floor", "Quote lock"],
      commissions: ["Verified order", "Ledger check", "Settled payout"],
      credit: ["Company pool", "Location limit", "Checkout guard"],
      receivables: ["Open balance", "Aging bucket", "Payment read-back"],
      statements: ["Period ledger", "Aging summary", "Branded PDF/CSV"],
    }[kind] || ["Company", "Locations", "Approved buyers"];

    return h(
      "svg",
      {
        className: "kp-stage-svg kp-stage-svg-featured",
        viewBox: "0 0 420 156",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      h("rect", { x: 8, y: 12, width: 118, height: 132, rx: 12, fill: "#FFFFFF", stroke: "#E3E3E3" }),
      h("circle", { cx: 34, cy: 40, r: 12, fill: soft, stroke: accent, strokeOpacity: 0.25 }),
      h("circle", { cx: 34, cy: 38, r: 4, fill: accent }),
      h("rect", { x: 54, y: 31, width: 54, height: 7, rx: 3.5, fill: "#303030" }),
      h("rect", { x: 54, y: 43, width: 38, height: 5, rx: 2.5, fill: "#B5B5B5" }),
      h("rect", { x: 22, y: 66, width: 90, height: 22, rx: 6, fill: soft }),
      h("rect", { x: 30, y: 74, width: 52, height: 5, rx: 2.5, fill: accent }),
      h("rect", { x: 22, y: 98, width: 90, height: 10, rx: 5, fill: "#F1F2F4" }),
      h("rect", { x: 22, y: 116, width: 64, height: 10, rx: 5, fill: "#F1F2F4" }),
      h("path", { d: "M128 78H148", stroke: "#B5B5B5", strokeWidth: 1.75, strokeLinecap: "round", strokeDasharray: "3 3" }),
      h("path", { d: "M144 73L150 78L144 83", stroke: "#8A8A8A", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" }),
      h("rect", { x: 152, y: 12, width: 118, height: 132, rx: 12, fill: "#FFFFFF", stroke: accent, strokeOpacity: 0.35 }),
      h("rect", { x: 166, y: 26, width: 62, height: 16, rx: 8, fill: soft }),
      h("rect", { x: 174, y: 32, width: 46, height: 4, rx: 2, fill: accent }),
      h("rect", { x: 166, y: 54, width: 90, height: 8, rx: 4, fill: "#303030" }),
      h("rect", { x: 166, y: 70, width: 90, height: 24, rx: 6, fill: "#F7F7F8", stroke: "#EBEBEB" }),
      h("rect", { x: 174, y: 79, width: 42, height: 6, rx: 3, fill: "#8A8A8A" }),
      h("rect", { x: 228, y: 79, width: 20, height: 6, rx: 3, fill: accent }),
      h("rect", { x: 166, y: 102, width: 90, height: 28, rx: 7, fill: soft }),
      h("rect", { x: 176, y: 113, width: 70, height: 6, rx: 3, fill: accent }),
      h("path", { d: "M272 78H292", stroke: "#B5B5B5", strokeWidth: 1.75, strokeLinecap: "round", strokeDasharray: "3 3" }),
      h("path", { d: "M288 73L294 78L288 83", stroke: "#8A8A8A", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" }),
      h("rect", { x: 296, y: 12, width: 116, height: 132, rx: 12, fill: "#FFFFFF", stroke: "#E3E3E3" }),
      h("circle", { cx: 354, cy: 48, r: 16, fill: "#ECF8F1" }),
      h("path", { d: "M347 48L352 53L362 43", stroke: "#0C7B43", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" }),
      h("rect", { x: 318, y: 76, width: 72, height: 8, rx: 4, fill: "#303030" }),
      h("rect", { x: 326, y: 92, width: 56, height: 6, rx: 3, fill: "#8A8A8A" }),
      h("rect", { x: 314, y: 112, width: 80, height: 18, rx: 9, fill: "#ECF8F1" }),
      h("rect", { x: 328, y: 119, width: 52, height: 4, rx: 2, fill: "#0C7B43" }),
      h("title", null, labels.join(" -> ")),
    );
  }

  if (kind === "pricing" || kind === "credit") {
    return h(
      "svg",
      { className: "kp-stage-svg", viewBox: "0 0 260 68", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("rect", { x: 10, y: 8, width: 152, height: 52, rx: 9, fill: "#FFFFFF", stroke: "#E3E3E3" }),
      h("rect", { x: 22, y: 19, width: 70, height: 7, rx: 3.5, fill: "#303030" }),
      h("rect", { x: 22, y: 34, width: 96, height: 5, rx: 2.5, fill: "#B5B5B5" }),
      h("rect", { x: 22, y: 45, width: 46, height: 6, rx: 3, fill: soft }),
      h("rect", { x: 170, y: 8, width: 80, height: 52, rx: 9, fill: "#FFFFFF", stroke: "#E3E3E3" }),
      h("rect", { x: 182, y: 18, width: 56, height: 14, rx: 7, fill: soft }),
      h("rect", { x: 192, y: 23, width: 36, height: 4, rx: 2, fill: accent }),
      h("rect", { x: 182, y: 40, width: 48, height: 7, rx: 3.5, fill: "#303030" }),
    );
  }

  if (kind === "commissions" || kind === "statements") {
    return h(
      "svg",
      { className: "kp-stage-svg", viewBox: "0 0 260 68", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("rect", { x: 10, y: 8, width: 240, height: 52, rx: 9, fill: "#FFFFFF", stroke: "#E3E3E3" }),
      h("rect", { x: 24, y: 42, width: 16, height: 10, rx: 3, fill: "#E5E7EB" }),
      h("rect", { x: 46, y: 34, width: 16, height: 18, rx: 3, fill: "#D1FAE5" }),
      h("rect", { x: 68, y: 24, width: 16, height: 28, rx: 3, fill: "#A7F3D0" }),
      h("rect", { x: 90, y: 16, width: 16, height: 36, rx: 3, fill: accent }),
      h("rect", { x: 122, y: 20, width: 68, height: 7, rx: 3.5, fill: "#303030" }),
      h("rect", { x: 122, y: 34, width: 52, height: 5, rx: 2.5, fill: "#8A8A8A" }),
      h("rect", { x: 202, y: 22, width: 34, height: 24, rx: 12, fill: soft }),
      h("path", { d: "M213 34L217 38L225 30", stroke: accent, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }),
    );
  }

  if (kind === "restock" || kind === "receivables") {
    return h(
      "svg",
      { className: "kp-stage-svg", viewBox: "0 0 260 68", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("rect", { x: 10, y: 8, width: 240, height: 52, rx: 9, fill: "#FFFFFF", stroke: "#E3E3E3" }),
      h("circle", { cx: 36, cy: 34, r: 14, fill: soft }),
      h("path", { d: "M31 30C33.5 27.5 38.5 27.5 41 30V26M41 38C38.5 40.5 33.5 40.5 31 38V42", stroke: accent, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }),
      h("rect", { x: 62, y: 21, width: 88, height: 7, rx: 3.5, fill: "#303030" }),
      h("rect", { x: 62, y: 35, width: 68, height: 5, rx: 2.5, fill: "#8A8A8A" }),
      h("rect", { x: 186, y: 22, width: 50, height: 24, rx: 12, fill: soft }),
      h("rect", { x: 196, y: 32, width: 30, height: 4, rx: 2, fill: accent }),
    );
  }

  return h(
    "svg",
    { className: "kp-stage-svg", viewBox: "0 0 260 68", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    h("rect", { x: 10, y: 8, width: 106, height: 52, rx: 9, fill: "#FFFFFF", stroke: "#E3E3E3" }),
    h("rect", { x: 22, y: 20, width: 54, height: 7, rx: 3.5, fill: "#303030" }),
    h("rect", { x: 22, y: 34, width: 76, height: 5, rx: 2.5, fill: "#8A8A8A" }),
    h("rect", { x: 22, y: 45, width: 44, height: 5, rx: 2.5, fill: "#C9CCCF" }),
    h("path", { d: "M122 34H138", stroke: "#8A8A8A", strokeWidth: 1.75, strokeLinecap: "round", strokeDasharray: "2.5 2.5" }),
    h("rect", { x: 144, y: 8, width: 106, height: 52, rx: 9, fill: "#FFFFFF", stroke: "#E3E3E3" }),
    h("rect", { x: 156, y: 19, width: 48, height: 12, rx: 6, fill: soft }),
    h("rect", { x: 164, y: 23, width: 32, height: 4, rx: 2, fill: accent }),
    h("rect", { x: 156, y: 39, width: 76, height: 6, rx: 3, fill: "#303030" }),
  );
}

export function StageCard({
  title,
  description,
  eyebrow,
  action,
  children,
  featured = false,
  kind = "companies",
}) {
  return h(
    "section",
    { className: "kp-stage" + (featured ? " kp-stage-featured" : "") },
    h(
      "div",
      { className: "kp-stage-art kp-stage-art-" + kind, "aria-hidden": true },
      stageArtwork(kind, featured),
    ),
    h(
      "div",
      { className: "kp-stage-copy" },
      eyebrow && h("s-text", { color: "subdued" }, eyebrow),
      h("s-heading", { fontSize: featured ? "large" : "base" }, title),
      h("s-paragraph", { color: "subdued" }, description),
      children,
      action && h("div", { className: "kp-stage-action" }, action),
    ),
  );
}
export function SourceTabs({
  items,
  selected,
  onSelect,
  children,
  label = "Views",
}) {
  const id = useId();
  function keydown(e, i) {
    let next;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft")
      next = (i + items.length - 1) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    onSelect(items[next].id);
    document.getElementById(id + "-" + items[next].id)?.focus();
  }
  return h(
    "div",
    { className: "kp-source-tabs" },
    h(
      "div",
      { role: "tablist", "aria-label": label, className: "kp-tablist" },
      items.map((item, i) =>
        h(
          "button",
          {
            type: "button",
            role: "tab",
            key: item.id,
            id: id + "-" + item.id,
            "aria-selected": selected === item.id,
            "aria-controls": id + "-panel",
            tabIndex: selected === item.id ? 0 : -1,
            onClick: () => onSelect(item.id),
            onKeyDown: (e) => keydown(e, i),
          },
          item.label,
        ),
      ),
    ),
    h(
      "div",
      {
        role: "tabpanel",
        id: id + "-panel",
        "aria-labelledby": id + "-" + selected,
        className: "kp-tabpanel",
      },
      children,
    ),
  );
}
export function ResourceToolbar({ children }) {
  return h("div", { className: "kp-resource-toolbar" }, children);
}
export function SettingsLayout({ sections, selected, onNavigate, children, collapseNavigationOnDrawer = false }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (!collapseNavigationOnDrawer) return;
    const update = () => setDrawerOpen(document.documentElement.classList.contains("kp-has-drawer"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {attributes:true, attributeFilter:["class"]});
    return () => observer.disconnect();
  }, [collapseNavigationOnDrawer]);
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    if (selected !== undefined || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((x) => x.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -65% 0px" },
    );
    sections.forEach((s) => {
      const node = document.getElementById(s.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [sections, selected]);
  return h(
    "div",
    { className: "kp-settings" + (collapseNavigationOnDrawer && drawerOpen ? " kp-settings-navigation-hidden" : "") },
    h(
      "nav",
      { "aria-label": "Settings sections", inert: collapseNavigationOnDrawer && drawerOpen ? true : undefined, "aria-hidden": collapseNavigationOnDrawer && drawerOpen ? true : undefined },
      h("s-section", {padding:"small", accessibilityLabel:"Settings navigation"}, sections.map((s) =>
        h(
          "a",
          {
            key: s.id,
            href: s.href || "#" + s.id,
            "aria-current": (selected ?? active) === s.id ? (selected !== undefined ? "page" : "location") : undefined,
            onClick: (event) => {
              if (selected !== undefined && onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault(); onNavigate(s.id, s.href);
              } else if (selected === undefined) setActive(s.id);
            },
          },
          s.icon && h("span", {className:"kp-settings-icon", "aria-hidden":true}, h("s-icon", {type:s.icon})),
          h("span", null, s.title),
        ),
      )),
    ),
    h(
      "div",
      null,
      selected !== undefined ? children : sections.map((s) =>
        h(
          "section",
          { key: s.id, id: s.id, className: "kp-settings-section" },
          h("s-section", { heading: s.title }, s.children),
        ),
      ),
    ),
  );
}
function normalizeSuggestion(entry) {
  if (typeof entry === "string") return { value: entry, label: entry, detail: "" };
  return {
    value: String(entry?.value ?? ""),
    label: String(entry?.label ?? entry?.value ?? ""),
    detail: String(entry?.detail ?? ""),
  };
}
function ValuePicker({ field, value, onChange }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  if (field.choices)
    return h(
      "s-select",
      {
        label: "Value",
        value,
        onChange: (e) => onChange(e.currentTarget.value),
      },
      h("s-option", { value: "" }, "Choose a value"),
      field.choices.map((c) =>
        h("s-option", { key: c.value, value: c.value }, c.label),
      ),
    );
  const items = (field.suggestions || []).map(normalizeSuggestion);
  const needle = String(value || "").trim().toLowerCase();
  const matches = items
    .filter(
      (item) =>
        !needle ||
        item.value.toLowerCase().includes(needle) ||
        item.label.toLowerCase().includes(needle) ||
        item.detail.toLowerCase().includes(needle),
    )
    .slice(0, 60);
  const pick = (item) => {
    onChange(item.value);
    setOpen(false);
    setHighlight(-1);
  };
  return h(
    "div",
    {
      className: "kp-value-picker",
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
          setHighlight(-1);
        }
      },
    },
    h("s-text-field", {
      label: "Value",
      value,
      autocomplete: "off",
      placeholder: field.placeholder || "Enter or search value",
      onFocus: () => items.length && setOpen(true),
      onInput: (e) => {
        onChange(e.currentTarget.value);
        if (items.length) setOpen(true);
        setHighlight(-1);
      },
      onKeyDown: (e) => {
        if (!items.length) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
          setHighlight((i) => Math.min(matches.length - 1, i + 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlight((i) => Math.max(0, i - 1));
        } else if (e.key === "Enter" && open && matches[highlight]) {
          e.preventDefault();
          pick(matches[highlight]);
        } else if (e.key === "Escape") {
          setOpen(false);
          setHighlight(-1);
        }
      },
    }),
    open &&
      matches.length > 0 &&
      h(
        "div",
        {
          className: "kp-value-autocomplete",
          role: "listbox",
          "aria-label": `${field.label} suggestions`,
        },
        matches.map((item, idx) =>
          h(
            "button",
            {
              key: `${item.value}:${idx}`,
              type: "button",
              role: "option",
              "aria-selected": idx === highlight,
              className: `kp-value-suggestion ${idx === highlight ? "is-active" : ""}`,
              onMouseDown: (e) => {
                e.preventDefault();
                pick(item);
              },
            },
            h("strong", null, item.label),
            (item.detail || item.label !== item.value) &&
              h(
                "small",
                null,
                [item.detail, item.label !== item.value ? item.value : ""]
                  .filter(Boolean)
                  .join(" · "),
              ),
          ),
        ),
      ),
    items.length > 0 &&
      h(
        "div",
        { className: "kp-value-menu" },
        h("s-button", {
          variant: "tertiary",
          icon: "chevron-down",
          accessibilityLabel: "Choose " + field.label,
          commandFor: id,
          command: "--toggle",
        }),
        h(
          "s-popover",
          { id },
          h(
            "div",
            { className: "kp-value-options" },
            matches.map((item, idx) =>
              h(
                "s-button",
                {
                  key: `${item.value}:p${idx}`,
                  variant: "tertiary",
                  commandFor: id,
                  command: "--hide",
                  onClick: () => pick(item),
                },
                item.detail ? `${item.label} — ${item.detail}` : item.label,
              ),
            ),
            h("s-text", { color: "subdued" }, "Type to filter or enter any value"),
          ),
        ),
      ),
  );
}
export function FilterBuilder({
  groups,
  onChange,
  fields,
  expression,
  onExpressionChange,
}) {
  const legacy = !expression;
  const root = (expression?.kind === "rule" ? {kind:"group",match:"all",children:[expression]} : expression) || {
    kind: "group",
    match: "any",
    children: groups.map((g) => ({
      kind: "group",
      match: "all",
      children: g.rules.map((r) => ({ kind: "rule", ...r })),
    })),
  };
  const countNodes = (node) =>
    1 +
    (node.kind === "group"
      ? node.children.reduce((n, c) => n + countNodes(c), 0)
      : 0);
  const total = countNodes(root);
  const emit = (next) =>
    legacy
      ? onChange(
          next.children.map((g) => ({
            rules: g.children.map(({ kind, ...r }) => r),
          })),
        )
      : onExpressionChange(next);
  const replace = (path, next) => {
    const walk = (node, i) =>
      i === path.length
        ? next
        : {
            ...node,
            children: node.children.map((c, j) =>
              j === path[i] ? walk(c, i + 1) : c,
            ),
          };
    emit(walk(root, 0));
  };
  const rule = () => ({
    kind: "rule",
    field: fields[0].key,
    operator: fields[0].operators?.[0] || "eq",
    value: "",
  });
  const labels = {
    eq: "is",
    not: "is not",
    contains: "contains",
    not_contains: "does not contain",
    starts_with: "starts with",
    ends_with: "ends with",
    gte: "at least / on or after",
    lte: "at most / on or before",
    exists: "has a value",
    missing: "is empty",
  };
  const choices = [
    ["all", "AND · all must match"],
    ["any", "OR · any may match"],
    ["none", "NOT · none may match"],
    ["one", "Exactly one must match"],
  ];
  function draw(node, path, depth) {
    if (node.kind === "rule") {
      const field = fields.find((f) => f.key === node.field) || fields[0];
      return h(
        "div",
        { className: "kp-filter-row" },
        h("div", {className:"kp-filter-cell"}, h(
          "s-select",
          {
            label: "Field",
            value: node.field,
            onChange: (e) => {
              const f = fields.find((f) => f.key === e.currentTarget.value);
              replace(path, {
                ...node,
                field: f.key,
                operator: f.operators?.[0] || "eq",
                value: "",
              });
            },
          },
          fields.map((f) =>
            h("s-option", { key: f.key, value: f.key }, f.label),
          ),
        )),
        h("div", {className:"kp-filter-cell"}, h(
          "s-select",
          {
            label: "Condition",
            value: node.operator,
            onChange: (e) =>
              replace(path, { ...node, operator: e.currentTarget.value }),
          },
          (field.operators || ["eq", "not"]).map((op) =>
            h("s-option", { key: op, value: op }, labels[op] || op),
          ),
        )),
        h("div", {className:"kp-filter-cell kp-filter-value"}, ["exists", "missing"].includes(node.operator)
          ? h("s-text", { color: "subdued" }, "No value needed")
          : h(ValuePicker, {
              field,
              value: node.value,
              onChange: (value) => replace(path, { ...node, value }),
            })),
      );
    }
    return h(
      "section",
      {
        className: "kp-filter-group",
        "aria-label": depth
          ? "Nested condition group"
          : "Customer filter expression",
      },
      h(
        "div",
        { className: "kp-filter-heading" },
        legacy
          ? h(
              "s-text",
              null,
              depth ? "Match all conditions" : "Any matching group",
            )
          : h(
              "s-select",
              {
                label: depth
                  ? "Combine this group"
                  : "Combine top-level conditions",
                value: node.match,
                onChange: (e) =>
                  replace(path, { ...node, match: e.currentTarget.value }),
              },
              choices.map(([value, label]) =>
                h("s-option", { key: value, value }, label),
              ),
            ),
      ),
      node.children.map((child, i) =>
        h(
          "div",
          { className: "kp-filter-child", key: i },
          draw(child, [...path, i], depth + 1),
          h("s-button", {
            variant: "tertiary",
            icon: "x",
            accessibilityLabel:
              "Remove " +
              (child.kind === "group" ? "group" : "condition") +
              " " +
              (i + 1),
            disabled: node.children.length === 1,
            onClick: () =>
              replace(path, {
                ...node,
                children: node.children.filter((_, j) => j !== i),
              }),
          }),
        ),
      ),
      h(
        "div",
        { className: "kp-filter-add" },
        h(
          "s-button",
          {
            variant: "tertiary",
            disabled: node.children.length >= 6 || total >= 64,
            onClick: () =>
              replace(path, { ...node, children: [...node.children, rule()] }),
          },
          "Add condition",
        ),
        !legacy &&
          depth < 3 &&
          h(
            "s-button",
            {
              variant: "tertiary",
              disabled: node.children.length >= 6 || total >= 63,
              onClick: () =>
                replace(path, {
                  ...node,
                  children: [
                    ...node.children,
                    { kind: "group", match: "all", children: [rule()] },
                  ],
                }),
            },
            "Add subgroup",
          ),
      ),
    );
  }
  return h(
    "div",
    { className: "kp-filter-builder" },
    draw(root, [], 0),
    legacy &&
      h(
        "s-button",
        {
          disabled: groups.length >= 4,
          onClick: () =>
            onChange([
              ...groups,
              { rules: [{ field: fields[0].key, operator: "eq", value: "" }] },
            ]),
        },
        "Add OR group",
      ),
  );
}
export function Skeleton({
  variant = "card",
  rows = 4,
  columns = 1,
  minHeight,
  label = "Loading content",
}) {
  const heights = { page: 540, card: 210, table: 320, graph: 600, form: 350 };
  return h(
    "div",
    {
      className: "kp-skeleton kp-skeleton-" + variant,
      role: "status",
      "aria-label": label,
      "aria-busy": true,
      style: { minHeight: minHeight ?? heights[variant] ?? 210 },
    },
    h("span", { className: "kp-skeleton-heading" }),
    h(
      "div",
      {
        className: "kp-skeleton-grid",
        style: {
          gridTemplateColumns: "repeat(" + columns + ", minmax(0,1fr))",
        },
      },
      Array.from({ length: Math.min(30, rows * columns) }, (_, i) =>
        h("span", { key: i, className: "kp-skeleton-line" }),
      ),
    ),
  );
}
export function WizardSteps({ steps, current, onSelect }) {
  return h(
    "nav",
    { "aria-label": "Import progress", className: "kp-wizard" },
    h(
      "ol",
      null,
      steps.map((label, i) =>
        h(
          "li",
          {
            key: label,
            "aria-current": i === current ? "step" : undefined,
            "data-complete": i < current,
          },
          h(
            "button",
            {
              type: "button",
              disabled: !onSelect || i > current,
              onClick: () => onSelect?.(i),
            },
            h("span", { "aria-hidden": true }, i < current ? "✓" : i + 1),
            label,
          ),
        ),
      ),
    ),
  );
}
export function SettingsRow({ title, description, icon, action }) {
  return h(
    "div",
    { className: "kp-settings-row" },
    icon && h("s-icon", { type: icon }),
    h(
      "div",
      { className: "kp-settings-row-copy" },
      h("s-text", { type: "strong" }, title),
      description && h("s-paragraph", { color: "subdued" }, description),
    ),
    action && h("div", { className: "kp-settings-row-action" }, action),
  );
}

/** Native statistic with a keyboard-accessible definition, like Quick Order. */
export function MetricCard({label, value, detail, definition, icon}) {
  const id = useId();
  const mounted = React.useSyncExternalStore(
    subscribeToClient,
    clientSnapshot,
    serverSnapshot,
  );
  return h("s-section", {accessibilityLabel:label, className:"kp-metric-card"},
    h("div", {className:"kp-metric-content"},
      h("div", {className:"kp-metric-label"},
        h("span", {className:definition ? "kp-metric-trigger has-definition" : "kp-metric-trigger"},
          h("s-text", {interestFor:definition ? id : undefined, tabIndex:definition ? 0 : undefined, fontWeight:"semibold"}, label)),
        icon && h("span", {"aria-hidden":true}, icon)),
      h("s-heading", {accessibilityRole:"presentation", fontSize:String(value).length > 12 ? "large-200" : "large-400"},
        h("s-number", {fontWeight:"semibold"}, value)),
      detail && h("s-text", {color:"subdued"}, detail)),
    mounted && definition && createPortal(h("s-tooltip", {id}, definition), document.body));
}

/** Inset native-style separators. Icons and copy share fixed real boxes. */
export function SettingsRows({children}) {
  return h("div", {className:"kp-settings-rows"}, children);
}
export function MappingTable({
  groups,
  fields,
  columns,
  mapping,
  examples,
  onChange,
  targetLabel = "Company Onboard field",
}) {
  return h(
    "div",
    { className: "kp-mapping" },
    groups.map((g, i) =>
      h(
        "details",
        { key: g.title, open: i === 0, className: "kp-mapping-group" },
        h(
          "summary",
          null,
          h("s-icon", { type: g.icon || "list-bulleted" }),
          g.title,
          h(
            "span",
            null,
            g.fields.filter((k) => mapping[k]).length +
              " / " +
              g.fields.length +
              " mapped",
          ),
          h(
            "span",
            { className: "kp-mapping-chevron", "aria-hidden": true },
            h("s-icon", { type: "chevron-down" }),
          ),
        ),
        h(
          "div",
          {
            className: "kp-mapping-table",
            role: "table",
            "aria-label": g.title,
          },
          h(
            "div",
            { className: "kp-mapping-row kp-mapping-head", role: "row" },
            h("span", { role: "columnheader" }, targetLabel),
            h("span", { "aria-hidden": true }),
            h("span", { role: "columnheader" }, "Source column"),
            h("span", { role: "columnheader" }, "Example"),
          ),
          g.fields.map((k) =>
            h(
              "div",
              { className: "kp-mapping-row", role: "row", key: k },
              h(
                "span",
                { role: "cell" },
                h("s-icon", { type: g.icon || "text" }),
                fields[k],
              ),
              h(
                "span",
                { className: "kp-mapping-arrow", "aria-hidden": true },
                h("s-icon", { type: "arrow-right" }),
              ),
              h(
                "div",
                { className: "kp-mapping-source", role: "cell" },
                h(
                  "s-select",
                  {
                    label: fields[k],
                    labelAccessibilityVisibility: "exclusive",
                    value: mapping[k] || "",
                    onChange: (e) =>
                      onChange({ ...mapping, [k]: e.currentTarget.value }),
                  },
                  h("s-option", { value: "" }, "Do not import"),
                  columns.map((c) => h("s-option", { value: c, key: c }, c)),
                ),
              ),
              h(
                "span",
                { className: "kp-mapping-example", role: "cell" },
                String(examples?.[mapping[k]] ?? "—"),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

// A single visual surface per option; keyboard and pointer selection share state.
export function ChoiceSwitch({
  items,
  selected,
  onSelect,
  label = "Quick filters",
}) {
  const id = useId();
  function choose(event, index) {
    let next;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + items.length - 1) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    onSelect(items[next].id);
    document.getElementById(id + next)?.focus();
  }
  return h(
    "div",
    { className: "kp-choice-switch", role: "group", "aria-label": label },
    items.map((item, i) =>
      h(
        "button",
        {
          key: item.id,
          id: id + i,
          type: "button",
          "aria-pressed": selected === item.id,
          onClick: () => onSelect(item.id),
          onKeyDown: (event) => choose(event, i),
        },
        selected === item.id &&
          h("span", { className: "kp-choice-check", "aria-hidden": true }, h("s-icon", { type: "check" })),
        h("span", { className: "kp-choice-label" }, item.label),
      ),
    ),
  );
}
export function TaskProgress({ stages, label = "Task progress" }) {
  return h(
    "div",
    { className: "kp-task-progress", "aria-label": label },
    stages.map((stage) => {
      const total = Math.max(1, stage.total),
        done = Math.max(0, Math.min(stage.completed, total)),
        complete = stage.completed >= total;
      return h(
        "div",
        {
          className: "kp-progress-stage",
          key: stage.id,
          "data-complete": complete,
        },
        h(
          "div",
          { className: "kp-progress-caption" },
          h(
            "span",
            null,
            h("s-icon", { type: complete ? "check-circle" : "clock" }),
            stage.label,
          ),
          h("small", null, stage.completed, " / ", stage.total),
        ),
        h("s-progress", {
          max: total,
          value: done,
          tone: complete ? "success" : "auto",
          accessibilityLabel: stage.label,
        }),
      );
    }),
  );
}
const subscribeToClient = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
export function SideDrawer({
  title,
  description,
  children,
  actions,
  footerStart,
  onClose,
  surfaceSelector = "[data-kp-drawer-surface]",
}) {
  const dialog = useRef(null),
    close = useRef(onClose),
    titleId = useId(),
    descriptionId = useId();
  const mounted = React.useSyncExternalStore(
    subscribeToClient,
    clientSnapshot,
    serverSnapshot,
  );
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!mounted) return;
    const element = dialog.current,
      previous = document.activeElement,
      surface = document.querySelector(surfaceSelector);
    surface?.setAttribute("data-kp-drawer-surface", "");
    document.documentElement.classList.add("kp-has-drawer");
    element?.showModal();
    const cancel = (event) => {
      event.preventDefault();
      close.current();
    };
    element?.addEventListener("cancel", cancel);
    return () => {
      element?.removeEventListener("cancel", cancel);
      element?.close();
      document.documentElement.classList.remove("kp-has-drawer");
      previous?.focus?.();
    };
  }, [mounted, surfaceSelector]);
  if (!mounted) return null;
  return createPortal(
    React.createElement(
      "dialog",
      {
        ref: dialog,
        className: "kp-side-drawer",
        "aria-labelledby": titleId,
        "aria-describedby": description ? descriptionId : undefined,
      },
      h(
        "header",
        null,
        h(
          "div",
          null,
          h("h2", { id: titleId }, title),
          description && h("p", { id: descriptionId }, description),
        ),
        h("s-button", {
          icon: "x",
          variant: "tertiary",
          accessibilityLabel: "Close editor",
          onClick: onClose,
        }),
      ),
      h("div", { className: "kp-side-drawer-content" }, children),
      h(
        "footer",
        null,
        footerStart &&
          h("div", { className: "kp-side-drawer-footer-start" }, footerStart),
        h("div", { className: "kp-side-drawer-footer-actions" }, actions),
      ),
    ),
    document.body,
  );
}

// Inline overlays must keep the component's own focus/scroll lifecycle. Current
// Polaris delegates to App Bridge's separate-frame modal when that bridge exists.
// Compatibility is isolated here and rechecked by consuming products on upgrade.
function inlineOverlayCall(run) {
  const bridge = window.shopify?._internal;
  if (!bridge || !Object.prototype.hasOwnProperty.call(bridge, "modal")) return run();
  const descriptor = Object.getOwnPropertyDescriptor(bridge, "modal");
  if (!descriptor?.configurable) return run();
  try {
    Object.defineProperty(bridge, "modal", { value: undefined, configurable: true, writable: true });
    return run();
  } finally {
    Object.defineProperty(bridge, "modal", descriptor);
  }
}
function overlaySymbol(el, description) {
  for (let owner = el; owner; owner = Object.getPrototypeOf(owner)) {
    const symbol = Object.getOwnPropertySymbols(owner).find(s => s.description === description);
    if (symbol) return symbol;
  }
}
export function NativeOverlay({ heading, children, onClose, size = "base", modalRef }) {
  const internalRef = useRef(null);
  const callback = useRef(onClose);
  useEffect(() => {
    callback.current = onClose;
  }, [onClose]);
  useEffect(() => {
    let active = true, closed = false, timer;
    const el = internalRef.current;
    if (modalRef) modalRef.current = el;
    let originalHide, wrappedHide;
    function finish() {
      if (!active || closed) return;
      closed = true;
      clearTimeout(timer);
      callback.current();
    }
    function fallback() {
      if (!active || closed) return;
      const isOpen = overlaySymbol(el, "isOpen");
      const open = isOpen ? el[isOpen] : el.shadowRoot?.querySelector("dialog")?.open;
      // Private fallback only after the public hide failed; never close dialog directly.
      const dismiss = overlaySymbol(el, "dismiss");
      if (open && dismiss && typeof el[dismiss] === "function") inlineOverlayCall(() => el[dismiss]());
    }
    customElements.whenDefined("s-modal").then(() => {
      if (!active || !el) return;
      originalHide = el.hideOverlay;
      wrappedHide = () => {
        const result = inlineOverlayCall(() => originalHide.call(el));
        clearTimeout(timer);
        timer = setTimeout(fallback, 600);
        return result;
      };
      el.hideOverlay = wrappedHide;
      el.addEventListener("afterhide", finish);
      inlineOverlayCall(() => el.showOverlay());
    });
    return () => {
      active = false; clearTimeout(timer);
      el?.removeEventListener("afterhide", finish);
      if (el?.hideOverlay === wrappedHide) delete el.hideOverlay;
    };
  }, [modalRef]);
  return React.createElement("s-modal", { ref: internalRef, heading, size }, children);
}

/** Shared homepage destinations; hosts own URLs, counts and primary workflow. */
export function WorkspaceEntries({items, featured}) {
  return h("div", {className:"kp-workspace-entries" + (featured ? " is-featured" : "")}, featured,
    items.map(item => h("article", {className:"kp-workspace-card", key:item.id},
      h("span", {className:"kp-workspace-icon", "aria-hidden":true}, h("s-icon", {type:item.icon})),
      h("h3", {className:"kp-workspace-title"}, h("a", {className:"kp-workspace-link", href:item.href}, item.title)),
      h("p", {className:"kp-workspace-desc"}, item.description),
      item.meta && h("p", {className:"kp-workspace-meta" + (item.tone === "attention" ? " is-attention" : "")}, item.meta))));
}
export function WorkspaceFeature({eyebrow,title,description,primary,secondary,children}) {
  return h("article", {className:"kp-workspace-card kp-workspace-feature"},
    h("div", {className:"kp-workspace-feature-head"}, h("span", {className:"kp-workspace-eyebrow"}, eyebrow),
      h("h3", {className:"kp-workspace-feature-title"}, title), h("p", {className:"kp-workspace-desc"}, description)),
    children && h("div", {className:"kp-workspace-feature-body"}, children),
    h("div", {className:"kp-workspace-feature-actions"}, h("div", null, primary), secondary && h("div", null, secondary)));
}

/** Compact QO-style readiness guide; completion and preferences belong to the host. */
export function SetupGuide({title = "Setup guide", steps, collapsed = false, onCollapsedChange, busy = false, dismissed = false, onDismiss}) {
  const [expanded, setExpanded] = useState(null);
  const [closing, setClosing] = useState(false);
  const id = useId();
  const complete = steps.filter(step => step.done).length;
  const allDone = steps.length > 0 && complete === steps.length;
  if (dismissed && allDone) return null;
  const close = allDone && onDismiss && h("s-button", {variant:"tertiary", accessibilityLabel:"Close setup guide", onClick:()=>setClosing(!closing)}, "Close");
  return h("s-section", {accessibilityLabel:title}, h("div", {className:"kp-setup-guide"},
    h("div", {className:"kp-guide-heading"}, h("s-heading", null, title),
      h("div", {className:"kp-guide-actions"}, h("s-button", {variant:"tertiary", accessibilityLabel:collapsed ? "Expand setup guide" : "Collapse setup guide", onClick:()=>onCollapsedChange(!collapsed)}, collapsed ? "Expand" : "Collapse"), close)),
    h("s-text", {color:"subdued"}, `${complete} of ${steps.length} completed`),
    closing && allDone && h("div", {className:"kp-guide-close", role:"alertdialog", "aria-label":"Close setup guide"},
      h("s-paragraph", null, "All checks are complete. Close this guide? You can restore it from Getting started."),
      h("div", {className:"kp-guide-actions"}, h("s-button", {onClick:()=>setClosing(false)}, "Cancel"), h("s-button", {onClick:()=>{setClosing(false);onDismiss();}}, "Close guide"))),
    !collapsed && h(React.Fragment, null,
      h("s-progress", {value:complete, max:Math.max(1, steps.length), accessibilityLabel:"Setup progress"}),
      h("div", {className:"kp-guide-steps"}, steps.map(step => h("div", {key:step.id, className:"kp-guide-step"},
        h("div", {className:"kp-guide-step-row"},
          h("div", {className:"kp-guide-check"}, h("s-checkbox", {label:step.title, labelAccessibilityVisibility:"exclusive", checked:step.done, disabled:!step.onConfirm || busy, onChange:event=>step.onConfirm?.(event.currentTarget.checked)})),
          h("div", {className:"kp-guide-step-copy"}, h("s-text",null,step.title)),
          h("button", {type:"button", className:"kp-guide-step-expand", "aria-label":`Review step: ${step.title}`, "aria-expanded":expanded===step.id, "aria-controls":id+step.id, onClick:()=>setExpanded(expanded===step.id ? null : step.id)}, h("s-icon", {type:expanded===step.id ? "chevron-up" : "chevron-down"}))),
        expanded===step.id && h("div", {id:id+step.id, className:"kp-guide-detail", "aria-busy":busy},
          step.done && h("s-badge", {tone:"success"}, "Verified"), h("s-paragraph", {color:"subdued"}, step.detail), step.action)))),
      h("s-text", {color:"subdued"}, allDone ? "All checks are complete. You can close this guide." : "Store checks update automatically. Confirm buyer checks after testing them."))));
}

/** QO onboarding placement: expanded beside content, collapsed above it. */
export function GuideLayout({panel, children, collapsed = false, dismissed = false}) {
  if (dismissed) return React.createElement("div", {className:"kp-guide-content"}, children);
  return React.createElement("div", {className:`kp-guide-layout ${collapsed ? "is-collapsed" : "is-expanded"}`},
    React.createElement("div", {className:"kp-guide-panel"}, panel),
    React.createElement("div", {className:"kp-guide-content"}, children));
}

/** Multi-level collapsible hierarchy selector for parent -> children selection. */
export function HierarchyTreePicker({
  groups,
  selectedIds,
  onChange,
  searchPlaceholder = "Filter groups or items",
  itemLabel = "items",
  emptyText = "No matching items.",
  maxHeight = null,
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({});
  const selected = new Set(selectedIds || []);
  const needle = query.trim().toLowerCase();

  const visibleGroups = (groups || [])
    .map((group) => {
      const groupMatch =
        !needle ||
        String(group.title || "").toLowerCase().includes(needle) ||
        String(group.subtitle || "").toLowerCase().includes(needle) ||
        String(group.badge || "").toLowerCase().includes(needle);
      const children = (group.children || []).filter(
        (child) =>
          groupMatch ||
          String(child.label || "").toLowerCase().includes(needle) ||
          String(child.detail || "").toLowerCase().includes(needle) ||
          String(child.badge || "").toLowerCase().includes(needle) ||
          String(child.id || "").toLowerCase().includes(needle),
      );
      return { ...group, children };
    })
    .filter((group) => group.children.length > 0);

  const visibleSelectableIds = visibleGroups.flatMap((group) =>
    group.children.filter((c) => !c.disabled).map((c) => c.id),
  );

  const toggleGroup = (group) => {
    const selectable = group.children.filter((c) => !c.disabled).map((c) => c.id);
    if (!selectable.length) return;
    const allChosen = selectable.every((id) => selected.has(id));
    const next = new Set(selected);
    selectable.forEach((id) => {
      if (allChosen) next.delete(id);
      else next.add(id);
    });
    onChange([...next]);
  };

  const toggleItem = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange([...next]);
  };

  const isOpen = (id, totalCount) =>
    Boolean(needle) || (expanded[id] ?? (groups.length <= 3 || totalCount <= 6));

  return h(
    "div",
    { className: "kp-tree-picker" },
    h(
      "div",
      { className: "kp-tree-toolbar" },
      h("s-search-field", {
        label: searchPlaceholder,
        labelAccessibilityVisibility: "exclusive",
        placeholder: searchPlaceholder,
        value: query,
        onInput: (e) => setQuery(e.currentTarget.value),
      }),
      h(
        "div",
        { className: "kp-tree-actions" },
        h(
          "s-button",
          {
            variant: "tertiary",
            disabled: !visibleSelectableIds.length,
            onClick: () =>
              onChange([...new Set([...selected, ...visibleSelectableIds])]),
          },
          "Select visible",
        ),
        h(
          "s-button",
          {
            variant: "tertiary",
            disabled: !selected.size,
            onClick: () => onChange([]),
          },
          "Clear",
        ),
        h("s-text", { color: "subdued" }, `${selected.size} ${itemLabel} selected`),
      ),
    ),
    h(
      "div",
      {
        className: "kp-tree-list",
        style: maxHeight ? { maxHeight, overflowY: "auto" } : undefined,
      },
      visibleGroups.length === 0
        ? h("p", { className: "kp-tree-empty" }, emptyText)
        : visibleGroups.map((group) => {
            const selectable = group.children.filter((c) => !c.disabled);
            const selectedInGroup = group.children.filter((c) => selected.has(c.id)).length;
            const allGroupSelected =
              selectable.length > 0 && selectable.every((c) => selected.has(c.id));
            const someGroupSelected = selectedInGroup > 0 && !allGroupSelected;
            const openGroup = isOpen(group.id, group.children.length);
            return h(
              "div",
              { key: group.id, className: "kp-tree-group" },
              h(
                "div",
                { className: "kp-tree-group-head" },
                h(
                  "button",
                  {
                    type: "button",
                    className: "kp-tree-expand",
                    "aria-expanded": openGroup,
                    "aria-label": `${openGroup ? "Collapse" : "Expand"} ${group.title}`,
                    onClick: () =>
                      setExpanded((prev) => ({ ...prev, [group.id]: !openGroup })),
                  },
                  h("s-icon", { type: openGroup ? "chevron-down" : "chevron-right" }),
                ),
                h("s-checkbox", {
                  label: group.title,
                  checked: allGroupSelected,
                  indeterminate: someGroupSelected,
                  onChange: () => toggleGroup(group),
                }),
                h(
                  "span",
                  { className: "kp-tree-group-meta" },
                  group.badge && h("s-badge", null, group.badge),
                  h(
                    "s-text",
                    { color: "subdued" },
                    `${selectedInGroup}/${group.children.length}`,
                  ),
                ),
              ),
              openGroup &&
                h(
                  "div",
                  { className: "kp-tree-children" },
                  group.children.map((child) =>
                    h(
                      "div",
                      {
                        key: child.id,
                        className: `kp-tree-item ${selected.has(child.id) ? "is-selected" : ""}`,
                      },
                      h("s-checkbox", {
                        label: child.label,
                        checked: selected.has(child.id),
                        disabled: Boolean(child.disabled),
                        details: child.detail,
                        onChange: () => toggleItem(child.id),
                      }),
                      child.badge && h("s-badge", { tone: "info" }, child.badge),
                    ),
                  ),
                ),
            );
          }),
    ),
  );
}

/** Interactive 1-to-many / hierarchy rule match preview matrix for rule editors. */
export function AccessMappingPreview({
  leftTitle = "Matched locations",
  rightTitle = "Matched products",
  leftItems = [],
  rightItems = [],
  relationshipLabel = "receives exclusive access to",
}) {
  const [view, setView] = useState("by-left");
  const [expanded, setExpanded] = useState({});
  const [showAllGroups, setShowAllGroups] = useState({});

  const groupItems = (items, fallbackGroup) => {
    const map = new Map();
    items.forEach((item) => {
      const key = item.group || fallbackGroup;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    return [...map.entries()];
  };

  const leftGrouped = groupItems(leftItems, leftTitle);
  const rightGrouped = groupItems(rightItems, rightTitle);

  return h(
    "div",
    { className: "kp-access-preview" },
    h(
      "div",
      { className: "kp-access-preview-head" },
      h(
        "div",
        { className: "kp-access-preview-summary" },
        h(
          "s-badge",
          { tone: leftItems.length ? "success" : "warning" },
          `${leftItems.length} ${leftTitle.toLowerCase()}`,
        ),
        h("s-icon", { type: "arrow-right" }),
        h(
          "s-badge",
          { tone: rightItems.length ? "success" : "warning" },
          `${rightItems.length} ${rightTitle.toLowerCase()}`,
        ),
      ),
      h(ChoiceSwitch, {
        label: "Mapping preview perspective",
        selected: view,
        onSelect: setView,
        items: [
          { id: "by-left", label: "By location" },
          { id: "by-right", label: "By product" },
        ],
      }),
    ),
    !leftItems.length || !rightItems.length
      ? h(
          "s-banner",
          { tone: "warning" },
          "Adjust rules on both sides so at least one location and one variant match.",
        )
      : h(
          "div",
          { className: "kp-access-preview-grid" },
          (view === "by-left" ? leftGrouped : rightGrouped).map(([groupName, rows]) => {
            const key = `${view}:${groupName}`;
            const open = expanded[key] ?? true;
            const targetSummary =
              view === "by-left"
                ? `${rightItems.length} variants across ${rightGrouped.length} product groups`
                : `${leftItems.length} locations across ${leftGrouped.length} companies`;
            return h(
              "div",
              { key, className: "kp-access-preview-card" },
              h(
                "button",
                {
                  type: "button",
                  className: "kp-access-preview-toggle",
                  "aria-expanded": open,
                  onClick: () => setExpanded((p) => ({ ...p, [key]: !open })),
                },
                h("span", { className: "kp-access-preview-group" }, groupName),
                h(
                  "span",
                  { className: "kp-access-preview-count" },
                  `${rows.length} · ${relationshipLabel} ${targetSummary}`,
                ),
                h("s-icon", { type: open ? "chevron-up" : "chevron-down" }),
              ),
              open &&
                h(
                  "div",
                  { className: "kp-access-preview-rows" },
                  (showAllGroups[key] ? rows : rows.slice(0, 24)).map((row) =>
                    h(
                      "div",
                      { key: row.id, className: "kp-access-preview-row" },
                      h(
                        "div",
                        null,
                        h("strong", null, row.title),
                        row.subtitle && h("small", null, row.subtitle),
                      ),
                      h(
                        "div",
                        { className: "kp-access-preview-targets" },
                        row.badge && h("s-badge", null, row.badge),
                        h(
                          "s-badge",
                          { tone: "info" },
                          view === "by-left"
                            ? `${rightItems.length} variants`
                            : `${leftItems.length} locations`,
                        ),
                      ),
                    ),
                  ),
                  rows.length > 24 &&
                    h(
                      "s-button",
                      {
                        variant: "tertiary",
                        onClick: () =>
                          setShowAllGroups((p) => ({ ...p, [key]: !p[key] })),
                      },
                      showAllGroups[key]
                        ? "Show fewer items"
                        : `Show all ${rows.length} matching items`,
                    ),
                ),
            );
          }),
        ),
  );
}

/**
 * Manage column visibility and order for Shopify-style customizable tables.
 * Persists user preferences in localStorage under `kp_cols:<storageKey>`.
 */
export function useTableColumns(storageKey, defaultColumns) {
  const defaultsRef = useRef(defaultColumns);
  defaultsRef.current = defaultColumns;
  const buildDefault = () =>
    (defaultsRef.current || []).map((c) => ({
      id: c.id,
      label: c.label,
      visible: c.visible !== false,
      locked: Boolean(c.locked),
    }));

  const [columns, setColumns] = useState(() => {
    const base = buildDefault();
    if (typeof window === "undefined" || !storageKey) return base;
    try {
      const raw = window.localStorage.getItem(`kp_cols:${storageKey}`);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return base;
      const byId = new Map(base.map((c) => [c.id, c]));
      const merged = [];
      for (const item of saved) {
        const def = byId.get(item?.id);
        if (def) {
          merged.push({
            ...def,
            visible: def.locked ? true : Boolean(item.visible),
          });
          byId.delete(item.id);
        }
      }
      for (const remaining of byId.values()) merged.push(remaining);
      return merged;
    } catch {
      return base;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined" || !storageKey) return;
    try {
      window.localStorage.setItem(
        `kp_cols:${storageKey}`,
        JSON.stringify(columns.map(({ id, visible }) => ({ id, visible }))),
      );
    } catch {
      // Ignore storage quota or sandbox restrictions.
    }
  }, [storageKey, columns]);

  const visibleColumns = columns.filter((c) => c.visible || c.locked);
  const isVisible = (id) =>
    visibleColumns.some((c) => c.id === id);
  const reset = () => setColumns(buildDefault());

  return { columns, setColumns, visibleColumns, isVisible, reset };
}

/**
 * Shopify Admin Products-style table column visibility & drag-to-reorder popover.
 * Uses native Polaris 2 icons: layout-columns-3, drag-handle, view, hide, sort.
 */
export function TableColumnPicker({
  columns,
  onChange,
  onReset,
  sortOptions,
  sortValue,
  onSortChange,
  label = "Customize columns",
}) {
  const id = useId();
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const toggle = (colId) => {
    const target = columns.find((c) => c.id === colId);
    if (!target || target.locked) return;
    const visibleCount = columns.filter((c) => c.visible || c.locked).length;
    if (target.visible && visibleCount <= 1) return;
    onChange(
      columns.map((c) => (c.id === colId ? { ...c, visible: !c.visible } : c)),
    );
  };

  const move = (from, to) => {
    if (from === to || from < 0 || to < 0 || to >= columns.length) return;
    const next = [...columns];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return h(
    "div",
    { className: "kp-col-picker" },
    h("s-button", {
      variant: "secondary",
      icon: "layout-columns-3",
      accessibilityLabel: label,
      commandFor: id,
      command: "--toggle",
    }),
    h(
      "s-popover",
      { id },
      h(
        "div",
        { className: "kp-col-popover" },
        sortOptions &&
          sortOptions.length > 0 &&
          onSortChange &&
          h(
            "div",
            { className: "kp-col-sort-row" },
            h(
              "span",
              { className: "kp-col-sort-label" },
              h("s-icon", { type: "sort" }),
              h("span", null, "Sort by"),
            ),
            h(
              "s-select",
              {
                label: "Sort by",
                labelAccessibilityVisibility: "exclusive",
                value: sortValue || sortOptions[0].value,
                onChange: (e) => onSortChange(e.currentTarget.value),
              },
              sortOptions.map((opt) =>
                h("s-option", { key: opt.value, value: opt.value }, opt.label),
              ),
            ),
          ),
        h(
          "div",
          { className: "kp-col-head" },
          h("span", null, "Columns"),
          onReset &&
            h(
              "button",
              {
                type: "button",
                className: "kp-col-reset",
                onClick: onReset,
              },
              "Reset",
            ),
        ),
        h(
          "div",
          { className: "kp-col-list", role: "list" },
          columns.map((col, idx) =>
            h(
              "div",
              {
                key: col.id,
                role: "listitem",
                draggable: !col.locked,
                className:
                  "kp-col-row" +
                  (col.visible || col.locked ? "" : " is-hidden") +
                  (dragIndex === idx ? " is-dragging" : "") +
                  (overIndex === idx && dragIndex !== idx ? " is-drop-target" : ""),
                onDragStart: (e) => {
                  setDragIndex(idx);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", String(idx));
                },
                onDragOver: (e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (overIndex !== idx) setOverIndex(idx);
                },
                onDrop: (e) => {
                  e.preventDefault();
                  const from =
                    dragIndex !== null
                      ? dragIndex
                      : Number(e.dataTransfer.getData("text/plain"));
                  if (!Number.isNaN(from)) move(from, idx);
                  setDragIndex(null);
                  setOverIndex(null);
                },
                onDragEnd: () => {
                  setDragIndex(null);
                  setOverIndex(null);
                },
              },
              h(
                "span",
                {
                  className: "kp-col-grip",
                  title: col.locked ? "Primary column" : "Drag to reorder",
                  "aria-hidden": true,
                },
                h("s-icon", { type: "drag-handle" }),
              ),
              h("span", { className: "kp-col-name" }, col.label),
              h(
                "button",
                {
                  type: "button",
                  className: "kp-col-toggle",
                  disabled: col.locked,
                  "aria-label": `${col.visible ? "Hide" : "Show"} ${col.label} column`,
                  "aria-pressed": Boolean(col.visible || col.locked),
                  onClick: () => toggle(col.id),
                },
                h("s-icon", {
                  type: col.visible || col.locked ? "view" : "hide",
                }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

/**
 * Shopify App Bridge Contextual Save Bar (BFS 4.1.5).
 * Automatically shows <ui-save-bar> when dirty inside Shopify Admin, and provides
 * an accessible sticky fallback bar when rendered outside an embedded host.
 */
export function SaveBarGuard({
  id = "kp-save-bar",
  dirty = false,
  saving = false,
  onSave,
  onDiscard,
  saveLabel = "Save",
  discardLabel = "Discard",
  message = "Unsaved changes",
}) {
  const saveRef = useRef(onSave);
  const discardRef = useRef(onDiscard);
  saveRef.current = onSave;
  discardRef.current = onDiscard;

  useEffect(() => {
    const shopify = typeof window !== "undefined" ? window.shopify : null;
    if (!shopify?.saveBar) return;
    if (dirty) {
      shopify.saveBar.show(id).catch?.(() => {});
    } else {
      shopify.saveBar.hide(id).catch?.(() => {});
    }
    return () => {
      shopify.saveBar.hide(id).catch?.(() => {});
    };
  }, [dirty, id]);

  useEffect(() => {
    if (!dirty || typeof window === "undefined") return;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const hasAppBridge =
    typeof window !== "undefined" && Boolean(window.shopify?.saveBar);

  if (hasAppBridge) {
    return React.createElement(
      "ui-save-bar",
      { id },
      h(
        "button",
        {
          type: "button",
          variant: "primary",
          disabled: saving || undefined,
          loading: saving ? "" : undefined,
          onClick: () => saveRef.current?.(),
        },
        saveLabel,
      ),
      h(
        "button",
        {
          type: "button",
          disabled: saving || undefined,
          onClick: () => discardRef.current?.(),
        },
        discardLabel,
      ),
    );
  }

  if (!dirty) return null;

  return h(
    "div",
    { className: "kp-save-bar-fallback", role: "region", "aria-label": message },
    h("span", { className: "kp-save-bar-msg" }, message),
    h(
      "div",
      { className: "kp-save-bar-actions" },
      h(
        "s-button",
        {
          variant: "secondary",
          disabled: saving,
          onClick: () => discardRef.current?.(),
        },
        discardLabel,
      ),
      h(
        "s-button",
        {
          variant: "primary",
          disabled: saving,
          onClick: () => saveRef.current?.(),
        },
        saving ? "Saving…" : saveLabel,
      ),
    ),
  );
}
