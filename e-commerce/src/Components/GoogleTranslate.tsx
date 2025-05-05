import React, { useEffect } from "react";

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      if (!document.getElementById("google_translate_element")) return;

      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div id="google_translate_element" className="h-8 overflow-hidden text-sm relative">
      <style>
        {`
          #google_translate_element .goog-te-gadget {
            font-size: 0.75rem !important;
            height: 40px !important;
          }

          .goog-te-banner-frame.skiptranslate,
          .goog-te-gadget-icon {
            display: none !important;
          }

          .goog-te-combo {
            height: 40px !important;
            font-size: 0.75rem !important;
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default GoogleTranslate;

