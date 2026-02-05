import React from "react";

/**
 * SectionLine – vertical line that can overlap between sections.
 *
 * Props:
 * - direction: "down" | "up" | "both" (default: "down")
 * - length: number (px) total line length (default: 120)
 * - overlap: number (px) part that overlaps outside section (default: 60)
 * - color: tailwind class or hex via style (default: "rgba(0,0,0,0.25)")
 * - x: "center" | "left" | "right" | number (px) (default: "center")
 * - className: extra classes
 *
 * Usage: place inside a section wrapper that is `relative`
 */
export default function SectionLine({
    direction = "down",
    length = 120,
    overlap = 60,
    x = "center",
    color = "rgba(0,0,0,0.25)",
    className = "",
}) {
    // base positioning (horizontal)
    const xStyle =
        x === "center"
            ? { left: "50%", transform: "translateX(-50%)" }
            : x === "left"
              ? { left: 24 }
              : x === "right"
                ? { right: 24 }
                : typeof x === "number"
                  ? { left: x }
                  : { left: "50%", transform: "translateX(-50%)" };

    // vertical positioning depending on direction
    const top = direction === "up" ? -overlap : direction === "both" ? -overlap : "auto";
    const bottom = direction === "down" ? -overlap : direction === "both" ? -overlap : "auto";

    // if only up: anchor at top; only down: anchor at bottom; both: centered
    const verticalStyle =
        direction === "both"
            ? {
                  top,
                  bottom,
                  height: length + overlap * 2,
              }
            : direction === "up"
              ? {
                    top,
                    height: length,
                }
              : {
                    bottom,
                    height: length,
                };

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute z-30 ${className}`}
            style={{
                width: 1,
                background: color,
                ...xStyle,
                ...verticalStyle,
            }}
        />
    );
}
