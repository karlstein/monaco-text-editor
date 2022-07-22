import { loader } from "@monaco-editor/react";

export const monacoThemes = [
  { value: "active4d", label: "Active4D" },
  { value: "all-hallows-eve", label: "All Hallows Eve" },
  { value: "amy", label: "Amy" },
  { value: "birds-of-paradise", label: "Birds of Paradise" },
  { value: "blackboard", label: "Blackboard" },
  { value: "brilliance-black", label: "Brilliance Black" },
  { value: "brilliance-dull", label: "Brilliance Dull" },
  { value: "chrome-devtools", label: "Chrome DevTools" },
  { value: "clouds-midnight", label: "Clouds Midnight" },
  { value: "clouds", label: "Clouds" },
  { value: "cobalt", label: "Cobalt" },
  { value: "dawn", label: "Dawn" },
  { value: "dreamweaver", label: "Dreamweaver" },
  { value: "eiffel", label: "Eiffel" },
  { value: "espresso-libre", label: "Espresso Libre" },
  { value: "github", label: "GitHub" },
  { value: "idle", label: "IDLE" },
  { value: "katzenmilch", label: "Katzenmilch" },
  { value: "kuroir-theme", label: "Kuroir Theme" },
  { value: "lazy", label: "LAZY" },
  { value: "magicwb--amiga-", label: "MagicWB (Amiga)" },
  { value: "merbivore-soft", label: "Merbivore Soft" },
  { value: "merbivore", label: "Merbivore" },
  { value: "monokai-bright", label: "Monokai Bright" },
  { value: "monokai", label: "Monokai" },
  { value: "night-owl", label: "Night Owl" },
  { value: "oceanic-next", label: "Oceanic Next" },
  { value: "pastels-on-dark", label: "Pastels on Dark" },
  { value: "slush-and-poppies", label: "Slush and Poppies" },
  { value: "solarized-dark", label: "Solarized-dark" },
  { value: "solarized-light", label: "Solarized-light" },
  { value: "spacecadet", label: "SpaceCadet" },
  { value: "sunburst", label: "Sunburst" },
  { value: "textmate--mac-classic-", label: "Textmate (Mac Classic)" },
  { value: "tomorrow-night-blue", label: "Tomorrow-Night-Blue" },
  { value: "tomorrow-night-bright", label: "Tomorrow-Night-Bright" },
  { value: "tomorrow-night-eighties", label: "Tomorrow-Night-Eighties" },
  { value: "tomorrow-night", label: "Tomorrow-Night" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "twilight", label: "Twilight" },
  { value: "upstream-sunburst", label: "Upstream Sunburst" },
  { value: "vibrant-ink", label: "Vibrant Ink" },
  { value: "xcode-default", label: "Xcode_default" },
  { value: "zenburnesque", label: "Zenburnesque" },
  { value: "iplastic", label: "iPlastic" },
  { value: "idlefingers", label: "idleFingers" },
  { value: "krtheme", label: "krTheme" },
  { value: "monoindustrial", label: "monoindustrial" },
];

export const defineTheme = (theme: string) => {
  const objTheme = monacoThemes.find((e) => e.value === theme)?.label;
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${objTheme}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      //   res();
      res();
    });
  });
};
