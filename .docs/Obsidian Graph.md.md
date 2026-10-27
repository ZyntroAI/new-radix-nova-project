แปลงอีกที : Building an Obsidian graph view component in Angular

```md
---
title: Building an Obsidian Graph View Component in Angular
aliases:
  - Angular Obsidian Graph View
  - Obsidian Graph Component
  - Angular Force-Directed Graph
  - Angular Knowledge Graph
  - D3 Force Graph Angular
  - Obsidian-style Graph in Angular
  - GraphViewComponent
  - Angular Wikilink Graph
  - Graph API Architecture
tags:
  - angular
  - angular/signals
  - d3
  - d3-force
  - obsidian
  - graph
  - knowledge-graph
  - visualization
  - frontend
  - architecture
  - security
  - supabase
status: draft
note_type: architecture-guide
topic: Obsidian-style knowledge graph visualization
language: en
created: 2026-09-29
updated: 2026-09-29
reviewed: false
security_level: internal
audience:
  - frontend-developer
  - angular-developer
  - backend-developer
  - security-engineer
technology:
  - Angular
  - Angular Signals
  - D3 Force
  - SVG
  - Graph API
  - Supabase RLS
rendering:
  - browser-only
  - SVG
  - force-directed
data_strategy:
  - precomputed-content-graph
  - graph-api
  - generated-json
privacy_strategy:
  - filtered-graph-projection
  - server-side-authorization
  - no-vault-parsing-in-browser
scalability_strategy:
  - local-graph
  - one-hop-subgraph
  - two-hop-subgraph
  - server-side-filtering
  - progressive-loading
daily_note: "[[2026-09-29]]"
created_daily_note: "[[2026-09-29]]"
updated_daily_note: "[[2026-09-29]]"
related:
  - "[[Angular Signals]]"
  - "[[D3 Force]]"
  - "[[Obsidian Graph View]]"
  - "[[Knowledge Graph Architecture]]"
  - "[[Graph API Design]]"
  - "[[Supabase Row Level Security]]"
  - "[[Frontend Security]]"
  - "[[Content Compiler]]"
cssclasses:
  - technical-note
  - architecture-note
---

# Building an Obsidian Graph View Component in Angular

> [!abstract]
> Build an Obsidian-style graph as a browser-only, filtered, force-directed visualization. The Angular application should render a **precomputed and authorized graph projection** rather than download and parse an entire Markdown vault at runtime.

> [!success]
> Recommended baseline:
>
> - **Angular Signals** for reactive state
> - **D3 Force** for layout simulation
> - **SVG** for small and medium graph views
> - **Static JSON** for public documentation graphs
> - **Authenticated Graph API** with RLS for internal graphs
> - **One-hop or two-hop local graphs** for large vaults

> [!warning]
> Do not send a private vault, hidden titles, internal tags, full backlink indexes, raw file paths, or restricted metadata to the browser and attempt to hide it with Angular filtering. If the client receives the data, it is already exposed.

---

## Overview

An Obsidian-like graph view represents notes as nodes and relationships between notes as edges.

```text
Note
  │
  ├── Wikilink
  ├── Embed
  ├── Reference
  └── Backlink
```

```text
Node = note or document
Edge = relationship between documents
```

The graph component should support:

- Graph node rendering
- Relationship edges
- Pan and zoom
- Node dragging
- Node selection
- Search
- Tag and note-type filters
- Local graph traversal
- Backlink visibility
- Navigation to canonical Angular routes
- Accessibility-friendly alternatives to pointer interaction

---

## Architecture

```text
Obsidian Markdown / Content Files
        │
        ▼
Content Compiler in GitHub Actions
        │
        ├── Parse frontmatter
        ├── Extract note nodes
        ├── Extract wikilink/embed edges
        ├── Resolve aliases
        ├── Build backlink indexes
        ├── Apply visibility rules
        ├── Generate route slugs
        ├── Extract tags and note types
        ├── Validate broken links
        └── Generate graph projections
        │
        ▼
Graph Delivery Layer
        │
        ├── Public site
        │     └── public-graph.json
        │
        └── Internal portal
              └── Authenticated Graph API + Supabase RLS
        │
        ▼
Angular GraphViewComponent
        │
        ├── Filters
        ├── Search
        ├── Signals state
        ├── D3 force simulation
        ├── SVG graph rendering
        ├── Pan / zoom / drag
        ├── Node details
        └── Canonical route navigation
