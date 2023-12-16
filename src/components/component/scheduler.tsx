import SelectionArea, { SelectionEvent } from "@viselect/react";
import React, { useState } from "react";
import "./style.css";

export default function Scheduler() {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  // 時間間隔を設定（例: 10分間隔）
  const intervalMinutes = 30; // ここを変更して間隔を調整（10, 20, 30など）
  const partsPerHour = 60 / intervalMinutes;
  const totalParts = 24 * partsPerHour;

  const extractIds = (els: Element[]): number[] =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed }
    }
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <SelectionArea
      className="schedules"
      onStart={onStart}
      onMove={onMove}
      selectables=".selectable"
    >
      {new Array(totalParts).fill(0).map((_, index) => (
        <div
          className={selected.has(index) ? "selected selectable" : "selectable"}
          data-key={index}
          key={index}
        />
      ))}
    </SelectionArea>
  );
}
