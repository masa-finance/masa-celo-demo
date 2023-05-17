import React, { ReactNode, useEffect, useRef } from "react";

type ParentComponentProps = {
  children: ReactNode;
  target: string;
  value: string;
  disconnect?: boolean;
};

export const FindAndUpdateValue = ({
  children,
  target,
  value,
  disconnect,
}: ParentComponentProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!disconnect) {
      const traverse = (node: ChildNode | null) => {
        if (!node) return;

        if (node.nodeType === Node.TEXT_NODE && node.textContent === target) {
          node.textContent = value;
        } else {
          node.childNodes.forEach(traverse);
        }
      };

      parentRef.current?.childNodes.forEach(traverse);
    }
  }, [parentRef, children]);

  return <div ref={parentRef}>{children}</div>;
};
