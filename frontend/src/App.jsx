import React, { useState, useEffect, useCallback } from 'react';
import './index.css'; // Import your CSS styles
// Word lists for the game
// In a real application, these would be much larger and potentially loaded dynamically.
const allowedWords = [
  "APPLE", "BAKER", "CRANE", "DREAM", "EAGLE", "FROST", "GRAIN", "HOUSE", "IDEAL", "JOINT",
  "KIDDY", "LIGHT", "MOUTH", "NIGHT", "OASIS", "PLANT", "QUEEN", "RIVER", "STONE", "TRAIN",
  "UNION", "VALUE", "WHALE", "YOUTH", "ZEBRA", "ABIDE", "ABOUT", "ACUTE", "ADMIT", "ALERT",
  "ALIVE", "ALOFT", "AMONG", "APPLY", "ARENA", "ARGUE", "AROSE", "ASIDE", "AUDIO", "AVOID",
  "BASIC", "BEGAN", "BEGIN", "BELOW", "BIBLE", "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK",
  "BLOOD", "BOARD", "BOAST", "BONES", "BOOTH", "BOUND", "BOWEL", "BRAIN", "BRAND", "BRASS",
  "BRAVE", "BREAD", "BREAK", "BRIDE", "BRIEF", "BRING", "BROAD", "BROKE", "BROWN", "BUILD",
  "BUNCH", "BURST", "BUYER", "CABLE", "CALVE", "CARRY", "CATCH", "CAUSE", "CEASE", "CHAIN",
  "CHAIR", "CHAMP", "CHART", "CHASE", "CHEAT", "CHECK", "CHEST", "CHIEF", "CHILD", "CHILL",
  "CHOIR", "CHOKE", "CIVIL", "CLAIM", "CLASH", "CLASS", "CLEAN", "CLEAR", "CLERK", "CLICK",
  "CLING", "CLOCK", "CLOSE", "CLOUD", "COACH", "COAST", "COLOR", "COMMA", "COUNT", "COURT",
  "COVER", "CRACK", "CRAFT", "CRASH", "CRAZY", "CREAM", "CRIME", "CROWS", "CRUDE", "CRUEL",
  "CRUSH", "CURLY", "CYCLE", "DADDY", "DAILY", "DANCE", "DANGER", "DATED", "DAUNT", "DEALT",
  "DEATH", "DEBTS", "DEBUT", "DECAY", "DECOR", "DECRY", "DEEDS", "DEFER", "DEIGN", "DELAY",
  "DELHI", "DELTA", "DENSE", "DEPOT", "DEPTH", "DERBY", "DETAX", "DEVIL", "DIARY", "DICEY",
  "DIETS", "DIGIT", "DILLY", "DIRTY", "DISCO", "DITCH", "DIVER", "DOING", "DOLLS", "DONOR",
  "DOUBT", "DOUGH", "DOWEL", "DRAIN", "DRAWN", "DREAD", "DRESS", "DRILL", "DRINK", "DRIVE",
  "DROVE", "DRUNK", "DRYER", "DULLY", "DUMMY", "DUMPS", "DUNCE", "EARLY", "EARNS", "EARTH",
  "EASTS", "EIGHT", "ELECT", "ELITE", "EMPTY", "ENDOW", "ENJOY", "ENTER", "ENTRY", "ENVOY",
  "EQUAL", "ERROR", "ESSAY", "EVENT", "EVERY", "EXACT", "EXCEL", "EXIST", "EXPEL", "FAIRY",
  "FAITH", "FALSE", "FANCI", "FANCY", "FARCE", "FARMER", "FATAL", "FAULT", "FAVOR", "FEAST",
  "FEELING", "FEWER", "FIBER", "FIELD", "FIFTY", "FIGHT", "FILET", "FINAL", "FIRST", "FISKY",
  "FIXED", "FLAME", "FLASH", "FLEET", "Flesh", "FLING", "FLOOD", "FLOOR", "FLOUR", "FLUID",
  "FLUSH", "FOCAL", "FOCUS", "FORGE", "FORTH", "FORTY", "FORUM", "FOUND", "FRAME", "FRANK",
  "FRESH", "FRONT", "FROTH", "FUNKY", "FUNNY", "GAILY", "GAINX", "GAMMA", "GAMES", "GANGL",
  "GHOST", "GIANT", "GIVEN", "GLADE", "GLASS", "GLEAM", "GLOOM", "GLORY", "GLOVE", "GODLY",
  "GOING", "GOODS", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS", "GRAVE", "GREAT", "GREEN",
  "GRIEF", "GRILL", "GRIND", "GROOM", "GROSS", "GROUP", "GROWL", "GUEST", "GUIDE", "GUILTY",
  "HABIT", "HALLS", "HANDY", "HAPPY", "HARMS", "HASTY", "HAVOC", "HAZEL", "HEART", "HEAVY",
  "HENCE", "HIGHX", "HIKER", "HILLS", "HINTS", "HIRED", "HOLLY", "HONEY", "HONOR", "HORSE",
  "HOTEL", "HUMAN", "HUMOR", "HUNGRY", "HURRY", "IDEAS", "IMAGE", "IMPLY", "INCOME", "INDEX",
  "INFER", "INNER", "INPUT", "INTEL", "ISSUE", "ITCHY", "JOINS", "JOIST", "JOKER", "JOLLY",
  "JUMPY", "JUROR", "KARMA", "KEENS", "KEEPX", "KILLS", "KINDS", "KINGS", "KINKY", "KNEEL",
  "KNIFE", "KNOCK", "KNOWN", "LADEN", "LAKES", "LAMBS", "LARGE", "LATER", "LATIN", "LAUGH",
  "LAYER", "LEADS", "LEARN", "LEAVE", "LEGAL", "LEMON", "LEVEL", "LEVER", "LIABI", "LIFES",
  "LIMIT", "LINEN", "LINES", "LIONS", "LIVED", "LIVER", "LIVES", "LOADS", "LOCAL", "LODGE",
  "LOGIC", "LOOSE", "LORDS", "LOVER", "LOVES", "LUCKY", "LUNCH", "LUNGS", "MADAM", "MAGIC",
  "MAJOR", "MAKER", "MALEA", "MAMMA", "MANOR", "MAPLE", "MARCH", "MARKS", "MARRY", "MASON",
  "MATCH", "MATTER", "MAXIM", "MAYBE", "MEANS", "MEASURE", "MECCA", "MEDIA", "MERRY", "METAL",
  "MIGHT", "MILES", "MINDS", "MINER", "MINOR", "MIXED", "MODEL", "MODES", "MOIST", "MONEY",
  "MONTH", "MOODY", "MORAL", "MOTOR", "MOUNT", "MOURN", "MOUSE", "MOVED", "MOVES", "MOVIE",
  "MUSIC", "NAKED", "NAMES", "NARROW", "NATIV", "NATUR", "NAVAL", "NEARLY", "NEEDS", "NERVO",
  "NEVER", "NEWLY", "NICEZ", "NINTH", "NOBLE", "NOISE", "NORTH", "NOSES", "NOTIC", "NURSE",
  "OBLIG", "OCCUR", "OCEAN", "OFFER", "OFFIC", "OFTEN", "OLDER", "OLYMP", "OMNIS", "ONION",
  "OPENS", "OPERA", "ORDER", "OTHER", "OUGHT", "OUTER", "OUTFIT", "OVALY", "OWNER", "PAINS",
  "PAINT", "PANEL", "PAPER", "PARIS", "PARKS", "PARTS", "PARTY", "PAUSE", "PEACE", "PEARL",
  "PENAL", "PEPSI", "PERCH", "PERIL", "PETTY", "PHONE", "PHOTO", "PIANO", "PICKS", "PIECE",
  "PIGGY", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANS", "PLATO", "PLAYA", "PLAZA", "POINT",
  "POLES", "POLIC", "PORCH", "PORTY", "POWER", "PRESS", "PRICE", "PRIDE", "PRIMA", "PRINT",
  "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE", "PULLS", "PULSE", "PUNCH", "PUPIL", "PUREL",
  "PURSE", "PUSHY", "QUACK", "QUANT", "QUASH", "QUICK", "QUIET", "QUILT", "QUITE", "QUOTE",
  "RADIO", "RAILS", "RAISE", "RANDY", "RANGE", "RANKX", "RAPID", "RARELY", "RATES", "RATIO",
  "RAZOR", "REACH", "REACT", "READY", "REALM", "REBEL", "RECALL", "RECON", "REFER", "REIGN",
  "RELAX", "RELAY", "RELIC", "RELYX", "REMAR", "REMOS", "RENTS", "REPLY", "RESET", "RESIN",
  "RESPO", "RESTS", "REVEA", "REVIS", "REVOL", "RHYME", "RIGHT", "RINGS", "RISEN", "RISKY",
  "RIVAL", "ROADS", "ROAMS", "ROAST", "ROBIN", "ROBOT", "ROCKY", "ROLES", "ROMAN", "ROOFS",
  "ROOMY", "ROUTE", "ROYAL", "RUDDY", "RULER", "RUMOR", "RURAL", "RUSTY", "SACRE", "SADLY",
  "SAFER", "SAINT", "SALAD", "SALES", "SALON", "SALSA", "SALTS", "SAMEZ", "SANDS", "SATIN",
  "SAUCE", "SAXON", "SCALY", "SCANT", "SCARC", "SCARY", "SCENE", "SCENT", "SCHEM", "SCORE",
  "SCOUT", "SCREW", "SEALS", "SEAMS", "SEARCH", "SEATS", "SECOND", "SECRE", "SECTS", "SECURE",
  "SEEKS", "SEEMS", "SELDO", "SELFY", "SENDS", "SENSE", "SERGE", "SERUM", "SERVE", "SEVEN",
  "SHADE", "SHAKE", "SHALL", "SHAME", "SHAPE", "SHARE", "SHARP", "SHEEP", "SHEER", "SHELF",
  "SHELL", "SHIFT", "SHINE", "SHIRT", "SHOCK", "SHOES", "SHOOT", "SHOPX", "SHORE", "SHORT",
  "SHOTS", "SHOUT", "SHOWN", "SHRUG", "SHUTS", "SICKY", "SIDES", "SIEGE", "SIGHT", "SIGNS",
  "SILEN", "SILKY", "SILVA", "SIMPL", "SINGS", "SINKY", "SIREN", "SIXTH", "SIZED", "SKILL",
  "SKIRT", "SLAVE", "SLEEP", "SLICE", "SLIDE", "SLIGHT", "SLING", "SLOPE", "SLOTH", "SMALL",
  "SMART", "SMELL", "SMILE", "SMOKE", "SNAKE", "SNOWY", "SOAPS", "SOBER", "SOLID", "SOLVE",
  "SOMEX", "SONGS", "SOONER", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPARK", "SPEND",
  "SPENT", "SPICE", "SPINE", "SPINY", "SPLIT", "SPOKE", "SPORT", "SPOTX", "SPRAY", "SPREA",
  "STAFF", "STAGE", "STAND", "START", "STATE", "STAYX", "STEEL", "STEEP", "STEER", "STEMS",
  "STEPS", "STICK", "STILL", "STING", "STOCK", "STONE", "STOOL", "STOOP", "STORE", "STORM",
  "STORY", "STRAN", "STRAP", "STRAW", "STRAY", "STRES", "STRIK", "STRIP", "STUDY", "STUFF",
  "STYLE", "SUGAR", "SUITE", "SUMME", "SUNNY", "SUPER", "SURGE", "SWEAR", "SWEAT", "SWEEP",
  "SWEET", "SWIFT", "SWING", "SWIRL", "TABLE", "TAKEN", "TALKS", "TALLS", "TANGY", "TASTY",
  "TEACH", "TEAMS", "TEARS", "TEENS", "TEETH", "TELLX", "TEMPL", "TENDS", "TENSE", "TERMS",
  "TESTS", "TEXAS", "THANK", "THEFT", "THEIR", "THEME", "THERE", "THICK", "THING", "THINK",
  "THIRD", "THOSE", "THOUS", "THREE", "THREW", "THROW", "TIGHT", "TIMER", "TIRED", "TITLE",
  "TODAY", "TOKEN", "TOMBS", "TONAL", "TONGS", "TOOXY", "TOPIC", "TOTAL", "TOUCH", "TOUGH",
  "TOWAR", "TOWNS", "TRACE", "TRACK", "TRADE", "TRAIL", "TRAIT", "TRANS", "TRASH", "TREAT",
  "TREES", "TREND", "TRIAD", "TRIBE", "TRICK", "TRITE",
  "TRUNK", "TRUST", "TRUTH", "TULIP", "TUMMY", "TUNIC", "TWINE", "TWIRL", "ULCER", "ULTRA",
  "UMBRA", "UNIFY", "UNION", "UNZIP", "UPPER", "URBAN", "USHER", "VALID", "VALUE", "VAPOR",
  "VAULT", "VENUE", "VERGE", "VERSE", "VIEWS", "VILLA", "VINES", "VITAL", "VIVID", "VOICE",
  "VOWEL", "WAGON", "WAIST", "WAKEN", "WANDER", "WATCH", "WATER", "WEARY", "WHEEL",
  "WHIFF", "WHILE", "WHINE", "WHIRL", "WHITE", "WHOLE", "WIDEN", "WINDY", "WINCE", "WOMAN",
  "WORLD", "WORRY", "WORTH", "WOVEN", "WRATH", "WRECK", "WRITE", "WRONG", "YACHT", "YIELD",
  "YOUNG", "ZEBRA", "ZONAL", "ZONED", "ZOOMY", "ZONKS", "ABACK", "ABASH", "ABATE", "ABBEY", "ABBOT", "ABHOR", "ABIDE", "ABOVE", "ABOXY", "ABOUT",
  "ACORN", "ACUTE", "ADAPT", "ADMIT", "ADOBE", "ADOPT", "ADORE", "AHEAD", "AISLE", "ALARM",
  "ALBUM", "ALERT", "ALGAE", "ALIKE", "ALIVE", "ALLOY", "ALPHA", "ALTAR", "AMASS", "AMBER",
  "AMISS", "AMPLY", "AMUSE", "ANGEL", "ANGER", "ANGLE", "ANGRY", "ANKLE", "APART", "APPLE",
  "APPLY", "APRIL", "APTLY", "ARCHY", "ARENA", "ARGUE", "ARISE", "ARMOR", "AROMA", "AROSE",
  "ASIDE", "AUDIO", "AUNIT", "AUNTY", "AVAIL", "AVERT", "AWAIT", "AWAKE", "AWARD", "AWARE",
  "AWFUL", "AXIOM", "AZTEC", "BABEL", "BADGE", "BAKER", "BALDY", "BASIC", "BASIN", "BATCH",
  "BATHS", "BATON", "BEACH", "BEADY", "BEAMY", "BEANS", "BEARD", "BEAST", "BEAUT", "BEGIN",
  "BEGUN", "BEING", "BELOW", "BIBLE", "BIGOT", "BLAME", "BLAND", "BLANK", "BLEAK", "BLIND",
  "BLOAT", "BLUFF", "BOARD", "BOAST", "BONES", "BOOTH", "BORED", "BOUND", "BOWEL", "BRAIN",
  "BRASS", "BRAVE", "BREAD", "BREAK", "BRIDE", "BRING", "BROAD", "BROKE", "BROWN", "BUILD",
  "BULKY", "BUNCH", "BURST", "CABIN", "CABLE", "CANAL", "CANDY", "CARRY", "CATER", "CAUSA",
  "CHAIR", "CHAMP", "CHART", "CHASE", "CHEAT", "CHECK", "CHIEF", "CHILD", "CHILL", "CHOIR",
  "CHOKE", "CIVIL", "CLAIM", "CLASH", "CLASS", "CLEAN", "CLEAR", "CLERK", "CLICK", "CLIFF",
  "CLING", "CLOCK", "CLOSE", "CLOUD", "COAST", "COLOR", "COMMA", "CONCH", "COURT", "COVER",
  "CRACK", "CRAFT", "CRANE", "CRASH", "CRAZY", "CREAM", "CRIME", "CRUDE", "CRUEL", "CRUSH",
  "CUBAN", "CYCLE", "DANCE", "DREAM", "DRINK", "DRIVE", "EARLY", "EIGHT", "EJECT", "ENJOY",
  "ENTER", "EQUIP", "ERASE", "ERROR", "EVENT", "EXACT", "EXIST", "EXTRA", "FABLE", "FAIRY",
  "FAITH", "FALSE", "FANCI", "FANCY", "FARCE", "FATAL", "FAULT", "FEAST", "FIBER", "FIELD",
  "FIFTY", "FIGHT", "FINAL", "FIRST", "FIXED", "FLAME", "FLASH", "FLEET", "FLING", "FLOOD",
  "FLOOR", "FLOUR", "FLUID", "FLUSH", "FOCAL", "FOCUS", "FORGE", "FORTY", "FORUM", "FOUND",
  "FRAME", "FRANK", "FRESH", "FRONT", "FROST", "FROTH", "FUNKY", "FUNNY", "GAMMA", "GAMES",
  "GHOST", "GIANT", "GIVEN", "GLADE", "GLASS", "GLEAM", "GLOOM", "GLORY", "GLOVE", "GOODS",
  "GRACE", "GRADE", "GRAIN", "GRAND", "GRANT", "GRASS", "GRAVE", "GREAT", "GREEN", "GRIEF",
  "GRILL", "GRIND", "GROOM", "GROSS", "GROUP", "GROWL", "GUEST", "GUIDE", "HABIT", "HALLS",
  "HANDY", "HAPPY", "HARMS", "HASTY", "HAVOC", "HEART", "HEAVY", "HENCE", "HIKER", "HILLS",
  "HINTS", "HONEY", "HONOR", "HORSE", "HOTEL", "HOUSE", "HUMAN", "HUMOR", "HUNGRY", "HURRY",
  "IDEAL", "IMAGE", "IMPLY", "INCOME", "INDEX", "INFER", "INNER", "INPUT", "ISSUE", "ITCHY",
  "JOINT", "JOIST", "JOKER", "JOLLY", "JUMPY", "JUROR", "KAYAK", "KAZOO", "KNACK", "KNELT",
  "LABEL", "LADLE", "LAKEY", "LATCH", "LATHE", "LAYER", "LEMON", "LIBEL", "LIGHT", "LIMBO",
  "LITER", "LOBBY", "LODGE", "LOOSE", "LORDS", "LOVER", "LOVES", "LUCKY", "LUMPY", "LUNGE",
  "MANOR", "MARCH", "MATCH", "MAVEN", "MECCA", "MERRY", "MICRO", "MIMIC", "MINIM", "MODEL",
  "MOIST", "MONEY", "MOODY", "MORAL", "MURAL",
  "MYTHS", "NAIVE", "NAVEL", "NEIGH", "NIGHT", "NINJA", "NOBLE", "NOMAD", "NORTH", "NOSES",
  "OASIS", "OCEAN", "OCTAL", "OFTEN", "OLIVE", "OMEGA", "OPERA", "ORBIT", "ORDER", "OUNCE",
  "OUTER", "OZONE", "PALSY", "PANEL", "PARKA", "PARTY", "PEACE", "PEARL", "PECAN", "PERCH",
  "PINEA", "PIXEL", "PLANK", "PLUSH", "POISE", "POLAR", "POOCH", "POPPA", "PORCH", "POUND",
  "POWER", "PRANK", "PRIME", "PROBE", "PROXY", "PUPIL", "PUPPY", "QUEEN", "QUICK", "QUIET",
  "QUILT", "QUIRK", "RADIO", "RALLY", "RANGE", "RAVEN", "RAZOR", "READY", "REALM", "REBUS",
  "REIGN", "RELAY", "REMOR", "RHYME", "RIGHT", "RIPEN", "ROBIN", "ROBOT", "RODEO", "ROGUE",
  "ROYAL", "RUSTY", "SAINT", "SALSA", "SCARF", "SCENT", "SCOFF", "SCRAP", "SENSE", "SERUM",
  "SHADE", "SHANK", "SHARP", "SHELF", "SHELL", "SHINY", "SHOVE", "SIEGE", "SIGHT", "SINCE",
  "SKEIN", "SKIMP", "SLATE", "SLEEK", "SLICK", "SLING", "SLOPE", "SMALL", "SMEAR", "SMILE",
  "SMOKE", "SNAKE", "SNEAK", "SNOUT", "SOLVE", "SOUND", "SPOIL", "SPORT", "SPURT", "SQUID",
  "STAFF", "STALE", "STAND", "STEEL", "STING", "STOCK", "STONE", "STORK", "STOUT", "STRAP",
  "STREW", "STRIP", "SUGAR", "SULKY", "SWELL", "SWIFT", "SWING", "SWIRL", "TABLE", "TAKEN",
  "TAPER", "TAUNT", "THANK", "THEFT", "THORN", "THREE", "THUMB", "TIGHT", "TIMER", "TIPSY",
  "TODAY", "TONIC", "TOPIC", "TORSO", "TOTAL", "TOUCH", "TOUGH", "TOWEL", "TRACE", "TRACK",
  "TRADE", "TRAIL", "TRAIN", "TRASH", "TREAT", "TREND", "TRIAD", "TRIBE", "TRICK", "TRITE",
  "TRUNK", "TRUST", "TRUTH", "TULIP", "TUMMY", "TUNIC", "TWINE", "TWIRL", "ULCER", "ULTRA",
  "UMBRA", "UNIFY", "UNION", "UNZIP", "UPPER", "URBAN", "USHER", "VALID", "VALUE", "VAPOR",
  "VAULT", "VENUE", "VERGE", "VERSE", "VIEWS", "VILLA", "VINES", "VITAL", "VIVID", "VOICE",
  "VOWEL", "WAGON", "WAIST", "WAKEN", "WANDER", "WATCH", "WATER", "WEARY", "WHEEL",
  "WHIFF", "WHILE", "WHINE", "WHIRL", "WHITE", "WHOLE", "WIDEN", "WINDY", "WINCE", "WOMAN",
  "WORLD", "WORRY", "WORTH", "WOVEN", "WRATH", "WRECK", "WRITE", "WRONG", "YACHT", "YIELD",
  "YOUNG", "ZEBRA", "ZONAL", "ZONED", "ZOOMY", "ZONKS"
];


