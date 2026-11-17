# Shopify Polaris 2 Production UI Engineering Specification

**Maintained by [Kaupvik](https://www.kaupvik.com) · Interactive Component Catalog at [keel.kaupvik.com/polaris](https://keel.kaupvik.com/polaris)**

This open-source guide captures verified CSS, DOM, React, App Bridge, and accessibility contracts for building production-grade embedded Shopify apps using **Polaris Web Components (`polaris-2.js`)**.

## 1. Host Elements Are Often `display: contents`

In Shopify's Polaris 2 runtime, custom element hosts such as `<s-button>`, `<s-text-field>`, `<s-icon>`, `<s-table>`, `<s-table-row>`, and `<s-checkbox>` commonly render with `display: contents`. You cannot assume a custom element host creates its own layout box.

### 1.1 Icon + Text Alignment Inside `<s-button>`
Because `<s-icon>` inside an `<s-button>` aligns on the text baseline by default, SVG glyphs visually sit ~2–3px lower than button labels unless wrapped in an explicit flex container:

```tsx
<s-button>
  <span className="kp-tool-label">
    <s-icon type="plus" />
    <span>Add record</span>
  </span>
</s-button>
```

```css
.kp-tool-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.kp-tool-label s-icon {
  flex: none;
}
```

Verification check: the vertical delta between SVG bbox center and text node center should be `<= 1px`.

### 1.2 Aligning Form Controls and Action Buttons in Grid/Flex
When `<s-text-field>` uses `display: contents`, placing `<s-text-field>` directly inside `display: grid; grid-template-columns: 1fr auto` targets internal label/input/hint nodes rather than the outer field block. Wrap each column child in a real container element:

```tsx
<div className="kp-row-inline">
  <div className="kp-row-field"><s-text-field label="Company" /></div>
  <div className="kp-row-action"><s-button>Save</s-button></div>
</div>
```

### 1.3 Measuring Box Dimensions
`hostElement.getBoundingClientRect()` returns `0 x 0` for `display: contents` hosts. Inspect the inner element inside `shadowRoot` (`host.shadowRoot?.querySelector(...)`) or wrap in a standard block container when measuring.

## 2. Explicit Icon Bounding Boxes in Dense Containers

In table cells, compact KPI cards, or helper hints (`12px–13px`), `<s-icon>` can render shorter than the optical glyph height (~16px). Give dense container icons an explicit box:

```css
.card s-icon,
.dense-control s-icon {
  width: 20px;
  height: 20px;
  display: block;
}
```

## 3. Verified Polaris 2 Icon Names Only

Shopify's Polaris 2 icon registry drops or ignores unregistered names **silently** (no runtime exception—just an empty glyph). Always verify icon names directly against the loaded `polaris-2.js` runtime or Shopify App Home documentation before shipping:

* Commonly verified names: `plus`, `chevron-down`, `chevron-up`, `chevron-right`, `x`, `person`, `location`, `organization`, `edit`, `info`, `cursor`, `drag-handle`, `search`, `upload`, `filter`, `external`, `store`, `list-bulleted`, `arrow-right`, `check`, `check-circle`, `clock`, `settings`, `apps`.

## 4. Diagram Canvases (React Flow)

* Keep interactive node controls clear of source/target `<Handle>` hitboxes (minimum separation >= 12px) or give interactive icons higher z-index with `stopPropagation()`.
* Keep diagram coordinates in view-state; persist semantic ordering/parent changes only after explicit user preview & confirmation.
* Provide an accessible tree/list fallback (`HierarchyTreePicker`) alongside visual canvases so keyboard and screen-reader workflows remain 100% equitable.

## 5. Modals, Drawers & App Bridge Isolation

* Always test opening, pressing `Escape`, clicking the backdrop/close button, confirming/canceling, and **reopening** modals inside an active Shopify Admin iframe with App Bridge initialized.
* Side drawers (`SideDrawer`) should lock/return focus cleanly and never rely on parent overflow hacks that clip native focus outlines.
* On viewports `< 760px`, drawers and notification panels should adapt cleanly as responsive full-width sheets or bottom-up drawers with `0px` horizontal overflow.

## 6. Native Write Discipline & Read-Back Truth

1. **Preview -> Confirm -> Execute -> Native Read-Back**: After executing mutations against Shopify GraphQL (`companyCreate`, `draftOrderCreate`, `priceListFixedPricesAdd`, etc.), **read back authoritative native state** instead of mutating local React state optimistically as final truth.
2. **Never Use `first: 5` on B2B Collections**: Always paginate `companies`, `locations`, `contacts`, `catalogs`, and `variants` via `pageInfo { hasNextPage endCursor }` (`first: 50`–`100`) so stores with dozens of contacts or catalogs never silently drop records.

## 7. Pre-Release UI Verification Checklist

Before releasing any embedded Shopify view:
* Zero horizontal overflow (`documentElement.scrollWidth <= window.innerWidth`) at both `1440px` desktop and `390px` mobile.
* Every visible `<s-icon>` has a rendered non-zero bounding box (`width > 0 && height > 0`).
* Icon-to-text vertical alignment delta `<= 1px` inside buttons and nav items.
* Loading states use a stable skeleton container width matching the destination page (`inlineSize="base"` / `max-width`) so first paint -> hydrated transition does not cause layout jump.

Explore the complete Shopify B2B product ecosystem built using this architecture at **[www.kaupvik.com](https://www.kaupvik.com)** and inspect live component docs on **[keel.kaupvik.com/polaris](https://keel.kaupvik.com/polaris)**.
