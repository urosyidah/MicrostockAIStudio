import React, { useState, useEffect } from "react";
import {
  Camera,
  Copy,
  Check,
  Sparkles,
  Settings,
  RefreshCw,
  ArrowRight,
  Globe,
  Video,
  Image as ImageIcon,
  Monitor,
  Link as LinkIcon,
  Info,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Ban,
  Cpu,
  Film,
} from "lucide-react";

// --- Komponen UI (Fixed for TypeScript) ---
const Card = ({ children, className = "" }: any) => (
  <div
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 ${className}`}
  >
    {children}
  </div>
);

const Label = ({ children }: any) => (
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
    {children}
  </label>
);

const Select = ({ value, onChange, options, placeholder }: any) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((opt: any, idx: number) => (
      <option key={idx} value={opt.value || opt}>
        {opt.label || opt}
      </option>
    ))}
  </select>
);

const Input = ({ value, onChange, placeholder, disabled = false }: any) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
      disabled
        ? "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
        : ""
    }`}
  />
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }: any) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-y"
  />
);

const Button = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}: any) => {
  const variants: any = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white",
    outline:
      "border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    green: "bg-emerald-600 hover:bg-emerald-700 text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- DATA PRESET ---
const styleOptions = [
  {
    label: "Realistis Sinematik",
    value:
      "Cinematic movie scene, highly detailed, 8k resolution, hyperrealistic visual",
    keywords: "cinematic, movie style, realistic, 8k, drama",
  },
  {
    label: "Komersial Bersih (Clean)",
    value:
      "High-end commercial imagery, clean solid background, minimalist composition, sharp details, product aesthetics",
    keywords: "commercial, clean, sharp, isolated, minimalist",
  },
  {
    label: "Interior Mewah",
    value:
      "Modern interior design view, architectural digest style, wide angle perspective",
    keywords: "interior, modern, home design, architecture, indoor",
  },
  {
    label: "GREEN SCREEN (Background Hijau)",
    value:
      "Subject on solid green background, chroma key color, isolated subject",
    keywords: "green screen, chroma key, isolated, blank background",
  },
  {
    label: "Macro Detail",
    value: "Extreme close-up macro view, detailed texture, bokeh background",
    keywords: "macro, closeup, detail, bokeh, texture",
  },
  {
    label: "3D Render (Abstrak)",
    value: "3D render, Unreal Engine 5 style, digital art masterpiece",
    keywords: "3d, render, cgi, digital art, abstract",
  },
];

const lightingOptions = [
  {
    label: "Cahaya Jendela (Natural)",
    value: "Natural sunlight from window, sun rays, morning atmosphere",
    keywords: "window light, indoor, cozy, morning, natural light",
  },
  {
    label: "Cahaya Lembut (Diffused)",
    value:
      "Soft diffused illumination, bright and airy, even brightness, high key",
    keywords: "soft light, bright, clean, diffused, airy",
  },
  {
    label: "Golden Hour (Sore Hari)",
    value: "Golden hour glow, warm sunset colors, sun flare",
    keywords: "golden hour, sunset, sunrise, warm",
  },
  {
    label: "Siang Cerah (Clear Sky)",
    value: "Bright daylight, clear blue sky, sunny day",
    keywords: "daylight, bright, natural light, sunny, clear",
  },
  {
    label: "Neon / Cyberpunk",
    value: "Neon blue and pink glow, futuristic atmosphere, dark surroundings",
    keywords: "neon, cyberpunk, night, colorful, futuristic",
  },
  {
    label: "Dramatis (Kontras Tinggi)",
    value: "Dramatic contrast, chiaroscuro, rim light effect, moody atmosphere",
    keywords: "dramatic, rim light, contrast, dark, moody",
  },
  {
    label: "Rata / Flat (Tanpa Bayangan)",
    value: "Flat illumination, no shadows, uniform brightness",
    keywords: "flat lighting, even light, isolated",
  },
];

const motionOptions = [
  {
    label: "Static (Diam)",
    value: "static camera view, minimal movement, tripod shot",
  },
  {
    label: "Slow Motion (Lambat)",
    value: "slow motion, cinematic smooth movement, high frame rate",
  },
  {
    label: "Pan Right (Geser Kanan)",
    value: "slow panning right camera movement",
  },
  { label: "Zoom In (Mendekat)", value: "slow push in, dolly zoom in" },
  { label: "Drone (Terbang)", value: "aerial drone shot, flying over view" },
  {
    label: "Orbit (Memutar)",
    value: "orbiting camera movement around the subject",
  },
  {
    label: "FPV (Cepat/Dinamis)",
    value: "dynamic FPV drone movement, fast paced",
  },
];

const cameraOptions = [
  {
    label: "Lensa Potret (Fokus Orang)",
    value: "50mm focal length style, shallow depth of field",
  },
  { label: "Lensa Lebar (Pemandangan)", value: "16mm wide angle perspective" },
  {
    label: "Lensa Tele (Blur Background)",
    value: "200mm focal length style, blurred background",
  },
];

const ratioOptions = [
  { label: "Landscape (16:9)", value: "--ar 16:9" },
  { label: "Foto Standar (3:2)", value: "--ar 3:2" },
  { label: "Kotak (1:1)", value: "--ar 1:1" },
  { label: "Vertical (9:16)", value: "--ar 9:16" },
];

const stockKeywords = {
  general:
    "no people, copy space, high quality, commercial use, stock, 4k, hd, generative ai",
  business:
    "business, corporate, professional, office, success, teamwork, modern, finance",
  technology:
    "technology, innovation, future, digital, tech, ai, cyber, computing",
  nature:
    "nature, landscape, outdoor, environment, beauty, scenic, travel, earth",
  lifestyle:
    "lifestyle, happiness, leisure, healthy, daily life, authentic, people",
};

export default function MicrostockHelperMetaVideo() {
  const [activeTab, setActiveTab] = useState("prompt");
  const [copied, setCopied] = useState("");

  const [mode, setMode] = useState("photo");
  const [aiModel, setAiModel] = useState("midjourney");

  const defaultExclude =
    "nsfw, text, watermark, logo, deformed, blurry, ugly, bad anatomy, camera, tripod, softbox, lighting equipment, flash, lamp, stand, umbrella, photographer, reflection of equipment, behind the scenes, studio setup, wires, cables";

  const [promptState, setPromptState] = useState({
    subject: "",
    action: "",
    style: styleOptions[1].value,
    lighting: lightingOptions[1].value,
    motion: motionOptions[0].value,
    camera: cameraOptions[0].value,
    ratio: ratioOptions[1].value,
    exclude: defaultExclude,
    useMagic: true,
  });

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [generatedPositive, setGeneratedPositive] = useState("");
  const [generatedNegative, setGeneratedNegative] = useState("");

  const [metaState, setMetaState] = useState({
    category: "general",
    customTags: "",
  });
  const [generatedTags, setGeneratedTags] = useState("");
  const [generatedDesc, setGeneratedDesc] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");

  useEffect(() => {
    if (mode === "photo") {
      setAiModel("midjourney");
    } else {
      setAiModel("veo");
    }
  }, [mode]);

  useEffect(() => {
    let p = `${promptState.subject}`;
    if (promptState.action) p += `, ${promptState.action}`;
    if (promptState.style) p += `, ${promptState.style}`;
    if (promptState.lighting) p += `, ${promptState.lighting}`;

    if (promptState.camera) p += `, ${promptState.camera}`;

    let finalPrompt = "";
    const motionText = promptState.motion;

    if (mode === "photo") {
      if (promptState.useMagic) {
        if (aiModel === "meta") {
          p += ", realistic, high quality";
        } else if (aiModel === "imagen" || aiModel === "nano") {
          p += ", high resolution, photorealistic masterpiece, crisp details";
        } else {
          p +=
            ", stock photo, best quality, sharp focus, highly detailed, 8k uhd, photorealistic";
        }
      }

      switch (aiModel) {
        case "midjourney":
          finalPrompt = `${p} ${promptState.ratio} --no ${promptState.exclude} --stylize 250`;
          break;
        case "dalle":
          finalPrompt = `Create an image of ${p}. (IMPORTANT: Ensure the image does NOT show any cameras, tripods, lighting equipment. Keep the view clean).`;
          break;
        case "meta":
          finalPrompt = `Imagine an image of ${p}. No text, no watermarks.`;
          break;
        case "imagen":
        case "nano":
          finalPrompt = `A photorealistic stock photo of ${p}. The lighting is natural and professional. (Do not include any photography equipment, cameras, or softboxes in the frame).`;
          break;
        case "sd":
          finalPrompt = `[POSITIVE]: ${p}\n\n[NEGATIVE]: ${promptState.exclude}`;
          setGeneratedPositive(p);
          setGeneratedNegative(promptState.exclude);
          break;
        default:
          finalPrompt = p;
      }
    } else {
      if (promptState.useMagic) {
        p +=
          ", stock footage, 4k video, high definition, cinematic color grading";
      }

      switch (aiModel) {
        case "veo":
          finalPrompt = `Cinematic video: ${p}. Camera movement: ${motionText}. 4K, HDR, temporal consistency.`;
          break;
        case "meta_video":
          finalPrompt = `Animate a realistic video of ${p}. ${motionText}. High quality, seamless loop.`;
          break;
        case "runway":
          finalPrompt = `${p}. \n\nCamera Motion: ${motionText}.`;
          break;
        case "luma":
          finalPrompt = `A high quality video of ${p}. The camera movement is ${motionText}.`;
          break;
        case "kling":
          finalPrompt = `${p}. ${motionText}, highly detailed, realistic texture.`;
          break;
        case "pika":
          finalPrompt = `/create prompt: ${p} ${motionText} -motion 2`;
          break;
        default:
          finalPrompt = `${p} ${motionText}`;
      }
    }

    setGeneratedPrompt(finalPrompt);
  }, [promptState, mode, aiModel]);

  const generateMetadataFromPrompt = () => {
    const rawTitle = `${promptState.subject} ${promptState.action}`;
    const cleanTitle = rawTitle.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase())
    );
    setGeneratedTitle(cleanTitle);

    const assetType = mode === "video" ? "stock footage/video" : "stock photo";
    const desc = `${cleanTitle}. High quality ${metaState.category} ${assetType}. Perfect for ${metaState.category} projects and commercial use.`;
    setGeneratedDesc(desc);

    const coreWords = rawTitle
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter((w) => w.length > 2);
    const categoryTags =
      stockKeywords[metaState.category as keyof typeof stockKeywords] ||
      stockKeywords.general;
    const videoKeywords =
      mode === "video"
        ? ["video", "footage", "clip", "motion", "4k"]
        : ["photo", "image", "picture"];

    let tags = [
      ...coreWords,
      ...videoKeywords,
      ...metaState.customTags.split(",").map((s) => s.trim()),
      ...categoryTags.split(", ").map((s) => s.trim()),
    ];
    const uniqueTags = [...new Set(tags)]
      .filter((t) => t && t.length > 2)
      .join(", ");
    setGeneratedTags(uniqueTags);
  };

  useEffect(() => {
    if (activeTab === "metadata") generateMetadataFromPrompt();
  }, [activeTab, metaState.category, mode]);

  const openTranslate = () =>
    window.open(
      "https://translate.google.com/?sl=id&tl=en&op=translate",
      "_blank"
    );

  const handleCopy = (text: string, type: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {}
    document.body.removeChild(textArea);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const getModelName = () => {
    const names: any = {
      midjourney: "Midjourney v6",
      dalle: "DALL-E 3",
      meta: "Meta AI (Image)",
      imagen: "Imagen 3",
      nano: "Nano Banana",
      sd: "Stable Diffusion",
      veo: "Google Veo",
      runway: "Runway Gen-3",
      luma: "Luma Dream",
      kling: "Kling AI",
      pika: "Pika Labs",
      meta_video: "Meta Movie Gen / Animate",
    };
    return names[aiModel] || "AI Model";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans p-4 md:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto space-y-6 flex-grow w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">
              Microstock AI Studio
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Generator: Meta Video, Veo, Runway, & Photo
            </p>
          </div>
          <div className="flex gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("prompt")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "prompt"
                  ? "bg-white dark:bg-slate-600 shadow text-emerald-600 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              1. Prompt
            </button>
            <button
              onClick={() => setActiveTab("metadata")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "metadata"
                  ? "bg-white dark:bg-slate-600 shadow text-purple-600 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              2. Metadata
            </button>
          </div>
        </header>

        {activeTab === "prompt" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:col-span-2 space-y-6">
              {/* MODE SWITCHER */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode("photo")}
                  className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold transition-all ${
                    mode === "photo"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 ring-2 ring-blue-200 dark:ring-blue-800"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300 opacity-60"
                  }`}
                >
                  <ImageIcon className="w-5 h-5" /> Mode Foto
                </button>
                <button
                  onClick={() => setMode("video")}
                  className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold transition-all ${
                    mode === "video"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 ring-2 ring-red-200 dark:ring-red-800"
                      : "border-slate-200 dark:border-slate-700 hover:border-red-300 opacity-60"
                  }`}
                >
                  <Video className="w-5 h-5" /> Mode Video
                </button>
              </div>

              {/* TARGET AI SELECTOR */}
              <Card
                className={`border-2 ${
                  mode === "photo"
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-orange-50 border-orange-200"
                } dark:bg-slate-800 dark:border-slate-600`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Cpu
                    className={`w-5 h-5 ${
                      mode === "photo" ? "text-indigo-600" : "text-orange-600"
                    }`}
                  />
                  <Label>
                    Pilih Model AI {mode === "photo" ? "Gambar" : "Video"}:
                  </Label>
                </div>

                {/* PHOTO MODEL BUTTONS */}
                {mode === "photo" && (
                  <div className="flex flex-wrap gap-2">
                    {[
                      "midjourney",
                      "dalle",
                      "meta",
                      "imagen",
                      "nano",
                      "sd",
                    ].map((m) => (
                      <button
                        key={m}
                        onClick={() => setAiModel(m)}
                        className={`flex-1 min-w-[80px] p-2 text-xs rounded border-2 transition-all ${
                          aiModel === m
                            ? "border-indigo-500 bg-white text-indigo-700 font-bold shadow-sm"
                            : "border-transparent hover:bg-white/50"
                        }`}
                      >
                        {m === "sd"
                          ? "Stable Diff."
                          : m === "meta"
                          ? "Meta AI"
                          : m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {/* VIDEO MODEL BUTTONS */}
                {mode === "video" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setAiModel("meta_video")}
                      className={`flex-1 min-w-[80px] p-2 text-xs rounded border-2 transition-all ${
                        aiModel === "meta_video"
                          ? "border-orange-500 bg-white text-orange-700 font-bold shadow-sm"
                          : "border-transparent hover:bg-white/50"
                      }`}
                    >
                      Meta Video
                    </button>
                    <button
                      onClick={() => setAiModel("veo")}
                      className={`flex-1 min-w-[80px] p-2 text-xs rounded border-2 transition-all ${
                        aiModel === "veo"
                          ? "border-orange-500 bg-white text-orange-700 font-bold shadow-sm"
                          : "border-transparent hover:bg-white/50"
                      }`}
                    >
                      Google Veo
                    </button>
                    <button
                      onClick={() => setAiModel("runway")}
                      className={`flex-1 min-w-[80px] p-2 text-xs rounded border-2 transition-all ${
                        aiModel === "runway"
                          ? "border-orange-500 bg-white text-orange-700 font-bold shadow-sm"
                          : "border-transparent hover:bg-white/50"
                      }`}
                    >
                      Runway Gen-3
                    </button>
                    <button
                      onClick={() => setAiModel("luma")}
                      className={`flex-1 min-w-[80px] p-2 text-xs rounded border-2 transition-all ${
                        aiModel === "luma"
                          ? "border-orange-500 bg-white text-orange-700 font-bold shadow-sm"
                          : "border-transparent hover:bg-white/50"
                      }`}
                    >
                      Luma
                    </button>
                    <button
                      onClick={() => setAiModel("kling")}
                      className={`flex-1 min-w-[80px] p-2 text-xs rounded border-2 transition-all ${
                        aiModel === "kling"
                          ? "border-orange-500 bg-white text-orange-700 font-bold shadow-sm"
                          : "border-transparent hover:bg-white/50"
                      }`}
                    >
                      Kling
                    </button>
                  </div>
                )}
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-emerald-500" /> Komposisi
                  </h2>
                  <button
                    onClick={openTranslate}
                    className="text-xs text-blue-600 hover:underline flex gap-1 items-center"
                  >
                    <Globe className="w-3 h-3" /> Buka Google Translate
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Subjek Utama</Label>
                    <Input
                      value={promptState.subject}
                      onChange={(e: any) =>
                        setPromptState({
                          ...promptState,
                          subject: e.target.value,
                        })
                      }
                      placeholder={
                        mode === "photo"
                          ? "Contoh: Asian business woman holding tablet"
                          : "Contoh: Drone view of Bali beach"
                      }
                    />
                  </div>
                  <div>
                    <Label>Aktivitas / Latar</Label>
                    <Input
                      value={promptState.action}
                      onChange={(e: any) =>
                        setPromptState({
                          ...promptState,
                          action: e.target.value,
                        })
                      }
                      placeholder="Contoh: Smiling, modern office background"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Gaya Visual</Label>
                      <Select
                        options={styleOptions}
                        value={promptState.style}
                        onChange={(e: any) =>
                          setPromptState({
                            ...promptState,
                            style: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Pencahayaan</Label>
                      <Select
                        options={lightingOptions}
                        value={promptState.lighting}
                        onChange={(e: any) =>
                          setPromptState({
                            ...promptState,
                            lighting: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Motion Selector - Highlighted for Video */}
                  {mode === "video" && (
                    <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                      <Label>
                        <span className="text-orange-700 dark:text-orange-400 flex items-center gap-1">
                          <Film className="w-3 h-3" /> Gerakan Kamera (Wajib
                          untuk Video)
                        </span>
                      </Label>
                      <Select
                        options={motionOptions}
                        value={promptState.motion}
                        onChange={(e: any) =>
                          setPromptState({
                            ...promptState,
                            motion: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Lensa</Label>
                      <Select
                        options={cameraOptions}
                        value={promptState.camera}
                        onChange={(e: any) =>
                          setPromptState({
                            ...promptState,
                            camera: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Rasio</Label>
                      <Select
                        options={ratioOptions}
                        value={promptState.ratio}
                        onChange={(e: any) =>
                          setPromptState({
                            ...promptState,
                            ratio: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {mode === "photo" && (
                    <div className="space-y-1 mt-2">
                      <Label>Negative Prompt (Blokir Alat)</Label>
                      <TextArea
                        rows={2}
                        value={promptState.exclude}
                        onChange={(e: any) =>
                          setPromptState({
                            ...promptState,
                            exclude: e.target.value,
                          })
                        }
                      />
                      <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                        <Ban className="w-3 h-3" />
                        <span>Otomatis blokir: camera, tripod, softbox.</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={() => setActiveTab("metadata")}
                  className="w-full sm:w-auto"
                >
                  Lanjut ke Metadata <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* OUTPUT SECTION */}
            <div className="md:col-span-1 space-y-4">
              <div className="sticky top-6 space-y-4">
                {aiModel === "sd" ? (
                  <>
                    <Card className="border-2 border-indigo-200 bg-indigo-50/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-indigo-700 text-sm">
                          Positive
                        </h3>
                        <Button
                          variant="outline"
                          className="py-1 px-2 h-7 text-xs"
                          onClick={() => handleCopy(generatedPositive, "pos")}
                        >
                          {copied === "pos" ? "OK" : "Salin"}
                        </Button>
                      </div>
                      <div className="bg-white p-2 rounded border text-xs font-mono h-32 overflow-y-auto">
                        {generatedPositive}
                      </div>
                    </Card>
                    <Card className="border-2 border-red-200 bg-red-50/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-red-700 text-sm">
                          Negative
                        </h3>
                        <Button
                          variant="outline"
                          className="py-1 px-2 h-7 text-xs"
                          onClick={() => handleCopy(generatedNegative, "neg")}
                        >
                          {copied === "neg" ? "OK" : "Salin"}
                        </Button>
                      </div>
                      <div className="bg-white p-2 rounded border text-xs font-mono h-24 overflow-y-auto">
                        {generatedNegative}
                      </div>
                    </Card>
                  </>
                ) : (
                  <Card
                    className={`border-2 ${
                      mode === "video"
                        ? "border-orange-200 bg-orange-50/50"
                        : "border-indigo-200 bg-indigo-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-semibold flex items-center gap-2 ${
                          mode === "video"
                            ? "text-orange-700"
                            : "text-indigo-700"
                        }`}
                      >
                        <Sparkles className="w-4 h-4" /> Prompt {getModelName()}
                      </h3>
                    </div>
                    <div className="bg-white p-3 rounded-md border text-sm font-mono text-slate-600 break-words min-h-[150px]">
                      {promptState.subject ? (
                        generatedPrompt
                      ) : (
                        <span className="text-slate-400 italic">
                          Isi subjek...
                        </span>
                      )}
                    </div>
                    <Button
                      className={`w-full mt-4 ${
                        mode === "video"
                          ? "bg-orange-600 hover:bg-orange-700"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                      onClick={() => handleCopy(generatedPrompt, "prompt")}
                    >
                      {copied === "prompt" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied === "prompt" ? "Tersalin!" : "Salin Prompt"}
                    </Button>
                    <div className="mt-2 text-[10px] text-slate-500 text-center">
                      {mode === "video" &&
                        aiModel === "meta_video" &&
                        "Gunakan di fitur 'Animate' atau 'Movie Gen' Meta AI."}
                      {mode === "video" &&
                        aiModel !== "meta_video" &&
                        "Tips: Veo/Runway sangat memperhatikan kalimat gerakan kamera."}
                      {mode === "photo" &&
                        "Tips: Meta/Nano lebih suka kalimat natural tanpa kode rumit."}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Metadata Tab */}
        {activeTab === "metadata" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <h2 className="font-semibold text-lg">Metadata</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Kategori</Label>
                    <Select
                      options={[
                        { value: "general", label: "Umum" },
                        { value: "business", label: "Bisnis" },
                        { value: "nature", label: "Alam" },
                        { value: "lifestyle", label: "Lifestyle" },
                      ]}
                      value={metaState.category}
                      onChange={(e: any) =>
                        setMetaState({ ...metaState, category: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Keyword Tambahan</Label>
                    <Input
                      value={metaState.customTags}
                      onChange={(e: any) =>
                        setMetaState({
                          ...metaState,
                          customTags: e.target.value,
                        })
                      }
                      placeholder="Contoh: indonesia, bali"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={generateMetadataFromPrompt}
                  >
                    <RefreshCw className="w-4 h-4" /> Refresh Data
                  </Button>
                </div>
              </Card>
            </div>
            <div className="space-y-4">
              <Card className="border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <Label>Judul & Deskripsi</Label>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Judul:</p>
                    <div className="flex gap-2">
                      <input
                        value={generatedTitle}
                        onChange={(e) => setGeneratedTitle(e.target.value)}
                        className="w-full p-2 text-sm border rounded"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => handleCopy(generatedTitle, "title")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <p className="text-xs text-slate-400 mb-1">Deskripsi:</p>
                    <TextArea
                      value={generatedDesc}
                      onChange={(e: any) => setGeneratedDesc(e.target.value)}
                      rows={4}
                    />
                    <button
                      onClick={() => handleCopy(generatedDesc, "desc")}
                      className="absolute top-8 right-2 p-1 text-slate-400 hover:text-purple-500 bg-white rounded border"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
              <Card className="border-purple-200">
                <div className="flex justify-between items-center mb-2">
                  <Label>Keyword / Tags</Label>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {generatedTags ? generatedTags.split(",").length : 0} tags
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded border text-sm min-h-[100px] mb-3">
                  {generatedTags}
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 text-xs"
                    onClick={() => handleCopy(generatedTags, "tags")}
                  >
                    Salin Semua
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() =>
                      handleCopy(
                        generatedTags.split(", ").slice(0, 49).join(", "),
                        "tags-limit"
                      )
                    }
                  >
                    Salin 49 Teratas
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
      <footer className="text-center text-slate-400 text-sm pt-8 pb-4 mt-auto">
        <p>
          &copy; {new Date().getFullYear()} Microstock AI Studio | Created by{" "}
          <a
            href="https://niki.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            niki.my.id
          </a>
        </p>
      </footer>
    </div>
  );
}
