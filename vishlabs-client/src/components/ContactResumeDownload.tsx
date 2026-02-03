"use client";

import React, { useState } from "react";
import { Eye, Download, X } from "lucide-react";

interface ResumeDownloadButtonProps {
  className?: string;
}

export default function ContactResumeDownload({
  className,
}: ResumeDownloadButtonProps) {
  const [showPreview, setShowPreview] = useState(false);
  const resumeUrl = "/pdf/Vishnu_Resume.pdf";

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Vishnu_Resume.pdf";
    link.click();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          className={className}
          onClick={() => setShowPreview(true)}
          aria-label="Preview Resume"
        >
          <Eye style={{ marginRight: "10px" }} size={24} />
          Preview Resume
        </button>

        <button className={className} onClick={downloadResume}>
          <Download style={{ marginRight: "10px" }} size={24} />
          Download My Resume
        </button>
      </div>

      {showPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
          onClick={() => setShowPreview(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              height: "90%",
              backgroundColor: "black",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "0.2rem",
                display: "flex",
                justifyContent: "flex-end",
                borderBottom: "1px solid #000",
                backgroundColor: "#333",
              }}
            >
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  background: "#333",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close Preview"
              >
                <X size={24} color="#fff" />
              </button>
            </div>
            <iframe
              src={resumeUrl}
              style={{
                width: "100%",
                flex: 1,
                border: "none",
              }}
              title="Resume Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
