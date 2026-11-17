# @kaupvik/polaris — Shopify Polaris 2 Business Components & UI Spec

**Open-source React 19 UI compositions and production engineering specifications built on [Shopify Polaris Web Components](https://shopify.dev/docs/api/app-home/latest).**

Maintained by **[Kaupvik](https://www.kaupvik.com)** (creators of the **0% GMV Fee Native B2B Suite for Shopify**) and hosted with interactive previews on **[Kaupvik Keel](https://keel.kaupvik.com/polaris)**.

> Independent MIT-licensed UI compositions and documentation. Not an official Shopify package. Always load Shopify's official `polaris-2.js` script in embedded hosts. Zero business API tokens, tenant state, or backend writes live in this package.

## Why This Library Exists

Shopify's Polaris 2 web components (`s-section`, `s-button`, `s-text-field`, `s-modal`, `s-table`, `s-icon`, etc.) provide clean native primitives, while B2B embedded apps repeatedly need higher-level UI compositions (staged side drawers, bounded visual rule builders, hierarchical location tree pickers, accessible metric definition cards, settings navigation layouts, and visual relationship canvases).

This repository open-sources:
1. **25 Reusable React 19 + CSS Compositions** (`@kaupvik/polaris`) styled harmoniously alongside native `s-*` elements.
2. **[Shopify Polaris 2 Production UI Specification](./docs/POLARIS-2-SPEC.md)** — verified engineering patterns for `display: contents` custom elements, icon/label baseline drift, small-container icon sizing, verified icon names, React Flow handle placement, App Bridge `s-modal` isolation, native read-back discipline, pagination completeness, and mobile adaptation.

Explore live interactive component examples at **[keel.kaupvik.com/polaris](https://keel.kaupvik.com/polaris)** and inspect the machine-readable schema in [`registry.json`](./registry.json).

## Installation

```bash
npm install github:Kaupvik/kaupvik-polaris
```

Include the base stylesheet once in your app shell (plus `@xyflow/react/dist/style.css` only if using `@kaupvik/polaris/graph`):

```tsx
import {
  EmptyState,
  FilterRuleBuilder,
  HierarchyTreePicker,
  MetricCard,
  SettingsLayout,
  SideDrawer,
  ValuePicker,
} from "@kaupvik/polaris";
import "@kaupvik/polaris/styles.css";
```

## Included Components (v0.8.0)

* **Navigation & Layout:** `SettingsLayout`, `SettingsSection`, `SettingsRows`, `SettingsRow`, `GuideLayout`, `WorkspaceEntries`, `WorkspaceFeature`, `BrandFooter`
* **Data & KPIs:** `MetricCard`, `StageCard`, `AccessMappingPreview`, `DataPreviewModal`, `EmptyState`, `SetupGuide`, `TaskProgress`
* **Forms, Selection & Filtering:** `ChoiceSwitch`, `FilterBuilder`, `FilterRuleBuilder`, `HierarchyTreePicker`, `ValuePicker`, `MappingTable`, `ResourceToolbar`, `SideDrawer`, `NativeOverlay`, `OnboardingSteps`
* **Diagramming (`@kaupvik/polaris/graph`):** `RelationshipGraph` (powered by `@xyflow/react`)

## Learn More About Kaupvik

* **[Kaupvik Shopify B2B Suite](https://www.kaupvik.com)** — 100% Native B2B workflows with **0% GMV Fee**.
* **[Kaupvik Keel Developer Platform](https://keel.kaupvik.com)** — Documentation hub, component previews, and the shared B2B commerce spine architecture.
* **[Shopify Company Onboarding (Free)](https://www.kaupvik.com/company-onboard)** · **[Wholesale Bulk Quick Order (Free)](https://www.kaupvik.com/quick-order)** · **[B2B Wholesale & Sales Reps](https://www.kaupvik.com/reps)** · **[B2B Credit Limits & Net Terms](https://www.kaupvik.com/credit-terms)**
* **[How Kaupvik Works](https://www.kaupvik.com/how-it-works)** · **[Pricing](https://www.kaupvik.com/pricing)** · **[Security & Permissions](https://www.kaupvik.com/security)**

## License

[MIT License](./LICENSE) © 2026 [Kaupvik](https://www.kaupvik.com)
