import {
  ArrowDownTrayIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

function FileCard({ file, openModal }) {
  console.log(file.createdAt);
  return (
    <div
      key={file.id}
      className={`cursor-default peer relative bg-white rounded-md border border-gray-300 ${getFileBorderColor(
        file.type
      )} flex flex-col overflow-hidden shadow-sm transition-all duration-300 ease-in-out`}
    >
      <div
        className={`h-48 relative flex items-center justify-center ${getFileBGColor(
          file.type
        )} bg-opacity-10`}
      >
        <Image
          src={`/file-types/${file.type}.png`}
          alt="File Type"
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <div className={`border-t border-gray-300 px-4`}>
        <h2 className="text-lg font-semibold mb-0.5 truncate">
          {file.title}.{file.type}
        </h2>
        <p className="text-sm text-gray-500 mb-0.5 line-clamp-2">
          {file.description}
        </p>
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-sm text-gray-500">
            {convertToReadableDate(file.createdAt)}
          </p>{" "}
          <p className="text-sm text-gray-500">
            {convertToReadableSize(file.size)}
          </p>{" "}
        </div>
        <div className="flex gap-1 mb-2">
          <button className="bg-gray-300 text-gray-800 p-1 rounded-md mr-2">
            <ArrowDownTrayIcon className="h-4 w-4" />
          </button>
          <button
            className="bg-gray-300 text-gray-800 p-1 rounded-md"
            onClick={openModal}
          >
            <ArrowUpOnSquareIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const getFileBGColor = (fileType) => {
  switch (fileType) {
    case "pptx" || "ppt":
      return "bg-orange-600";
    case "docx" || "doc":
      return "bg-blue-500";
    case "pdf":
      return "bg-red-500";
    case "xlsx" || "xls":
      return "bg-green-500";
    case "txt":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

const getFileBorderColor = (fileType) => {
  switch (fileType) {
    case "pptx" || "ppt":
      return "hover:border-orange-600";
    case "docx" || "doc":
      return "hover:border-blue-500";
    case "pdf":
      return "hover:border-red-500";
    case "xlsx" || "xls":
      return "hover:border-green-500";
    case "txt":
      return "hover:border-purple-500";
    default:
      return "hover:border-gray-500";
  }
};

const convertToReadableSize = (size) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  while (size > 1024) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

const convertToReadableDate = (date) => {
  const diff = new Date() - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  return "just now";
};

export default FileCard;
