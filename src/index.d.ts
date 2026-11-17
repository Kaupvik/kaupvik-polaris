import type { ReactNode, ReactElement } from "react";
export function BrandFooter(props: {
  children?: ReactNode;
  href?: string;
}): ReactElement;
export function EmptyState(props: {
  title: string;
  description: string;
  action?: ReactNode;
  kind?: string;
}): ReactElement;
export function BentoGrid(props: { children: ReactNode }): ReactElement;
export function StageCard(props: {
  title: string;
  description: string;
  eyebrow?: string;
  action?: ReactNode;
  children?: ReactNode;
  featured?: boolean;
  kind?: string;
}): ReactElement;
export function SourceTabs(props: {
  items: { id: string; label: ReactNode }[];
  selected: string;
  onSelect: (id: string) => void;
  children?: ReactNode;
  label?: string;
}): ReactElement;
export function ResourceToolbar(props: { children: ReactNode }): ReactElement;
export function SettingsLayout(props: {
  /** Temporarily collapse navigation while a shared SideDrawer is open. */
  collapseNavigationOnDrawer?: boolean;
  sections: { id: string; title: string; icon?: string; href?: string; children?: ReactNode }[];
  selected?: string;
  onNavigate?: (id: string, href?: string) => void;
  children?: ReactNode;
}): ReactElement;
export type FilterRule = { field: string; operator: string; value: string };
export type FilterGroup = { rules: FilterRule[] };
export type FilterSuggestion =
  | string
  | { value: string; label?: string; detail?: string };
export type FilterField = {
  key: string;
  label: string;
  operators?: string[];
  placeholder?: string;
  choices?: { value: string; label: string }[];
  suggestions?: FilterSuggestion[];
};
export function FilterBuilder(props: {
  groups?: FilterGroup[];
  onChange?: (groups: FilterGroup[]) => void;
  expression?: FilterExpression;
  onExpressionChange?: (expression: FilterExpression) => void;
  fields: FilterField[];
}): ReactElement;

export type FilterExpression =
  | ({ kind: "rule" } & FilterRule)
  | {
      kind: "group";
      match: "all" | "any" | "none" | "one";
      children: FilterExpression[];
    };
export function Skeleton(props: {
  variant?: "page" | "card" | "table" | "graph" | "form";
  rows?: number;
  columns?: number;
  minHeight?: number;
  label?: string;
}): ReactElement;
export function WizardSteps(props: {
  steps: string[];
  current: number;
  onSelect?: (step: number) => void;
}): ReactElement;
export function SettingsRow(props: {
  title: string;
  description?: string;
  icon?: string;
  action?: ReactNode;
}): ReactElement;
export function MappingTable(props: {
  groups: { title: string; icon?: string; fields: string[] }[];
  fields: Record<string, string>;
  columns: string[];
  mapping: Record<string, string>;
  examples?: Record<string, unknown>;
  onChange: (mapping: Record<string, string>) => void;
  targetLabel?: string;
}): ReactElement;

export function ChoiceSwitch(props: {
  items: { id: string; label: ReactNode }[];
  selected: string;
  onSelect: (id: string) => void;
  label?: string;
}): ReactElement;
export function TaskProgress(props: {
  stages: { id: string; label: string; completed: number; total: number }[];
  label?: string;
}): ReactElement;
export function SideDrawer(props: {
  title: string;
  description?: string;
  children: ReactNode;
  actions: ReactNode;
  footerStart?: ReactNode;
  onClose: () => void;
  surfaceSelector?: string;
}): ReactElement | null;
/** Inline native s-modal with one close lifecycle, focus restoration and isolated App Bridge compatibility. */
export function NativeOverlay(props: {
  heading: string;
  children: ReactNode;
  onClose: () => void;
  size?: "base" | "large" | "small";
  modalRef?: import("react").RefObject<HTMLElement | null>;
}): ReactElement;

export function WorkspaceEntries(props: {
  items: {id:string; title:string; description:string; href:string; icon:string; meta?:string; tone?:"attention"|"neutral"}[];
  featured?: ReactNode;
}): ReactElement;
export function WorkspaceFeature(props: {eyebrow:string; title:string; description:string; primary:ReactNode; secondary?:ReactNode; children?:ReactNode}): ReactElement;

export function MetricCard(props: {
  label: string;
  value: string | number;
  detail?: string;
  definition?: string;
  icon?: ReactNode;
}): ReactElement;
export function SettingsRows(props: { children: ReactNode }): ReactElement;

export function SetupGuide(props: {
  title?: string;
  steps: {id:string; title:string; detail:ReactNode; done:boolean; action?:ReactNode; onConfirm?:(checked:boolean)=>void}[];
  collapsed?:boolean;
  onCollapsedChange:(collapsed:boolean)=>void;
  busy?:boolean;
  dismissed?:boolean;
  onDismiss?:()=>void;
}): ReactElement;

/** Expanded onboarding sits left; collapsed onboarding stacks above the page. */
export function GuideLayout(props:{panel:ReactNode;children:ReactNode;collapsed?:boolean;dismissed?:boolean}):ReactElement;

export type HierarchyTreeGroup = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: {
    id: string;
    label: string;
    detail?: string;
    badge?: string;
    disabled?: boolean;
  }[];
};
export function HierarchyTreePicker(props: {
  groups: HierarchyTreeGroup[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  searchPlaceholder?: string;
  itemLabel?: string;
  emptyText?: string;
  maxHeight?: number;
}): ReactElement;

export type AccessMappingItem = {
  id: string;
  title: string;
  group?: string;
  subtitle?: string;
  badge?: string;
};
export function AccessMappingPreview(props: {
  leftTitle?: string;
  rightTitle?: string;
  leftItems: AccessMappingItem[];
  rightItems: AccessMappingItem[];
  relationshipLabel?: string;
}): ReactElement;
