import { useState, useEffect, useRef, useCallback } from "react";

const MOODS = ["idle", "happy", "sleeping", "curious", "worried", "walking", "proud", "spin", "startle", "mad"];
const IDLE_BEHAVIORS = ["blink", "look_around", "stretch", "wiggle", "yawn"];

/* ═══════════════════════════════════════════════
   PINCH (LOBSTER) SVG
   ═══════════════════════════════════════════════ */
const PinchSvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">
    <path className="tail" d="M 50 100 Q 64 125 78 100 Z" fill="#FF8C69" stroke="#8B3A3A" strokeWidth="4" strokeLinejoin="round" />
    <g className="left-arm">
      <path d="M 40 55 A 24 24 0 1 1 10 85 Q 20 80 25 75 Q 20 65 30 70 Z" fill="#FF8C69" stroke="#8B3A3A" strokeWidth="4" strokeLinejoin="round" />
    </g>
    <g className="right-arm">
      <path d="M 88 55 A 24 24 0 1 0 118 85 Q 108 80 103 75 Q 108 65 98 70 Z" fill="#FF8C69" stroke="#8B3A3A" strokeWidth="4" strokeLinejoin="round" />
    </g>
    <g className="body-group">
      <rect x="34" y="28" width="60" height="75" rx="30" fill="#FF8C69" stroke="#8B3A3A" strokeWidth="4" />
      <path d="M 34 82 Q 64 92 94 82 L 94 88 Q 64 98 34 88 Z" fill="#008080" stroke="#004D4D" strokeWidth="2" />
      <path d="M 75 85 L 88 108 L 68 102 Z" fill="#008080" stroke="#004D4D" strokeWidth="2" strokeLinejoin="round" />
      <g className="face">
        <g className="eye-open">
          <circle cx="48" cy="55" r="7" fill="#1a1a1a" />
          <circle cx="80" cy="55" r="7" fill="#1a1a1a" />
          <g className="pupils">
            <circle cx="46" cy="53" r="2.5" fill="#FFF" />
            <circle cx="78" cy="53" r="2.5" fill="#FFF" />
          </g>
        </g>
        <g className="eye-closed">
          <path d="M 41 55 Q 48 60 55 55" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
          <path d="M 73 55 Q 80 60 87 55" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="eye-squint">
          <path d="M 41 56 Q 48 52 55 56" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
          <path d="M 73 56 Q 80 52 87 56" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
        </g>
        <path className="mouth-neutral" d="M 60 68 Q 64 71 68 68" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        <path className="mouth-happy" d="M 58 66 Q 64 74 70 66" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        <circle className="mouth-worried" cx="64" cy="70" r="2.5" fill="#1a1a1a" />
      </g>
    </g>
    <g className="fx-zzz">
      <text x="85" y="40" fill="#fff" fontWeight="bold" fontSize="14" fontFamily="sans-serif">Z</text>
      <text x="95" y="25" fill="#fff" fontWeight="bold" fontSize="10" fontFamily="sans-serif">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 35 35 Q 30 45 35 50 Q 40 45 35 35 Z" fill="#87CEFA" opacity="0.8" />
    </g>
    <g className="fx-alert">
      <text x="82" y="20" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#FF6B6B">!</text>
    </g>
    <g className="fx-stars">
      <text x="22" y="22" fontSize="10">✦</text>
      <text x="96" y="28" fontSize="8">✦</text>
      <text x="86" y="14" fontSize="12">✦</text>
    </g>
    <g className="fx-hearts">
      <text x="20" y="25" fontSize="12" fill="#FF6B6B">♥</text>
      <text x="95" y="18" fontSize="9" fill="#FF6B6B">♥</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   SHIBA INU SVG
   ═══════════════════════════════════════════════ */
const ShibaSvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">
    <g className="tail">
      <path d="M 56 108 Q 42 85 30 90 Q 25 92 28 96 Q 35 102 50 108" fill="#E8A735" stroke="#B07A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g className="left-leg">
      <rect x="42" y="95" width="14" height="22" rx="7" fill="#D4952E" stroke="#B07A1A" strokeWidth="2" />
      <rect x="40" y="112" width="12" height="6" rx="3" fill="#F5E6C8" stroke="#B07A1A" strokeWidth="1.5" />
    </g>
    <g className="right-leg">
      <rect x="72" y="95" width="14" height="22" rx="7" fill="#D4952E" stroke="#B07A1A" strokeWidth="2" />
      <rect x="74" y="112" width="12" height="6" rx="3" fill="#F5E6C8" stroke="#B07A1A" strokeWidth="1.5" />
    </g>
    <g className="body-group">
      <ellipse cx="64" cy="88" rx="28" ry="22" fill="#E8A735" stroke="#B07A1A" strokeWidth="2.5" />
      <ellipse cx="64" cy="92" rx="18" ry="14" fill="#F5E6C8" />
    </g>
    <g className="head-group">
      <ellipse cx="64" cy="52" rx="26" ry="24" fill="#E8A735" stroke="#B07A1A" strokeWidth="2.5" />
      <path d="M 42 52 Q 48 42 64 40 Q 80 42 86 52 Q 86 68 64 72 Q 42 68 42 52" fill="#F5E6C8" />
      <g className="left-ear">
        <path d="M 40 44 L 32 18 L 52 36 Z" fill="#E8A735" stroke="#B07A1A" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 41 40 L 35 22 L 50 36 Z" fill="#D4952E" />
      </g>
      <g className="right-ear">
        <path d="M 88 44 L 96 18 L 76 36 Z" fill="#E8A735" stroke="#B07A1A" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 87 40 L 93 22 L 78 36 Z" fill="#D4952E" />
      </g>
      <g className="face">
        <g className="eye-open">
          <ellipse cx="52" cy="50" rx="4.5" ry="5" fill="#1a1a1a" />
          <ellipse cx="76" cy="50" rx="4.5" ry="5" fill="#1a1a1a" />
          <g className="pupils">
            <circle cx="50.5" cy="48.5" r="1.8" fill="#fff" />
            <circle cx="74.5" cy="48.5" r="1.8" fill="#fff" />
          </g>
        </g>
        <g className="eye-closed">
          <path d="M 47 50 Q 52 55 57 50" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 71 50 Q 76 55 81 50" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className="eye-squint">
          <path d="M 47 51 Q 52 48 57 51" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 71 51 Q 76 48 81 51" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <ellipse cx="64" cy="58" rx="4" ry="3" fill="#1a1a1a" />
        <circle cx="62.5" cy="57" r="1" fill="#444" />
        <path className="mouth-neutral" d="M 60 61 Q 64 65 68 61" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
        <path className="mouth-happy" d="M 56 60 Q 64 70 72 60" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        <circle className="mouth-worried" cx="64" cy="63" r="2.5" fill="#1a1a1a" />
        <g className="tongue">
          <ellipse cx="64" cy="67" rx="4" ry="5" fill="#E86B6B" />
          <line x1="64" y1="63" x2="64" y2="70" stroke="#C55" strokeWidth="1" />
        </g>
        <g className="blush">
          <ellipse cx="44" cy="56" rx="5" ry="3" fill="#F5A0A0" opacity="0.5" />
          <ellipse cx="84" cy="56" rx="5" ry="3" fill="#F5A0A0" opacity="0.5" />
        </g>
      </g>
    </g>
    <g className="fx-zzz">
      <text x="90" y="30" fill="#7AA2D4" fontWeight="bold" fontSize="16" fontFamily="sans-serif">Z</text>
      <text x="100" y="16" fill="#7AA2D4" fontWeight="bold" fontSize="11" fontFamily="sans-serif">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 35 28 Q 30 38 35 42 Q 40 38 35 28 Z" fill="#87CEFA" opacity="0.8" />
    </g>
    <g className="fx-hearts">
      <text x="20" y="25" fontSize="14" opacity="0.9">♥</text>
      <text x="95" y="20" fontSize="10" opacity="0.7">♥</text>
    </g>
    <g className="fx-alert">
      <text x="80" y="20" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#FF6B6B">!</text>
    </g>
    <g className="fx-stars">
      <text x="22" y="22" fontSize="10">✦</text>
      <text x="96" y="28" fontSize="8">✦</text>
      <text x="86" y="14" fontSize="12">✦</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   ROBOT SVG
   ═══════════════════════════════════════════════ */
const RobotSvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">
    <g className="antenna">
      <line x1="64" y1="22" x2="64" y2="8" stroke="#7A8B99" strokeWidth="3" strokeLinecap="round" />
      <circle className="antenna-ball" cx="64" cy="6" r="5" fill="#FF5252" stroke="#CC4040" strokeWidth="1.5" />
      <circle className="antenna-glow" cx="64" cy="6" r="3" fill="#FF8A80" />
    </g>
    <g className="left-arm">
      <rect x="12" y="58" width="14" height="32" rx="7" fill="#6B7B8D" stroke="#4A5A6A" strokeWidth="2" />
      <g className="left-hand">
        <rect x="10" y="88" width="8" height="10" rx="2" fill="#7A8B99" stroke="#4A5A6A" strokeWidth="1.5" />
        <rect x="20" y="88" width="8" height="10" rx="2" fill="#7A8B99" stroke="#4A5A6A" strokeWidth="1.5" />
      </g>
    </g>
    <g className="right-arm">
      <rect x="102" y="58" width="14" height="32" rx="7" fill="#6B7B8D" stroke="#4A5A6A" strokeWidth="2" />
      <g className="right-hand">
        <rect x="100" y="88" width="8" height="10" rx="2" fill="#7A8B99" stroke="#4A5A6A" strokeWidth="1.5" />
        <rect x="110" y="88" width="8" height="10" rx="2" fill="#7A8B99" stroke="#4A5A6A" strokeWidth="1.5" />
      </g>
    </g>
    <g className="left-leg">
      <rect x="42" y="100" width="14" height="18" rx="4" fill="#6B7B8D" stroke="#4A5A6A" strokeWidth="2" />
      <rect x="38" y="114" width="20" height="8" rx="4" fill="#5A6A7A" stroke="#4A5A6A" strokeWidth="1.5" />
    </g>
    <g className="right-leg">
      <rect x="72" y="100" width="14" height="18" rx="4" fill="#6B7B8D" stroke="#4A5A6A" strokeWidth="2" />
      <rect x="70" y="114" width="20" height="8" rx="4" fill="#5A6A7A" stroke="#4A5A6A" strokeWidth="1.5" />
    </g>
    <g className="body-group">
      <rect x="30" y="55" width="68" height="48" rx="8" fill="#8899AA" stroke="#5A6A7A" strokeWidth="2.5" />
      <rect x="40" y="62" width="48" height="34" rx="5" fill="#6B7B8D" stroke="#5A6A7A" strokeWidth="1.5" />
      <circle className="power-core" cx="64" cy="79" r="8" fill="#1a1a2e" stroke="#4A5A6A" strokeWidth="2" />
      <circle className="power-glow" cx="64" cy="79" r="5" fill="#4FC3F7" />
      <g className="chest-lights">
        <circle cx="50" cy="70" r="2.5" fill="#66BB6A" />
        <circle cx="58" cy="70" r="2.5" fill="#FDD835" />
        <circle cx="70" cy="70" r="2.5" fill="#FDD835" />
        <circle cx="78" cy="70" r="2.5" fill="#66BB6A" />
      </g>
      <circle cx="36" cy="62" r="2" fill="#5A6A7A" />
      <circle cx="92" cy="62" r="2" fill="#5A6A7A" />
      <circle cx="36" cy="96" r="2" fill="#5A6A7A" />
      <circle cx="92" cy="96" r="2" fill="#5A6A7A" />
    </g>
    <g className="head-group">
      <rect x="34" y="22" width="60" height="38" rx="10" fill="#8899AA" stroke="#5A6A7A" strokeWidth="2.5" />
      <rect x="40" y="28" width="48" height="26" rx="6" fill="#1a1a2e" stroke="#4A5A6A" strokeWidth="1.5" />
      <g className="face">
        <g className="eye-open">
          <rect className="left-eye-led" x="46" y="34" width="12" height="10" rx="2" fill="#4FC3F7" opacity="0.9" />
          <rect className="right-eye-led" x="70" y="34" width="12" height="10" rx="2" fill="#4FC3F7" opacity="0.9" />
          <g className="pupils">
            <rect x="48" y="36" width="4" height="4" rx="1" fill="#E1F5FE" />
            <rect x="72" y="36" width="4" height="4" rx="1" fill="#E1F5FE" />
          </g>
        </g>
        <g className="eye-closed">
          <rect x="46" y="38" width="12" height="3" rx="1.5" fill="#4FC3F7" opacity="0.5" />
          <rect x="70" y="38" width="12" height="3" rx="1.5" fill="#4FC3F7" opacity="0.5" />
        </g>
        <g className="eye-squint">
          <rect x="46" y="36" width="12" height="5" rx="1.5" fill="#FF5252" opacity="0.8" />
          <rect x="70" y="36" width="12" height="5" rx="1.5" fill="#FF5252" opacity="0.8" />
        </g>
        <g className="eye-heart">
          <text x="47" y="44" fontSize="13" fill="#FF5252">♥</text>
          <text x="71" y="44" fontSize="13" fill="#FF5252">♥</text>
        </g>
        <rect className="mouth-neutral" x="54" y="48" width="20" height="3" rx="1.5" fill="#4FC3F7" opacity="0.6" />
        <g className="mouth-happy">
          <rect x="50" y="48" width="6" height="3" rx="1.5" fill="#66BB6A" transform="rotate(-15 53 49)" />
          <rect x="57" y="49" width="14" height="3" rx="1.5" fill="#66BB6A" />
          <rect x="72" y="48" width="6" height="3" rx="1.5" fill="#66BB6A" transform="rotate(15 75 49)" />
        </g>
        <g className="mouth-worried">
          <rect x="54" y="48" width="20" height="3" rx="1.5" fill="#FF5252" opacity="0.8" />
          <rect x="52" y="48" width="4" height="3" rx="1.5" fill="#FF5252" opacity="0.8" transform="rotate(20 54 49)" />
          <rect x="72" y="48" width="4" height="3" rx="1.5" fill="#FF5252" opacity="0.8" transform="rotate(-20 74 49)" />
        </g>
      </g>
      <rect x="30" y="32" width="6" height="16" rx="3" fill="#6B7B8D" stroke="#4A5A6A" strokeWidth="1.5" />
      <rect x="92" y="32" width="6" height="16" rx="3" fill="#6B7B8D" stroke="#4A5A6A" strokeWidth="1.5" />
    </g>
    <g className="fx-zzz">
      <text x="96" y="20" fill="#4FC3F7" fontWeight="bold" fontSize="14" fontFamily="monospace">Z</text>
      <text x="106" y="8" fill="#4FC3F7" fontWeight="bold" fontSize="10" fontFamily="monospace">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 30 20 Q 26 28 30 32 Q 34 28 30 20 Z" fill="#87CEFA" opacity="0.8" />
    </g>
    <g className="fx-sparks">
      <line x1="18" y1="50" x2="10" y2="45" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="50" x2="118" y2="45" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="58" x2="6" y2="58" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" />
      <line x1="112" y1="58" x2="122" y2="58" stroke="#FDD835" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g className="fx-alert">
      <text x="88" y="18" fontSize="18" fontWeight="bold" fontFamily="monospace" fill="#FF5252">!</text>
    </g>
    <g className="fx-hearts">
      <text x="18" y="22" fontSize="12" fill="#FF5252">♥</text>
      <text x="100" y="16" fontSize="9" fill="#FF5252">♥</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   MONKEY SVG
   ═══════════════════════════════════════════════ */
const MonkeySvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">
    <g className="tail">
      <path d="M 48 100 Q 20 95 15 75 Q 12 60 20 50 Q 25 44 28 48" fill="none" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27" cy="47" r="4" fill="none" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
    </g>
    <g className="left-leg">
      <rect x="42" y="96" width="13" height="20" rx="6.5" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
      <ellipse cx="48" cy="116" rx="8" ry="5" fill="#7A5030" stroke="#6B3F1F" strokeWidth="1.5" />
    </g>
    <g className="right-leg">
      <rect x="72" y="96" width="13" height="20" rx="6.5" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
      <ellipse cx="78" cy="116" rx="8" ry="5" fill="#7A5030" stroke="#6B3F1F" strokeWidth="1.5" />
    </g>
    <g className="left-arm">
      <rect x="20" y="64" width="12" height="28" rx="6" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
      <circle cx="26" cy="93" r="6" fill="#D2A679" stroke="#6B3F1F" strokeWidth="1.5" />
    </g>
    <g className="right-arm">
      <rect x="96" y="64" width="12" height="28" rx="6" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
      <circle cx="102" cy="93" r="6" fill="#D2A679" stroke="#6B3F1F" strokeWidth="1.5" />
    </g>
    <g className="body-group">
      <ellipse cx="64" cy="82" rx="24" ry="24" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2.5" />
      <ellipse cx="64" cy="85" rx="16" ry="17" fill="#D2A679" />
    </g>
    <g className="head-group">
      <circle cx="64" cy="42" r="26" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2.5" />
      <g className="left-ear">
        <circle cx="36" cy="32" r="10" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
        <circle cx="36" cy="32" r="6" fill="#D2A679" />
      </g>
      <g className="right-ear">
        <circle cx="92" cy="32" r="10" fill="#8B5E3C" stroke="#6B3F1F" strokeWidth="2" />
        <circle cx="92" cy="32" r="6" fill="#D2A679" />
      </g>
      <ellipse cx="64" cy="48" rx="18" ry="18" fill="#C4895E" />
      <ellipse cx="64" cy="54" rx="14" ry="12" fill="#D2A679" />
      <g className="face">
        <g className="eye-open">
          <ellipse cx="54" cy="42" rx="5" ry="5.5" fill="#fff" stroke="#6B3F1F" strokeWidth="1" />
          <ellipse cx="74" cy="42" rx="5" ry="5.5" fill="#fff" stroke="#6B3F1F" strokeWidth="1" />
          <circle cx="55" cy="42" r="3" fill="#2C1810" />
          <circle cx="75" cy="42" r="3" fill="#2C1810" />
          <g className="pupils">
            <circle cx="54" cy="41" r="1.2" fill="#fff" />
            <circle cx="74" cy="41" r="1.2" fill="#fff" />
          </g>
        </g>
        <g className="eye-closed">
          <path d="M 49 42 Q 54 47 59 42" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 69 42 Q 74 47 79 42" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className="eye-squint">
          <path d="M 49 43 Q 54 40 59 43" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 69 43 Q 74 40 79 43" fill="none" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx="60" cy="52" r="1.8" fill="#6B3F1F" />
        <circle cx="68" cy="52" r="1.8" fill="#6B3F1F" />
        <path className="mouth-neutral" d="M 58 57 Q 64 61 70 57" fill="none" stroke="#6B3F1F" strokeWidth="2" strokeLinecap="round" />
        <path className="mouth-happy" d="M 54 55 Q 64 68 74 55" fill="#8B3030" stroke="#6B3F1F" strokeWidth="2" strokeLinecap="round" />
        <circle className="mouth-worried" cx="64" cy="58" r="3" fill="#6B3F1F" />
        <g className="tongue">
          <ellipse cx="64" cy="62" rx="4" ry="4" fill="#E86B6B" />
        </g>
        <g className="blush">
          <ellipse cx="46" cy="50" rx="5" ry="3" fill="#E8A0A0" opacity="0.5" />
          <ellipse cx="82" cy="50" rx="5" ry="3" fill="#E8A0A0" opacity="0.5" />
        </g>
      </g>
    </g>
    <g className="fx-banana">
      <path d="M 98 18 Q 108 22 110 34 Q 108 38 104 36 Q 103 26 96 22 Z" fill="#F5D547" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 97 18 L 96 15" stroke="#7A5030" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g className="fx-zzz">
      <text x="88" y="22" fill="#A08060" fontWeight="bold" fontSize="15" fontFamily="sans-serif">Z</text>
      <text x="100" y="10" fill="#A08060" fontWeight="bold" fontSize="10" fontFamily="sans-serif">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 34 16 Q 30 24 34 28 Q 38 24 34 16 Z" fill="#87CEFA" opacity="0.8" />
    </g>
    <g className="fx-hearts">
      <text x="18" y="18" fontSize="13" fill="#E86B6B">♥</text>
      <text x="100" y="14" fontSize="9" fill="#E86B6B">♥</text>
    </g>
    <g className="fx-alert">
      <text x="86" y="12" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#FF6B6B">!</text>
    </g>
    <g className="fx-stars">
      <text x="20" y="16" fontSize="11">✦</text>
      <text x="98" y="24" fontSize="8">✦</text>
      <text x="88" y="10" fontSize="12">✦</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   GERALD (PENGUIN CONSULTANT) SVG
   ═══════════════════════════════════════════════ */
const GeraldSvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">

    {/* Left flipper — behind body */}
    <g className="left-arm">
      <path
        d="M 36 66 Q 18 72 16 88 Q 20 95 27 90 Q 30 80 40 73 Z"
        fill="#1C1C2E" stroke="#0a0a18" strokeWidth="2" strokeLinejoin="round"
      />
    </g>

    {/* Right flipper — behind body */}
    <g className="right-arm">
      <path
        d="M 92 66 Q 110 72 112 88 Q 108 95 101 90 Q 98 80 88 73 Z"
        fill="#1C1C2E" stroke="#0a0a18" strokeWidth="2" strokeLinejoin="round"
      />
    </g>

    {/* Left foot */}
    <g className="left-leg">
      <ellipse cx="50" cy="113" rx="11" ry="6" fill="#E8960A" stroke="#B56A00" strokeWidth="1.5" transform="rotate(-12 50 113)" />
    </g>
    {/* Right foot */}
    <g className="right-leg">
      <ellipse cx="78" cy="113" rx="11" ry="6" fill="#E8960A" stroke="#B56A00" strokeWidth="1.5" transform="rotate(12 78 113)" />
    </g>

    {/* Body */}
    <g className="body-group">
      {/* Main body */}
      <ellipse cx="64" cy="85" rx="28" ry="30" fill="#1C1C2E" stroke="#0a0a18" strokeWidth="2.5" />
      {/* Belly */}
      <ellipse cx="64" cy="88" rx="18" ry="22" fill="#EEE8D8" />
      {/* Suit jacket — left lapel */}
      <path d="M 46 70 L 56 92 L 64 86 L 56 74 Z" fill="#1E3A5F" stroke="#152A45" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Suit jacket — right lapel */}
      <path d="M 82 70 L 72 92 L 64 86 L 72 74 Z" fill="#1E3A5F" stroke="#152A45" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Tie */}
      <path d="M 61 74 L 64 86 L 67 74 L 64 70 Z" fill="#8B1A1A" stroke="#5A0E0E" strokeWidth="1" strokeLinejoin="round" />
      <ellipse cx="64" cy="72" rx="3.5" ry="2.5" fill="#6E1414" />
      {/* Pocket square */}
      <path d="M 72 76 L 76 73 L 79 75 L 77 78 Z" fill="#EEE8D8" stroke="#BBB5A0" strokeWidth="0.8" />
      {/* Shirt button row */}
      <circle cx="64" cy="91" r="1.2" fill="#BBB5A0" />
      <circle cx="64" cy="96" r="1.2" fill="#BBB5A0" />
      <circle cx="64" cy="101" r="1.2" fill="#BBB5A0" />
    </g>

    {/* Head group */}
    <g className="head-group">
      {/* Head */}
      <ellipse cx="64" cy="48" rx="26" ry="28" fill="#1C1C2E" stroke="#0a0a18" strokeWidth="2.5" />
      {/* Face patch */}
      <ellipse cx="64" cy="53" rx="18" ry="20" fill="#EEE8D8" />

      <g className="face">
        {/* Eyes open */}
        <g className="eye-open">
          <circle cx="53" cy="46" r="6.5" fill="#fff" stroke="#1C1C2E" strokeWidth="1.5" />
          <circle cx="75" cy="46" r="6.5" fill="#fff" stroke="#1C1C2E" strokeWidth="1.5" />
          <circle cx="54" cy="46" r="3.8" fill="#1a1a2e" />
          <circle cx="76" cy="46" r="3.8" fill="#1a1a2e" />
          <g className="pupils">
            <circle cx="52.8" cy="44.8" r="1.4" fill="#fff" />
            <circle cx="74.8" cy="44.8" r="1.4" fill="#fff" />
          </g>
          {/* Monocle on right eye */}
          <circle cx="75" cy="46" r="9" fill="none" stroke="#C9A84C" strokeWidth="1.8" opacity="0.85" />
          <line x1="84" y1="52" x2="88" y2="58" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Eyes closed */}
        <g className="eye-closed">
          <path d="M 46 46 Q 53 52 60 46" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 68 46 Q 75 52 82 46" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Eyes squint / angry */}
        <g className="eye-squint">
          <path d="M 46 47 Q 53 43 60 47" fill="none" stroke="#1a1a2e" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 68 47 Q 75 43 82 47" fill="none" stroke="#1a1a2e" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* Beak */}
        <path d="M 59 54 L 69 54 L 64 60 Z" fill="#E8960A" stroke="#B56A00" strokeWidth="1.2" strokeLinejoin="round" />

        {/* THE MAGNIFICENT HANDLEBAR MUSTACHE */}
        <g className="mustache">
          {/* Main mustache body */}
          <path
            d="M 53 62 Q 57 58 64 60 Q 71 58 75 62 Q 71 65 64 63 Q 57 65 53 62 Z"
            fill="#2A1A0E" stroke="#1a0e06" strokeWidth="0.5"
          />
          {/* Left handlebar curl — sweeps outward and up */}
          <path
            d="M 53 62 Q 47 60 44 55 Q 43 50 47 49 Q 51 50 50 54 Q 50 58 53 62"
            fill="#2A1A0E" stroke="#1a0e06" strokeWidth="0.5"
          />
          {/* Right handlebar curl */}
          <path
            d="M 75 62 Q 81 60 84 55 Q 85 50 81 49 Q 77 50 78 54 Q 78 58 75 62"
            fill="#2A1A0E" stroke="#1a0e06" strokeWidth="0.5"
          />
          {/* Mustache highlight for volume */}
          <path d="M 57 60 Q 64 58 71 60" fill="none" stroke="#3D2818" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Mouth neutral */}
        <path className="mouth-neutral" d="M 59 67 Q 64 70 69 67" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
        {/* Mouth happy */}
        <path className="mouth-happy" d="M 56 66 Q 64 75 72 66" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
        {/* Mouth worried */}
        <path className="mouth-worried" d="M 58 70 Q 64 66 70 70" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />

        {/* Blush */}
        <g className="blush">
          <ellipse cx="46" cy="56" rx="5" ry="3" fill="#F5A0A0" opacity="0.45" />
          <ellipse cx="82" cy="56" rx="5" ry="3" fill="#F5A0A0" opacity="0.45" />
        </g>

        {/* Tongue */}
        <g className="tongue">
          <ellipse cx="64" cy="72" rx="4" ry="4" fill="#E86B6B" />
        </g>
      </g>

      {/* Top hat — rendered last so it sits on top of head */}
      {/* Hat crown */}
      <rect x="44" y="14" width="40" height="26" rx="4" fill="#1C1C2E" stroke="#0a0a18" strokeWidth="2" />
      {/* Hat band */}
      <rect x="44" y="34" width="40" height="6" rx="1" fill="#8B1A1A" stroke="#5A0E0E" strokeWidth="1" />
      {/* Hat brim */}
      <rect x="36" y="38" width="56" height="7" rx="3.5" fill="#1C1C2E" stroke="#0a0a18" strokeWidth="2" />
      {/* Hat highlight */}
      <path d="M 48 16 Q 64 14 80 16" fill="none" stroke="#2E2E48" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* Briefcase effect (proud) */}
    <g className="fx-briefcase">
      <rect x="86" y="62" width="24" height="18" rx="3" fill="#7A5520" stroke="#4A3010" strokeWidth="1.8" />
      <path d="M 91 62 L 91 58 Q 91 55 98 55 Q 105 55 105 58 L 105 62" fill="none" stroke="#4A3010" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="86" y1="71" x2="110" y2="71" stroke="#4A3010" strokeWidth="1" />
      <rect x="95" y="68" width="8" height="6" rx="2" fill="#C9A84C" stroke="#9A7820" strokeWidth="1" />
      <circle cx="99" cy="71" r="1.5" fill="#9A7820" />
    </g>

    {/* Effects */}
    <g className="fx-zzz">
      <text x="90" y="28" fill="#8899BB" fontWeight="bold" fontSize="14" fontFamily="serif">Z</text>
      <text x="100" y="14" fill="#8899BB" fontWeight="bold" fontSize="10" fontFamily="serif">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 32 20 Q 28 30 32 34 Q 36 30 32 20 Z" fill="#87CEFA" opacity="0.8" />
    </g>
    <g className="fx-hearts">
      <text x="18" y="24" fontSize="13" fill="#E86B8A">♥</text>
      <text x="100" y="18" fontSize="9" fill="#E86B8A">♥</text>
    </g>
    <g className="fx-alert">
      <text x="84" y="14" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#FF6B6B">!</text>
    </g>
    <g className="fx-stars">
      <text x="18" y="18" fontSize="11">✦</text>
      <text x="96" y="26" fontSize="8">✦</text>
      <text x="86" y="10" fontSize="12">✦</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   AURORA (PRINCESS BUTTERFLY) SVG
   ═══════════════════════════════════════════════ */
const PrincessSvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">

    {/* Lower wings — behind body */}
    <g className="wing-lower-l">
      <path d="M 60 86 Q 28 90 20 110 Q 28 122 48 112 Q 58 104 60 88 Z"
        fill="#E8AACC" stroke="#C9A84C" strokeWidth="1.5"/>
      <circle cx="36" cy="106" r="3" fill="#F5D0EC" opacity="0.7"/>
      <circle cx="28" cy="114" r="2" fill="#C9A84C" opacity="0.5"/>
    </g>
    <g className="wing-lower-r">
      <path d="M 68 86 Q 100 90 108 110 Q 100 122 80 112 Q 70 104 68 88 Z"
        fill="#E8AACC" stroke="#C9A84C" strokeWidth="1.5"/>
      <circle cx="92" cy="106" r="3" fill="#F5D0EC" opacity="0.7"/>
      <circle cx="100" cy="114" r="2" fill="#C9A84C" opacity="0.5"/>
    </g>

    {/* Upper wings */}
    <g className="wing-upper-l">
      <path d="M 58 76 Q 12 64 6 28 Q 12 6 38 16 Q 54 24 58 72 Z"
        fill="#F5B0CC" stroke="#C9A84C" strokeWidth="2"/>
      <path d="M 58 74 Q 24 62 18 36 Q 26 18 46 26 Q 56 32 58 70 Z"
        fill="#FFDAEA" opacity="0.55"/>
      <path d="M 56 72 Q 26 54 22 32" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="24" cy="32" r="3" fill="#FFE5F3" stroke="#C9A84C" strokeWidth="1" opacity="0.9"/>
      <circle cx="36" cy="48" r="2" fill="#C9A84C" opacity="0.6"/>
      <circle cx="14" cy="22" r="2.5" fill="#FFE5F3" stroke="#C9A84C" strokeWidth="1" opacity="0.8"/>
    </g>
    <g className="wing-upper-r">
      <path d="M 70 76 Q 116 64 122 28 Q 116 6 90 16 Q 74 24 70 72 Z"
        fill="#F5B0CC" stroke="#C9A84C" strokeWidth="2"/>
      <path d="M 70 74 Q 104 62 110 36 Q 102 18 82 26 Q 72 32 70 70 Z"
        fill="#FFDAEA" opacity="0.55"/>
      <path d="M 72 72 Q 102 54 106 32" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="104" cy="32" r="3" fill="#FFE5F3" stroke="#C9A84C" strokeWidth="1" opacity="0.9"/>
      <circle cx="92" cy="48" r="2" fill="#C9A84C" opacity="0.6"/>
      <circle cx="114" cy="22" r="2.5" fill="#FFE5F3" stroke="#C9A84C" strokeWidth="1" opacity="0.8"/>
    </g>

    {/* Arms */}
    <g className="left-arm">
      <path d="M 50 82 Q 36 88 32 98 Q 35 102 39 100 Q 43 92 50 86 Z"
        fill="#FFDDD0" stroke="#E8B09A" strokeWidth="1.2"/>
    </g>
    <g className="right-arm">
      <path d="M 78 82 Q 92 88 96 98 Q 93 102 89 100 Q 85 92 78 86 Z"
        fill="#FFDDD0" stroke="#E8B09A" strokeWidth="1.2"/>
    </g>

    {/* Body */}
    <g className="body-group">
      {/* Dress skirt */}
      <path d="M 50 90 Q 44 106 42 120 Q 64 126 86 120 Q 84 106 78 90 Z"
        fill="#C8A0E0" stroke="#9870B0" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Dress bodice */}
      <path d="M 50 78 Q 44 84 44 90 L 84 90 Q 84 84 78 78 Z"
        fill="#D4B0F0" stroke="#9870B0" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Dress shine */}
      <path d="M 52 80 Q 60 78 68 80" fill="none" stroke="#EDD0FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {/* Dress gems */}
      <circle cx="54" cy="96" r="1.5" fill="#F5C518" opacity="0.85"/>
      <circle cx="74" cy="100" r="1.5" fill="#F5C518" opacity="0.85"/>
      <circle cx="64" cy="112" r="2" fill="#F5C518" opacity="0.75"/>
      <circle cx="50" cy="108" r="1.2" fill="#F5C518" opacity="0.65"/>
      <circle cx="78" cy="108" r="1.2" fill="#F5C518" opacity="0.65"/>
      {/* Waist belt */}
      <ellipse cx="64" cy="80" rx="14" ry="3.5" fill="#9060B8" opacity="0.7"/>
      <ellipse cx="64" cy="80" rx="3" ry="2" fill="#FF80AB"/>
      <circle cx="64" cy="80" r="1" fill="#FFB8D4"/>
    </g>

    {/* Head group */}
    <g className="head-group">
      {/* Hair back flowing strands */}
      <path d="M 40 56 Q 32 78 36 100 Q 42 108 48 102 Q 44 84 44 68 Z"
        fill="#F0C820" stroke="#C8A000" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M 88 56 Q 96 78 92 100 Q 86 108 80 102 Q 84 84 84 68 Z"
        fill="#F0C820" stroke="#C8A000" strokeWidth="1.5" strokeLinejoin="round"/>

      {/* Head */}
      <circle cx="64" cy="52" r="22" fill="#FFDDD0" stroke="#E8B09A" strokeWidth="2"/>

      {/* Hair top */}
      <path
        d="M 42 50 Q 38 32 50 22 Q 58 16 64 18 Q 70 16 78 22 Q 90 32 86 50
           Q 80 40 72 37 Q 64 34 56 37 Q 48 40 42 50 Z"
        fill="#F0C820" stroke="#C8A000" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M 52 26 Q 62 22 74 26" fill="none" stroke="#FFF0A0" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      {/* Side hair curls */}
      <path d="M 42 50 Q 36 60 38 74 Q 42 64 46 56 Z" fill="#F0C820" stroke="#C8A000" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M 86 50 Q 92 60 90 74 Q 86 64 82 56 Z" fill="#F0C820" stroke="#C8A000" strokeWidth="1" strokeLinejoin="round"/>

      {/* Crown / Tiara */}
      <g className="crown">
        <path d="M 46 38 Q 64 32 82 38" fill="none" stroke="#F5C518" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M 62 38 L 60 28 L 64 22 L 68 28 L 66 38 Z"
          fill="#F5C518" stroke="#C8A000" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M 52 36 L 50 27 L 54 30 L 56 36 Z" fill="#F5C518" stroke="#C8A000" strokeWidth="1"/>
        <path d="M 76 36 L 78 27 L 74 30 L 72 36 Z" fill="#F5C518" stroke="#C8A000" strokeWidth="1"/>
        <circle cx="64" cy="22" r="3.5" fill="#FF5C8D" stroke="#C8A000" strokeWidth="1"/>
        <circle cx="51" cy="27" r="2.2" fill="#80DEEA" stroke="#C8A000" strokeWidth="0.8"/>
        <circle cx="77" cy="27" r="2.2" fill="#80DEEA" stroke="#C8A000" strokeWidth="0.8"/>
        <circle cx="63" cy="21" r="1" fill="#FFAACC"/>
      </g>

      {/* Antennae */}
      <g className="antenna">
        <path d="M 50 36 Q 42 22 38 13" fill="none" stroke="#C8A000" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="38" cy="12" r="3.8" fill="#FF80AB" stroke="#C8A000" strokeWidth="1.2"/>
        <circle cx="37" cy="11" r="1.2" fill="#FFBBDD"/>
        <path d="M 78 36 Q 86 22 90 13" fill="none" stroke="#C8A000" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="90" cy="12" r="3.8" fill="#FF80AB" stroke="#C8A000" strokeWidth="1.2"/>
        <circle cx="89" cy="11" r="1.2" fill="#FFBBDD"/>
      </g>

      {/* Face */}
      <g className="face">
        {/* Eyes open — big blue sparkling princess eyes */}
        <g className="eye-open">
          <ellipse cx="53" cy="50" rx="7.5" ry="8" fill="#fff" stroke="#E8B09A" strokeWidth="0.8"/>
          <ellipse cx="75" cy="50" rx="7.5" ry="8" fill="#fff" stroke="#E8B09A" strokeWidth="0.8"/>
          <circle cx="53" cy="51" r="5" fill="#3BA8D8"/>
          <circle cx="75" cy="51" r="5" fill="#3BA8D8"/>
          <circle cx="53" cy="51" r="3" fill="#1A3A6C"/>
          <circle cx="75" cy="51" r="3" fill="#1A3A6C"/>
          <g className="pupils">
            <circle cx="51.5" cy="49" r="1.8" fill="#fff"/>
            <circle cx="73.5" cy="49" r="1.8" fill="#fff"/>
            <circle cx="55" cy="53" r="0.9" fill="#fff"/>
            <circle cx="77" cy="53" r="0.9" fill="#fff"/>
          </g>
          {/* Lashes */}
          <path d="M 45.5 44 Q 53 41 60.5 44" fill="none" stroke="#1A3A6C" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M 67.5 44 Q 75 41 82.5 44" fill="none" stroke="#1A3A6C" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="46" y1="44" x2="44" y2="41" stroke="#1A3A6C" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="60" y1="44" x2="62" y2="41" stroke="#1A3A6C" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="68" y1="44" x2="66" y2="41" stroke="#1A3A6C" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="82" y1="44" x2="84" y2="41" stroke="#1A3A6C" strokeWidth="1.3" strokeLinecap="round"/>
        </g>

        {/* Eyes closed */}
        <g className="eye-closed">
          <path d="M 45.5 50 Q 53 57 60.5 50" fill="none" stroke="#1A3A6C" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M 67.5 50 Q 75 57 82.5 50" fill="none" stroke="#1A3A6C" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M 45.5 50 Q 53 53 60.5 50" fill="#D0E8F8" opacity="0.35"/>
          <path d="M 67.5 50 Q 75 53 82.5 50" fill="#D0E8F8" opacity="0.35"/>
        </g>

        {/* Eyes squint (mad) */}
        <g className="eye-squint">
          <path d="M 45.5 51 Q 53 47 60.5 51" fill="none" stroke="#1A3A6C" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 67.5 51 Q 75 47 82.5 51" fill="none" stroke="#1A3A6C" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* Tiny cute nose */}
        <ellipse cx="64" cy="58" rx="2" ry="1.5" fill="#E8A090"/>

        {/* Blush */}
        <g className="blush">
          <ellipse cx="44" cy="57" rx="6.5" ry="3.5" fill="#FFB0CC" opacity="0.5"/>
          <ellipse cx="84" cy="57" rx="6.5" ry="3.5" fill="#FFB0CC" opacity="0.5"/>
        </g>

        {/* Mouth neutral */}
        <path className="mouth-neutral" d="M 58 63 Q 64 67 70 63" fill="none" stroke="#D4706A" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Mouth happy */}
        <path className="mouth-happy" d="M 55 62 Q 64 72 73 62" fill="none" stroke="#D4706A" strokeWidth="2" strokeLinecap="round"/>
        {/* Mouth worried */}
        <path className="mouth-worried" d="M 57 66 Q 64 62 71 66" fill="none" stroke="#D4706A" strokeWidth="2" strokeLinecap="round"/>

        {/* Tongue */}
        <g className="tongue">
          <ellipse cx="64" cy="69" rx="4" ry="3.5" fill="#FF8AA0"/>
        </g>
      </g>
    </g>

    {/* Magic wand effect (proud) */}
    <g className="fx-wand">
      <line x1="90" y1="74" x2="112" y2="52" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      <polygon points="112,44 114,50 120,50 115,54 117,60 112,56 107,60 109,54 104,50 110,50"
        fill="#F5C518" stroke="#C9A84C" strokeWidth="0.8"/>
      <circle cx="112" cy="52" r="5" fill="#FFE066" opacity="0.4"/>
    </g>

    {/* Effects */}
    <g className="fx-zzz">
      <text x="90" y="28" fill="#B8D8F8" fontWeight="bold" fontSize="14" fontFamily="sans-serif">Z</text>
      <text x="100" y="14" fill="#B8D8F8" fontWeight="bold" fontSize="10" fontFamily="sans-serif">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 34 22 Q 30 32 34 36 Q 38 32 34 22 Z" fill="#87CEFA" opacity="0.8"/>
    </g>
    <g className="fx-hearts">
      <text x="14" y="22" fontSize="14" fill="#FF69B4">♥</text>
      <text x="102" y="16" fontSize="10" fill="#FF69B4">♥</text>
    </g>
    <g className="fx-alert">
      <text x="84" y="14" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#FF6B6B">!</text>
    </g>
    <g className="fx-stars">
      <text x="14" y="16" fontSize="13" fill="#FFD700">✦</text>
      <text x="102" y="24" fontSize="9" fill="#FFD700">✦</text>
      <text x="90" y="10" fontSize="13" fill="#FFD700">✦</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   BEE-ATRICE (BEE NURSE) SVG
   ═══════════════════════════════════════════════ */
