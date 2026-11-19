# Kaupvik Polaris extensions
Business compositions built on Shopify's official Polaris web components. Independent Kaupvik package, not an official Shopify package. Load the official polaris-2.js CDN in the embedded host. Import `@kaupvik/polaris/styles.css` once. Graph users additionally import `@xyflow/react/dist/style.css`.

React 19+, React DOM 19+. Graph uses React Flow 12.12.1 (MIT); retain its attribution. All data and authenticated transport belong to the host. No credentials, API calls, business writes or global style resets live in this package.

Documentation: https://keel.kaupvik.com/polaris
Open-source UI repository: https://github.com/Kaupvik/kaupvik-polaris

0.3.0 adds ChoiceSwitch, TaskProgress and SideDrawer. Graph free layout keeps local positions and host-owned child/add and move review callbacks. These Kaupvik compositions complement Shopify native atoms; they do not perform native writes.

0.3.1 uses verified native s-press-button / s-progress atoms inside ChoiceSwitch / TaskProgress.

### Canvas tools (0.5.0)
Use Hand to pan; use Select to box-select; Shift-click adds/removes cards. Drag a selected group together. Undo move or Command/Ctrl+Z restores only canvas coordinates and emits the restored layout. Native Shopify changes require separate reviewed operations.

## 0.6.5: inline modal compatibility

`NativeOverlay` composes Shopify `s-modal` and preserves its public show/hide, native focus and scroll cleanup. It isolates the App Bridge separate-frame delegation compatibility reproduced in Reps on 2026-11-07. Actions remain native slots; the host owns confirmation and business writes. Consumer regression must test Escape/header/programmatic close and reopening with App Bridge present. A bounded private dismissal fallback is version-sensitive, not an official Shopify API contract.

## 0.6.6 — routed settings
SettingsLayout keeps anchor mode by default. Pass `selected`, section `href`s and `onNavigate(id,href)` to use a host router; provide only the current page as `children`. The host preserves drafts, handles leave confirmation and owns all writes. Normal modified clicks retain href behavior; aria-current is page.

## 0.6.7
SettingsLayout accepts optional native `icon` per section and uses a superellipse navigation frame. WorkspaceEntries and WorkspaceFeature provide shared homepage destinations and a primary task cell. Hosts supply real links and counts; no business writes or authentication live here. Keyboard links, focus outlines and narrow-screen stacking are included.

## 0.7.0

MetricCard follows Quick Order: a visible scoped statistic and native hover/focus definition. SettingsRows groups icon rows with inset dividers. StageCard adds sales, restock, pricing and commissions artwork; hosts retain every business write and data boundary. Previous archives stay immutable.

## 0.7.1

StageCard upgrades cover art to clean schematic SVG illustrations with uniform card header heights; MetricCard wraps labels for a consistent dotted definition affordance and equal-height grid alignment; ChoiceSwitch centers icons vertically and horizontally; SideDrawer refines header, content and footer spacing.

### GuideLayout (0.7.5)
`<GuideLayout panel={<SetupGuide … />} collapsed={collapsed}>{page}</GuideLayout>`
uses Quick Order's onboarding placement: a 220–250px left guide on wide screens,
content beside it; collapsed guide above the content. Under 1100px it stacks for
readability. `dismissed` removes the guide. Host owns completion, persistence and
navigation. Named real boxes preserve layout around display:contents atoms.
SideDrawer requires exactly one `[data-kp-drawer-surface]` on the host's main
content area to reflow it; the dialog is portalled outside this surface. Dialog
focus returns to its trigger on close; reduced motion is respected.

### 0.7.8
SetupGuide only shows Verified inside expanded step details. SettingsLayout accepts `collapseNavigationOnDrawer` (default false); hidden navigation is inert and restored on close. FilterBuilder supports narrow containers and long IDs without fixed minimum column widths. All remain host-controlled; no business API calls are performed.
