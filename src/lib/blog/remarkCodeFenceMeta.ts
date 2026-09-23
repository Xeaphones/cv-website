import type { Code, Parent, Root } from "mdast";
import type { Plugin } from "unified";

function visitCodeNodes(node: Parent, fn: (code: Code) => void) {
  for (const child of node.children) {
    if (child.type === "code") {
      fn(child);
    } else if ("children" in child) {
      visitCodeNodes(child, fn);
    }
  }
}

export const remarkCodeFenceMeta: Plugin<[], Root> = () => (tree) => {
  visitCodeNodes(tree, (node) => {
    if (!node.meta) {
      return;
    }

    node.data ??= {};
    node.data.hProperties = {
      ...(node.data.hProperties as Record<string, string> | undefined),
      "data-fence-meta": node.meta,
    };
  });
};
