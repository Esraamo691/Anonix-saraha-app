import { Card, Button, Avatar } from "@heroui/react";
import { FaCamera } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import LogoImg from "../../assets/images/logo.png";

const ProfileImageUpload = ({ currentImage, onChange, disabled = false }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(currentImage || LogoImg);

  useEffect(() => {
    setPreview(currentImage || LogoImg);
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    onChange?.(file, previewUrl);
  };
  const CameraIcon = ({
    fill = "currentColor",
    size,
    height,
    width,
    ...props
  }) => {
    return (
      <svg
        fill="none"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className=" text-cyan-400"
      >
        <path
          clipRule="evenodd"
          d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
          fill={fill}
          fillRule="evenodd"
        />
      </svg>
    );
  };
  return (
    <Card
      className="
        relative overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-6
        shadow-[0_0_45px_rgba(0,80,255,0.18)]
      "
    >
      <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 bg-blue-700/20 blur-[120px]" />

      <div className="relative flex  flex-col items-center gap-4 text-center">
        <div className="relative ">
          <Avatar src={preview} className="w-24 h-24" />
          <div className="absolute -bottom-2  end-0">
            <Button
              isIconOnly
              aria-label="Upload image"
              className="bg-black border-cyan-600"
              variant="bordered"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
            >
              <CameraIcon />
            </Button>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-white">Profile Picture</h2>

        <p className="text-sm text-gray-400">
          Upload a new avatar. JPG or PNG.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        {/* <Button
          color="primary"
          startContent={<FaCamera />}
          onClick={() => inputRef.current.click()}
          disabled={disabled}
        >
          Upload Image
        </Button> */}
      </div>
    </Card>
  );
};

export default ProfileImageUpload;
