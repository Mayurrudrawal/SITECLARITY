import React from 'react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export function StatusBadge({ status, size = "md", id }) {
  const { t } = useI18n();
  let colorStyles = "bg-[#F5F7F9] text-[#617386] border-[#D8E1E8]";
  let dotColor = "bg-[#91A0AE]";

  const normStatus = String(status || '').trim();
  const lower = normStatus.toLowerCase();

  if (lower === "on track") {
    colorStyles = "bg-[#E8F5EF] text-[#16845B] border-[#16845B]/30";
    dotColor = "bg-[#16845B]";
  } else if (lower === "delayed" || lower === "at risk") {
    colorStyles = "bg-[#FFF5DD] text-[#C98200] border-[#C98200]/30";
    dotColor = "bg-[#C98200]";
  } else if (lower === "critical") {
    colorStyles = "bg-[#FDECEC] text-[#C93636] border-[#C93636]/30";
    dotColor = "bg-[#C93636]";
  } else if (lower === "completed" || lower === "info") {
    colorStyles = "bg-[#EAF2F8] text-[#3977A9] border-[#3977A9]/30";
    dotColor = "bg-[#3977A9]";
  } else if (lower === "automatic match") {
    colorStyles = "bg-[#E7F5F4] text-[#087F8C] border-[#087F8C]/30";
    dotColor = "bg-[#087F8C]";
  } else if (lower === "human review") {
    colorStyles = "bg-[#FFF5DD] text-[#C98200] border-[#C98200]/30";
    dotColor = "bg-[#C98200]";
  } else if (lower === "manual selection") {
    colorStyles = "bg-[#F5F7F9] text-[#617386] border-[#D8E1E8]";
    dotColor = "bg-[#617386]";
  } else if (lower === "accepted" || lower === "verified" || lower.includes("verified")) {
    colorStyles = "bg-[#E8F5EF] text-[#16845B] border-[#16845B]/30";
    dotColor = "bg-[#16845B]";
  } else if (lower === "extracted") {
    colorStyles = "bg-[#E7F5F4] text-[#087F8C] border-[#087F8C]/30";
    dotColor = "bg-[#087F8C]";
  }

  const sizeStyles = size === "sm"
    ? "text-[11px] px-2 py-0.5 space-x-1.5"
    : "text-xs px-2.5 py-1 space-x-2";

  return (
    <span
      id={id}
      className={`inline-flex items-center font-medium rounded-full border whitespace-nowrap ${colorStyles} ${sizeStyles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{t(status, status)}</span>
    </span>
  );
}
