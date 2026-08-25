import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  SlidersHorizontal,
  Image as ImageIcon,
  RotateCcw,
  Check,
  Upload,
  Link,
  Info,
  ExternalLink
} from 'lucide-react';

export const ImageManagerModal: React.FC = () => {
  const {
    isImageManagerOpen,
    setIsImageManagerOpen,
    imageSlots,
    updateImageSlot,
    resetImageSlot,
    resetAllImageSlots,
    showToast
  } = useStore();

  const [activeSlotId, setActiveSlotId] = useState<number>(1);
  const [urlInput, setUrlInput] = useState<string>('');

  if (!isImageManagerOpen) return null;

  const currentSlot = imageSlots.find((s) => s.id === activeSlotId) || imageSlots[0];

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    updateImageSlot(currentSlot.id, urlInput.trim());
    setUrlInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to base64 data URL for instantaneous preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateImageSlot(currentSlot.id, event.target.result as string);
        showToast('Image Uploaded', `Custom image applied to Slot ${currentSlot.id}.`);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-md p-4 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col text-zinc-100 max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 font-display">
                10 Custom Image Slots Manager (Image Space Slots)
              </h2>
              <p className="text-[11px] text-zinc-400">
                Easily swap or add your own 10 product & banner images anytime. Changes save instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAllImageSlots}
              className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800"
              title="Reset all images to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>

            <button
              onClick={() => setIsImageManagerOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Slot Selector, Right Slot Customizer */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          {/* Left: 10 Slots List */}
          <div className="md:col-span-5 p-4 space-y-2 max-h-[65vh] overflow-y-auto">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-2 mb-2">
              Available 10 Image Slots
            </div>
            {imageSlots.map((slot) => {
              const isSelected = slot.id === activeSlotId;
              const isCustomized = Boolean(slot.customUrl);
              const previewImg = slot.customUrl || slot.defaultUrl;

              return (
                <div
                  key={slot.id}
                  onClick={() => {
                    setActiveSlotId(slot.id);
                    setUrlInput(slot.customUrl || '');
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400 text-zinc-100 shadow-md'
                      : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                  }`}
                >
                  <img
                    src={previewImg}
                    alt={slot.title}
                    className="w-12 h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-200 truncate">
                        Slot #{slot.id}
                      </span>
                      {isCustomized ? (
                        <span className="text-[9px] font-extrabold bg-amber-400 text-zinc-950 px-1.5 py-0.2 rounded">
                          CUSTOM
                        </span>
                      ) : (
                        <span className="text-[9px] text-zinc-500">DEFAULT</span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">{slot.location}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Slot Editor */}
          <div className="md:col-span-7 p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    Configuring Slot #{currentSlot.id}
                  </span>
                  {currentSlot.customUrl && (
                    <button
                      onClick={() => resetImageSlot(currentSlot.id)}
                      className="text-xs text-red-400 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Restore Default
                    </button>
                  )}
                </div>
                <h3 className="text-lg font-bold text-zinc-100 font-display mt-1">
                  {currentSlot.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">{currentSlot.description}</p>
                <div className="text-[11px] text-zinc-500 mt-1">
                  <strong>Location on Site:</strong> {currentSlot.location}
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="relative aspect-video w-full rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={currentSlot.customUrl || currentSlot.defaultUrl}
                  alt={currentSlot.title}
                  className="max-h-full max-w-full object-contain filter contrast-105"
                />
                <div className="absolute bottom-2 left-2 bg-zinc-900/90 text-zinc-300 text-[10px] px-2 py-0.5 rounded border border-zinc-700">
                  {currentSlot.customUrl ? 'Your Custom Image Active' : 'Default Placehold/Photo'}
                </div>
              </div>

              {/* Enter Image URL Form */}
              <form onSubmit={handleApplyUrl} className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300">
                  Paste Direct Image URL:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/your-tool-image.jpg"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                    <Link className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-lg"
                  >
                    Apply URL
                  </button>
                </div>
              </form>

              {/* Or Local File Upload */}
              <div className="pt-3 border-t border-zinc-800">
                <label className="block text-xs font-bold text-zinc-300 mb-2">
                  Or Upload From Your Device / Computer:
                </label>
                <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-zinc-800 hover:border-amber-400/50 rounded-xl bg-zinc-950/60 cursor-pointer text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Choose JPG, PNG, WEBP file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Images persist in your browser for this session and future visits.
              </span>
              <button
                onClick={() => setIsImageManagerOpen(false)}
                className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