```

### Recommended Flow

```text
Angular browser
        │
        ▼
Request authorized graph projection
        │
        ├── Static JSON for public graph
        └── Authenticated API for internal graph
        │
        ▼
Receive permitted nodes and edges only
        │
        ▼
Render local graph with SVG + d3-force
```

### Avoid This Flow

```text
Angular browser
        │
        ▼
Download full Markdown vault
        │
        ▼
Parse Markdown and wikilinks in browser
        │
        ▼
Filter private notes after download
        │
        ▼
Leak private titles, tags, metadata, paths, or relationships
```

---

## Why Precompute the Graph

### Security and Privacy

Client-side Markdown parsing may expose:

- Private note titles
- Draft documents
- Internal paths
- Hidden tags
- Author metadata
- Private backlinks
- Restricted document relationships
- Sensitive classification data
- Private route structure
- Content snippets

> [!danger]
> Do not return an edge pointing to a hidden note. Even if the hidden node is omitted, the edge can reveal that restricted content exists.

### Performance

A full vault graph can become expensive quickly:

| Graph size | Recommended approach |
|---:|---|
| 1–300 nodes | SVG + D3 Force |
| 300–1,500 nodes | SVG with filters, limited labels, local graph mode |
| 1,500–10,000 nodes | Canvas/WebGL, clustering, server-side graph query |
| 10,000+ nodes | Do not render full graph; use local graph API and aggregation |

Potential problems from sending the full graph:

- Long initial load
- Slow layout simulation
- High browser memory usage
- Too many SVG DOM elements
- Poor mobile performance
- Difficult interaction and navigation
- Accidental metadata exposure

### Maintainability

A compiler provides one consistent place to handle:

- Markdown parsing
- Alias resolution
- Wikilink validation
- Backlinks
- Visibility
- Route slugs
- Tags
- Note types
- Public/private graph projections
- Build reports

Angular focuses on UI rendering and interaction rather than content interpretation.

---

## Content Compiler

The compiler should run in CI, GitHub Actions, a build system, or a trusted backend process.

```text
Markdown note
        │
        ├── YAML frontmatter
        ├── title
        ├── aliases
        ├── tags
        ├── note type
        ├── visibility
        ├── wikilinks
        └── embeds
        │
        ▼
Normalized graph node and edge records
        │
        ▼
Public or authorized graph projection
```

### Compiler Responsibilities

- Parse Markdown and YAML frontmatter
- Extract note titles and aliases
- Extract `[[wikilinks]]`
- Extract embeds such as `![[embedded-note]]`
- Resolve aliases to canonical note IDs
- Resolve canonical routes and slugs
- Build forward links
- Build backlink indexes
- Apply public/internal/private visibility rules
- Remove restricted metadata
- Validate broken links
- Detect ambiguous aliases
- Prevent restricted-edge leakage
- Generate graph JSON
- Generate validation reports

### Suggested Build Outputs

```text
dist/
├── graph/
│   ├── public-graph.json
│   ├── public-graph-index.json
│   └── graph-manifest.json
├── search/
│   └── public-search-index.json
└── reports/
    ├── broken-links.json
    ├── ambiguous-aliases.json
    ├── visibility-leaks.json
    └── graph-validation.json
```

---

## Graph Data Contract

Keep the graph payload small and explicit.

```ts
export interface GraphNode {
  id: string;
  slug: string;
  title: string;
  type?: string;
  tags?: string[];
  visibility: 'public' | 'internal';
  updatedAt?: string;
  degree?: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  kind: 'wikilink' | 'embed' | 'reference';
  weight?: number;
}