const BeeSvg = () => (
  <svg viewBox="0 0 128 128" overflow="visible">

    {/* Wings — rendered behind body */}
    <g className="wing-l">
      <ellipse cx="38" cy="46" rx="22" ry="13"
        fill="#C8E8FF" stroke="#88BBDD" strokeWidth="1.5" opacity="0.82"/>
      <path d="M 44 46 Q 30 40 18 44" fill="none" stroke="#88BBDD" strokeWidth="0.8" opacity="0.6"/>
      <path d="M 44 48 Q 28 52 18 50" fill="none" stroke="#88BBDD" strokeWidth="0.8" opacity="0.5"/>
    </g>
    <g className="wing-r">
      <ellipse cx="90" cy="46" rx="22" ry="13"
        fill="#C8E8FF" stroke="#88BBDD" strokeWidth="1.5" opacity="0.82"/>
      <path d="M 84 46 Q 98 40 110 44" fill="none" stroke="#88BBDD" strokeWidth="0.8" opacity="0.6"/>
      <path d="M 84 48 Q 100 52 110 50" fill="none" stroke="#88BBDD" strokeWidth="0.8" opacity="0.5"/>
    </g>

    {/* Stinger */}
    <g className="stinger">
      <path d="M 60 112 L 64 124 L 68 112 Z"
        fill="#F5C518" stroke="#B07A00" strokeWidth="1.2" strokeLinejoin="round"/>
    </g>

    {/* Left leg */}
    <g className="left-leg">
      <line x1="46" y1="96" x2="36" y2="112" stroke="#1A1A00" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="36" y1="112" x2="28" y2="110" stroke="#1A1A00" strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Right leg */}
    <g className="right-leg">
      <line x1="82" y1="96" x2="92" y2="112" stroke="#1A1A00" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="92" y1="112" x2="100" y2="110" stroke="#1A1A00" strokeWidth="2" strokeLinecap="round"/>
    </g>

    {/* Left arm */}
    <g className="left-arm">
      <line x1="44" y1="76" x2="28" y2="88" stroke="#1A1A00" strokeWidth="3" strokeLinecap="round"/>
      {/* Little hand */}
      <circle cx="26" cy="90" r="4.5" fill="#F5C518" stroke="#B07A00" strokeWidth="1.5"/>
    </g>
    {/* Right arm — holds syringe */}
    <g className="right-arm">
      <line x1="84" y1="76" x2="100" y2="88" stroke="#1A1A00" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="102" cy="90" r="4.5" fill="#F5C518" stroke="#B07A00" strokeWidth="1.5"/>
    </g>

    {/* Body */}
    <g className="body-group">
      {/* Abdomen stripes */}
      <ellipse cx="64" cy="90" rx="22" ry="24" fill="#F5C518" stroke="#B07A00" strokeWidth="2.2"/>
      <rect x="42" y="80" width="44" height="7" rx="2" fill="#1A1A00" opacity="0.75"/>
      <rect x="42" y="92" width="44" height="7" rx="2" fill="#1A1A00" opacity="0.75"/>
      <rect x="42" y="104" width="44" height="5" rx="2" fill="#1A1A00" opacity="0.6"/>
      {/* Belly shimmer */}
      <path d="M 50 86 Q 64 82 78 86" fill="none" stroke="#FFE880" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>

      {/* Nurse uniform chest — white bib */}
      <path d="M 50 62 Q 44 70 44 78 L 84 78 Q 84 70 78 62 Z"
        fill="#F0F0F0" stroke="#CCC" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Red cross on bib */}
      <rect x="61" y="65" width="6" height="14" rx="1.5" fill="#E82020"/>
      <rect x="57" y="69" width="14" height="6" rx="1.5" fill="#E82020"/>
      {/* Collar */}
      <path d="M 54 62 L 64 68 L 74 62" fill="none" stroke="#DDD" strokeWidth="2" strokeLinecap="round"/>
    </g>

    {/* Head group */}
    <g className="head-group">
      {/* Antennae */}
      <g className="antenna">
        <path d="M 52 34 Q 46 18 42 10" fill="none" stroke="#1A1A00" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="42" cy="9" r="4" fill="#F5C518" stroke="#B07A00" strokeWidth="1.5"/>
        <circle cx="41" cy="8" r="1.4" fill="#FFE880"/>
        <path d="M 76 34 Q 82 18 86 10" fill="none" stroke="#1A1A00" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="86" cy="9" r="4" fill="#F5C518" stroke="#B07A00" strokeWidth="1.5"/>
        <circle cx="85" cy="8" r="1.4" fill="#FFE880"/>
      </g>

      {/* Head */}
      <ellipse cx="64" cy="46" rx="24" ry="22" fill="#F5C518" stroke="#B07A00" strokeWidth="2.2"/>
      {/* Head stripes */}
      <path d="M 40 46 Q 40 40 46 37 Q 40 46 40 52 Z" fill="#1A1A00" opacity="0.18"/>
      <path d="M 88 46 Q 88 40 82 37 Q 88 46 88 52 Z" fill="#1A1A00" opacity="0.18"/>

      {/* Nurse cap */}
      <path d="M 42 36 Q 42 24 64 22 Q 86 24 86 36 Q 75 32 64 32 Q 53 32 42 36 Z"
        fill="#F0F0F0" stroke="#CCC" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Red cross on cap */}
      <rect x="61.5" y="24" width="5" height="10" rx="1" fill="#E82020"/>
      <rect x="58" y="27" width="12" height="5" rx="1" fill="#E82020"/>
      {/* Cap band */}
      <path d="M 42 36 Q 64 38 86 36" fill="none" stroke="#DDD" strokeWidth="2" strokeLinecap="round"/>

      {/* Face */}
      <g className="face">
        {/* Eyes open */}
        <g className="eye-open">
          <ellipse cx="52" cy="46" rx="6.5" ry="7" fill="#fff" stroke="#B07A00" strokeWidth="1"/>
          <ellipse cx="76" cy="46" rx="6.5" ry="7" fill="#fff" stroke="#B07A00" strokeWidth="1"/>
          {/* Irises — warm amber */}
          <circle cx="52" cy="47" r="4.5" fill="#8B4513"/>
          <circle cx="76" cy="47" r="4.5" fill="#8B4513"/>
          <circle cx="52" cy="47" r="2.8" fill="#3A1800"/>
          <circle cx="76" cy="47" r="2.8" fill="#3A1800"/>
          <g className="pupils">
            <circle cx="51" cy="45.5" r="1.4" fill="#fff"/>
            <circle cx="75" cy="45.5" r="1.4" fill="#fff"/>
          </g>
          {/* Lashes — cute nurse energy */}
          <path d="M 45.5 40 Q 52 37 58.5 40" fill="none" stroke="#3A1800" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M 69.5 40 Q 76 37 82.5 40" fill="none" stroke="#3A1800" strokeWidth="1.6" strokeLinecap="round"/>
        </g>

        {/* Eyes closed */}
        <g className="eye-closed">
          <path d="M 45.5 46 Q 52 53 58.5 46" fill="none" stroke="#3A1800" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M 69.5 46 Q 76 53 82.5 46" fill="none" stroke="#3A1800" strokeWidth="2.2" strokeLinecap="round"/>
        </g>

        {/* Eyes squint (mad) */}
        <g className="eye-squint">
          <path d="M 45.5 47 Q 52 43 58.5 47" fill="none" stroke="#3A1800" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 69.5 47 Q 76 43 82.5 47" fill="none" stroke="#3A1800" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* Tiny nose */}
        <circle cx="64" cy="54" r="1.8" fill="#D49060" opacity="0.7"/>

        {/* Blush */}
        <g className="blush">
          <ellipse cx="43" cy="54" rx="6" ry="3" fill="#FFB070" opacity="0.45"/>
          <ellipse cx="85" cy="54" rx="6" ry="3" fill="#FFB070" opacity="0.45"/>
        </g>

        {/* Mouth neutral — professional smile */}
        <path className="mouth-neutral" d="M 58 59 Q 64 63 70 59" fill="none" stroke="#8B4513" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Mouth happy */}
        <path className="mouth-happy" d="M 55 58 Q 64 68 73 58" fill="none" stroke="#8B4513" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Mouth worried */}
        <path className="mouth-worried" d="M 57 62 Q 64 58 71 62" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>

        {/* Tongue */}
        <g className="tongue">
          <ellipse cx="64" cy="65" rx="4" ry="3.5" fill="#E86B6B"/>
        </g>
      </g>
    </g>

    {/* Syringe effect (proud / curious) */}
    <g className="fx-syringe">
      {/* barrel */}
      <rect x="96" y="52" width="22" height="7" rx="3" fill="#E0F0FF" stroke="#88BBDD" strokeWidth="1.5"/>
      {/* plunger handle */}
      <line x1="116" y1="50" x2="116" y2="61" stroke="#88BBDD" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="113" y="49" width="6" height="3" rx="1.5" fill="#88BBDD"/>
      {/* liquid fill */}
      <rect x="97" y="53" width="12" height="5" rx="2" fill="#80DEEA" opacity="0.7"/>
      {/* needle */}
      <line x1="96" y1="55.5" x2="88" y2="55.5" stroke="#AAA" strokeWidth="1.8" strokeLinecap="round"/>
      {/* droplet */}
      <path d="M 86 54 Q 84 55.5 86 57 Q 88 55.5 86 54 Z" fill="#80DEEA" opacity="0.85"/>
    </g>

    {/* Effects */}
    <g className="fx-zzz">
      <text x="90" y="28" fill="#BBDDFF" fontWeight="bold" fontSize="14" fontFamily="sans-serif">Z</text>
      <text x="100" y="14" fill="#BBDDFF" fontWeight="bold" fontSize="10" fontFamily="sans-serif">z</text>
    </g>
    <g className="fx-sweat">
      <path d="M 32 22 Q 28 32 32 36 Q 36 32 32 22 Z" fill="#87CEFA" opacity="0.85"/>
    </g>
    <g className="fx-hearts">
      <text x="14" y="24" fontSize="14" fill="#FF8AAA">♥</text>
      <text x="102" y="18" fontSize="9"  fill="#FF8AAA">♥</text>
    </g>
    <g className="fx-alert">
      <text x="84" y="14" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#FF5252">!</text>
    </g>
    <g className="fx-stars">
      <text x="14" y="18" fontSize="12" fill="#F5C518">✦</text>
      <text x="102" y="26" fontSize="8"  fill="#F5C518">✦</text>
      <text x="90"  y="10" fontSize="12" fill="#F5C518">✦</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Instrument+Serif&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #0e0e14;
  color: #e0e0e0;
  font-family: 'DM Sans', sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(78,60,130,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(40,100,120,0.1) 0%, transparent 50%),
    #0e0e14;
}

h1 {
  font-family: 'Instrument Serif', serif;
  font-size: 42px;
  font-weight: 400;
  color: #f0ece4;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #777;
  font-size: 14px;
  margin-bottom: 36px;
  letter-spacing: 0.5px;
}

.pets-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 32px;
}

