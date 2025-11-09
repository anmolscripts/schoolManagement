"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const ImagePicker = () => {
  const [previewImage, setPreviewImage] = useState("/images/icon/image.jpg"); // default image
  const [hasImage, setHasImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddClick = () => {
    imageInputRef.current?.click(); // open file dialog
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
    setHasImage(true);
  };

  const handleRemoveClick = () => {
    setPreviewImage("/images/icon/image.jpg"); // back to default image
    setHasImage(false);

    // clear input file value
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-3 dark:bg-dark dark:border-slate-800">
        <div className="flex items-center justify-center overflow-hidden rounded-xl shadow-2">
          <Image
            className="h-full w-full object-cover"
            src={previewImage}
            alt="selected-image"
            width={2800}
            height={2800}
          />
        </div>

        <div className="flex justify-center gap-7 p-2">
          {hasImage ? (
            <button
              onClick={handleRemoveClick}
              className="min-w-32 rounded-md border border-transparent bg-red-600 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700"
              type="button"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleAddClick}
              className="min-w-32 rounded-md border border-transparent bg-green-600 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700"
              type="button"
            >
              Add
            </button>
          )}
        </div>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImagePicker;