const solutionWords = [
  "ABACK", "ABASH", "ABATE", "ABBEY", "ABBOT", "ABHOR", "ABIDE", "ABOVE", "ABOXY", "ABOUT",
  "ACORN", "ACUTE", "ADAPT", "ADMIT", "ADOBE", "ADOPT", "ADORE", "AHEAD", "AISLE", "ALARM",
  "ALBUM", "ALERT", "ALGAE", "ALIKE", "ALIVE", "ALLOY", "ALPHA", "ALTAR", "AMASS", "AMBER",
  "AMISS", "AMPLY", "AMUSE", "ANGEL", "ANGER", "ANGLE", "ANGRY", "ANKLE", "APART", "APPLE",
  "APPLY", "APRIL", "APTLY", "ARCHY", "ARENA", "ARGUE", "ARISE", "ARMOR", "AROMA", "AROSE",
  "ASIDE", "AUDIO", "AUNIT", "AUNTY", "AVAIL", "AVERT", "AWAIT", "AWAKE", "AWARD", "AWARE",
  "AWFUL", "AXIOM", "AZTEC", "BABEL", "BADGE", "BAKER", "BALDY", "BASIC", "BASIN", "BATCH",
  "BATHS", "BATON", "BEACH", "BEADY", "BEAMY", "BEANS", "BEARD", "BEAST", "BEAUT", "BEGIN",
  "BEGUN", "BEING", "BELOW", "BIBLE", "BIGOT", "BLAME", "BLAND", "BLANK", "BLEAK", "BLIND",
  "BLOAT", "BLUFF", "BOARD", "BOAST", "BONES", "BOOTH", "BORED", "BOUND", "BOWEL", "BRAIN",
  "BRASS", "BRAVE", "BREAD", "BREAK", "BRIDE", "BRING", "BROAD", "BROKE", "BROWN", "BUILD",
  "BULKY", "BUNCH", "BURST", "CABIN", "CABLE", "CANAL", "CANDY", "CARRY", "CATER", "CAUSA",
  "CHAIR", "CHAMP", "CHART", "CHASE", "CHEAT", "CHECK", "CHIEF", "CHILD", "CHILL", "CHOIR",
  "CHOKE", "CIVIL", "CLAIM", "CLASH", "CLASS", "CLEAN", "CLEAR", "CLERK", "CLICK", "CLIFF",
  "CLING", "CLOCK", "CLOSE", "CLOUD", "COAST", "COLOR", "COMMA", "CONCH", "COURT", "COVER",
  "CRACK", "CRAFT", "CRANE", "CRASH", "CRAZY", "CREAM", "CRIME", "CRUDE", "CRUEL", "CRUSH",
  "CUBAN", "CYCLE", "DANCE", "DREAM", "DRINK", "DRIVE", "EARLY", "EIGHT", "EJECT", "ENJOY",
  "ENTER", "EQUIP", "ERASE", "ERROR", "EVENT", "EXACT", "EXIST", "EXTRA", "FABLE", "FAIRY",
  "FAITH", "FALSE", "FANCI", "FANCY", "FARCE", "FATAL", "FAULT", "FEAST", "FIBER", "FIELD",
  "FIFTY", "FIGHT", "FINAL", "FIRST", "FIXED", "FLAME", "FLASH", "FLEET", "FLING", "FLOOD",
  "FLOOR", "FLOUR", "FLUID", "FLUSH", "FOCAL", "FOCUS", "FORGE", "FORTY", "FORUM", "FOUND",
  "FRAME", "FRANK", "FRESH", "FRONT", "FROST", "FROTH", "FUNKY", "FUNNY", "GAMMA", "GAMES",
  "GHOST", "GIANT", "GIVEN", "GLADE", "GLASS", "GLEAM", "GLOOM", "GLORY", "GLOVE", "GOODS",
  "GRACE", "GRADE", "GRAIN", "GRAND", "GRANT", "GRASS", "GRAVE", "GREAT", "GREEN", "GRIEF",
  "GRILL", "GRIND", "GROOM", "GROSS", "GROUP", "GROWL", "GUEST", "GUIDE", "HABIT", "HALLS",
  "HANDY", "HAPPY", "HARMS", "HASTY", "HAVOC", "HEART", "HEAVY", "HENCE", "HIKER", "HILLS",
  "HINTS", "HONEY", "HONOR", "HORSE", "HOTEL", "HOUSE", "HUMAN", "HUMOR", "HUNGRY", "HURRY",
  "IDEAL", "IMAGE", "IMPLY", "INCOME", "INDEX", "INFER", "INNER", "INPUT", "ISSUE", "ITCHY",
  "JOINT", "JOIST", "JOKER", "JOLLY", "JUMPY", "JUROR", "KAYAK", "KAZOO", "KNACK", "KNELT",
  "LABEL", "LADLE", "LAKEY", "LATCH", "LATHE", "LAYER", "LEMON", "LIBEL", "LIGHT", "LIMBO",
  "LITER", "LOBBY", "LODGE", "LOOSE", "LORDS", "LOVER", "LOVES", "LUCKY", "LUMPY", "LUNGE",
  "MANOR", "MARCH", "MATCH", "MAVEN", "MECCA", "MERRY", "MICRO", "MIMIC", "MINIM", "MODEL",
  "MOIST", "MONEY", "MOODY", "MORAL", "MURAL",
  "MYTHS", "NAIVE", "NAVEL", "NEIGH", "NIGHT", "NINJA", "NOBLE", "NOMAD", "NORTH", "NOSES",
  "OASIS", "OCEAN", "OCTAL", "OFTEN", "OLIVE", "OMEGA", "OPERA", "ORBIT", "ORDER", "OUNCE",
  "OUTER", "OZONE", "PALSY", "PANEL", "PARKA", "PARTY", "PEACE", "PEARL", "PECAN", "PERCH",
  "PINEA", "PIXEL", "PLANK", "PLUSH", "POISE", "POLAR", "POOCH", "POPPA", "PORCH", "POUND",
  "POWER", "PRANK", "PRIME", "PROBE", "PROXY", "PUPIL", "PUPPY", "QUEEN", "QUICK", "QUIET",
  "QUILT", "QUIRK", "RADIO", "RALLY", "RANGE", "RAVEN", "RAZOR", "READY", "REALM", "REBUS",
  "REIGN", "RELAY", "REMOR", "RHYME", "RIGHT", "RIPEN", "ROBIN", "ROBOT", "RODEO", "ROGUE",
  "ROYAL", "RUSTY", "SAINT", "SALSA", "SCARF", "SCENT", "SCOFF", "SCRAP", "SENSE", "SERUM",
  "SHADE", "SHANK", "SHARP", "SHELF", "SHELL", "SHINY", "SHOVE", "SIEGE", "SIGHT", "SINCE",
  "SKEIN", "SKIMP", "SLATE", "SLEEK", "SLICK", "SLING", "SLOPE", "SMALL", "SMEAR", "SMILE",
  "SMOKE", "SNAKE", "SNEAK", "SNOUT", "SOLVE", "SOUND", "SPOIL", "SPORT", "SPURT", "SQUID",
  "STAFF", "STALE", "STAND", "STEEL", "STING", "STOCK", "STONE", "STORK", "STOUT", "STRAP",
  "STREW", "STRIP", "SUGAR", "SULKY", "SWELL", "SWIFT", "SWING", "SWIRL", "TABLE", "TAKEN",
  "TAPER", "TAUNT", "THANK", "THEFT", "THORN", "THREE", "THUMB", "TIGHT", "TIMER", "TIPSY",
  "TODAY", "TONIC", "TOPIC", "TORSO", "TOTAL", "TOUCH", "TOUGH", "TOWEL", "TRACE", "TRACK",
  "TRADE", "TRAIL", "TRAIN", "TRASH", "TREAT", "TREND", "TRIAD", "TRIBE", "TRICK", "TRITE",
  "TRUNK", "TRUST", "TRUTH", "TULIP", "TUMMY", "TUNIC", "TWINE", "TWIRL", "ULCER", "ULTRA",
  "UMBRA", "UNIFY", "UNION", "UNZIP", "UPPER", "URBAN", "USHER", "VALID", "VALUE", "VAPOR",
  "VAULT", "VENUE", "VERGE", "VERSE", "VIEWS", "VILLA", "VINES", "VITAL", "VIVID", "VOICE",
  "VOWEL", "WAGON", "WAIST", "WAKEN", "WANDER", "WATCH", "WATER", "WEARY", "WHEEL",
  "WHIFF", "WHILE", "WHINE", "WHIRL", "WHITE", "WHOLE", "WIDEN", "WINDY", "WINCE", "WOMAN",
  "WORLD", "WORRY", "WORTH", "WOVEN", "WRATH", "WRECK", "WRITE", "WRONG", "YACHT", "YIELD",
  "YOUNG", "ZEBRA", "ZONAL", "ZONED", "ZOOMY", "ZONKS"
];