export interface GraphPayload {
  version: string;
  generatedAt: string;
  scope: 'public' | 'internal';
  rootNodeId?: string;
  depth?: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
}
```

### Example Graph Payload

```json
{
  "version": "1",
  "generatedAt": "2026-09-29T00:00:00Z",
  "scope": "public",
  "rootNodeId": "github-codeql-alerts-rest-api",
  "depth": 2,
  "nodes": [
    {
      "id": "github-codeql-alerts-rest-api",
      "slug": "github-codeql-alerts-rest-api",
      "title": "GitHub CodeQL Alerts ผ่าน REST API",
      "type": "technical-guide",
      "tags": ["github", "codeql", "security"],
      "visibility": "public",
      "degree": 6
    },
    {
      "id": "github-rest-api",
      "slug": "github-rest-api",
      "title": "GitHub REST API",
      "type": "reference",
      "tags": ["github", "api"],
      "visibility": "public",
      "degree": 12
    }
  ],
  "edges": [
    {
      "id": "github-codeql-alerts-rest-api--github-rest-api",
      "source": "github-codeql-alerts-rest-api",
      "target": "github-rest-api",
      "kind": "wikilink",
      "weight": 1
    }
  ]
}
```

> [!tip]
> A graph node normally needs only a canonical ID, route slug, title, type, tags, and derived metadata such as degree. Do not include full Markdown content merely to render a graph.

---

## Graph Delivery

### Public Documentation Graph

For a public documentation website, generate a static graph file during build:

```text
/assets/graph/public-graph.json
```

Angular can load it through `HttpClient`:

```ts
this.http.get<GraphPayload>(
  '/assets/graph/public-graph.json'
);
```

Use this approach when:

- All graph content is public
- No user-specific authorization is needed
- The graph size is manageable
- Build-time generation is acceptable

### Internal Knowledge Graph

For internal content, query a secured API:

```text
GET /api/graph?root=<node-id>&depth=2
```

Example:

```text
GET /api/graph
  ?root=pdf-ocr-security-review
  &depth=2
  &types=technical-guide,architecture-guide
  &tags=security,github
  &includeOrphans=false
```

Use this approach when:

- Users have different access rights
- Documents have private/internal/public classifications
- Data belongs to multiple teams or tenants
- The graph is too large to send in full
- Search and traversal require server-side filtering

### Authorization Rule

```text
Return a node only when the current user may read the node.

Return an edge only when the current user may read:
- Source node
- Target node
- Relationship metadata
```

> [!warning]
> Angular route guards are not sufficient for privacy. Authorization must run before the Graph API returns nodes and edges.

---

## Supabase RLS Model

For internal portals using Supabase:

```text
Authenticated User
        │
        ▼
Supabase Auth Identity
        │
        ▼
Row Level Security Policies
        │
        ├── Filter permitted note nodes
        ├── Filter permitted graph edges
        └── Remove inaccessible relationships
        │
        ▼
Graph API response
```

Suggested policy behavior:

```text
A user can read a graph node only if:
- The note is public, or
- The user belongs to an authorized organization/team/project

A user can read an edge only if:
- The user can read both endpoint notes
```

---

## Angular Component Design

```text
GraphViewComponent
├── GraphDataService
├── GraphStateService
├── GraphFiltersComponent
├── GraphSearchComponent
├── GraphCanvasComponent
├── GraphDetailsPanelComponent
└── GraphNavigationService
```

| Component | Responsibility |
|---|---|
| `GraphViewComponent` | Graph page container, API loading, errors |
| `GraphDataService` | Fetch static graph JSON or API subgraph |
| `GraphStateService` | Signals for graph state, filters, selection |
| `GraphFiltersComponent` | Tag/type/depth filters |
| `GraphSearchComponent` | Search, ranking, select-and-focus |
| `GraphCanvasComponent` | SVG, D3 simulation, zoom, pan, drag |
| `GraphDetailsPanelComponent` | Selected note details and actions |
| `GraphNavigationService` | Navigate by canonical route slug |

---

## Angular Signals

Angular Signals are suitable for graph UI state because they provide reactive state updates where signals are read.

Use signals for:

- Graph payload
- Loading state
- Error state
- Search query
- Selected node
- Selected tags
- Selected note types
- Traversal depth
- Hovered node
- Focused node
- Panel visibility
- Simulation settings

```ts
import { Injectable, computed, signal } from '@angular/core';

export interface GraphFilterState {
  query: string;
  selectedTags: string[];
  selectedTypes: string[];
  maxDepth: number;
  showOrphans: boolean;
}

@Injectable({ providedIn: 'root' })
export class GraphStateService {
  readonly graph = signal<GraphPayload | null>(null);

  readonly selectedNodeId = signal<string | null>(null);

  readonly filterState = signal<GraphFilterState>({
    query: '',
    selectedTags: [],
    selectedTypes: [],
    maxDepth: 2,
    showOrphans: false
  });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly selectedNode = computed(() => {
    const graph = this.graph();
    const nodeId = this.selectedNodeId();

    if (!graph || !nodeId) {
      return null;
    }

    return graph.nodes.find((node) => node.id === nodeId) ?? null;
  });