.pet-card {
  background: linear-gradient(145deg, #18181f 0%, #13131a 100%);
  border: 1px solid #2a2a35;
  border-radius: 24px;
  padding: 24px;
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: border-color 0.3s;
  position: relative;
  overflow: hidden;
}
.pet-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent, #4FC3F7), transparent);
  opacity: 0.5;
}
.pet-card:hover { border-color: #3a3a48; }

.pet-card h2 {
  font-family: 'Instrument Serif', serif;
  font-size: 26px;
  font-weight: 400;
  color: #f0ece4;
  margin-bottom: 4px;
}
.pet-card .pet-label {
  font-size: 11px;
  color: #666;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.pet-stage {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  margin-bottom: 16px;
}
.pet-stage:active { cursor: grabbing; }

.mood-label {
  font-size: 12px;
  color: #999;
  background: #1a1a22;
  border: 1px solid #2a2a35;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
  letter-spacing: 0.3px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  max-width: 900px;
  margin-bottom: 16px;
}
.controls-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.controls-label {
  font-size: 10px;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.controls-row {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}

button.mood-btn {
  background: #1a1a22;
  border: 1px solid #2a2a35;
  color: #bbb;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}
button.mood-btn:hover { background: #222230; border-color: #4a4a58; color: #fff; }
button.mood-btn.active { background: #2a2a40; border-color: #6a6a88; color: #fff; }

/* ═══════════════════════════════════════════════
   SHARED BASE STYLES
   ═══════════════════════════════════════════════ */
.pet-container svg { width: 100%; height: 100%; overflow: visible; }
.pet-container { width: 140px; height: 140px; position: relative; transition: transform 0.15s; }
.pet-container:hover { transform: scale(1.06); }

.pet-container .eye-closed,
.pet-container .eye-squint,
.pet-container .eye-heart,
.pet-container .mouth-happy,
.pet-container .mouth-worried,
.pet-container .tongue,
.pet-container .blush,
.pet-container .fx-zzz,
.pet-container .fx-sweat,
.pet-container .fx-hearts,
.pet-container .fx-alert,
.pet-container .fx-sparks,
.pet-container .fx-stars,
.pet-container .fx-banana,
.pet-container .fx-briefcase,
.pet-container .fx-wand,
.pet-container .fx-syringe { opacity: 0; transition: opacity 0.3s; }

.pet-container .mouth-neutral { opacity: 1; }
.pet-container .mouth-happy { opacity: 0; }
.pet-container .eye-open { animation: blink 5s infinite; }
.pet-container .pupils { animation: dart 6s infinite; }

/* ═══════════════════════════════════════════════
   PINCH ANIMATIONS
   ═══════════════════════════════════════════════ */
.pinch-container .body-group { transform-origin: 64px 100px; }
.pinch-container .left-arm { transform-origin: 30px 70px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.pinch-container .right-arm { transform-origin: 98px 70px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.pinch-container .tail { transform-origin: 64px 100px; }

.pinch-container.state-idle .body-group { animation: breathe 3s ease-in-out infinite; }
.pinch-container.state-idle .left-arm { animation: bobLeft 3s ease-in-out infinite; }
.pinch-container.state-idle .right-arm { animation: bobRight 3s ease-in-out infinite 0.5s; }

.pinch-container.state-happy { animation: bounce 0.8s ease-in-out infinite; }
.pinch-container.state-happy .left-arm { transform: translateY(-15px) rotate(-30deg); }
.pinch-container.state-happy .right-arm { transform: translateY(-15px) rotate(30deg); }
.pinch-container.state-happy .mouth-neutral { opacity: 0; }
.pinch-container.state-happy .mouth-happy { opacity: 1; }
.pinch-container.state-happy .pupils { transform: scale(1.2); }
.pinch-container.state-happy .fx-hearts { opacity: 1; animation: floatUp 1.5s linear infinite; }

.pinch-container.state-sleeping .body-group { animation: breathe 5s ease-in-out infinite; }
.pinch-container.state-sleeping .left-arm { transform: translateY(10px) rotate(10deg); }
.pinch-container.state-sleeping .right-arm { transform: translateY(10px) rotate(-10deg); }
.pinch-container.state-sleeping .eye-open { opacity: 0; animation: none; }
.pinch-container.state-sleeping .eye-closed { opacity: 1; }
.pinch-container.state-sleeping .pupils { opacity: 0; }
.pinch-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }

.pinch-container.state-curious .right-arm { animation: snip 0.3s ease-in-out infinite; }
.pinch-container.state-curious .pupils { animation: none; transform: translateX(3px); }

.pinch-container.state-worried { animation: shiver 0.2s infinite; }
.pinch-container.state-worried .body-group { transform: scale(0.9) translateY(10px); }
.pinch-container.state-worried .left-arm { transform: translateX(10px) rotate(40deg); }
.pinch-container.state-worried .right-arm { transform: translateX(-10px) rotate(-40deg); }
.pinch-container.state-worried .mouth-neutral { opacity: 0; }
.pinch-container.state-worried .mouth-worried { opacity: 1; }
.pinch-container.state-worried .fx-sweat { opacity: 1; animation: drip 1.5s infinite; }

.pinch-container.state-walking .body-group { animation: waddle 0.25s ease-in-out infinite; }
.pinch-container.state-walking .left-arm { animation: walkClawL 0.25s ease-in-out infinite; }
.pinch-container.state-walking .right-arm { animation: walkClawR 0.25s ease-in-out infinite; }
.pinch-container.state-walking .pupils { animation: none; transform: translateX(2px); }

.pinch-container.state-proud .body-group { transform: scaleY(1.1) scaleX(1.05); }
.pinch-container.state-proud .left-arm { transform: translate(-10px, 10px) rotate(-30deg); }
.pinch-container.state-proud .right-arm { transform: translate(10px, 10px) rotate(30deg); }
.pinch-container.state-proud .mouth-neutral { opacity: 0; }
.pinch-container.state-proud .mouth-happy { opacity: 1; }
.pinch-container.state-proud .fx-stars { opacity: 1; animation: sparkle 1s ease-in-out infinite; }

.pinch-container.state-spin .body-group { animation: spin360 0.8s ease-in-out; }
.pinch-container.state-spin .left-arm { transform: translateY(-30px); }
.pinch-container.state-spin .right-arm { transform: translateY(-30px); }

.pinch-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.pinch-container.state-startle .pupils { transform: scale(0.5); animation: none; }
.pinch-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

.pinch-container.state-mad .left-arm { transform: translate(18px, 15px) rotate(55deg); }
.pinch-container.state-mad .right-arm { transform: translate(-18px, 15px) rotate(-55deg); }
.pinch-container.state-mad .eye-open { opacity: 0; animation: none; }
.pinch-container.state-mad .eye-squint { opacity: 1; }
.pinch-container.state-mad .mouth-neutral { opacity: 0; }
.pinch-container.state-mad .mouth-worried { opacity: 1; }
.pinch-container.state-mad .body-group { animation: huff 1s infinite; }

@keyframes bobLeft { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(-8deg); } }
@keyframes bobRight { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(8deg); } }
@keyframes snip { 0%,100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(-25deg) scale(1.1); } }
@keyframes waddle { 0%,100% { transform: rotate(-4deg) translateY(0); } 50% { transform: rotate(4deg) translateY(-3px); } }
@keyframes walkClawL { 0%,100% { transform: rotate(-15deg) translateY(0); } 50% { transform: rotate(10deg) translateY(-8px); } }
@keyframes walkClawR { 0%,100% { transform: rotate(10deg) translateY(-8px); } 50% { transform: rotate(-15deg) translateY(0); } }

.pinch-container.idle-stretch .left-arm { animation: stretchPinchL 2s ease-in-out; }
.pinch-container.idle-stretch .right-arm { animation: stretchPinchR 2s ease-in-out; }
@keyframes stretchPinchL { 0%,100% { transform: rotate(0); } 50% { transform: translateY(-20px) rotate(-35deg); } }
@keyframes stretchPinchR { 0%,100% { transform: rotate(0); } 50% { transform: translateY(-20px) rotate(35deg); } }
.pinch-container.idle-snip_claws .right-arm { animation: snipSnip 1.5s ease-in-out; }
@keyframes snipSnip { 0%,100% { transform: rotate(0deg); } 25%,75% { transform: rotate(-25deg) scale(1.1); } 50% { transform: rotate(0deg); } }

/* ═══════════════════════════════════════════════
   SHIBA ANIMATIONS
   ═══════════════════════════════════════════════ */
.shiba-container .body-group { transform-origin: 64px 88px; }
.shiba-container .head-group { transform-origin: 64px 52px; transition: all 0.3s; }
.shiba-container .tail { transform-origin: 50px 108px; }
.shiba-container .left-ear { transform-origin: 42px 36px; transition: all 0.3s; }
.shiba-container .right-ear { transform-origin: 86px 36px; transition: all 0.3s; }
.shiba-container .left-leg { transform-origin: 49px 95px; }
.shiba-container .right-leg { transform-origin: 79px 95px; }

.shiba-container.state-idle .body-group { animation: breathe 3s ease-in-out infinite; }
.shiba-container.state-idle .tail { animation: wagTailSlow 2s ease-in-out infinite; }
.shiba-container.state-idle .left-ear { animation: earTwitchL 4s ease-in-out infinite; }
.shiba-container.state-idle .right-ear { animation: earTwitchR 4s ease-in-out infinite 1s; }

.shiba-container.state-happy { animation: bounce 0.5s ease-in-out infinite; }
.shiba-container.state-happy .tail { animation: wagTailFast 0.3s ease-in-out infinite; }
.shiba-container.state-happy .mouth-neutral { opacity: 0; }
.shiba-container.state-happy .mouth-happy { opacity: 1; }
.shiba-container.state-happy .tongue { opacity: 1; animation: tongueBob 0.5s ease-in-out infinite; }
.shiba-container.state-happy .blush { opacity: 1; }
.shiba-container.state-happy .eye-open { opacity: 0; animation: none; }
.shiba-container.state-happy .eye-closed { opacity: 1; }
.shiba-container.state-happy .fx-hearts { opacity: 1; animation: floatUp 1.5s linear infinite; }

.shiba-container.state-sleeping .body-group { animation: breathe 5s ease-in-out infinite; }
.shiba-container.state-sleeping .head-group { transform: rotate(15deg) translateY(6px); }
.shiba-container.state-sleeping .eye-open { opacity: 0; animation: none; }
.shiba-container.state-sleeping .eye-closed { opacity: 1; }
.shiba-container.state-sleeping .tail { animation: none; transform: rotate(-10deg); }
.shiba-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }
.shiba-container.state-sleeping .left-ear { transform: rotate(15deg); }
.shiba-container.state-sleeping .right-ear { transform: rotate(-15deg); }

.shiba-container.state-curious .head-group { transform: rotate(-12deg); }
.shiba-container.state-curious .right-ear { transform: rotate(-10deg) translateY(-3px); animation: earPerk 0.6s ease-in-out infinite; }
.shiba-container.state-curious .pupils { animation: none; transform: translateX(3px); }
.shiba-container.state-curious .tail { animation: wagTailSlow 1.5s ease-in-out infinite; }

.shiba-container.state-worried { animation: shiver 0.15s infinite; }
.shiba-container.state-worried .mouth-neutral { opacity: 0; }
.shiba-container.state-worried .mouth-worried { opacity: 1; }
.shiba-container.state-worried .left-ear { transform: rotate(20deg); }
.shiba-container.state-worried .right-ear { transform: rotate(-20deg); }
.shiba-container.state-worried .tail { animation: none; transform: rotate(5deg) translateY(5px); }
.shiba-container.state-worried .fx-sweat { opacity: 1; animation: drip 1.5s infinite; }
.shiba-container.state-worried .body-group { transform: scale(0.92); }
.shiba-container.state-worried .pupils { transform: scale(0.7); }

.shiba-container.state-walking .body-group { animation: trot 0.3s ease-in-out infinite; }
.shiba-container.state-walking .left-leg { animation: legWalkL 0.3s ease-in-out infinite; }
.shiba-container.state-walking .right-leg { animation: legWalkR 0.3s ease-in-out infinite; }
.shiba-container.state-walking .tail { animation: wagTailFast 0.25s ease-in-out infinite; }
.shiba-container.state-walking .head-group { animation: headBobWalk 0.3s ease-in-out infinite; }
.shiba-container.state-walking .left-ear { animation: earBounce 0.3s ease-in-out infinite; }
.shiba-container.state-walking .right-ear { animation: earBounce 0.3s ease-in-out infinite 0.15s; }

.shiba-container.state-proud .head-group { transform: translateY(-6px); }
.shiba-container.state-proud .body-group { transform: scaleY(1.08) scaleX(1.04); }
.shiba-container.state-proud .eye-open { opacity: 0; animation: none; }
.shiba-container.state-proud .eye-closed { opacity: 1; }
.shiba-container.state-proud .mouth-neutral { opacity: 0; }
.shiba-container.state-proud .mouth-happy { opacity: 1; }
.shiba-container.state-proud .tail { animation: wagTailFast 0.4s ease-in-out infinite; transform: rotate(-20deg) translateY(-5px); }
.shiba-container.state-proud .fx-stars { opacity: 1; animation: sparkle 1s ease-in-out infinite; }

.shiba-container.state-spin { animation: spin360 0.7s ease-in-out; }
.shiba-container.state-spin .tail { animation: wagTailFast 0.2s ease-in-out infinite; }

.shiba-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.shiba-container.state-startle .left-ear { transform: rotate(-15deg) translateY(-5px); }
.shiba-container.state-startle .right-ear { transform: rotate(15deg) translateY(-5px); }
.shiba-container.state-startle .pupils { transform: scale(0.5); animation: none; }
.shiba-container.state-startle .tail { transform: rotate(30deg) translateY(-8px); animation: none; }
.shiba-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

.shiba-container.state-mad .eye-open { opacity: 0; animation: none; }
.shiba-container.state-mad .eye-squint { opacity: 1; }
.shiba-container.state-mad .mouth-neutral { opacity: 0; }
.shiba-container.state-mad .mouth-worried { opacity: 1; }
.shiba-container.state-mad .left-ear { transform: rotate(25deg); }
.shiba-container.state-mad .right-ear { transform: rotate(-25deg); }
.shiba-container.state-mad .tail { animation: none; transform: rotate(0deg); }
.shiba-container.state-mad .body-group { animation: huff 1s infinite; }

/* ═══════════════════════════════════════════════
   ROBOT ANIMATIONS
   ═══════════════════════════════════════════════ */
.robot-container .body-group { transform-origin: 64px 79px; }
.robot-container .head-group { transform-origin: 64px 41px; transition: all 0.3s; }
.robot-container .left-arm { transform-origin: 19px 58px; transition: all 0.3s; }
.robot-container .right-arm { transform-origin: 109px 58px; transition: all 0.3s; }
.robot-container .antenna { transform-origin: 64px 22px; }
.robot-container .left-leg { transform-origin: 49px 100px; }
.robot-container .right-leg { transform-origin: 79px 100px; }

.robot-container.state-idle .body-group { animation: breatheRobot 3s ease-in-out infinite; }
.robot-container.state-idle .antenna { animation: antennaSway 3s ease-in-out infinite; }
.robot-container.state-idle .power-glow { animation: pulse 2s ease-in-out infinite; }
.robot-container.state-idle .antenna-glow { animation: pulse 1.5s ease-in-out infinite; }
.robot-container.state-idle .chest-lights { animation: blinkLights 2s step-end infinite; }

.robot-container.state-happy { animation: bounce 0.6s ease-in-out infinite; }
.robot-container.state-happy .left-arm { transform: translateY(-20px) rotate(-35deg); }
.robot-container.state-happy .right-arm { transform: translateY(-20px) rotate(35deg); }
.robot-container.state-happy .mouth-neutral { opacity: 0; }
.robot-container.state-happy .mouth-happy { opacity: 1; }
.robot-container.state-happy .antenna-ball { fill: #66BB6A; }
.robot-container.state-happy .antenna-glow { fill: #A5D6A7; animation: pulse 0.5s ease-in-out infinite; }
.robot-container.state-happy .power-glow { fill: #66BB6A; animation: pulse 0.5s ease-in-out infinite; }
.robot-container.state-happy .fx-sparks { opacity: 1; animation: sparkle 0.8s ease-in-out infinite; }

.robot-container.state-sleeping .body-group { animation: breatheRobot 5s ease-in-out infinite; }
.robot-container.state-sleeping .head-group { transform: rotate(8deg) translateY(4px); }
.robot-container.state-sleeping .eye-open { opacity: 0; animation: none; }
.robot-container.state-sleeping .eye-closed { opacity: 1; }
.robot-container.state-sleeping .left-arm { transform: translateY(8px) rotate(8deg); }
.robot-container.state-sleeping .right-arm { transform: translateY(8px) rotate(-8deg); }
.robot-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }
.robot-container.state-sleeping .power-glow { animation: pulse 4s ease-in-out infinite; opacity: 0.4; }
.robot-container.state-sleeping .mouth-neutral { opacity: 0; }

.robot-container.state-curious .head-group { transform: rotate(-10deg); }
.robot-container.state-curious .antenna { animation: antennaPerk 0.6s ease-in-out infinite; }
.robot-container.state-curious .pupils { animation: none; transform: translateX(3px); }
.robot-container.state-curious .right-arm { transform: translateY(-10px) rotate(15deg); }
.robot-container.state-curious .antenna-glow { fill: #FDD835; animation: pulse 0.8s ease-in-out infinite; }

.robot-container.state-worried { animation: shiver 0.12s infinite; }
.robot-container.state-worried .mouth-neutral { opacity: 0; }
.robot-container.state-worried .mouth-worried { opacity: 1; }
.robot-container.state-worried .left-arm { transform: translateX(8px) rotate(30deg); }
.robot-container.state-worried .right-arm { transform: translateX(-8px) rotate(-30deg); }
.robot-container.state-worried .fx-sweat { opacity: 1; animation: drip 1.5s infinite; }
.robot-container.state-worried .power-glow { fill: #FF5252; animation: pulse 0.3s ease-in-out infinite; }

.robot-container.state-walking .body-group { animation: robotWalk 0.4s ease-in-out infinite; }
.robot-container.state-walking .left-leg { animation: legWalkL 0.4s ease-in-out infinite; }
.robot-container.state-walking .right-leg { animation: legWalkR 0.4s ease-in-out infinite; }
.robot-container.state-walking .left-arm { animation: armSwingL 0.4s ease-in-out infinite; }
.robot-container.state-walking .right-arm { animation: armSwingR 0.4s ease-in-out infinite; }
.robot-container.state-walking .head-group { animation: headBobWalk 0.4s ease-in-out infinite; }
.robot-container.state-walking .antenna { animation: antennaBounce 0.2s ease-in-out infinite; }

.robot-container.state-proud .body-group { transform: scaleY(1.08) scaleX(1.04); }
.robot-container.state-proud .head-group { transform: translateY(-5px); }
.robot-container.state-proud .left-arm { transform: translate(-8px, 8px) rotate(-25deg); }
.robot-container.state-proud .right-arm { transform: translate(8px, 8px) rotate(25deg); }
.robot-container.state-proud .mouth-neutral { opacity: 0; }
.robot-container.state-proud .mouth-happy { opacity: 1; }
.robot-container.state-proud .power-glow { fill: #AB47BC; animation: pulse 1s ease-in-out infinite; }
.robot-container.state-proud .fx-hearts { opacity: 1; animation: floatUp 1.8s linear infinite; }

.robot-container.state-spin { animation: spin360 0.8s ease-in-out; }
.robot-container.state-spin .left-arm { transform: translateY(-25px); }
.robot-container.state-spin .right-arm { transform: translateY(-25px); }
.robot-container.state-spin .fx-sparks { opacity: 1; animation: sparkle 0.4s ease-in-out infinite; }

.robot-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.robot-container.state-startle .antenna { animation: antennaAlert 0.3s ease-in-out infinite; }
.robot-container.state-startle .pupils { transform: scale(0.5); animation: none; }
.robot-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

.robot-container.state-mad .eye-open { opacity: 0; animation: none; }
.robot-container.state-mad .eye-squint { opacity: 1; }
.robot-container.state-mad .mouth-neutral { opacity: 0; }
.robot-container.state-mad .mouth-worried { opacity: 1; }
.robot-container.state-mad .left-arm { transform: translate(14px, 12px) rotate(45deg); }
.robot-container.state-mad .right-arm { transform: translate(-14px, 12px) rotate(-45deg); }
.robot-container.state-mad .body-group { animation: huff 0.8s infinite; }
.robot-container.state-mad .power-glow { fill: #FF5252; animation: pulse 0.3s ease-in-out infinite; }
.robot-container.state-mad .fx-sparks { opacity: 1; animation: sparkle 0.5s ease-in-out infinite; }

/* ═══════════════════════════════════════════════
   MONKEY ANIMATIONS
   ═══════════════════════════════════════════════ */
.monkey-container .body-group { transform-origin: 64px 82px; }
.monkey-container .head-group { transform-origin: 64px 42px; transition: all 0.3s; }
.monkey-container .left-arm { transform-origin: 26px 64px; transition: all 0.3s; }
.monkey-container .right-arm { transform-origin: 102px 64px; transition: all 0.3s; }
.monkey-container .tail { transform-origin: 48px 100px; transition: all 0.3s; }
.monkey-container .left-ear { transform-origin: 36px 32px; transition: all 0.3s; }
.monkey-container .right-ear { transform-origin: 92px 32px; transition: all 0.3s; }
.monkey-container .left-leg { transform-origin: 48px 96px; }
.monkey-container .right-leg { transform-origin: 78px 96px; }

.monkey-container.state-idle .body-group { animation: breathe 3s ease-in-out infinite; }
.monkey-container.state-idle .tail { animation: tailSwing 3s ease-in-out infinite; }
.monkey-container.state-idle .head-group { animation: monkeyHeadTilt 5s ease-in-out infinite; }
.monkey-container.state-idle .left-arm { animation: armDangle 3.5s ease-in-out infinite; }
.monkey-container.state-idle .right-arm { animation: armDangle 3.5s ease-in-out infinite 0.8s; }

.monkey-container.state-happy { animation: bounce 0.45s ease-in-out infinite; }
.monkey-container.state-happy .left-arm { animation: monkeyClap 0.35s ease-in-out infinite; }
.monkey-container.state-happy .right-arm { animation: monkeyClapR 0.35s ease-in-out infinite; }
.monkey-container.state-happy .tail { animation: tailWagFast 0.3s ease-in-out infinite; }
.monkey-container.state-happy .mouth-neutral { opacity: 0; }
.monkey-container.state-happy .mouth-happy { opacity: 1; }
.monkey-container.state-happy .tongue { opacity: 1; }
.monkey-container.state-happy .blush { opacity: 1; }
.monkey-container.state-happy .eye-open { opacity: 0; animation: none; }
.monkey-container.state-happy .eye-closed { opacity: 1; }
.monkey-container.state-happy .fx-banana { opacity: 1; animation: floatUp 1.8s linear infinite; }

.monkey-container.state-sleeping .body-group { animation: breathe 5s ease-in-out infinite; }
.monkey-container.state-sleeping .head-group { transform: rotate(12deg) translateY(8px); }
.monkey-container.state-sleeping .eye-open { opacity: 0; animation: none; }
.monkey-container.state-sleeping .eye-closed { opacity: 1; }
.monkey-container.state-sleeping .left-arm { transform: translateY(6px) rotate(10deg); }
.monkey-container.state-sleeping .right-arm { transform: translateY(6px) rotate(-10deg); }
.monkey-container.state-sleeping .tail { animation: none; transform: rotate(-5deg); }
.monkey-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }

.monkey-container.state-curious .head-group { transform: rotate(-14deg) translateY(-4px); }
.monkey-container.state-curious .right-arm { transform: translateY(-10px) rotate(20deg); }
.monkey-container.state-curious .pupils { animation: none; transform: translateX(3px); }
.monkey-container.state-curious .left-ear { animation: earPerk 0.6s ease-in-out infinite; }
.monkey-container.state-curious .tail { animation: tailSwing 1.5s ease-in-out infinite; }

.monkey-container.state-worried { animation: shiver 0.14s infinite; }
.monkey-container.state-worried .mouth-neutral { opacity: 0; }
.monkey-container.state-worried .mouth-worried { opacity: 1; }
.monkey-container.state-worried .left-arm { transform: translateX(10px) rotate(35deg); }
.monkey-container.state-worried .right-arm { transform: translateX(-10px) rotate(-35deg); }
.monkey-container.state-worried .tail { transform: rotate(10deg) translateY(5px); animation: none; }
.monkey-container.state-worried .fx-sweat { opacity: 1; animation: drip 1.5s infinite; }
.monkey-container.state-worried .body-group { transform: scale(0.93); }
.monkey-container.state-worried .pupils { transform: scale(0.6); }

.monkey-container.state-walking .body-group { animation: monkeyWalk 0.35s ease-in-out infinite; }
.monkey-container.state-walking .left-leg { animation: legWalkL 0.35s ease-in-out infinite; }
.monkey-container.state-walking .right-leg { animation: legWalkR 0.35s ease-in-out infinite; }
.monkey-container.state-walking .left-arm { animation: armSwingL 0.35s ease-in-out infinite; }
.monkey-container.state-walking .right-arm { animation: armSwingR 0.35s ease-in-out infinite; }
.monkey-container.state-walking .tail { animation: tailWalk 0.35s ease-in-out infinite; }
.monkey-container.state-walking .head-group { animation: headBobWalk 0.35s ease-in-out infinite; }

.monkey-container.state-proud .head-group { transform: translateY(-6px); }
.monkey-container.state-proud .body-group { transform: scaleY(1.1) scaleX(1.05); }
.monkey-container.state-proud .left-arm { transform: translate(-6px, 6px) rotate(-30deg); }
.monkey-container.state-proud .right-arm { transform: translate(6px, 6px) rotate(30deg); }
.monkey-container.state-proud .eye-open { opacity: 0; animation: none; }
.monkey-container.state-proud .eye-closed { opacity: 1; }
.monkey-container.state-proud .mouth-neutral { opacity: 0; }
.monkey-container.state-proud .mouth-happy { opacity: 1; }
.monkey-container.state-proud .fx-banana { opacity: 1; animation: sparkle 1.2s ease-in-out infinite; }
.monkey-container.state-proud .fx-stars { opacity: 1; animation: sparkle 1s ease-in-out infinite; }

.monkey-container.state-spin { animation: spin360 0.7s ease-in-out; }
.monkey-container.state-spin .tail { animation: tailWagFast 0.2s ease-in-out infinite; }
.monkey-container.state-spin .left-arm { transform: translateY(-20px); }
.monkey-container.state-spin .right-arm { transform: translateY(-20px); }

.monkey-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.monkey-container.state-startle .left-arm { transform: translateY(-18px) rotate(-50deg); }
.monkey-container.state-startle .right-arm { transform: translateY(-18px) rotate(50deg); }
.monkey-container.state-startle .pupils { transform: scale(0.5); animation: none; }
.monkey-container.state-startle .tail { transform: rotate(-30deg) translateY(-10px); animation: none; }
.monkey-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

.monkey-container.state-mad .eye-open { opacity: 0; animation: none; }
.monkey-container.state-mad .eye-squint { opacity: 1; }
.monkey-container.state-mad .mouth-neutral { opacity: 0; }
.monkey-container.state-mad .mouth-worried { opacity: 1; }
.monkey-container.state-mad .left-arm { transform: translate(12px, 10px) rotate(40deg); }
.monkey-container.state-mad .right-arm { transform: translate(-12px, 10px) rotate(-40deg); }
.monkey-container.state-mad .body-group { animation: huff 0.9s infinite; }
.monkey-container.state-mad .tail { animation: tailThump 0.5s ease-in-out infinite; }

@keyframes tailSwing { 0%,100% { transform: rotate(0deg); } 30% { transform: rotate(-15deg); } 70% { transform: rotate(10deg); } }
@keyframes tailWagFast { 0%,100% { transform: rotate(-18deg); } 50% { transform: rotate(18deg); } }
@keyframes tailWalk { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
@keyframes tailThump { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(15deg) translateY(4px); } }
@keyframes monkeyHeadTilt { 0%,100% { transform: rotate(0deg); } 30% { transform: rotate(-4deg); } 70% { transform: rotate(3deg); } }
@keyframes armDangle { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-6deg) translateY(-3px); } }
@keyframes monkeyClap { 0%,100% { transform: translateY(-22px) rotate(-45deg); } 50% { transform: translateY(-22px) rotate(-15deg); } }
@keyframes monkeyClapR { 0%,100% { transform: translateY(-22px) rotate(45deg); } 50% { transform: translateY(-22px) rotate(15deg); } }
@keyframes monkeyWalk { 0%,100% { transform: rotate(-3deg) translateY(0); } 50% { transform: rotate(3deg) translateY(-4px); } }

.monkey-container.idle-stretch .left-arm { animation: stretchArmL 2s ease-in-out; }
.monkey-container.idle-stretch .right-arm { animation: stretchArmR 2s ease-in-out; }
.monkey-container.idle-stretch .tail { animation: tailStretch 2s ease-in-out; }
@keyframes tailStretch { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-25deg) translateY(-5px); } }

/* ═══════════════════════════════════════════════
   GERALD (PENGUIN CONSULTANT) ANIMATIONS
   ═══════════════════════════════════════════════ */
.consul-container .body-group { transform-origin: 64px 85px; }
.consul-container .head-group { transform-origin: 64px 48px; transition: all 0.3s; }
.consul-container .left-arm  { transform-origin: 22px 70px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.consul-container .right-arm { transform-origin: 106px 70px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.consul-container .left-leg  { transform-origin: 50px 113px; }
.consul-container .right-leg { transform-origin: 78px 113px; }

/* IDLE — distinguished sway */
.consul-container.state-idle .body-group { animation: breathe 3.5s ease-in-out infinite; }
.consul-container.state-idle .left-arm  { animation: flipperBobL 3.5s ease-in-out infinite; }
.consul-container.state-idle .right-arm { animation: flipperBobR 3.5s ease-in-out infinite 0.7s; }
.consul-container.state-idle .head-group { animation: consulNod 5s ease-in-out infinite; }

/* HAPPY — bouncy penguin with flippers up */
.consul-container.state-happy { animation: bounce 0.55s ease-in-out infinite; }
.consul-container.state-happy .left-arm  { transform: translateY(-16px) rotate(-42deg); }
.consul-container.state-happy .right-arm { transform: translateY(-16px) rotate(42deg); }
.consul-container.state-happy .mouth-neutral { opacity: 0; }
.consul-container.state-happy .mouth-happy { opacity: 1; }
.consul-container.state-happy .blush { opacity: 1; }
.consul-container.state-happy .fx-hearts { opacity: 1; animation: floatUp 1.4s linear infinite; }

/* SLEEPING — head droops, briefcase falls */
.consul-container.state-sleeping .body-group { animation: breathe 5s ease-in-out infinite; }
.consul-container.state-sleeping .head-group { transform: rotate(12deg) translateY(8px); }
.consul-container.state-sleeping .eye-open { opacity: 0; animation: none; }
.consul-container.state-sleeping .eye-closed { opacity: 1; }
.consul-container.state-sleeping .left-arm  { transform: translateY(8px) rotate(10deg); }
.consul-container.state-sleeping .right-arm { transform: translateY(8px) rotate(-10deg); }
.consul-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }

/* CURIOUS — classic head tilt, flipper raised */
.consul-container.state-curious .head-group { transform: rotate(-14deg) translateY(-2px); }
.consul-container.state-curious .right-arm  { transform: translateY(-10px) rotate(20deg); }
.consul-container.state-curious .pupils { animation: none; transform: translateX(4px); }

/* WORRIED — shiver, sweat drop */
.consul-container.state-worried { animation: shiver 0.13s infinite; }
.consul-container.state-worried .mouth-neutral { opacity: 0; }
.consul-container.state-worried .mouth-worried { opacity: 1; }
.consul-container.state-worried .left-arm  { transform: translateX(9px) rotate(32deg); }
.consul-container.state-worried .right-arm { transform: translateX(-9px) rotate(-32deg); }
.consul-container.state-worried .fx-sweat { opacity: 1; animation: drip 1.5s infinite; }
.consul-container.state-worried .body-group { transform: scale(0.93); }
.consul-container.state-worried .pupils { transform: scale(0.65); }

/* WALKING — penguin waddle */
.consul-container.state-walking .body-group { animation: penguinWaddle 0.38s ease-in-out infinite; }
.consul-container.state-walking .left-leg  { animation: legWalkL 0.38s ease-in-out infinite; }
.consul-container.state-walking .right-leg { animation: legWalkR 0.38s ease-in-out infinite; }
.consul-container.state-walking .left-arm  { animation: flipperWalkL 0.38s ease-in-out infinite; }
.consul-container.state-walking .right-arm { animation: flipperWalkR 0.38s ease-in-out infinite; }
.consul-container.state-walking .head-group { animation: headBobWalk 0.38s ease-in-out infinite; }

/* PROUD — chest puffed, briefcase displayed */
.consul-container.state-proud .head-group  { transform: translateY(-7px); }
.consul-container.state-proud .body-group  { transform: scaleY(1.09) scaleX(1.05); }
.consul-container.state-proud .left-arm    { transform: translate(-7px, 7px) rotate(-28deg); }
.consul-container.state-proud .right-arm   { transform: translate(7px, 7px) rotate(28deg); }
.consul-container.state-proud .mouth-neutral { opacity: 0; }
.consul-container.state-proud .mouth-happy  { opacity: 1; }
.consul-container.state-proud .eye-open  { opacity: 0; animation: none; }
.consul-container.state-proud .eye-closed { opacity: 1; }
.consul-container.state-proud .fx-briefcase { opacity: 1; animation: briefcaseFloat 2s ease-in-out infinite; }
.consul-container.state-proud .fx-stars { opacity: 1; animation: sparkle 1s ease-in-out infinite; }

/* SPIN */
.consul-container.state-spin { animation: spin360 0.75s ease-in-out; }
.consul-container.state-spin .left-arm  { transform: translateY(-22px); }
.consul-container.state-spin .right-arm { transform: translateY(-22px); }

/* STARTLE — jump, monocle pops out vibe */
.consul-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.consul-container.state-startle .left-arm  { transform: translateY(-16px) rotate(-50deg); }
.consul-container.state-startle .right-arm { transform: translateY(-16px) rotate(50deg); }
.consul-container.state-startle .pupils { transform: scale(0.45); animation: none; }
.consul-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

/* MAD — squint, flippers tensed */
.consul-container.state-mad .eye-open  { opacity: 0; animation: none; }
.consul-container.state-mad .eye-squint { opacity: 1; }
.consul-container.state-mad .mouth-neutral { opacity: 0; }
.consul-container.state-mad .mouth-worried { opacity: 1; }
.consul-container.state-mad .left-arm  { transform: translate(14px, 12px) rotate(42deg); }
.consul-container.state-mad .right-arm { transform: translate(-14px, 12px) rotate(-42deg); }
.consul-container.state-mad .body-group { animation: huff 0.85s infinite; }

/* Consul-specific idle behaviors */
.consul-container.idle-stretch .left-arm  { animation: stretchArmL 2s ease-in-out; }
.consul-container.idle-stretch .right-arm { animation: stretchArmR 2s ease-in-out; }

/* Consul keyframes */
@keyframes flipperBobL { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg) translateY(-4px); } }
@keyframes flipperBobR { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(14deg) translateY(-4px); } }
@keyframes consulNod   { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-2deg); } 75% { transform: rotate(1.5deg); } }
@keyframes penguinWaddle { 0%,100% { transform: rotate(-5deg) translateY(0); } 50% { transform: rotate(5deg) translateY(-3px); } }
@keyframes flipperWalkL { 0%,100% { transform: rotate(10deg); } 50% { transform: rotate(-14deg) translateY(-5px); } }
@keyframes flipperWalkR { 0%,100% { transform: rotate(-14deg) translateY(-5px); } 50% { transform: rotate(10deg); } }
@keyframes briefcaseFloat { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-5px) rotate(3deg); } }

