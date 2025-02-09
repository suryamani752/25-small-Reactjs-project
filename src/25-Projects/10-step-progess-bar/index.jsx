import { useEffect, useState } from "react";

const StepProgressBar = ({
  steps,
  activeStep = 0,
  setActiveStep,
  colorComplete = "bg-green-500",
  colorActive = "bg-purple-500",
  colorInactive = "bg-gray-300",
  onStepChange,
  validateStep,
}) => {
  const [progressWidth, setProgressWidth] = useState("0%");
  const [localActiveStep, setLocalActiveStep] = useState(activeStep);

  useEffect(() => {
    const width = ((activeStep / (steps.length - 1)) * 100).toFixed(2) + "%";
    setProgressWidth(width);
    setLocalActiveStep(activeStep);
  }, [activeStep, steps.length]);

  const handleStepClick = async (index) => {
    if (index > localActiveStep) return;

    if (validateStep && !(await validateStep(localActiveStep))) {
      return;
    }

    setActiveStep(index);
    onStepChange?.(index);
  };

  const handlePrevious = async () => {
    if (localActiveStep === 0) return;

    if (validateStep && !(await validateStep(localActiveStep))) {
      return;
    }

    const newStep = localActiveStep - 1;
    setActiveStep(newStep);
    onStepChange?.(newStep);
  };

  const handleNext = async () => {
    if (localActiveStep === steps.length - 1) return;

    if (validateStep && !(await validateStep(localActiveStep))) {
      return;
    }

    const newStep = localActiveStep + 1;
    setActiveStep(newStep);
    onStepChange?.(newStep);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Progress Line */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 p-6 left-0 w-full h-2 bg-gray-200 transform -translate-y-1/2 rounded-full" />
        <div
          className={`absolute top-1/2 left-0 h-12 rounded-full transform -translate-y-1/2 transition-all duration-300 ${colorActive}`}
          style={{ width: progressWidth }}
          aria-valuenow={localActiveStep}
          aria-valuemin="0"
          aria-valuemax={steps.length}
        />

        <div className="relative flex justify-between top-4">
          {steps.map((step, index) => {
            const isComplete = index < localActiveStep;
            const isActive = index === localActiveStep;

            return (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className="flex flex-col items-center group"
                disabled={index > localActiveStep}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 
                    ${
                      isComplete
                        ? colorComplete
                        : isActive
                        ? colorActive
                        : colorInactive
                    }
                    ${
                      index <= localActiveStep
                        ? "hover:scale-110 cursor-pointer"
                        : "cursor-default"
                    }
                  `}
                >
                  {isComplete ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm text-center font-medium ${
                    isActive || isComplete ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {typeof step === "object" ? step.label : step}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8 min-h-[300px]">
        {steps[activeStep]?.content && (
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in">
            {steps[activeStep].content}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={localActiveStep === 0}
          className={`px-6 py-2 cursor-pointer rounded-lg font-medium transition-colors ${
            localActiveStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          Previous
        </button>

        <div className="text-sm text-gray-500">
          Step {localActiveStep + 1} of {steps.length}
        </div>

        <button
          onClick={handleNext}
          disabled={localActiveStep === steps.length - 1}
          className={`px-6 py-2 cursor-pointer rounded-lg font-medium transition-colors ${
            localActiveStep === steps.length - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {localActiveStep === steps.length - 1 ? "Complete" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepProgressBar;