// Component for a single cell on the Wordle board
const Cell = ({ letter, status }) => {
  // Determine CSS class based on status prop
  let cellClass = 'cell empty';
  if (status === 'typed') cellClass = 'cell typed';
  else if (status === 'absent') cellClass = 'cell absent';
  else if (status === 'present') cellClass = 'cell present';
  else if (status === 'correct') cellClass = 'cell correct';

  return (
    <div className={cellClass}>
      {letter}
    </div>
  );
};

// Component for the Wordle board
const Board = ({ guesses, currentGuess, wordToGuess }) => {
  const rows = Array(6).fill(null).map((_, rowIndex) => {
    const isCurrentRow = rowIndex === guesses.length;
    const word = isCurrentRow ? currentGuess : guesses[rowIndex];

    return (
      <div key={rowIndex} className="board-row">
        {Array(5).fill(null).map((_, cellIndex) => {
          const letter = word ? word[cellIndex] : '';
          let status = 'empty';

          if (isCurrentRow) {
            status = letter ? 'typed' : 'empty';
          } else if (word) {
            // Logic to determine status of guessed letters
            // Create a mutable array from the wordToGuess to track used letters
            const solutionChars = wordToGuess.split('');
            const guessChars = word.split('');

            // First, identify all 'correct' letters
            let currentStatuses = Array(5).fill('absent'); // Default to absent
            for (let i = 0; i < 5; i++) {
                if (guessChars[i] === solutionChars[i]) {
                    currentStatuses[i] = 'correct';
                    solutionChars[i] = null; // Mark as used
                    guessChars[i] = null; // Mark as used
                }
            }

            // Then, identify 'present' letters from remaining
            for (let i = 0; i < 5; i++) {
                if (guessChars[i] !== null) { // If not already marked 'correct'
                    const presentIndex = solutionChars.indexOf(guessChars[i]);
                    if (presentIndex !== -1) {
                        currentStatuses[i] = 'present';
                        solutionChars[presentIndex] = null; // Mark as used
                    }
                }
            }
            status = currentStatuses[cellIndex];
          }

          return <Cell key={cellIndex} letter={letter} status={status} />;
        })}
      </div>
    );
  });

  return (
    <div className="board-container">
      {rows}
    </div>
  );
};