/* ═══════════════════════════════════════════════
   IDLE BEHAVIORS (shared)
   ═══════════════════════════════════════════════ */
.pet-container.idle-blink .eye-open { animation: quickBlink 0.4s ease-in-out; }
.pet-container.idle-look_around .pupils { animation: lookAround 2s ease-in-out !important; }
.pet-container.idle-stretch .body-group { animation: stretchBody 2s ease-in-out !important; }
.pet-container.idle-wiggle .body-group { animation: wiggleBody 1.2s ease-in-out !important; }
.pet-container.idle-yawn .eye-open { animation: squintYawn 2.5s ease-in-out !important; }
.pet-container.idle-yawn .mouth-neutral { opacity: 0; }
.pet-container.idle-yawn .mouth-worried { opacity: 1; }
.shiba-container.idle-stretch .left-ear { animation: stretchEarL 2s ease-in-out; }
.shiba-container.idle-stretch .right-ear { animation: stretchEarR 2s ease-in-out; }
.robot-container.idle-stretch .left-arm  { animation: stretchArmL 2s ease-in-out; }
.robot-container.idle-stretch .right-arm { animation: stretchArmR 2s ease-in-out; }

/* ═══════════════════════════════════════════════
   SHARED KEYFRAMES
   ═══════════════════════════════════════════════ */
