import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const store = new Map();

const createFlowchart = ({ title = "Novo fluxo", nodes = [], edges = [] } = {}) => {
  const id = randomUUID();
  const flowchart = {
    id,
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes,
    edges,
  };
  store.set(id, flowchart);
  return flowchart;
};

const normalizeText = (text) =>
  text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const isDecisionLine = (line) =>
  /(\bse\b|\bcaso\b|\bseja\b|\bdecis[aã]o\b|\baprovado\b|\breprovado\b)/i.test(line);

const parseTextToFlowchart = (rawText) => {
  const lines = normalizeText(rawText);
  const nodes = [];
  const edges = [];

  const startId = randomUUID();
  nodes.push({
    id: startId,
    label: "Início",
    type: "start",
  });

  let previousId = startId;

  lines.forEach((line) => {
    const nodeId = randomUUID();
    const decision = isDecisionLine(line);
    nodes.push({
      id: nodeId,
      label: line,
      type: decision ? "decision" : "task",
    });

    edges.push({
      id: randomUUID(),
      source: previousId,
      target: nodeId,
      label: decision ? "?" : "",
    });

    previousId = nodeId;
  });

  const endId = randomUUID();
  nodes.push({
    id: endId,
    label: "Fim",
    type: "end",
  });
  edges.push({
    id: randomUUID(),
    source: previousId,
    target: endId,
    label: "",
  });

  return { nodes, edges };
};

const toMermaid = (flowchart) => {
  const lines = ["flowchart TD"]; 
  const nodeName = (node) => `${node.id.replace(/-/g, "")}`;
  const nodeLabel = (node) => node.label.replace(/\"/g, "\\\"");
  const nodeShape = (node) => {
    if (node.type === "start" || node.type === "end") {
      return `([\"${nodeLabel(node)}\"])`;
    }
    if (node.type === "decision") {
      return `{\"${nodeLabel(node)}\"}`;
    }
    return `[\"${nodeLabel(node)}\"]`;
  };

  flowchart.nodes.forEach((node) => {
    lines.push(`  ${nodeName(node)}${nodeShape(node)}`);
  });

  flowchart.edges.forEach((edge) => {
    const source = flowchart.nodes.find((node) => node.id === edge.source);
    const target = flowchart.nodes.find((node) => node.id === edge.target);
    if (!source || !target) {
      return;
    }
    const label = edge.label ? `|\"${edge.label.replace(/\"/g, "\\\"")}\"|` : "";
    lines.push(`  ${nodeName(source)} -->${label} ${nodeName(target)}`);
  });

  return lines.join("\n");
};

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", flowcharts: store.size });
});

app.post("/api/flowcharts", (req, res) => {
  const flowchart = createFlowchart(req.body);
  res.status(201).json(flowchart);
});

app.get("/api/flowcharts/:id", (req, res) => {
  const flowchart = store.get(req.params.id);
  if (!flowchart) {
    res.status(404).json({ error: "Flowchart not found" });
    return;
  }
  res.json(flowchart);
});

app.put("/api/flowcharts/:id", (req, res) => {
  const current = store.get(req.params.id);
  if (!current) {
    res.status(404).json({ error: "Flowchart not found" });
    return;
  }

  const updated = {
    ...current,
    title: req.body.title ?? current.title,
    nodes: req.body.nodes ?? current.nodes,
    edges: req.body.edges ?? current.edges,
    updatedAt: new Date().toISOString(),
  };
  store.set(updated.id, updated);
  res.json(updated);
});

app.post("/api/flowcharts/:id/auto", (req, res) => {
  const current = store.get(req.params.id);
  if (!current) {
    res.status(404).json({ error: "Flowchart not found" });
    return;
  }
  const text = req.body?.text;
  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "text is required" });
    return;
  }
  const { nodes, edges } = parseTextToFlowchart(text);
  const updated = {
    ...current,
    nodes,
    edges,
    updatedAt: new Date().toISOString(),
  };
  store.set(updated.id, updated);
  res.json(updated);
});

app.get("/api/flowcharts/:id/mermaid", (req, res) => {
  const flowchart = store.get(req.params.id);
  if (!flowchart) {
    res.status(404).json({ error: "Flowchart not found" });
    return;
  }
  res.type("text/plain").send(toMermaid(flowchart));
});

app.listen(port, () => {
  console.log(`Flowchart backend running on port ${port}`);
});
