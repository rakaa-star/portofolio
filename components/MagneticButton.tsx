"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  title?: string;
  asAnchor?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.38,
  type = "button",
  target,
  rel,
  title,
  asAnchor = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const style: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isHovered
      ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
      : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
    willChange: "transform",
  };

  const innerStyle: React.CSSProperties = {
    transform: `translate3d(${position.x * 0.4}px, ${position.y * 0.4}px, 0)`,
    transition: isHovered
      ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
      : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
    willChange: "transform",
    display: "inline-flex",
    alignItems: "center",
    gap: "inherit",
    width: "100%",
    justifyContent: "inherit",
  };

  if (asAnchor && href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        title={title}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`relative inline-flex items-center justify-center cursor-pointer select-none active:scale-95 ${className}`}
      >
        <span style={innerStyle}>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      title={title}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none active:scale-95 ${className}`}
    >
      <span style={innerStyle}>{children}</span>
    </button>
  );
}