@keyframes breathe { 0%,100% { transform: scaleY(1) scaleX(1); } 50% { transform: scaleY(0.94) scaleX(1.03); } }
@keyframes breatheRobot { 0%,100% { transform: scaleY(1) scaleX(1); } 50% { transform: scaleY(0.97) scaleX(1.015); } }
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@keyframes shiver { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
@keyframes spin360 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes jumpUp { 0% { transform: translateY(0); } 30% { transform: translateY(-20px); } 60% { transform: translateY(-5px); } 100% { transform: translateY(0); } }
@keyframes huff { 0%,100% { transform: scale(0.96); } 50% { transform: scale(1); } }
@keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }

@keyframes blink { 0%,94%,100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
@keyframes quickBlink { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.1); } }
@keyframes dart { 0%,20%,100% { transform: translateX(0); } 10%,15% { transform: translateX(-3px); } 80%,85% { transform: translateX(3px); } }
@keyframes lookAround { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes squintYawn { 0%,100% { transform: scaleY(1); } 30%,70% { transform: scaleY(0.4); } }

@keyframes wagTailSlow { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-25deg); } }
@keyframes wagTailFast { 0%,100% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } }
@keyframes earTwitchL { 0%,90%,100% { transform: rotate(0deg); } 95% { transform: rotate(-8deg); } }
@keyframes earTwitchR { 0%,90%,100% { transform: rotate(0deg); } 95% { transform: rotate(8deg); } }
@keyframes earPerk { 0%,100% { transform: rotate(-10deg) translateY(-3px); } 50% { transform: rotate(-14deg) translateY(-6px); } }
@keyframes earBounce { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-6deg) translateY(-2px); } }
@keyframes tongueBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(2px); } }
@keyframes trot { 0%,100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(2deg) translateY(-4px); } }
@keyframes stretchEarL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-20deg) translateY(-4px); } }
@keyframes stretchEarR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(20deg) translateY(-4px); } }

@keyframes antennaSway { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(5deg); } 75% { transform: rotate(-5deg); } }
@keyframes antennaPerk { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-8deg) translateY(-2px); } }
@keyframes antennaAlert { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
@keyframes antennaBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes pulse { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
@keyframes blinkLights { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
@keyframes robotWalk { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
@keyframes stretchArmL { 0%,100% { transform: rotate(0); } 50% { transform: translateY(-15px) rotate(-35deg); } }
@keyframes stretchArmR { 0%,100% { transform: rotate(0); } 50% { transform: translateY(-15px) rotate(35deg); } }

@keyframes legWalkL { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
@keyframes legWalkR { 0%,100% { transform: rotate(12deg); } 50% { transform: rotate(-12deg); } }
@keyframes armSwingL { 0%,100% { transform: rotate(10deg); } 50% { transform: rotate(-15deg); } }
@keyframes armSwingR { 0%,100% { transform: rotate(-15deg); } 50% { transform: rotate(10deg); } }
@keyframes headBobWalk { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

@keyframes floatUp { 0% { transform: translateY(0) scale(0.7); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(-25px) scale(1.1); opacity: 0; } }
@keyframes drip { 0% { transform: translateY(0); opacity: 0.8; } 100% { transform: translateY(12px); opacity: 0; } }
@keyframes sparkle { 0%,100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.3); } }
@keyframes stretchBody { 0%,100% { transform: scaleY(1) scaleX(1); } 50% { transform: scaleY(1.12) scaleX(0.92); } }
@keyframes wiggleBody { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }

/* ═══════════════════════════════════════════════
   AURORA (PRINCESS BUTTERFLY) ANIMATIONS
   ═══════════════════════════════════════════════ */
.princess-container .wing-upper-l { transform-origin: 60px 78px; transition: transform 0.4s; }
.princess-container .wing-upper-r { transform-origin: 68px 78px; transition: transform 0.4s; }
.princess-container .wing-lower-l { transform-origin: 62px 88px; transition: transform 0.4s; }
.princess-container .wing-lower-r { transform-origin: 66px 88px; transition: transform 0.4s; }
.princess-container .body-group   { transform-origin: 64px 90px; }
.princess-container .head-group   { transform-origin: 64px 52px; transition: all 0.3s; }
.princess-container .left-arm     { transform-origin: 50px 82px; transition: all 0.3s; }
.princess-container .right-arm    { transform-origin: 78px 82px; transition: all 0.3s; }
.princess-container .antenna      { transform-origin: 64px 36px; }
.princess-container .crown        { transform-origin: 64px 30px; }

/* IDLE — gentle float + slow wing flutter */
.princess-container.state-idle { animation: princessFloat 3s ease-in-out infinite; }
.princess-container.state-idle .wing-upper-l { animation: wingFlapUpperL 1.8s ease-in-out infinite; }
.princess-container.state-idle .wing-upper-r { animation: wingFlapUpperR 1.8s ease-in-out infinite; }
.princess-container.state-idle .wing-lower-l { animation: wingFlapLowerL 1.8s ease-in-out infinite 0.2s; }
.princess-container.state-idle .wing-lower-r { animation: wingFlapLowerR 1.8s ease-in-out infinite 0.2s; }
.princess-container.state-idle .antenna      { animation: antennaSway 3s ease-in-out infinite; }

/* HAPPY — bouncy fast flutter + hearts + blush */
.princess-container.state-happy { animation: bounce 0.5s ease-in-out infinite; }
.princess-container.state-happy .wing-upper-l { animation: wingFlapUpperL 0.35s ease-in-out infinite; }
.princess-container.state-happy .wing-upper-r { animation: wingFlapUpperR 0.35s ease-in-out infinite; }
.princess-container.state-happy .wing-lower-l { animation: wingFlapLowerL 0.35s ease-in-out infinite 0.05s; }
.princess-container.state-happy .wing-lower-r { animation: wingFlapLowerR 0.35s ease-in-out infinite 0.05s; }
.princess-container.state-happy .mouth-neutral { opacity: 0; }
.princess-container.state-happy .mouth-happy   { opacity: 1; }
.princess-container.state-happy .blush   { opacity: 1; }
.princess-container.state-happy .tongue  { opacity: 1; }
.princess-container.state-happy .fx-hearts { opacity: 1; animation: floatUp 1.3s linear infinite; }

/* SLEEPING — slow breathe, wings droop, head tilts */
.princess-container.state-sleeping .body-group   { animation: breathe 5s ease-in-out infinite; }
.princess-container.state-sleeping .head-group   { transform: rotate(10deg) translateY(8px); }
.princess-container.state-sleeping .eye-open     { opacity: 0; animation: none; }
.princess-container.state-sleeping .eye-closed   { opacity: 1; }
.princess-container.state-sleeping .wing-upper-l { transform: rotate(20deg); }
.princess-container.state-sleeping .wing-upper-r { transform: rotate(-20deg); }
.princess-container.state-sleeping .wing-lower-l { transform: rotate(14deg); }
.princess-container.state-sleeping .wing-lower-r { transform: rotate(-14deg); }
.princess-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }

/* CURIOUS — head tilt, right arm raised */
.princess-container.state-curious .head-group   { transform: rotate(-14deg) translateY(-3px); }
.princess-container.state-curious .wing-upper-l { animation: wingFlapUpperL 2.5s ease-in-out infinite; }
.princess-container.state-curious .wing-upper-r { animation: wingFlapUpperR 2.5s ease-in-out infinite; }
.princess-container.state-curious .pupils       { animation: none; transform: translateX(4px); }
.princess-container.state-curious .right-arm    { transform: translateY(-10px) rotate(20deg); }

/* WORRIED — shiver, wings hug in */
.princess-container.state-worried { animation: shiver 0.13s infinite; }
.princess-container.state-worried .mouth-neutral { opacity: 0; }
.princess-container.state-worried .mouth-worried { opacity: 1; }
.princess-container.state-worried .wing-upper-l  { transform: rotate(35deg); }
.princess-container.state-worried .wing-upper-r  { transform: rotate(-35deg); }
.princess-container.state-worried .wing-lower-l  { transform: rotate(25deg); }
.princess-container.state-worried .wing-lower-r  { transform: rotate(-25deg); }
.princess-container.state-worried .fx-sweat  { opacity: 1; animation: drip 1.5s infinite; }
.princess-container.state-worried .pupils    { transform: scale(0.65); }
.princess-container.state-worried .body-group { transform: scale(0.93); }

/* WALKING — graceful flutter-glide */
.princess-container.state-walking { animation: princessWalk 0.5s ease-in-out infinite; }
.princess-container.state-walking .wing-upper-l { animation: wingFlapUpperL 0.5s ease-in-out infinite; }
.princess-container.state-walking .wing-upper-r { animation: wingFlapUpperR 0.5s ease-in-out infinite; }
.princess-container.state-walking .wing-lower-l { animation: wingFlapLowerL 0.5s ease-in-out infinite 0.1s; }
.princess-container.state-walking .wing-lower-r { animation: wingFlapLowerR 0.5s ease-in-out infinite 0.1s; }
.princess-container.state-walking .head-group   { animation: headBobWalk 0.5s ease-in-out infinite; }

/* PROUD — regal spread wings, wand out, stars */
.princess-container.state-proud { animation: princessFloat 2s ease-in-out infinite; }
.princess-container.state-proud .head-group   { transform: translateY(-7px); }
.princess-container.state-proud .body-group   { transform: scaleY(1.06) scaleX(1.04); }
.princess-container.state-proud .wing-upper-l { transform: rotate(-18deg) translateY(-4px); }
.princess-container.state-proud .wing-upper-r { transform: rotate(18deg) translateY(-4px); }
.princess-container.state-proud .wing-lower-l { transform: rotate(-12deg); }
.princess-container.state-proud .wing-lower-r { transform: rotate(12deg); }
.princess-container.state-proud .left-arm     { transform: translate(-8px, 8px) rotate(-30deg); }
.princess-container.state-proud .right-arm    { transform: translate(8px, 8px) rotate(30deg); }
.princess-container.state-proud .mouth-neutral { opacity: 0; }
.princess-container.state-proud .mouth-happy   { opacity: 1; }
.princess-container.state-proud .eye-open   { opacity: 0; animation: none; }
.princess-container.state-proud .eye-closed { opacity: 1; }
.princess-container.state-proud .blush   { opacity: 1; }
.princess-container.state-proud .fx-wand  { opacity: 1; animation: wandSparkle 1.5s ease-in-out infinite; }
.princess-container.state-proud .fx-stars { opacity: 1; animation: sparkle 0.9s ease-in-out infinite; }

/* SPIN — twirl with wings spread */
.princess-container.state-spin { animation: spin360 0.75s ease-in-out; }
.princess-container.state-spin .wing-upper-l { transform: rotate(-25deg) translateY(-6px); }
.princess-container.state-spin .wing-upper-r { transform: rotate(25deg) translateY(-6px); }
.princess-container.state-spin .wing-lower-l { transform: rotate(-18deg); }
.princess-container.state-spin .wing-lower-r { transform: rotate(18deg); }

/* STARTLE — wings flare, jump */
.princess-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.princess-container.state-startle .wing-upper-l { transform: rotate(-30deg) translateY(-8px); }
.princess-container.state-startle .wing-upper-r { transform: rotate(30deg) translateY(-8px); }
.princess-container.state-startle .wing-lower-l { transform: rotate(-20deg); }
.princess-container.state-startle .wing-lower-r { transform: rotate(20deg); }
.princess-container.state-startle .pupils   { transform: scale(0.45); animation: none; }
.princess-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

/* MAD — wings pressed down, squint */
.princess-container.state-mad .eye-open   { opacity: 0; animation: none; }
.princess-container.state-mad .eye-squint { opacity: 1; }
.princess-container.state-mad .mouth-neutral { opacity: 0; }
.princess-container.state-mad .mouth-worried { opacity: 1; }
.princess-container.state-mad .wing-upper-l { transform: rotate(28deg); }
.princess-container.state-mad .wing-upper-r { transform: rotate(-28deg); }
.princess-container.state-mad .wing-lower-l { transform: rotate(20deg); }
.princess-container.state-mad .wing-lower-r { transform: rotate(-20deg); }
.princess-container.state-mad .body-group  { animation: huff 0.85s infinite; }
.princess-container.state-mad .left-arm    { transform: translate(12px, 10px) rotate(40deg); }
.princess-container.state-mad .right-arm   { transform: translate(-12px, 10px) rotate(-40deg); }

/* Princess idle behaviors */
.princess-container.idle-stretch .wing-upper-l { animation: wingStretchL 2s ease-in-out; }
.princess-container.idle-stretch .wing-upper-r { animation: wingStretchR 2s ease-in-out; }
.princess-container.idle-wiggle .body-group { animation: wiggleBody 1.2s ease-in-out !important; }

/* Princess-specific keyframes */
@keyframes princessFloat  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
@keyframes princessWalk   { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
@keyframes wingFlapUpperL { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-18deg); } }
@keyframes wingFlapUpperR { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(18deg); } }
@keyframes wingFlapLowerL { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-12deg); } }
@keyframes wingFlapLowerR { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(12deg); } }
@keyframes wingStretchL   { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-32deg) translateY(-8px); } }
@keyframes wingStretchR   { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(32deg) translateY(-8px); } }
@keyframes wandSparkle    { 0%,100% { opacity: 0.75; transform: scale(1) rotate(-4deg); } 50% { opacity: 1; transform: scale(1.15) rotate(4deg); } }

/* ═══════════════════════════════════════════════
   BEE-ATRICE (BEE NURSE) ANIMATIONS
   ═══════════════════════════════════════════════ */