// Component for the on-screen keyboard
const Keyboard = ({ onKeyPress, guessedLettersStatus }) => {
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⬅️'] // Changed 'BACKSPACE' to '⬅️'
  ];

  const getButtonClass = (key) => {
    const status = guessedLettersStatus[key];
    let buttonClass = 'key-button';
    if (key === 'ENTER' || key === '⬅️') { // Also use '⬅️' here for styling
      buttonClass += ' key-wide';
    }

    switch (status) {
      case 'correct': return buttonClass + ' key-correct';
      case 'present': return buttonClass + ' key-present';
      case 'absent': return buttonClass + ' key-absent';
      default: return buttonClass + ' key-default';
    }
  };

  return (
    <div className="keyboard-container">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getButtonClass(key)}
            >
              {key === '⬅️' ? ( // Changed 'BACKSPACE' to '⬅️' to render the icon
                <svg xmlns="http://www.w3.org/2000/svg" className="backspace-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                </svg>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

// Component for displaying messages to the user
const Message = ({ message }) => {
  if (!message) return null;
  return (
    <div className="message-box">
      {message}
    </div>
  );
};

// Modal component for game over messages
const Modal = ({ show, title, message, onPlayAgain, win }) => { // Added 'win' prop
  if (!show) return null;
  
  const modalContentClass = `modal-content ${win ? 'win' : ''}`; // Conditionally add 'win' class
  const playAgainButtonClass = `modal-play-again-btn`; // Class applied directly for styling
  // Note: the `win` class on modal-content already handles button styling due to CSS cascade.

  return (
    <div className="modal-overlay">
      <div className={modalContentClass}>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button
          onClick={onPlayAgain}
          className={playAgainButtonClass}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

// Component for displaying game rules
const RulesBox = () => {
  return (
    <div className="rules-box">
      <h3>How to Play Wordle</h3>
      <p>Guess the WORDLE in 6 tries.</p>
      <p>Each guess must be a valid 5-letter word. Hit the enter button to submit.</p>
      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
      <ul>
        <li>
          <div className="color-example correct-example">W</div>
          <span>The letter is in the word and in the correct spot.</span>
        </li>
        <li>
          <div className="color-example present-example">I</div>
          <span>The letter is in the word but in the wrong spot.</span>
        </li>
        <li>
          <div className="color-example absent-example">X</div>
          <span>The letter is not in the word in any spot.</span>
        </li>
      </ul>
      <p>A new WORDLE will be available each day!</p>
    </div>
  );
};


// Main App component for the Wordle game
export default function App() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [guesses, setGuesses] = useState([]); // Array of submitted guesses
  const [currentGuess, setCurrentGuess] = useState(''); // Current word being typed
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [message, setMessage] = useState('');
  const [guessedLettersStatus, setGuessedLettersStatus] = useState({}); // { A: 'absent', B: 'present', C: 'correct' }
  const [showRules, setShowRules] = useState(true); // State to toggle rules visibility

  // Function to pick a new word and reset game state
  const initializeGame = useCallback(() => {
    const newWord = solutionWords[Math.floor(Math.random() * solutionWords.length)];
    setWordToGuess(newWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWin(false);
    setMessage('');
    setGuessedLettersStatus({});
    console.log("New word to guess:", newWord); // For debugging
  }, []);

  useEffect(() => {
    initializeGame(); // Initialize game on component mount
  }, [initializeGame]);

  // Function to display a temporary message
  const showMessage = (msg, duration = 2000) => {
    setMessage(msg);
    const timer = setTimeout(() => setMessage(''), duration);
    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  };

  // Function to update keyboard letter statuses
  const updateGuessedLettersStatus = useCallback((guess) => {
    const newStatus = { ...guessedLettersStatus };
    const solutionLetters = wordToGuess.split('');
    const guessLetters = guess.split('');

    // Mark 'correct' letters first
    for (let i = 0; i < 5; i++) {
        const char = guessLetters[i];
        if (char === solutionLetters[i]) {
            newStatus[char] = 'correct';
        }
    }

    // Then mark 'present' or 'absent' letters
    for (let i = 0; i < 5; i++) {
        const char = guessLetters[i];
        if (newStatus[char] === 'correct') { // Already marked correct, skip
            continue;
        }

        if (solutionLetters.includes(char)) {
            // Check if this 'present' instance is valid (not already used by a 'correct' or another 'present' instance for the same letter)
            // This is a more robust way to handle duplicate letters
            let solutionCount = solutionLetters.filter(l => l === char).length;
            let correctCount = 0;
            let presentCount = 0;

            for(let j = 0; j < 5; j++) {
                if(guessLetters[j] === char && guessLetters[j] === solutionLetters[j]) {
                    correctCount++;
                } else if (guessLetters[j] === char && solutionLetters.includes(guessLetters[j]) && j <= i) {
                    // Check if this 'present' letter has been processed or if it's a new instance
                    let tempSolution = [...solutionLetters];
                    tempSolution[j] = null; // Temporarily mark current 'correct' position as used

                    if (j < i && solutionLetters.indexOf(char, j + 1) === -1 && tempSolution.includes(char)) {
                         presentCount++;
                    } else if (solutionLetters.includes(char)) {
                        presentCount++;
                    }
                }
            }

            // Adjust `presentCount` based on how many letters are actually "available" in the solution
            // that aren't consumed by 'correct' matches.
            let availableInSolution = solutionLetters.filter(l => l === char).length;
            let usedByCorrect = guessLetters.filter((g, idx) => g === char && solutionLetters[idx] === char).length;
            let remainingForPresent = availableInSolution - usedByCorrect;

            let numOccurrencesOfCharInGuessUpToIndex = guessLetters.slice(0, i + 1).filter(l => l === char).length;

            if (numOccurrencesOfCharInGuessUpToIndex <= remainingForPresent) {
                 if (newStatus[char] !== 'correct') { // Only update if not already correct
                     newStatus[char] = 'present';
                 }
            } else if (newStatus[char] !== 'correct' && newStatus[char] !== 'present') { // Only set absent if not correct/present
                 newStatus[char] = 'absent';
            }

        } else {
            if (newStatus[char] !== 'correct' && newStatus[char] !== 'present') { // Only set absent if not correct/present
                newStatus[char] = 'absent';
            }
        }
    }
    setGuessedLettersStatus(newStatus);
}, [guessedLettersStatus, wordToGuess]);

  // Handle key presses from both physical and on-screen keyboard
  const handleKeyPress = useCallback((key) => {
    if (gameOver) return;

    // Check for both 'BACKSPACE' (physical key) and '⬅️' (on-screen button)
    if (key === 'BACKSPACE' || key === '⬅️') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        showMessage('Not enough letters!');
        return;
      }
      if (!allowedWords.includes(currentGuess)) {
        showMessage("Oh sorry couldn't find the word. Try again", 3000); // Specific message
        return;
      }

      setGuesses((prev) => [...prev, currentGuess]);
      updateGuessedLettersStatus(currentGuess);

      if (currentGuess === wordToGuess) {
        setWin(true);
        setGameOver(true);
        showMessage('You won! 🎉', 3000);
      } else if (guesses.length + 1 === 6) { // Check if this was the 6th guess
        setGameOver(true);
        showMessage(`Game Over! The word was ${wordToGuess}.`, 4000);
      }
      setCurrentGuess(''); // Clear current guess after submission
    } else if (key.length === 1 && key.match(/[A-Z]/) && currentGuess.length < 5) {
      setCurrentGuess((prev) => (prev + key).toUpperCase());
    }
  }, [currentGuess, guesses.length, gameOver, wordToGuess, updateGuessedLettersStatus, allowedWords, showMessage]); // Added dependencies

  // Effect to listen for physical keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only accept alphanumeric keys, Backspace, and Enter
      // The physical 'Backspace' key event.key is 'Backspace'
      if ((event.key.length === 1 && event.key.match(/[a-zA-Z]/)) || event.key === 'Backspace' || event.key === 'Enter') {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return (
    <div className="game-wrapper"> {/* New wrapper div */}
      <div className="game-container">
        <h1 className="game-title">
          <span style={{ color: '#8B5CF6' }}>W</span>
          <span style={{ color: '#3B82F6' }}>O</span>
          <span style={{ color: '#EC4899' }}>R</span>
          <span style={{ color: '#10B981' }}>D</span>
          <span style={{ color: '#F59E0B' }}>L</span>
          <span style={{ color: '#EF4444' }}>E</span>
        </h1>

        <Board guesses={guesses} currentGuess={currentGuess} wordToGuess={wordToGuess} />

        <Keyboard onKeyPress={handleKeyPress} guessedLettersStatus={guessedLettersStatus} />

        <Message message={message} />

        <Modal
          show={gameOver}
          title={win ? 'Congratulations!' : 'Game Over!'}
          message={win ? `You guessed the word in ${guesses.length} tries!` : `The word was "${wordToGuess}".`}
          onPlayAgain={initializeGame}
          win={win} // Pass the 'win' state to the Modal component
        />
      </div>

      {showRules && <RulesBox />}
    </div>
  );
}
