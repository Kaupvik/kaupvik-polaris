import type { ReactElement } from "react";
import type { Node, Edge } from "@xyflow/react";
export type CanvasTool = {
  /** Stable id, also used as the React key. */
  id: string;
  /** Visible label; a native icon is drawn before it when icon is provided. */
  label: string;
  icon?: string;
  /** Reflects an active filter or level, never a write. */
  pressed?: boolean;
  disabled?: boolean;
  onSelect: () => void;
};
export function RelationshipGraph(props: {
  /** Built-in hand/select tools, Shift multi-selection and layout-only reorder.
   * The host owns the tidy layout: every card renders at the position it passes,
   * dragging reorders siblings through onReorder and never stores coordinates.
   * Business node data may provide onToggle/onAdd callbacks, addLabel and the
   * parentId used to find siblings for reordering. */
  nodes: Node[];
  edges: Edge[];
  onSelect?: (id: string) => void;
  label?: string;
  /** Camera only; the host persists the viewport and remembered collapse state. */
  initialLayout?: {
    viewport?: { x: number; y: number; zoom: number } | null;
  };
  onLayoutChange?: (layout: {
    viewport?: { x: number; y: number; zoom: number };
  }) => void;
  /** Extra canvas toolbar controls such as expand/collapse per level. */
  tools?: CanvasTool[];
  /** Drop onto a card of the expected kind; the host previews and authorizes. */
  onMoveRequest?: (buyerId: string, locationId: string) => void;
  /** Sibling moved next to targetId; the host recomputes and saves the order. */
  onReorder?: (id: string, targetId: string) => void;
  /** Centre this card in the camera when it changes, e.g. a just-created record. */
  focusId?: string;
  /** Change this value to refit the camera; local card collapse never refits. */
  fitToken?: string | number;
}): ReactElement;
