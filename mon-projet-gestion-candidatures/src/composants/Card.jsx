import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
