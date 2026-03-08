"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type UnicodeChar = {
  char: string;
  name: string;
  codePoint: string;
  htmlEntity: string;
  cssContent: string;
  category: string;
};

const CATEGORIES = [
  "All",
  "Arrows",
  "Math",
  "Currency",
  "Checkmarks",
  "Stars & Shapes",
  "Box Drawing",
  "Punctuation",
] as const;

type Category = (typeof CATEGORIES)[number];

const UNICODE_DATA: UnicodeChar[] = [
  // Arrows
  { char: "\u2190", name: "Leftwards Arrow", codePoint: "U+2190", htmlEntity: "&larr;", cssContent: "\\2190", category: "Arrows" },
  { char: "\u2191", name: "Upwards Arrow", codePoint: "U+2191", htmlEntity: "&uarr;", cssContent: "\\2191", category: "Arrows" },
  { char: "\u2192", name: "Rightwards Arrow", codePoint: "U+2192", htmlEntity: "&rarr;", cssContent: "\\2192", category: "Arrows" },
  { char: "\u2193", name: "Downwards Arrow", codePoint: "U+2193", htmlEntity: "&darr;", cssContent: "\\2193", category: "Arrows" },
  { char: "\u2194", name: "Left Right Arrow", codePoint: "U+2194", htmlEntity: "&harr;", cssContent: "\\2194", category: "Arrows" },
  { char: "\u2195", name: "Up Down Arrow", codePoint: "U+2195", htmlEntity: "&#8597;", cssContent: "\\2195", category: "Arrows" },
  { char: "\u2196", name: "North West Arrow", codePoint: "U+2196", htmlEntity: "&#8598;", cssContent: "\\2196", category: "Arrows" },
  { char: "\u2197", name: "North East Arrow", codePoint: "U+2197", htmlEntity: "&#8599;", cssContent: "\\2197", category: "Arrows" },
  { char: "\u2198", name: "South East Arrow", codePoint: "U+2198", htmlEntity: "&#8600;", cssContent: "\\2198", category: "Arrows" },
  { char: "\u2199", name: "South West Arrow", codePoint: "U+2199", htmlEntity: "&#8601;", cssContent: "\\2199", category: "Arrows" },
  { char: "\u21A9", name: "Leftwards Arrow With Hook", codePoint: "U+21A9", htmlEntity: "&#8617;", cssContent: "\\21A9", category: "Arrows" },
  { char: "\u21AA", name: "Rightwards Arrow With Hook", codePoint: "U+21AA", htmlEntity: "&#8618;", cssContent: "\\21AA", category: "Arrows" },
  { char: "\u21B0", name: "Upwards Arrow With Tip Leftwards", codePoint: "U+21B0", htmlEntity: "&#8624;", cssContent: "\\21B0", category: "Arrows" },
  { char: "\u21B1", name: "Upwards Arrow With Tip Rightwards", codePoint: "U+21B1", htmlEntity: "&#8625;", cssContent: "\\21B1", category: "Arrows" },
  { char: "\u21BB", name: "Clockwise Open Circle Arrow", codePoint: "U+21BB", htmlEntity: "&#8635;", cssContent: "\\21BB", category: "Arrows" },
  { char: "\u21BA", name: "Anticlockwise Open Circle Arrow", codePoint: "U+21BA", htmlEntity: "&#8634;", cssContent: "\\21BA", category: "Arrows" },
  { char: "\u21C4", name: "Rightwards Over Leftwards Arrow", codePoint: "U+21C4", htmlEntity: "&#8644;", cssContent: "\\21C4", category: "Arrows" },
  { char: "\u21D0", name: "Leftwards Double Arrow", codePoint: "U+21D0", htmlEntity: "&lArr;", cssContent: "\\21D0", category: "Arrows" },
  { char: "\u21D1", name: "Upwards Double Arrow", codePoint: "U+21D1", htmlEntity: "&uArr;", cssContent: "\\21D1", category: "Arrows" },
  { char: "\u21D2", name: "Rightwards Double Arrow", codePoint: "U+21D2", htmlEntity: "&rArr;", cssContent: "\\21D2", category: "Arrows" },
  { char: "\u21D3", name: "Downwards Double Arrow", codePoint: "U+21D3", htmlEntity: "&dArr;", cssContent: "\\21D3", category: "Arrows" },
  { char: "\u21D4", name: "Left Right Double Arrow", codePoint: "U+21D4", htmlEntity: "&hArr;", cssContent: "\\21D4", category: "Arrows" },
  { char: "\u27A1", name: "Black Rightwards Arrow", codePoint: "U+27A1", htmlEntity: "&#10145;", cssContent: "\\27A1", category: "Arrows" },
  { char: "\u2B05", name: "Leftwards Black Arrow", codePoint: "U+2B05", htmlEntity: "&#11013;", cssContent: "\\2B05", category: "Arrows" },
  { char: "\u2B06", name: "Upwards Black Arrow", codePoint: "U+2B06", htmlEntity: "&#11014;", cssContent: "\\2B06", category: "Arrows" },
  { char: "\u2B07", name: "Downwards Black Arrow", codePoint: "U+2B07", htmlEntity: "&#11015;", cssContent: "\\2B07", category: "Arrows" },

  // Math
  { char: "\u00B1", name: "Plus-Minus Sign", codePoint: "U+00B1", htmlEntity: "&plusmn;", cssContent: "\\00B1", category: "Math" },
  { char: "\u00D7", name: "Multiplication Sign", codePoint: "U+00D7", htmlEntity: "&times;", cssContent: "\\00D7", category: "Math" },
  { char: "\u00F7", name: "Division Sign", codePoint: "U+00F7", htmlEntity: "&divide;", cssContent: "\\00F7", category: "Math" },
  { char: "\u2260", name: "Not Equal To", codePoint: "U+2260", htmlEntity: "&ne;", cssContent: "\\2260", category: "Math" },
  { char: "\u2264", name: "Less-Than Or Equal To", codePoint: "U+2264", htmlEntity: "&le;", cssContent: "\\2264", category: "Math" },
  { char: "\u2265", name: "Greater-Than Or Equal To", codePoint: "U+2265", htmlEntity: "&ge;", cssContent: "\\2265", category: "Math" },
  { char: "\u221A", name: "Square Root", codePoint: "U+221A", htmlEntity: "&radic;", cssContent: "\\221A", category: "Math" },
  { char: "\u221E", name: "Infinity", codePoint: "U+221E", htmlEntity: "&infin;", cssContent: "\\221E", category: "Math" },
  { char: "\u2248", name: "Almost Equal To", codePoint: "U+2248", htmlEntity: "&asymp;", cssContent: "\\2248", category: "Math" },
  { char: "\u2261", name: "Identical To", codePoint: "U+2261", htmlEntity: "&equiv;", cssContent: "\\2261", category: "Math" },
  { char: "\u2200", name: "For All", codePoint: "U+2200", htmlEntity: "&forall;", cssContent: "\\2200", category: "Math" },
  { char: "\u2203", name: "There Exists", codePoint: "U+2203", htmlEntity: "&exist;", cssContent: "\\2203", category: "Math" },
  { char: "\u2205", name: "Empty Set", codePoint: "U+2205", htmlEntity: "&empty;", cssContent: "\\2205", category: "Math" },
  { char: "\u2207", name: "Nabla", codePoint: "U+2207", htmlEntity: "&nabla;", cssContent: "\\2207", category: "Math" },
  { char: "\u2208", name: "Element Of", codePoint: "U+2208", htmlEntity: "&isin;", cssContent: "\\2208", category: "Math" },
  { char: "\u2209", name: "Not An Element Of", codePoint: "U+2209", htmlEntity: "&notin;", cssContent: "\\2209", category: "Math" },
  { char: "\u220F", name: "N-Ary Product", codePoint: "U+220F", htmlEntity: "&prod;", cssContent: "\\220F", category: "Math" },
  { char: "\u2211", name: "N-Ary Summation", codePoint: "U+2211", htmlEntity: "&sum;", cssContent: "\\2211", category: "Math" },
  { char: "\u222B", name: "Integral", codePoint: "U+222B", htmlEntity: "&int;", cssContent: "\\222B", category: "Math" },
  { char: "\u2220", name: "Angle", codePoint: "U+2220", htmlEntity: "&ang;", cssContent: "\\2220", category: "Math" },
  { char: "\u2229", name: "Intersection", codePoint: "U+2229", htmlEntity: "&cap;", cssContent: "\\2229", category: "Math" },
  { char: "\u222A", name: "Union", codePoint: "U+222A", htmlEntity: "&cup;", cssContent: "\\222A", category: "Math" },
  { char: "\u2282", name: "Subset Of", codePoint: "U+2282", htmlEntity: "&sub;", cssContent: "\\2282", category: "Math" },
  { char: "\u2283", name: "Superset Of", codePoint: "U+2283", htmlEntity: "&sup;", cssContent: "\\2283", category: "Math" },
  { char: "\u03B1", name: "Greek Alpha", codePoint: "U+03B1", htmlEntity: "&alpha;", cssContent: "\\03B1", category: "Math" },
  { char: "\u03B2", name: "Greek Beta", codePoint: "U+03B2", htmlEntity: "&beta;", cssContent: "\\03B2", category: "Math" },
  { char: "\u03B3", name: "Greek Gamma", codePoint: "U+03B3", htmlEntity: "&gamma;", cssContent: "\\03B3", category: "Math" },
  { char: "\u03B4", name: "Greek Delta", codePoint: "U+03B4", htmlEntity: "&delta;", cssContent: "\\03B4", category: "Math" },
  { char: "\u03C0", name: "Greek Pi", codePoint: "U+03C0", htmlEntity: "&pi;", cssContent: "\\03C0", category: "Math" },
  { char: "\u03A3", name: "Greek Sigma", codePoint: "U+03A3", htmlEntity: "&Sigma;", cssContent: "\\03A3", category: "Math" },

  // Currency
  { char: "\u0024", name: "Dollar Sign", codePoint: "U+0024", htmlEntity: "&dollar;", cssContent: "\\0024", category: "Currency" },
  { char: "\u20AC", name: "Euro Sign", codePoint: "U+20AC", htmlEntity: "&euro;", cssContent: "\\20AC", category: "Currency" },
  { char: "\u00A3", name: "Pound Sign", codePoint: "U+00A3", htmlEntity: "&pound;", cssContent: "\\00A3", category: "Currency" },
  { char: "\u00A5", name: "Yen Sign", codePoint: "U+00A5", htmlEntity: "&yen;", cssContent: "\\00A5", category: "Currency" },
  { char: "\u00A2", name: "Cent Sign", codePoint: "U+00A2", htmlEntity: "&cent;", cssContent: "\\00A2", category: "Currency" },
  { char: "\u20B9", name: "Indian Rupee Sign", codePoint: "U+20B9", htmlEntity: "&#8377;", cssContent: "\\20B9", category: "Currency" },
  { char: "\u20A9", name: "Won Sign", codePoint: "U+20A9", htmlEntity: "&#8361;", cssContent: "\\20A9", category: "Currency" },
  { char: "\u20BD", name: "Ruble Sign", codePoint: "U+20BD", htmlEntity: "&#8381;", cssContent: "\\20BD", category: "Currency" },
  { char: "\u20BF", name: "Bitcoin Sign", codePoint: "U+20BF", htmlEntity: "&#8383;", cssContent: "\\20BF", category: "Currency" },
  { char: "\u20AB", name: "Dong Sign", codePoint: "U+20AB", htmlEntity: "&#8363;", cssContent: "\\20AB", category: "Currency" },
  { char: "\u20A8", name: "Rupee Sign", codePoint: "U+20A8", htmlEntity: "&#8360;", cssContent: "\\20A8", category: "Currency" },
  { char: "\u0E3F", name: "Thai Baht Sign", codePoint: "U+0E3F", htmlEntity: "&#3647;", cssContent: "\\0E3F", category: "Currency" },
  { char: "\u20B4", name: "Hryvnia Sign", codePoint: "U+20B4", htmlEntity: "&#8372;", cssContent: "\\20B4", category: "Currency" },
  { char: "\u20A6", name: "Naira Sign", codePoint: "U+20A6", htmlEntity: "&#8358;", cssContent: "\\20A6", category: "Currency" },
  { char: "\u20B1", name: "Peso Sign", codePoint: "U+20B1", htmlEntity: "&#8369;", cssContent: "\\20B1", category: "Currency" },
  { char: "\u00A4", name: "Currency Sign", codePoint: "U+00A4", htmlEntity: "&curren;", cssContent: "\\00A4", category: "Currency" },

  // Checkmarks
  { char: "\u2713", name: "Check Mark", codePoint: "U+2713", htmlEntity: "&#10003;", cssContent: "\\2713", category: "Checkmarks" },
  { char: "\u2714", name: "Heavy Check Mark", codePoint: "U+2714", htmlEntity: "&#10004;", cssContent: "\\2714", category: "Checkmarks" },
  { char: "\u2715", name: "Multiplication X", codePoint: "U+2715", htmlEntity: "&#10005;", cssContent: "\\2715", category: "Checkmarks" },
  { char: "\u2716", name: "Heavy Multiplication X", codePoint: "U+2716", htmlEntity: "&#10006;", cssContent: "\\2716", category: "Checkmarks" },
  { char: "\u2717", name: "Ballot X", codePoint: "U+2717", htmlEntity: "&#10007;", cssContent: "\\2717", category: "Checkmarks" },
  { char: "\u2718", name: "Heavy Ballot X", codePoint: "U+2718", htmlEntity: "&#10008;", cssContent: "\\2718", category: "Checkmarks" },
  { char: "\u2610", name: "Ballot Box", codePoint: "U+2610", htmlEntity: "&#9744;", cssContent: "\\2610", category: "Checkmarks" },
  { char: "\u2611", name: "Ballot Box With Check", codePoint: "U+2611", htmlEntity: "&#9745;", cssContent: "\\2611", category: "Checkmarks" },
  { char: "\u2612", name: "Ballot Box With X", codePoint: "U+2612", htmlEntity: "&#9746;", cssContent: "\\2612", category: "Checkmarks" },
  { char: "\u2705", name: "White Heavy Check Mark", codePoint: "U+2705", htmlEntity: "&#9989;", cssContent: "\\2705", category: "Checkmarks" },
  { char: "\u274C", name: "Cross Mark", codePoint: "U+274C", htmlEntity: "&#10060;", cssContent: "\\274C", category: "Checkmarks" },
  { char: "\u274E", name: "Cross Mark In Box", codePoint: "U+274E", htmlEntity: "&#10062;", cssContent: "\\274E", category: "Checkmarks" },

  // Stars & Shapes
  { char: "\u2605", name: "Black Star", codePoint: "U+2605", htmlEntity: "&#9733;", cssContent: "\\2605", category: "Stars & Shapes" },
  { char: "\u2606", name: "White Star", codePoint: "U+2606", htmlEntity: "&#9734;", cssContent: "\\2606", category: "Stars & Shapes" },
  { char: "\u2764", name: "Heavy Black Heart", codePoint: "U+2764", htmlEntity: "&#10084;", cssContent: "\\2764", category: "Stars & Shapes" },
  { char: "\u2665", name: "Black Heart Suit", codePoint: "U+2665", htmlEntity: "&hearts;", cssContent: "\\2665", category: "Stars & Shapes" },
  { char: "\u2666", name: "Black Diamond Suit", codePoint: "U+2666", htmlEntity: "&diams;", cssContent: "\\2666", category: "Stars & Shapes" },
  { char: "\u2663", name: "Black Club Suit", codePoint: "U+2663", htmlEntity: "&clubs;", cssContent: "\\2663", category: "Stars & Shapes" },
  { char: "\u2660", name: "Black Spade Suit", codePoint: "U+2660", htmlEntity: "&spades;", cssContent: "\\2660", category: "Stars & Shapes" },
  { char: "\u25A0", name: "Black Square", codePoint: "U+25A0", htmlEntity: "&#9632;", cssContent: "\\25A0", category: "Stars & Shapes" },
  { char: "\u25A1", name: "White Square", codePoint: "U+25A1", htmlEntity: "&#9633;", cssContent: "\\25A1", category: "Stars & Shapes" },
  { char: "\u25CF", name: "Black Circle", codePoint: "U+25CF", htmlEntity: "&#9679;", cssContent: "\\25CF", category: "Stars & Shapes" },
  { char: "\u25CB", name: "White Circle", codePoint: "U+25CB", htmlEntity: "&#9675;", cssContent: "\\25CB", category: "Stars & Shapes" },
  { char: "\u25B2", name: "Black Up Triangle", codePoint: "U+25B2", htmlEntity: "&#9650;", cssContent: "\\25B2", category: "Stars & Shapes" },
  { char: "\u25BC", name: "Black Down Triangle", codePoint: "U+25BC", htmlEntity: "&#9660;", cssContent: "\\25BC", category: "Stars & Shapes" },
  { char: "\u25C0", name: "Black Left Triangle", codePoint: "U+25C0", htmlEntity: "&#9664;", cssContent: "\\25C0", category: "Stars & Shapes" },
  { char: "\u25B6", name: "Black Right Triangle", codePoint: "U+25B6", htmlEntity: "&#9654;", cssContent: "\\25B6", category: "Stars & Shapes" },
  { char: "\u25C6", name: "Black Diamond", codePoint: "U+25C6", htmlEntity: "&#9670;", cssContent: "\\25C6", category: "Stars & Shapes" },
  { char: "\u25C7", name: "White Diamond", codePoint: "U+25C7", htmlEntity: "&#9671;", cssContent: "\\25C7", category: "Stars & Shapes" },
  { char: "\u2B50", name: "White Medium Star", codePoint: "U+2B50", htmlEntity: "&#11088;", cssContent: "\\2B50", category: "Stars & Shapes" },
  { char: "\u2728", name: "Sparkles", codePoint: "U+2728", htmlEntity: "&#10024;", cssContent: "\\2728", category: "Stars & Shapes" },
  { char: "\u2744", name: "Snowflake", codePoint: "U+2744", htmlEntity: "&#10052;", cssContent: "\\2744", category: "Stars & Shapes" },
  { char: "\u266A", name: "Eighth Note", codePoint: "U+266A", htmlEntity: "&#9834;", cssContent: "\\266A", category: "Stars & Shapes" },
  { char: "\u266B", name: "Beamed Eighth Notes", codePoint: "U+266B", htmlEntity: "&#9835;", cssContent: "\\266B", category: "Stars & Shapes" },
  { char: "\u2602", name: "Umbrella", codePoint: "U+2602", htmlEntity: "&#9730;", cssContent: "\\2602", category: "Stars & Shapes" },
  { char: "\u2601", name: "Cloud", codePoint: "U+2601", htmlEntity: "&#9729;", cssContent: "\\2601", category: "Stars & Shapes" },
  { char: "\u2600", name: "Black Sun With Rays", codePoint: "U+2600", htmlEntity: "&#9728;", cssContent: "\\2600", category: "Stars & Shapes" },
  { char: "\u2603", name: "Snowman", codePoint: "U+2603", htmlEntity: "&#9731;", cssContent: "\\2603", category: "Stars & Shapes" },
  { char: "\u269B", name: "Atom Symbol", codePoint: "U+269B", htmlEntity: "&#9883;", cssContent: "\\269B", category: "Stars & Shapes" },
  { char: "\u2620", name: "Skull and Crossbones", codePoint: "U+2620", htmlEntity: "&#9760;", cssContent: "\\2620", category: "Stars & Shapes" },
  { char: "\u262F", name: "Yin Yang", codePoint: "U+262F", htmlEntity: "&#9775;", cssContent: "\\262F", category: "Stars & Shapes" },
  { char: "\u262E", name: "Peace Symbol", codePoint: "U+262E", htmlEntity: "&#9774;", cssContent: "\\262E", category: "Stars & Shapes" },

  // Box Drawing
  { char: "\u2500", name: "Box Light Horizontal", codePoint: "U+2500", htmlEntity: "&#9472;", cssContent: "\\2500", category: "Box Drawing" },
  { char: "\u2502", name: "Box Light Vertical", codePoint: "U+2502", htmlEntity: "&#9474;", cssContent: "\\2502", category: "Box Drawing" },
  { char: "\u250C", name: "Box Light Down And Right", codePoint: "U+250C", htmlEntity: "&#9484;", cssContent: "\\250C", category: "Box Drawing" },
  { char: "\u2510", name: "Box Light Down And Left", codePoint: "U+2510", htmlEntity: "&#9488;", cssContent: "\\2510", category: "Box Drawing" },
  { char: "\u2514", name: "Box Light Up And Right", codePoint: "U+2514", htmlEntity: "&#9492;", cssContent: "\\2514", category: "Box Drawing" },
  { char: "\u2518", name: "Box Light Up And Left", codePoint: "U+2518", htmlEntity: "&#9496;", cssContent: "\\2518", category: "Box Drawing" },
  { char: "\u251C", name: "Box Light Vertical And Right", codePoint: "U+251C", htmlEntity: "&#9500;", cssContent: "\\251C", category: "Box Drawing" },
  { char: "\u2524", name: "Box Light Vertical And Left", codePoint: "U+2524", htmlEntity: "&#9508;", cssContent: "\\2524", category: "Box Drawing" },
  { char: "\u252C", name: "Box Light Down And Horizontal", codePoint: "U+252C", htmlEntity: "&#9516;", cssContent: "\\252C", category: "Box Drawing" },
  { char: "\u2534", name: "Box Light Up And Horizontal", codePoint: "U+2534", htmlEntity: "&#9524;", cssContent: "\\2534", category: "Box Drawing" },
  { char: "\u253C", name: "Box Light Vertical And Horizontal", codePoint: "U+253C", htmlEntity: "&#9532;", cssContent: "\\253C", category: "Box Drawing" },
  { char: "\u2550", name: "Box Double Horizontal", codePoint: "U+2550", htmlEntity: "&#9552;", cssContent: "\\2550", category: "Box Drawing" },
  { char: "\u2551", name: "Box Double Vertical", codePoint: "U+2551", htmlEntity: "&#9553;", cssContent: "\\2551", category: "Box Drawing" },
  { char: "\u2552", name: "Box Down Single And Right Double", codePoint: "U+2552", htmlEntity: "&#9554;", cssContent: "\\2552", category: "Box Drawing" },
  { char: "\u2554", name: "Box Double Down And Right", codePoint: "U+2554", htmlEntity: "&#9556;", cssContent: "\\2554", category: "Box Drawing" },
  { char: "\u2557", name: "Box Double Down And Left", codePoint: "U+2557", htmlEntity: "&#9559;", cssContent: "\\2557", category: "Box Drawing" },
  { char: "\u255A", name: "Box Double Up And Right", codePoint: "U+255A", htmlEntity: "&#9562;", cssContent: "\\255A", category: "Box Drawing" },
  { char: "\u255D", name: "Box Double Up And Left", codePoint: "U+255D", htmlEntity: "&#9565;", cssContent: "\\255D", category: "Box Drawing" },
  { char: "\u2560", name: "Box Double Vertical And Right", codePoint: "U+2560", htmlEntity: "&#9568;", cssContent: "\\2560", category: "Box Drawing" },
  { char: "\u2563", name: "Box Double Vertical And Left", codePoint: "U+2563", htmlEntity: "&#9571;", cssContent: "\\2563", category: "Box Drawing" },
  { char: "\u2566", name: "Box Double Down And Horizontal", codePoint: "U+2566", htmlEntity: "&#9574;", cssContent: "\\2566", category: "Box Drawing" },
  { char: "\u2569", name: "Box Double Up And Horizontal", codePoint: "U+2569", htmlEntity: "&#9577;", cssContent: "\\2569", category: "Box Drawing" },
  { char: "\u256C", name: "Box Double Vertical And Horizontal", codePoint: "U+256C", htmlEntity: "&#9580;", cssContent: "\\256C", category: "Box Drawing" },
  { char: "\u2588", name: "Full Block", codePoint: "U+2588", htmlEntity: "&#9608;", cssContent: "\\2588", category: "Box Drawing" },
  { char: "\u2591", name: "Light Shade", codePoint: "U+2591", htmlEntity: "&#9617;", cssContent: "\\2591", category: "Box Drawing" },
  { char: "\u2592", name: "Medium Shade", codePoint: "U+2592", htmlEntity: "&#9618;", cssContent: "\\2592", category: "Box Drawing" },
  { char: "\u2593", name: "Dark Shade", codePoint: "U+2593", htmlEntity: "&#9619;", cssContent: "\\2593", category: "Box Drawing" },

  // Punctuation
  { char: "\u2014", name: "Em Dash", codePoint: "U+2014", htmlEntity: "&mdash;", cssContent: "\\2014", category: "Punctuation" },
  { char: "\u2013", name: "En Dash", codePoint: "U+2013", htmlEntity: "&ndash;", cssContent: "\\2013", category: "Punctuation" },
  { char: "\u2026", name: "Horizontal Ellipsis", codePoint: "U+2026", htmlEntity: "&hellip;", cssContent: "\\2026", category: "Punctuation" },
  { char: "\u201C", name: "Left Double Quotation Mark", codePoint: "U+201C", htmlEntity: "&ldquo;", cssContent: "\\201C", category: "Punctuation" },
  { char: "\u201D", name: "Right Double Quotation Mark", codePoint: "U+201D", htmlEntity: "&rdquo;", cssContent: "\\201D", category: "Punctuation" },
  { char: "\u2018", name: "Left Single Quotation Mark", codePoint: "U+2018", htmlEntity: "&lsquo;", cssContent: "\\2018", category: "Punctuation" },
  { char: "\u2019", name: "Right Single Quotation Mark", codePoint: "U+2019", htmlEntity: "&rsquo;", cssContent: "\\2019", category: "Punctuation" },
  { char: "\u00AB", name: "Left Guillemet", codePoint: "U+00AB", htmlEntity: "&laquo;", cssContent: "\\00AB", category: "Punctuation" },
  { char: "\u00BB", name: "Right Guillemet", codePoint: "U+00BB", htmlEntity: "&raquo;", cssContent: "\\00BB", category: "Punctuation" },
  { char: "\u2022", name: "Bullet", codePoint: "U+2022", htmlEntity: "&bull;", cssContent: "\\2022", category: "Punctuation" },
  { char: "\u00B7", name: "Middle Dot", codePoint: "U+00B7", htmlEntity: "&middot;", cssContent: "\\00B7", category: "Punctuation" },
  { char: "\u2020", name: "Dagger", codePoint: "U+2020", htmlEntity: "&dagger;", cssContent: "\\2020", category: "Punctuation" },
  { char: "\u2021", name: "Double Dagger", codePoint: "U+2021", htmlEntity: "&Dagger;", cssContent: "\\2021", category: "Punctuation" },
  { char: "\u00A7", name: "Section Sign", codePoint: "U+00A7", htmlEntity: "&sect;", cssContent: "\\00A7", category: "Punctuation" },
  { char: "\u00B6", name: "Pilcrow Sign", codePoint: "U+00B6", htmlEntity: "&para;", cssContent: "\\00B6", category: "Punctuation" },
  { char: "\u00A9", name: "Copyright Sign", codePoint: "U+00A9", htmlEntity: "&copy;", cssContent: "\\00A9", category: "Punctuation" },
  { char: "\u00AE", name: "Registered Sign", codePoint: "U+00AE", htmlEntity: "&reg;", cssContent: "\\00AE", category: "Punctuation" },
  { char: "\u2122", name: "Trade Mark Sign", codePoint: "U+2122", htmlEntity: "&trade;", cssContent: "\\2122", category: "Punctuation" },
  { char: "\u00B0", name: "Degree Sign", codePoint: "U+00B0", htmlEntity: "&deg;", cssContent: "\\00B0", category: "Punctuation" },
  { char: "\u00B9", name: "Superscript One", codePoint: "U+00B9", htmlEntity: "&sup1;", cssContent: "\\00B9", category: "Punctuation" },
  { char: "\u00B2", name: "Superscript Two", codePoint: "U+00B2", htmlEntity: "&sup2;", cssContent: "\\00B2", category: "Punctuation" },
  { char: "\u00B3", name: "Superscript Three", codePoint: "U+00B3", htmlEntity: "&sup3;", cssContent: "\\00B3", category: "Punctuation" },
  { char: "\u00BC", name: "Fraction One Quarter", codePoint: "U+00BC", htmlEntity: "&frac14;", cssContent: "\\00BC", category: "Punctuation" },
  { char: "\u00BD", name: "Fraction One Half", codePoint: "U+00BD", htmlEntity: "&frac12;", cssContent: "\\00BD", category: "Punctuation" },
  { char: "\u00BE", name: "Fraction Three Quarters", codePoint: "U+00BE", htmlEntity: "&frac34;", cssContent: "\\00BE", category: "Punctuation" },
  { char: "\u00BF", name: "Inverted Question Mark", codePoint: "U+00BF", htmlEntity: "&iquest;", cssContent: "\\00BF", category: "Punctuation" },
  { char: "\u00A1", name: "Inverted Exclamation Mark", codePoint: "U+00A1", htmlEntity: "&iexcl;", cssContent: "\\00A1", category: "Punctuation" },
  { char: "\u00AC", name: "Not Sign", codePoint: "U+00AC", htmlEntity: "&not;", cssContent: "\\00AC", category: "Punctuation" },
  { char: "\u00A6", name: "Broken Bar", codePoint: "U+00A6", htmlEntity: "&brvbar;", cssContent: "\\00A6", category: "Punctuation" },
  { char: "\u2030", name: "Per Mille Sign", codePoint: "U+2030", htmlEntity: "&permil;", cssContent: "\\2030", category: "Punctuation" },
];