  readonly visibleNodes = computed(() => {
    const graph = this.graph();
    const filters = this.filterState();

    if (!graph) {
      return [];
    }

    const query = filters.query.trim().toLowerCase();

    return graph.nodes.filter((node) => {
      const matchesQuery =
        !query ||
        node.title.toLowerCase().includes(query) ||
        node.tags?.some((tag) => tag.toLowerCase().includes(query));

      const matchesTag =
        filters.selectedTags.length === 0 ||
        filters.selectedTags.some((tag) => node.tags?.includes(tag));

      const matchesType =
        filters.selectedTypes.length === 0 ||
        filters.selectedTypes.includes(node.type ?? '');

      return matchesQuery && matchesTag && matchesType;
    });
  });

  selectNode(nodeId: string | null): void {
    this.selectedNodeId.set(nodeId);
  }

  updateQuery(query: string): void {
    this.filterState.update((state) => ({
      ...state,
      query
    }));
  }
}
```

> [!tip]
> Use `computed()` for derived data such as visible nodes, visible edges, selected node metadata, node degree ranges, tag counts, and filtered result lists.

---

## D3 Force Simulation

D3 Force positions nodes by applying forces over multiple simulation ticks.

Recommended forces:

| Force | Purpose |
|---|---|
| `forceLink` | Pull linked nodes together |
| `forceManyBody` | Repel nodes and reduce overcrowding |
| `forceCenter` | Keep graph centered in viewport |
| `forceCollide` | Prevent node overlap |
| `forceX` / `forceY` | Optional clustering by tag/type |

```ts
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation
} from 'd3-force';

const simulation = forceSimulation<GraphNode>(nodes)
  .force(
    'link',
    forceLink<GraphNode, GraphEdge>(links)
      .id((node) => node.id)
      .distance(80)
      .strength(0.45)
  )
  .force('charge', forceManyBody().strength(-180))
  .force('center', forceCenter(width / 2, height / 2))
  .force('collision', forceCollide<GraphNode>().radius(18))
  .alpha(1)
  .alphaDecay(0.03);
```

> [!note]
> Force simulations are iterative and may consume CPU on large graphs. Stop the simulation when the component is destroyed, and restart it only when graph data or layout-relevant filters change.

---

## Graph Canvas

### Angular Template

```html
<section class="graph-shell">
  @if (state.loading()) {
    <p class="graph-status">Loading graph…</p>
  }

  @if (state.error(); as error) {
    <p class="graph-error">{{ error }}</p>
  }

  <svg
    [[graphSvg]]
    class="graph-canvas"
    role="application"
    aria-label="Knowledge graph"
    tabindex="0">
    <g class="viewport">
      <g class="links"></g>
      <g class="nodes"></g>
    </g>
  </svg>
</section>
```

### Render Lifecycle

```text
Graph API or JSON response
        │
        ▼
Angular signal updates
        │
        ▼
Computed visible nodes and edges
        │
        ▼
D3 simulation updates layout
        │
        ▼
SVG positions update on simulation ticks
        │
        ▼
User selects node
        │
        ├── Highlight neighbors
        ├── Show details
        └── Navigate using canonical slug
```

### Canonical Navigation

```ts
navigateToNode(node: GraphNode): void {
  this.router.navigate(['/notes', node.slug]);
}
```

> [!important]
> Navigate by trusted, compiler-generated route slug. Do not build browser routes from raw note file paths, titles, or user-provided text.

---

## Interaction Model

Support these graph interactions:

- Scroll/trackpad zoom
- Drag to pan
- Drag node to reposition
- Click node to select
- Hover node to highlight neighbors
- Search and focus a node
- Open node details panel
- Reset graph viewport
- Clear selection with `Escape`
- Navigate to note route
- Toggle local graph depth

### Accessibility Requirements

- Provide text search as an alternative to pointer-only graph navigation
- Make selected-node details available outside SVG
- Provide keyboard focus and visible focus indicators
- Avoid color-only relationship indicators
- Add a “Reset view” button
- Respect `prefers-reduced-motion`
- Offer reduced simulation motion for users who need it

```css
@media (prefers-reduced-motion: reduce) {
  .graph-canvas {
    transition: none;
  }
}
```

---

## Filtering

### Client-Side Filters

Client-side filtering is safe only for graph data already authorized and sent to the browser.

Examples:

- Search query
- Note type
- Public tags
- Edge kind
- Orphan visibility
- Local graph depth inside a permitted graph payload

### Server-Side Filters

Use server-side filtering for:

- Permissions and visibility
- Team/project/tenant access
- Large graph traversal
- Full-text search
- Date filtering over large datasets
- Relevance ranking
- Sensitive tags and metadata
- Deep relationship traversal

> [!warning]
> Client-side filtering is a usability feature. It is not an authorization control.

---

## Local Graph Strategy

For most users, a local graph is more useful than a complete vault graph.

```text
Selected Note
        │
        ├── Depth 1
        │     └── Direct inbound and outbound links
        │
        └── Depth 2
              └── Neighbors of directly connected notes
