"use client";
import * as React from "react";
import { useRef, memo, useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
} from "@xyflow/react";
const BusinessNode = memo(function BusinessNode({ data }) {
  const kind = data.kind,
    icon =
      kind === "buyer"
        ? "person"
        : kind === "location"
          ? "location"
          : kind === "brand"
            ? "store"
            : kind === "group"
              ? "collection"
              : "organization";
  const [failed, setFailed] = useState(false);
  return React.createElement(
    "div",
    { className: "kp-graph-node", "data-kind": kind },
    React.createElement(Handle, {
      type: "target",
      position: Position.Top,
      isConnectable: false,
    }),
    React.createElement(
      "div",
      { className: "kp-graph-node-head" },
      React.createElement(
        "div",
        { className: "kp-entity-avatar", "data-kind": kind },
        data.image && !failed
          ? React.createElement("img", {
              src: data.image,
              alt: "",
              onError: () => setFailed(true),
            })
          : React.createElement("s-icon", { type: icon }),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "small",
          null,
          {
            buyer: "Buyer",
            location: "Purchasing location",
            brand: "Your store",
            group: "Company profile",
            company: "Company",
          }[kind] || kind,
        ),
        React.createElement("strong", null, data.label),
      ),
    ),
    data.detail &&
      React.createElement(
        "small",
        { className: "kp-graph-node-detail" },
        data.detail,
      ),
    kind === "group" &&
      React.createElement(
        "span",
        {
          className: "kp-profile-origin",
          title:
            data.profileHelp ||
            "Unassigned profiles are saved in this app. Assigned profile tags are Shopify Company metafields: kaupvik.profile_tags. Renames are applied to native tags only after review.",
          "aria-label":
            "Profile storage: app draft, then Shopify company metafield after reviewed assignment",
          tabIndex: 0,
        },
        React.createElement("s-icon", { type: "info" }),
      ),
    data.childCount > 0 &&
      React.createElement(
        "button",
        {
          type: "button",
          className: "kp-node-collapse nodrag nopan",
          "aria-label": (data.collapsed ? "Expand " : "Collapse ") + data.label,
          "aria-expanded": !data.collapsed,
          onClick: (e) => {
            e.stopPropagation();
            data.onToggle?.();
          },
        },
        React.createElement("s-icon", {
          type: data.collapsed ? "chevron-right" : "chevron-down",
        }),
        " ",
        data.childCount,
        " ",
        kind === "brand"
          ? "groups"
          : kind === "company"
            ? "locations"
            : kind === "location"
              ? "buyers"
              : "companies",
      ),
    data.onAdd &&
      React.createElement(
        "button",
        {
          type: "button",
          className: "kp-node-add nodrag nopan",
          "aria-label":
            data.addLabel ||
            "Add " +
              (kind === "company"
                ? "location"
                : kind === "location"
                  ? "buyer"
                  : "company") +
              " to " +
              data.label,
          onClick: (e) => {
            e.stopPropagation();
            data.onAdd();
          },
        },
        React.createElement("s-icon", { type: "plus" }),
      ),
    React.createElement(Handle, {
      type: "source",
      position: Position.Bottom,
      isConnectable: false,
    }),
  );
});
const nodeTypes = { business: BusinessNode };
const CARD_WIDTH = 260;
const CARD_HEIGHT = 150;
export function RelationshipGraph({
  nodes,
  edges,
  onSelect,
  onMoveRequest,
  onReorder,
  initialLayout,
  onLayoutChange,
  tools = [],
  focusId,
  fitToken,
  label = "Company relationships",
}) {
  const [instance, setInstance] = useState(null);
  const [tool, setTool] = useState("hand");
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes);
  const keyboard = useRef(false);
  const keyCapture = (e) => {
    keyboard.current = e.key === "Enter" || e.key === " ";
  };
  const pointerCapture = useCallback(() => {
    keyboard.current = false;
  }, []);
  // The host owns the tidy layout: every position comes from the node props, so
  // the canvas never stores coordinates and the graph cannot drift out of shape.
  useEffect(
    () =>
      setLocalNodes((current) =>
        nodes.map((n) => ({
          ...n,
          selected:
            current.find((old) => old.id === n.id)?.selected ?? n.selected,
          position: n.position,
        })),
      ),
    [nodes, setLocalNodes],
  );
  // A record created from the workspace can land outside the current camera;
  // centring it keeps the new card visible without moving any other card. The
  // position comes from the host layout, so this works before React Flow has
  // measured the new card.
  const UNFITTED = "unfitted";
  const fitted = useRef(UNFITTED);
  // Refit only when the host asks for it (its global expand/collapse/show-level
  // actions) or on the first render. Collapsing a single card is a local edit, so
  // the camera stays where the merchant is working instead of jumping back to
  // the overview. Bounds come from the host layout, so the fit never waits for
  // React Flow to measure a card that is not rendered yet.
  useEffect(() => {
    if (!instance || !nodes.length) return;
    if (fitted.current !== UNFITTED && fitted.current === fitToken) return;
    const first = fitted.current === UNFITTED;
    fitted.current = fitToken;
    const box = nodes.reduce(
      (acc, n) => ({
        x1: Math.min(acc.x1, n.position.x),
        y1: Math.min(acc.y1, n.position.y),
        x2: Math.max(acc.x2, n.position.x),
        y2: Math.max(acc.y2, n.position.y),
      }),
      { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity },
    );
    const timer = setTimeout(() => {
      instance.fitBounds(
        {
          x: box.x1,
          y: box.y1,
          width: box.x2 - box.x1 + CARD_WIDTH,
          height: box.y2 - box.y1 + CARD_HEIGHT,
        },
        // The first framing happens before the merchant can interact, so it is
        // instant; later refits animate.
        { padding: 0.12, duration: first ? 0 : 300, maxZoom: 1 },
      );
    }, 40);
    return () => clearTimeout(timer);
  }, [instance, nodes, fitToken]);
  const centred = useRef(null);
  useEffect(() => {
    if (!focusId || !instance || centred.current === focusId) return;
    const target = nodes.find((n) => n.id === focusId);
    if (!target) return;
    centred.current = focusId;
    const width = target.measured?.width ?? 260;
    const height = target.measured?.height ?? 120;
    instance.setCenter(
      target.position.x + width / 2,
      target.position.y + height / 2,
      { zoom: Math.max(instance.getZoom(), 0.7), duration: 320 },
    );
  }, [focusId, instance, nodes]);
  const changed = useCallback(
    (changes) => {
      onNodesChange(changes);
      const selected = changes.find((c) => c.type === "select" && c.selected);
      if (selected && keyboard.current) {
        keyboard.current = false;
        onSelect?.(selected.id);
      }
    },
    [onNodesChange, onSelect],
  );
  const reorder = (node, dragged) => {
    const parent = node.data?.parentId ?? null;
    const siblings = (instance?.getNodes() || localNodes).filter(
      (n) => n.id !== node.id && (n.data?.parentId ?? null) === parent,
    );
    if (!siblings.length || !onReorder) return false;
    const centre = (n) => n.position.x + (n.measured?.width ?? 240) / 2;
    let target = null;
    let best = Infinity;
    for (const sibling of siblings) {
      const distance = Math.abs(centre(sibling) - centre(node));
      if (distance < best) {
        best = distance;
        target = sibling;
      }
    }
    const moved = dragged?.length ? dragged : [node];
    if (target && moved.length === 1) onReorder(node.id, target.id);
    return Boolean(target);
  };
  return React.createElement(
    "div",
    {
      className: "kp-graph",
      "aria-label": label,
      "onKeyDownCapture": keyCapture,
      tabIndex: 0,
      onPointerDownCapture: (e) => {
        pointerCapture();
        if (!e.target.closest?.("button,input,select,textarea,s-button"))
          e.currentTarget.focus({ preventScroll: true });
      },
    },
    React.createElement(
      "div",
      {
        className: "kp-graph-tools",
        role: "toolbar",
        "aria-label": "Canvas tools",
      },
      ...[
        ["hand", "Hand", "drag-handle"],
        ["select", "Select", "cursor"],
      ].map(([value, text, icon]) =>
        React.createElement(
          "s-button",
          {
            key: value,
            variant: tool === value ? "primary" : "secondary",
            "aria-pressed": tool === value,
            onClick: () => setTool(value),
          },
          React.createElement(
            "span",
            { className: "kp-graph-tool-label" },
            React.createElement("s-icon", { type: icon }),
            text,
          ),
        ),
      ),
      tools.length > 0 &&
        React.createElement("span", {
          className: "kp-graph-tool-divider",
          "aria-hidden": "true",
        }),
      tools.map((item) =>
        React.createElement(
          "s-button",
          {
            key: item.id,
            variant: item.pressed ? "primary" : "secondary",
            "aria-pressed": item.pressed ? true : undefined,
            disabled: item.disabled,
            onClick: item.onSelect,
          },
          React.createElement(
            "span",
            { className: "kp-graph-tool-label" },
            item.icon && React.createElement("s-icon", { type: item.icon }),
            item.label,
          ),
        ),
      ),
      React.createElement(
        "small",
        null,
        tool === "hand"
          ? "Hand: pan and zoom · click a card to edit"
          : "Select: drag a card to reorder · Shift + click for several",
      ),
    ),
    React.createElement(
      ReactFlow,
      {
        nodes: localNodes,
        edges,
        nodeTypes,
        onInit: setInstance,
        onNodeClick: (event, n) => {
          if (!event.shiftKey) onSelect?.(n.id);
        },
        panOnDrag: tool === "hand" ? true : [1, 2],
        selectionOnDrag: tool === "select",
        selectionKeyCode: "Shift",
        multiSelectionKeyCode: "Shift",
        onNodesChange: changed,
        // Hand pans the canvas and still opens a card on click; dragging a card
        // is reserved for Select so a pan gesture cannot reorder the tree.
        nodesDraggable: tool === "select",
        nodesConnectable: false,
        edgesReconnectable: false,
        deleteKeyCode: null,
        // Camera moves are ours only: React Flow's own fitView also fires when
        // the visible set shrinks and would yank the view back to an overview
        // while the merchant is working on a single card.
        fitView: false,
        defaultViewport: initialLayout?.viewport || undefined,
        onMoveEnd: (_, viewport) => onLayoutChange?.({ viewport }),
        fitViewOptions: { padding: 0.12, minZoom: 0.55, maxZoom: 1 },
        onlyRenderVisibleElements: true,
        minZoom: 0.08,
        maxZoom: 1.6,
        defaultEdgeOptions: { type: "smoothstep", animated: false },
        ariaLabelConfig: { "flow.label": label },
        onNodeDragStop: (_, node, draggedNodes) => {
          const moved = draggedNodes?.length ? draggedNodes : [node];
          const candidates = instance?.getIntersectingNodes(node) || [];
          const target = moved.length === 1 && candidates.find(
            (n) =>
              n.data.kind ===
              (node.data.kind === "company" ? "group" : "location"),
          );
          if (target && ["buyer", "company"].includes(node.data.kind))
            onMoveRequest?.(node.id, target.id);
          else if (tool === "select") reorder(node, moved);
          // Cards always return to the host layout: dragging reorders siblings,
          // it never stores a hand-tuned coordinate.
          setLocalNodes((current) =>
            current.map((n) => {
              const original = nodes.find((x) => x.id === n.id);
              return original ? { ...n, position: original.position } : n;
            }),
          );
        },
      },
      React.createElement(Background),
      React.createElement(Controls, { showInteractive: false }),
    ),
  );
}