export function UnicodeLookupTool() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Ctrl/Cmd+K focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    let items = UNICODE_DATA;
    if (category !== "All") {
      items = items.filter((u) => u.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.codePoint.toLowerCase().includes(q) ||
          u.char === q ||
          u.htmlEntity.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, category]);

  async function copyChar(char: string, name: string) {
    try {
      await navigator.clipboard.writeText(char);
      setToast(`Copied ${name}!`);
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  return (
    <div>
      {/* Search */}
      <div className={cx("rounded-2xl border shadow-sm", base)}>
        <div className="p-3">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by name (e.g., "check mark", "arrow", "heart")...'
            className={cx(
              "w-full rounded-2xl border px-3 py-2 text-sm leading-6 outline-none min-h-[44px]",
              inputBase,
              isDark
                ? "focus:ring-2 focus:ring-white/10"
                : "focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cx(
              "text-sm rounded-xl px-3 min-h-[44px] border transition-colors font-medium",
              category === cat
                ? isDark
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-emerald-500/40 bg-emerald-50 text-emerald-700"
                : btnBase
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className={cx("mt-4 text-xs", muted)}>
        {filtered.length} character{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Results grid */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-live="polite">
        {filtered.map((u) => (
          <button
            key={u.codePoint}
            type="button"
            onClick={() => copyChar(u.char, u.name)}
            title={`Click to copy ${u.name}`}
            className={cx(
              "rounded-xl border p-4 text-left transition-colors min-h-[44px]",
              isDark
                ? "border-white/10 bg-neutral-900 hover:bg-neutral-800"
                : "border-black/10 bg-white hover:bg-neutral-50"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cx(
                  "text-4xl leading-none shrink-0 w-12 h-12 flex items-center justify-center rounded-lg",
                  isDark ? "bg-white/5" : "bg-black/5"
                )}
              >
                {u.char}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate">{u.name}</div>
                <div className={cx("mt-1 text-xs font-mono space-y-0.5", muted)}>
                  <div>{u.codePoint}</div>
                  <div>{u.htmlEntity}</div>
                  <div>CSS: {u.cssContent}</div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={cx("mt-8 text-center text-sm", muted)}>
          No characters found. Try a different search term or category.
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("mt-6 text-xs text-center", muted)}>
        Click any character to copy &middot; Ctrl/Cmd + K focuses search &middot; Ctrl/Cmd + L toggles theme
      </div>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
