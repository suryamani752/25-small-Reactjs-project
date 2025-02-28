import React, { useState } from "react";
import data from "./data";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
  const [multipleSelections, setMultipleSelections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAll, setExpandedAll] = useState(false);

  const filteredData = data.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSingleSelection = (id) => {
    setSelected(selected === id ? null : id);
  };

  const handleMultipleSelection = (id) => {
    setMultipleSelections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleMode = () => {
    setEnableMultipleSelection((prev) => {
      toast.success(
        prev ? "Disabled Multiple Selection" : "Enabled Multiple Selection"
      );
      return !prev;
    });
    setMultipleSelections([]);
  };

  const handleExpandCollapseAll = () => {
    if (!enableMultipleSelection) return;

    if (expandedAll) {
      setMultipleSelections([]);
    } else {
      const allIds = filteredData.map((item) => item.id);
      setMultipleSelections(allIds);
    }
    setExpandedAll(!expandedAll);
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-gray-900">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <XMarkIcon
                className="h-5 w-5 text-gray-400 absolute right-3 top-4 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-4" />
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={toggleMode}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            >
              {enableMultipleSelection ? (
                <>
                  <XMarkIcon className="h-4 w-4" />
                  Single Mode
                </>
              ) : (
                <>
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                  Multi Mode
                </>
              )}
            </button>

            {enableMultipleSelection && (
              <button
                onClick={handleExpandCollapseAll}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 cursor-pointer"
              >
                {expandedAll ? "Collapse All" : "Expand All"}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              const isOpen = enableMultipleSelection
                ? multipleSelections.includes(item.id)
                : selected === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-lg bg-gray-800 overflow-hidden transition-all duration-300"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                    onClick={() =>
                      enableMultipleSelection
                        ? handleMultipleSelection(item.id)
                        : handleSingleSelection(item.id)
                    }
                  >
                    <h3 className="text-lg font-medium text-gray-100">
                      {highlightText(item.question)}
                    </h3>
                    <ChevronDownIcon
                      className={`h-6 w-6 text-blue-400 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`px-4 overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {highlightText(item.answer)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-400">
              No questions found matching your search.
            </div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="mt-6 text-center text-gray-400 text-sm">
            Showing {filteredData.length} of {data.length} questions
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
