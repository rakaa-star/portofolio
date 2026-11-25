import React from "react";

export function TechIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case "html5":
    case "html":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3L5.6 21L12 22.8L18.4 21L20 3H4Z" fill="#E44D26" />
          <path d="M12 4.6V21.1L16.9 19.7L18.2 4.6H12Z" fill="#F16529" />
          <path d="M8.2 8H12V10.7H8.4L8.7 13.4H12V16.1L9.6 15.4L9.4 14.1H6.7L7.1 17.5L12 18.9V18.9L16.9 17.5L17.5 10.7H12V8H15.8L16.1 5.4H7.9L8.2 8Z" fill="#EBEBEB" />
          <path d="M12 10.7H15.6L15.3 13.4L12 14.3V10.7Z" fill="#FFFFFF" />
        </svg>
      );
    case "css3":
    case "css":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M4 3L5.6 21L12 22.8L18.4 21L20 3H4Z" fill="#1572B6" />
          <path d="M12 4.6V21.1L16.9 19.7L18.2 4.6H12Z" fill="#33A9DC" />
          <path d="M8.2 8H15.8L15.6 10.7H12V13.4H15.3L15 16.1L12 17L9 16.1L8.8 14.1H6.1L6.5 18L12 19.5L17.5 18L18.2 8H12V5.4H6L6.2 8H8.2Z" fill="#EBEBEB" />
          <path d="M12 13.4V10.7H15.6L15.3 13.4H12Z" fill="#FFFFFF" />
        </svg>
      );
    case "javascript":
    case "js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7 17.5C7.8 18.5 9 19 10.4 19C12.4 19 13.6 17.9 13.6 16.2C13.6 14.7 12.8 14.1 11.2 13.4L10.5 13.1C9.6 12.7 9.1 12.3 9.1 11.6C9.1 10.8 9.8 10.2 10.8 10.2C11.7 10.2 12.4 10.6 12.9 11.4L14.4 10.4C13.6 9.1 12.3 8.5 10.8 8.5C8.8 8.5 7.4 9.8 7.4 11.6C7.4 13.2 8.3 13.9 9.8 14.5L10.5 14.8C11.5 15.2 12 15.7 12 16.3C12 17.1 11.2 17.6 10.2 17.6C9.1 17.6 8.3 17 7.7 16L6.2 17.1C6.4 17.2 6.7 17.4 7 17.5ZM16.2 8.7H17.9V16.3C17.9 17.9 17.2 18.8 15.5 18.8C14.4 18.8 13.6 18.4 13 17.8L14 16.4C14.4 16.8 14.9 17.1 15.4 17.1C15.9 17.1 16.2 16.8 16.2 16.1V8.7Z" fill="#000000" />
        </svg>
      );
    case "typescript":
    case "ts":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M5.5 10.2H11.5V11.8H9.3V18.5H7.7V11.8H5.5V10.2ZM12.7 16.7C13.3 17.1 14.1 17.4 14.9 17.4C16.1 17.4 16.8 16.8 16.8 15.9C16.8 13.7 12.8 14.6 12.8 11.7C12.8 10.2 14.1 9.2 15.8 9.2C16.8 9.2 17.6 9.5 18.2 9.9L17.7 11.2C17.2 10.9 16.6 10.7 15.9 10.7C14.8 10.7 14.3 11.2 14.3 11.8C14.3 13.9 18.3 13 18.3 15.8C18.3 17.4 16.9 18.7 14.8 18.7C13.8 18.7 12.8 18.3 12.1 17.8L12.7 16.7Z" fill="#FFFFFF" />
        </svg>
      );
    case "react.js":
    case "react":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );
    case "next.js":
    case "next":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="#000" stroke="#fff" strokeWidth="0.8" />
          <path d="M15.5 8.5V15.5L8.5 8.5H7.5V15.5H9V10.2L15 16.2H17V8.5H15.5Z" fill="#fff" />
        </svg>
      );
    case "vue.js":
    case "node.js":
    case "node":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#339933" />
          <path d="M12 4.5L18.5 8.2V15.8L12 19.5L5.5 15.8V8.2L12 4.5Z" fill="#222" />
          <path d="M12 7L16 9.3V14.7L12 17L8 14.7V9.3L12 7Z" fill="#68A063" />
        </svg>
      );
    case "postgresql":
    case "postgres":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#336791" />
          <path d="M16 11.5C15.5 9 13.5 7.5 11 7.5C8 7.5 6 9.5 6 12.5C6 15.5 8 17.5 11 17.5C13 17.5 14.5 16.5 15.5 15L13.5 14C13 15 12 15.5 11 15.5C9.5 15.5 8.5 14.2 8.5 12.5C8.5 10.8 9.5 9.5 11 9.5C12.5 9.5 13.5 10.3 14 11.5H16Z" fill="#fff" />
        </svg>
      );
    case "rest apis":
    case "api":
    case "rest api":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "vs code":
    case "vscode":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M17.5 2L5.5 11L2 8.5V15.5L5.5 13L17.5 22L22 20V4L17.5 2Z" fill="#007ACC" />
          <path d="M17.5 2L10 12L17.5 22V2Z" fill="#1F9CF0" />
        </svg>
      );
    case "design systems":
    case "design tokens":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "ui/ux architecture":
    case "ui/ux":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case "modern motion easing":
    case "motion":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 17C6 17 8 7 12 7C16 7 18 17 21 17" />
        </svg>
      );
    case "vue":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 18.5L21.5 2H17.5L12 11.5L6.5 2H2.5L12 18.5Z" fill="#41B883" />
          <path d="M12 18.5L17.5 2H14L12 5.5L10 2H6.5L12 18.5Z" fill="#35495E" />
        </svg>
      );
    case "tailwind css":
    case "tailwind":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M6.5 10.5C7.8 7.9 9.6 7 11.9 7.8C13.2 8.3 14.1 9.2 15.2 10.2C16.8 11.8 18.7 13.7 22.5 13.7C20.6 16.3 18.8 17.2 16.5 16.4C15.2 15.9 14.3 15 13.2 14C11.6 12.4 9.7 10.5 6.5 10.5ZM1.5 16.8C2.8 14.2 4.6 13.3 6.9 14.1C8.2 14.6 9.1 15.5 10.2 16.5C11.8 18.1 13.7 20 17.5 20C15.6 22.6 13.8 23.5 11.5 22.7C10.2 22.2 9.3 21.3 8.2 20.3C6.6 18.7 4.7 16.8 1.5 16.8Z" fill="#38BDF8" />
        </svg>
      );
    case "php":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
          <text x="12" y="14.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PHP</text>
        </svg>
      );
    case "laravel":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M19.5 4.5L12 8.8L4.5 4.5L12 0.2L19.5 4.5Z" fill="#FF2D20" />
          <path d="M4.5 5.5V14.5L12 18.8V9.8L4.5 5.5Z" fill="#FF2D20" opacity="0.85" />
          <path d="M19.5 5.5L12 9.8V18.8L19.5 14.5V5.5Z" fill="#FF2D20" opacity="0.7" />
        </svg>
      );
    case "mysql":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 16.5H9V9.5H11V16.5ZM15 16.5H13V9.5H15V16.5Z" fill="#00758F" />
        </svg>
      );
    case "supabase":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M13.2 2L2 14.8H11.5L10.8 22L22 9.2H12.5L13.2 2Z" fill="#3ECF8E" />
        </svg>
      );
    case "git":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M21.7 10.3L13.7 2.3C13.3 1.9 12.7 1.9 12.3 2.3L10.5 4.1L12.8 6.4C13.4 6.2 14.1 6.3 14.5 6.7C15.1 7.3 15.1 8.2 14.7 8.8L17.1 11.2C17.7 10.8 18.6 10.8 19.2 11.4C19.8 12 19.8 13 19.2 13.6C18.6 14.2 17.6 14.2 17 13.6C16.5 13.1 16.4 12.3 16.8 11.7L14.5 9.4C14.2 9.5 13.8 9.5 13.5 9.4L11.2 11.7C11.3 12 11.3 12.4 11.2 12.7L13.6 15.1C14.2 14.7 15.1 14.7 15.7 15.3C16.3 15.9 16.3 16.9 15.7 17.5C15.1 18.1 14.1 18.1 13.5 17.5C13 17 12.9 16.2 13.3 15.6L11 13.3C10.5 13.6 9.8 13.5 9.3 13.1C8.7 12.5 8.7 11.5 9.3 10.9C9.7 10.5 10.3 10.4 10.8 10.6L8.5 8.3L2.3 14.5C1.9 14.9 1.9 15.5 2.3 15.9L10.3 23.9C10.7 24.3 11.3 24.3 11.7 23.9L21.7 13.9C22.1 13.5 22.1 12.9 21.7 12.5V10.3Z" fill="#F05032" />
        </svg>
      );
    case "github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "figma":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z" fill="#0ACF83" />
          <path d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z" fill="#A259FF" />
          <path d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z" fill="#F24E1E" />
          <path d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z" fill="#FF7262" />
          <path d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z" fill="#1ABCFE" />
        </svg>
      );
    case "vercel":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L22 20H2L12 2Z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
  }
}
