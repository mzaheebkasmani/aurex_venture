import React, { useState } from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light" | "blue" | "white";
  className?: string;
}

export function Logo({ variant = "blue", className = "", ...props }: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const isWhite = variant === "white";

  return (
    <div className={`flex items-center gap-2.5 ${className} ${isWhite ? "preserve-white" : ""}`} {...props}>
      <div className="relative flex items-center justify-center flex-shrink-0 h-10 w-10">
        {!imgFailed ? (
          <img 
            src="/aurex-icon.png" 
            alt="Aurex Venture Logo" 
            className={`h-10 w-10 object-contain ${isWhite ? "filter-none" : "logo-icon-theme"} transition-all duration-300`}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <img 
            src="/logo.png" 
            alt="Aurex Venture Logo" 
            className={`h-10 w-10 object-contain ${isWhite ? "filter-none" : "logo-icon-theme"} transition-all duration-300`}
          />
        )}
      </div>
      <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${isWhite ? "text-white" : "logo-text-theme"}`}>
        Aurex<span className={`font-normal ${isWhite ? "text-white/80" : "logo-subtext-theme"}`}>Venture</span>
      </span>
    </div>
  );
}

