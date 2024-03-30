"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import Header from "./components/Header";
import FileCard from "./components/FileCard";
import Pagination from "rc-pagination";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import requests from "@/helpers/apiRequests";
import Loader from "./components/Loader";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  const pageSize = 20;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchFiles = async (curPage, pageSize) => {
    try {
      setLoading(true);
      const data = await requests.get(
        `/feed?page=${curPage}&limit=${pageSize}`
      );
      setFiles(data.files);
      setPage(parseInt(data.currentPage));
      setTotalPages(parseInt(data.totalPages));
      setTotalFiles(parseInt(data.totalPages) * pageSize);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles(page, pageSize);
  }, []);

  return (
    <div className="">
      <Header />

      {/* Feed */}
      {loading ? (
        <div className="w-full h-72 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-2 md:px-8 lg:px-14 pt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* File Cards */}
          {files.map((file, index) => (
            <FileCard key={index} file={file} openModal={openModal} />
          ))}
        </div>
      )}

      <div className="w-full flex justify-center">
        <Pagination
          total={totalFiles}
          current={page}
          pageSize={pageSize}
          onChange={fetchFiles}
          style={{ margin: "100px" }}
          prevIcon={<ArrowLongLeftIcon className="h-5 w-5 text-gray-500" />}
          nextIcon={<ArrowLongRightIcon className="h-5 w-5 text-gray-500" />}
        />
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-md hover:bg-opacity-80 focus:outline-none"
        onClick={openModal}
      >
        <PlusIcon className="h-6 w-6" />
      </button>

      {/* Upload Modal */}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Upload File</h2>
          {/* Add your file upload form here */}
        </Modal>
      )}
    </div>
  );
};

export default Home;