.bee-container .body-group  { transform-origin: 64px 90px; }
.bee-container .head-group  { transform-origin: 64px 46px; transition: all 0.3s; }
.bee-container .wing-l      { transform-origin: 54px 46px; }
.bee-container .wing-r      { transform-origin: 74px 46px; }
.bee-container .left-arm    { transform-origin: 44px 76px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.bee-container .right-arm   { transform-origin: 84px 76px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.bee-container .left-leg    { transform-origin: 46px 96px; }
.bee-container .right-leg   { transform-origin: 82px 96px; }
.bee-container .antenna     { transform-origin: 64px 34px; }
.bee-container .stinger     { transform-origin: 64px 112px; }

/* IDLE — hover float + fast wing buzz */
.bee-container.state-idle { animation: beeHover 2.2s ease-in-out infinite; }
.bee-container.state-idle .wing-l { animation: beeWingL 0.12s linear infinite; }
.bee-container.state-idle .wing-r { animation: beeWingR 0.12s linear infinite; }
.bee-container.state-idle .antenna { animation: antennaSway 3s ease-in-out infinite; }

/* HAPPY — bounce + fast buzz + hearts */
.bee-container.state-happy { animation: bounce 0.5s ease-in-out infinite; }
.bee-container.state-happy .wing-l { animation: beeWingL 0.09s linear infinite; }
.bee-container.state-happy .wing-r { animation: beeWingR 0.09s linear infinite; }
.bee-container.state-happy .left-arm  { transform: translateY(-18px) rotate(-40deg); }
.bee-container.state-happy .right-arm { transform: translateY(-18px) rotate(40deg); }
.bee-container.state-happy .mouth-neutral { opacity: 0; }
.bee-container.state-happy .mouth-happy   { opacity: 1; }
.bee-container.state-happy .blush   { opacity: 1; }
.bee-container.state-happy .tongue  { opacity: 1; }
.bee-container.state-happy .fx-hearts { opacity: 1; animation: floatUp 1.3s linear infinite; }

/* SLEEPING — slow breathe, wings still, head droops */
.bee-container.state-sleeping .body-group { animation: breathe 5s ease-in-out infinite; }
.bee-container.state-sleeping .head-group { transform: rotate(10deg) translateY(6px); }
.bee-container.state-sleeping .eye-open   { opacity: 0; animation: none; }
.bee-container.state-sleeping .eye-closed { opacity: 1; }
.bee-container.state-sleeping .wing-l { transform: rotate(30deg); }
.bee-container.state-sleeping .wing-r { transform: rotate(-30deg); }
.bee-container.state-sleeping .left-arm  { transform: translateY(6px) rotate(8deg); }
.bee-container.state-sleeping .right-arm { transform: translateY(6px) rotate(-8deg); }
.bee-container.state-sleeping .fx-zzz { opacity: 1; animation: floatUp 2s linear infinite; }

/* CURIOUS — head tilt, right arm up, syringe peeks */
.bee-container.state-curious .head-group  { transform: rotate(-13deg) translateY(-3px); }
.bee-container.state-curious .right-arm   { transform: translateY(-12px) rotate(22deg); }
.bee-container.state-curious .wing-l { animation: beeWingL 0.14s linear infinite; }
.bee-container.state-curious .wing-r { animation: beeWingR 0.14s linear infinite; }
.bee-container.state-curious .pupils { animation: none; transform: translateX(4px); }
.bee-container.state-curious .fx-syringe { opacity: 1; animation: syringeWiggle 1.5s ease-in-out infinite; }

/* WORRIED — shiver, wings flutter nervously */
.bee-container.state-worried { animation: shiver 0.13s infinite; }
.bee-container.state-worried .mouth-neutral { opacity: 0; }
.bee-container.state-worried .mouth-worried { opacity: 1; }
.bee-container.state-worried .wing-l { animation: beeWingL 0.07s linear infinite; }
.bee-container.state-worried .wing-r { animation: beeWingR 0.07s linear infinite; }
.bee-container.state-worried .left-arm  { transform: translateX(9px) rotate(30deg); }
.bee-container.state-worried .right-arm { transform: translateX(-9px) rotate(-30deg); }
.bee-container.state-worried .fx-sweat  { opacity: 1; animation: drip 1.5s infinite; }
.bee-container.state-worried .body-group { transform: scale(0.93); }
.bee-container.state-worried .pupils    { transform: scale(0.6); }

/* WALKING — wobble waddle hover */
.bee-container.state-walking { animation: beeWalk 0.45s ease-in-out infinite; }
.bee-container.state-walking .wing-l { animation: beeWingL 0.11s linear infinite; }
.bee-container.state-walking .wing-r { animation: beeWingR 0.11s linear infinite; }
.bee-container.state-walking .left-leg  { animation: legWalkL 0.45s ease-in-out infinite; }
.bee-container.state-walking .right-leg { animation: legWalkR 0.45s ease-in-out infinite; }
.bee-container.state-walking .head-group { animation: headBobWalk 0.45s ease-in-out infinite; }

/* PROUD — chest puffed, syringe raised, stars */
.bee-container.state-proud .body-group  { transform: scaleY(1.07) scaleX(1.04); }
.bee-container.state-proud .head-group  { transform: translateY(-6px); }
.bee-container.state-proud .left-arm    { transform: translate(-8px, 8px) rotate(-28deg); }
.bee-container.state-proud .right-arm   { transform: translate(8px, 8px) rotate(28deg); }
.bee-container.state-proud .wing-l { animation: beeWingL 0.10s linear infinite; }
.bee-container.state-proud .wing-r { animation: beeWingR 0.10s linear infinite; }
.bee-container.state-proud .mouth-neutral { opacity: 0; }
.bee-container.state-proud .mouth-happy   { opacity: 1; }
.bee-container.state-proud .eye-open   { opacity: 0; animation: none; }
.bee-container.state-proud .eye-closed { opacity: 1; }
.bee-container.state-proud .fx-syringe { opacity: 1; animation: syringeFloat 2s ease-in-out infinite; }
.bee-container.state-proud .fx-stars   { opacity: 1; animation: sparkle 0.9s ease-in-out infinite; }

/* SPIN */
.bee-container.state-spin { animation: spin360 0.7s ease-in-out; }
.bee-container.state-spin .wing-l { animation: beeWingL 0.06s linear infinite; }
.bee-container.state-spin .wing-r { animation: beeWingR 0.06s linear infinite; }
.bee-container.state-spin .left-arm  { transform: translateY(-20px); }
.bee-container.state-spin .right-arm { transform: translateY(-20px); }

/* STARTLE — jump, wings flare, alert */
.bee-container.state-startle { animation: jumpUp 0.4s cubic-bezier(0.4,0,0.2,1); }
.bee-container.state-startle .wing-l { transform: rotate(-25deg) translateY(-6px); }
.bee-container.state-startle .wing-r { transform: rotate(25deg) translateY(-6px); }
.bee-container.state-startle .left-arm  { transform: translateY(-16px) rotate(-48deg); }
.bee-container.state-startle .right-arm { transform: translateY(-16px) rotate(48deg); }
.bee-container.state-startle .pupils  { transform: scale(0.45); animation: none; }
.bee-container.state-startle .stinger { transform: scaleY(1.4); }
.bee-container.state-startle .fx-alert { opacity: 1; animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275); }

/* MAD — squint, wings pressed, arms down-angry */
.bee-container.state-mad .eye-open   { opacity: 0; animation: none; }
.bee-container.state-mad .eye-squint { opacity: 1; }
.bee-container.state-mad .mouth-neutral { opacity: 0; }
.bee-container.state-mad .mouth-worried { opacity: 1; }
.bee-container.state-mad .wing-l { animation: beeWingL 0.08s linear infinite; }
.bee-container.state-mad .wing-r { animation: beeWingR 0.08s linear infinite; }
.bee-container.state-mad .left-arm  { transform: translate(13px, 12px) rotate(42deg); }
.bee-container.state-mad .right-arm { transform: translate(-13px, 12px) rotate(-42deg); }
.bee-container.state-mad .body-group { animation: huff 0.8s infinite; }
.bee-container.state-mad .stinger   { animation: stingerAlert 0.4s ease-in-out infinite; }

/* Bee idle behaviors */
.bee-container.idle-stretch .left-arm  { animation: stretchArmL 2s ease-in-out; }
.bee-container.idle-stretch .right-arm { animation: stretchArmR 2s ease-in-out; }

/* Bee-specific keyframes */
@keyframes beeHover   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes beeWalk    { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-5px) rotate(3deg); } }
@keyframes beeWingL   { 0%,100% { transform: rotate(0deg) scaleX(1); } 50% { transform: rotate(-8deg) scaleX(0.85); } }
@keyframes beeWingR   { 0%,100% { transform: rotate(0deg) scaleX(1); } 50% { transform: rotate(8deg) scaleX(0.85); } }
@keyframes syringeWiggle { 0%,100% { transform: rotate(0deg); } 30% { transform: rotate(-8deg); } 70% { transform: rotate(6deg); } }
@keyframes syringeFloat  { 0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.9; } 50% { transform: translateY(-4px) rotate(-5deg); opacity: 1; } }
@keyframes stingerAlert  { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.5) translateY(4px); } }
`;

/* ═══════════════════════════════════════════════
   PET COMPONENT
   ═══════════════════════════════════════════════ */
const PetDisplay = ({ name, label, SvgComponent, type, mood, idleBehavior, onPoke, accent }) => (
  <div className="pet-card" style={{ "--accent": accent }}>
    <h2>{name}</h2>
    <p className="pet-label">{label}</p>
    <div className="pet-stage" onClick={onPoke}>
      <div className={`pet-container ${type}-container state-${mood} ${idleBehavior ? `idle-${idleBehavior}` : ""}`}>
        <SvgComponent />
      </div>
    </div>
    <div className="mood-label">{idleBehavior ? `idle → ${idleBehavior}` : mood}</div>
  </div>
);

/* ═══════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════ */
export default function App() {
  const [pinchMood,  setPinchMood]  = useState("idle");
  const [shibaMood,  setShibaMood]  = useState("idle");
  const [robotMood,  setRobotMood]  = useState("idle");
  const [monkeyMood, setMonkeyMood] = useState("idle");
  const [consulMood, setConsulMood] = useState("idle");
  const [princessMood, setPrincessMood] = useState("idle");
  const [beeMood, setBeeMood] = useState("idle");

  const [pinchIdle,  setPinchIdle]  = useState(null);
  const [shibaIdle,  setShibaIdle]  = useState(null);
  const [robotIdle,  setRobotIdle]  = useState(null);
  const [monkeyIdle, setMonkeyIdle] = useState(null);
  const [consulIdle, setConsulIdle] = useState(null);
  const [princessIdle, setPrincessIdle] = useState(null);
  const [beeIdle, setBeeIdle] = useState(null);

  const pinchTimer    = useRef(null);
  const shibaTimer    = useRef(null);
  const robotTimer    = useRef(null);
  const monkeyTimer   = useRef(null);
  const consulTimer   = useRef(null);
  const princessTimer = useRef(null);
  const beeTimer      = useRef(null);

  const pokePet = useCallback((setMood, setIdle, timerRef) => {
    const reactions = ["happy", "curious", "startle", "proud", "spin", "mad", "worried"];
    const pick = reactions[Math.floor(Math.random() * reactions.length)];
    if (timerRef.current) clearTimeout(timerRef.current);
    setIdle(null);
    setMood(pick);
    timerRef.current = setTimeout(() => setMood("idle"), pick === "spin" ? 900 : 1800);
  }, []);

  const triggerIdle = useCallback((setIdle, timerRef) => {
    const pick = IDLE_BEHAVIORS[Math.floor(Math.random() * IDLE_BEHAVIORS.length)];
    if (timerRef.current) clearTimeout(timerRef.current);
    setIdle(pick);
    const durations = { blink: 400, look_around: 2000, stretch: 2000, wiggle: 1200, yawn: 2500 };
    timerRef.current = setTimeout(() => setIdle(null), durations[pick] || 1500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pinchMood  === "idle" && Math.random() > 0.5) triggerIdle(setPinchIdle,  pinchTimer);
      if (shibaMood  === "idle" && Math.random() > 0.5) triggerIdle(setShibaIdle,  shibaTimer);
      if (robotMood  === "idle" && Math.random() > 0.5) triggerIdle(setRobotIdle,  robotTimer);
      if (monkeyMood === "idle" && Math.random() > 0.5) triggerIdle(setMonkeyIdle, monkeyTimer);
      if (consulMood === "idle" && Math.random() > 0.5) triggerIdle(setConsulIdle, consulTimer);
      if (princessMood === "idle" && Math.random() > 0.5) triggerIdle(setPrincessIdle, princessTimer);
      if (beeMood === "idle" && Math.random() > 0.5) triggerIdle(setBeeIdle, beeTimer);
    }, 3500);
    return () => clearInterval(interval);
  }, [pinchMood, shibaMood, robotMood, monkeyMood, consulMood, princessMood, beeMood, triggerIdle]);

  const setMoodForAll = (m) => {
    [pinchTimer, shibaTimer, robotTimer, monkeyTimer, consulTimer, princessTimer, beeTimer].forEach(t => { if (t.current) clearTimeout(t.current); });
    setPinchIdle(null); setShibaIdle(null); setRobotIdle(null); setMonkeyIdle(null); setConsulIdle(null); setPrincessIdle(null); setBeeIdle(null);
    setPinchMood(m); setShibaMood(m); setRobotMood(m); setMonkeyMood(m); setConsulMood(m); setPrincessMood(m); setBeeMood(m);
  };

  const allSameMood = (m) => pinchMood === m && shibaMood === m && robotMood === m && monkeyMood === m && consulMood === m && princessMood === m && beeMood === m;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <h1>Tomo</h1>
        <p className="subtitle">Your AI assistant, alive on your screen</p>

        <div className="pets-row">
          <PetDisplay name="Pinch"   label="Lobster"     SvgComponent={PinchSvg}  type="pinch"  mood={pinchMood}  idleBehavior={pinchIdle}
            onPoke={() => pokePet(setPinchMood,  setPinchIdle,  pinchTimer)}  accent="#FF8C69" />
          <PetDisplay name="Mochi"   label="Shiba Inu"   SvgComponent={ShibaSvg}  type="shiba"  mood={shibaMood}  idleBehavior={shibaIdle}
            onPoke={() => pokePet(setShibaMood,  setShibaIdle,  shibaTimer)}  accent="#E8A735" />
          <PetDisplay name="Unit-7"  label="Robot"       SvgComponent={RobotSvg}  type="robot"  mood={robotMood}  idleBehavior={robotIdle}
            onPoke={() => pokePet(setRobotMood,  setRobotIdle,  robotTimer)}  accent="#4FC3F7" />
          <PetDisplay name="Enzo"    label="Monkey"      SvgComponent={MonkeySvg} type="monkey" mood={monkeyMood} idleBehavior={monkeyIdle}
            onPoke={() => pokePet(setMonkeyMood, setMonkeyIdle, monkeyTimer)} accent="#C4895E" />
          <PetDisplay name="Niki"     label="Consultant"  SvgComponent={GeraldSvg}   type="consul"   mood={consulMood}   idleBehavior={consulIdle}
            onPoke={() => pokePet(setConsulMood,   setConsulIdle,   consulTimer)}   accent="#C9A84C" />
          <PetDisplay name="Aurora"    label="Princess"    SvgComponent={PrincessSvg} type="princess" mood={princessMood} idleBehavior={princessIdle}
            onPoke={() => pokePet(setPrincessMood, setPrincessIdle, princessTimer)} accent="#FF80AB" />
          <PetDisplay name="Bee-atrice" label="Bee Nurse"  SvgComponent={BeeSvg}      type="bee"      mood={beeMood}      idleBehavior={beeIdle}
            onPoke={() => pokePet(setBeeMood, setBeeIdle, beeTimer)} accent="#F5C518" />
        </div>

        <div className="controls-section">
          <span className="controls-label">Moods</span>
          <div className="controls">
            {MOODS.map((m) => (
              <button key={m} className={`mood-btn ${allSameMood(m) ? "active" : ""}`} onClick={() => setMoodForAll(m)}>
                {m}
              </button>
            ))}
          </div>
          <span className="controls-label" style={{ marginTop: 12 }}>Idle Behaviors</span>
          <div className="controls">
            {IDLE_BEHAVIORS.map((b) => (
              <button key={b} className="mood-btn" onClick={() => {
                setMoodForAll("idle");
                setTimeout(() => {
                  setPinchIdle(b); setShibaIdle(b); setRobotIdle(b); setMonkeyIdle(b); setConsulIdle(b); setPrincessIdle(b); setBeeIdle(b);
                  const durations = { blink: 400, look_around: 2000, stretch: 2000, wiggle: 1200, yawn: 2500 };
                  setTimeout(() => { setPinchIdle(null); setShibaIdle(null); setRobotIdle(null); setMonkeyIdle(null); setConsulIdle(null); setPrincessIdle(null); setBeeIdle(null); }, durations[b] || 1500);
                }, 100);
              }}>
                {b.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
