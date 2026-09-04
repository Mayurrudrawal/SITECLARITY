import React from 'react';

export function DashboardCard({
  title,
  value,
  subvalue,
  variance,
  icon: Icon,
  variant = "default",
  id
}) {
  let valueColor = "text-[#17212B]";
  let iconBg = "bg-[#F5F7F9]";
  let iconColor = "text-[#16324F]";

  if (variant === "planned") {
    valueColor = "text-[#16324F]";
    iconBg = "bg-[#EAF2F8]";
    iconColor = "text-[#16324F]";
  } else if (variant === "actual" || variant === "cyan" || variant === "teal") {
    valueColor = "text-[#087F8C]";
    iconBg = "bg-[#E7F5F4]";
    iconColor = "text-[#087F8C]";
  } else if (variant === "variance" || variant === "danger") {
    valueColor = "text-[#C93636]";
    iconBg = "bg-[#FDECEC]";
    iconColor = "text-[#C93636]";
  } else if (variant === "delayed" || variant === "warning") {
    valueColor = "text-[#C98200]";
    iconBg = "bg-[#FFF5DD]";
    iconColor = "text-[#C98200]";
  } else if (variant === "evidence" || variant === "positive") {
    valueColor = "text-[#16845B]";
    iconBg = "bg-[#E8F5EF]";
    iconColor = "text-[#16845B]";
  }

  return (
    <div
      id={id}
      className="bg-white rounded-lg border border-[#D8E1E8] p-4 sm:p-5 shadow-xs transition-colors hover:border-[#91A0AE]"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#617386]">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-md ${iconBg} ${iconColor}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${valueColor}`}>
          {value}
        </div>
        {variance !== undefined && variance !== null && (
          <span
            className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
              variance >= 0
                ? "bg-[#E8F5EF] text-[#16845B] border border-[#16845B]/20"
                : "bg-[#FDECEC] text-[#C93636] border border-[#C93636]/20"
            }`}
          >
            {variance > 0 ? `+${variance}%` : `${variance}%`}
          </span>
        )}
      </div>

      {subvalue && (
        <div className="mt-1 text-xs text-[#617386] flex items-center justify-between">
          <span>{subvalue}</span>
        </div>
      )}
    </div>
  );
}