```

Suggested defaults:

```yaml
graph_defaults:
  depth: 1
  max_nodes: 150
  max_edges: 400
  include_backlinks: true
  include_embeds: true
  include_orphans: false
  show_labels_on_hover: true
```

> [!tip]
> Start with a one-hop graph. Two-hop graphs can grow quickly in dense documentation systems.

---

## Search and Focus

Search should guide graph navigation instead of only hiding nodes.

```text
Search input
        │
        ├── Title match
        ├── Alias match
        ├── Tag match
        └── Fuzzy match
        │
        ▼
Select best result
        │
        ├── Center graph
        ├── Highlight node and neighbors
        ├── Open details panel
        └── Offer route navigation
```

Search fields should be derived from the compiler/API:

```ts
export interface GraphSearchResult {
  nodeId: string;
  title: string;
  slug: string;
  type?: string;
  tags?: string[];
  score: number;
}
```

> [!note]
> Resolve aliases to canonical node IDs in the content compiler or Graph API. Avoid implementing separate alias logic in every Angular component.

---

## Security Checklist

### Public Graph

- [ ] Generate a separate public graph projection
- [ ] Include public nodes only
- [ ] Include edges only when both endpoints are public
- [ ] Strip internal tags and properties
- [ ] Strip private route paths
- [ ] Do not expose drafts
- [ ] Validate build output before deploy
- [ ] Use cache-safe public assets only

### Internal Graph API

- [ ] Authenticate every user
- [ ] Enforce authorization server-side
- [ ] Apply RLS to nodes and edges
- [ ] Restrict graph traversal depth
- [ ] Limit returned nodes and edges
- [ ] Validate query parameters
- [ ] Rate-limit expensive graph queries
- [ ] Do not log note content
- [ ] Do not reveal inaccessible node existence
- [ ] Use safe cache headers
- [ ] Test unauthorized access paths

---

## Recommended File Structure

```text
src/
├── app/
│   ├── graph/
│   │   ├── graph-view/
│   │   │   ├── graph-view.component.ts
│   │   │   ├── graph-view.component.html
│   │   │   ├── graph-view.component.scss
│   │   │   └── graph-view.component.spec.ts
│   │   ├── graph-canvas/
│   │   │   ├── graph-canvas.component.ts
│   │   │   ├── graph-canvas.component.html
│   │   │   └── graph-canvas.component.scss
│   │   ├── graph-filters/
│   │   ├── graph-search/
│   │   ├── graph-details/
│   │   ├── data-access/
│   │   │   ├── graph-data.service.ts
│   │   │   └── graph-api.types.ts
│   │   ├── state/
│   │   │   └── graph-state.service.ts
│   │   └── utils/
│   │       ├── graph-projection.ts
│   │       └── graph-layout.ts
│   └── shared/
│
content-compiler/
├── src/
│   ├── parse-markdown.ts
│   ├── resolve-wikilinks.ts
│   ├── apply-visibility.ts
│   ├── build-routes.ts
│   ├── build-backlinks.ts
│   ├── build-graph.ts
│   └── validate-graph.ts
└── reports/
```

---

## Test Plan

### Content Compiler Tests

- [ ] Extract normal wikilinks
- [ ] Extract aliases
- [ ] Extract embeds
- [ ] Resolve aliases to canonical node IDs
- [ ] Detect broken links
- [ ] Detect ambiguous aliases
- [ ] Exclude private nodes from public graph
- [ ] Remove edges to restricted nodes
- [ ] Preserve canonical route slugs
- [ ] Validate graph schema
- [ ] Verify backlink consistency

### Angular Tests

- [ ] Render loading state
- [ ] Render empty graph state
- [ ] Render API error state
- [ ] Filter by tag
- [ ] Filter by note type
- [ ] Search by title
- [ ] Search by alias
- [ ] Select and clear selected node
- [ ] Navigate by canonical slug
- [ ] Verify unauthorized nodes never render

### End-to-End Tests

- [ ] Open graph page
- [ ] Search for a known visible note
- [ ] Focus selected graph node
- [ ] Click node and navigate
- [ ] Zoom and pan
- [ ] Open one-hop local graph
- [ ] Confirm private notes do not appear in network payload
- [ ] Confirm restricted edges do not appear in network payload
- [ ] Verify keyboard interaction
- [ ] Verify reduced-motion behavior

---

## Implementation Plan

### Phase 1 — Define the Graph Contract

- Define node, edge, and payload interfaces
- Define stable node IDs
- Define canonical route slugs
- Define public/internal metadata policy
- Define graph schema versioning

**Acceptance criteria**

- Payload is versioned
- Node IDs are stable
- Public graph excludes private metadata
- Edges cannot reveal hidden nodes

### Phase 2 — Build the Content Compiler

- Parse Markdown and frontmatter
- Extract wikilinks and embeds
- Resolve aliases
- Build backlinks
- Apply visibility rules
- Generate graph JSON
- Generate validation reports

**Acceptance criteria**

- Broken links are reported
- Alias collisions are reported
- Public graph contains only authorized nodes and edges
- Output schema is validated

### Phase 3 — Build Angular Graph Shell

- Add `GraphViewComponent`
- Add graph data service
- Add signal-based graph state
- Add loading/error/empty states
- Render basic SVG nodes and edges

**Acceptance criteria**

- Authorized graph payload loads
- Node selection works
- Navigation uses canonical routes

### Phase 4 — Add D3 Interaction

- Add D3 force simulation
- Add pan and zoom
- Add drag behavior
- Add hover highlighting
- Add reset view
- Add reduced-motion handling

**Acceptance criteria**

- Graph is usable on desktop and mobile
- Simulation cleans up on destroy
- Node selection survives filter updates

### Phase 5 — Add Search and Filters

- Add title/alias search
- Add type/tag filters
- Add local graph depth control
- Add focus behavior
- Add selection details panel

**Acceptance criteria**

- Filters update graph without full page reload
- Search focuses a graph node
- Hidden nodes cannot be discovered from filtered data

### Phase 6 — Add Internal Graph API

- Add authenticated endpoint
- Add RLS policies
- Add query validation
- Add limits and rate limiting
- Add security tests
- Add audit-safe logs

**Acceptance criteria**

- Unauthorized nodes and edges never leave the server
- Deep traversal is limited
- Cross-user access is denied by tests

---

## Do Not Do This

> [!danger]
> Avoid these anti-patterns:

- Downloading the entire vault into Angular
- Parsing every Markdown file in the browser
- Filtering private notes only after download
- Returning hidden-node placeholders
- Exposing raw vault paths
- Exposing unrestricted backlink indexes
- Returning raw Markdown bodies to render nodes
- Allowing unlimited traversal depth
- Using client-side filters for authorization
- Rendering labels for every node in a large graph
- Publishing internal graph JSON as a static public asset
- Using raw note titles as file-system paths or route identifiers

---

## Final Recommendation

> [!success]
> Build the graph as a **precomputed content graph plus an Angular visualization layer**:
>
> 1. Compile notes and links in CI or a trusted backend.
> 2. Generate separate public and internal graph projections.
> 3. Use a versioned graph contract.
> 4. Render small/local graphs with SVG and `d3-force`.
> 5. Use Angular Signals for filters, search, selection, and UI state.
> 6. Use one-hop graphs by default.
> 7. Use an authenticated Graph API with RLS for internal content.
> 8. Treat graph nodes, edges, titles, tags, routes, and backlinks as potentially sensitive data.

---

## Daily Notes

- Created: [[2026-09-29]]
- Updated: [[2026-09-29]]
- Related architecture work: [[2026-09-29]]

## Related Notes

- [[Angular Signals]]
- [[D3 Force]]
- [[Obsidian Graph View]]
- [[Knowledge Graph Architecture]]
- [[Graph API Design]]
- [[Supabase Row Level Security]]
- [[Frontend Security]]
- [[Content Compiler]]

## Backlinks

> [!info]
> Enable the **Backlinks** core plugin in Obsidian to see notes that link to this architecture guide.
>
> Add this note to a daily note or project note using:
>
> ```md
> [[Building an Obsidian Graph View Component in Angular]]
> ```
>
> Obsidian will automatically display the incoming link as a backlink.
```

