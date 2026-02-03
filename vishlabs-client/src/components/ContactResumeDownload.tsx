"use client";

import React from "react";

interface ResumeDownloadButtonProps {
  className?: string;
}

export default function ContactResumeDownload({
  className,
}: ResumeDownloadButtonProps) {
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/pdf/Vishnu_Resume.pdf";
    link.download = "Vishnu_Resume.pdf";
    link.click();
  };

  return (
    <button className={className} onClick={downloadResume}>
      Download My Resume
    </button>
  );
}
