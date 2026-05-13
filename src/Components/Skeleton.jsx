import React from "react";

export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`skeleton-base rounded-md ${className}`}
      role="presentation"
      aria-hidden
      {...props}
    />
  );
}

export function SkeletonText({ lines = 1, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4 w-full"
          style={{ width: i === lines - 1 && lines > 1 ? "75%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-200">
      <div className="flex items-center justify-between">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-4 w-full max-w-[8rem]" />
        </td>
      ))}
    </tr>
  );
}

export function RegisterPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" aria-busy="true" aria-label="Loading form">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-100">
        <div className="h-28 bg-gradient-to-r from-gray-200 to-gray-300" />
        <div className="p-8 space-y-6">
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full rounded-lg md:col-span-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
