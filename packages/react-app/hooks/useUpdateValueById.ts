import React, { ReactNode, useEffect } from "react";

export const useUpdateValueById = (id: string, newValue: string) => {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          console.log({node})
          if (!(node instanceof HTMLElement)) return;
          console.log("ID", node.id);
          if (node.id === id) {
            node.textContent = newValue;
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [id, newValue]);
};
