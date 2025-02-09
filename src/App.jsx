import { useRoutes } from "react-router-dom";
import Home from "./home";
import Pagination from "./25-Projects/1-pagination";
import StarRating from "./25-Projects/2-star-rating";
import Modal from "./25-Projects/3-custom-modal-popup";
import SkeletonLoader from "./25-Projects/4-skeleton-Loader";
import DarkLightTheme from "./25-Projects/5-theme";
import DragAndDrop from "./25-Projects/6-drag-n-drop";
import GithubProfileFinder from "./25-Projects/7-github-profile-finder";
import FileUpload from "./25-Projects/8-file-upload-and-preview";
import ProgressBar from "./25-Projects/9-progress-bar";
import StepProgressBar from "./25-Projects/10-step-progess-bar";
import { useState } from "react";
import {
  AddressForm,
  ConfirmationForm,
  PaymentForm,
  PersonalForm,
  PreferencesForm,
} from "./25-Projects/10-step-progess-bar/step_progress_form";
import PdfViewer from "./25-Projects/11-pdf-veiwer";
import Accordion from "./25-Projects/12-accordian";
import MusicPlayer from "./25-Projects/13-music-player";
import ImageSlider from "./25-Projects/14-image-slider";

function CustomRoutes() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: { name: "", email: "" },
    address: { street: "", city: "" },
    payment: { cardNumber: "", expiry: "" },
    preferences: { newsletter: false, notifications: true },
    confirmation: { terms: false },
  });
  const validateCurrentStep = async (step) => {
    switch (step) {
      case 0:
        return formData.personal.name && formData.personal.email.includes("@");
      case 1:
        return formData.address.street && formData.address.city;
      case 2:
        return (
          formData.payment.cardNumber.length === 16 && formData.payment.expiry
        );
      case 3:
        return true; // No validation needed for preferences
      case 4:
        return formData.confirmation.terms;
      default:
        return false;
    }
  };
  const handleFormChange = (step, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], [field]: value },
    }));
  };
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pagination",
      element: <Pagination />,
    },
    {
      path: "/star-rating",
      element: <StarRating />,
    },
    {
      path: "/modal-popup",
      element: <Modal />,
    },
    {
      path: "/skeleton-loading",
      element: <SkeletonLoader />,
    },
    {
      path: "/dark-light-theme",
      element: <DarkLightTheme />,
    },
    {
      path: "/drag-n-drop",
      element: <DragAndDrop />,
    },
    {
      path: "/github-profile-finder",
      element: <GithubProfileFinder />,
    },
    {
      path: "/file-upload",
      element: <FileUpload />,
    },
    {
      path: "/progress-bar",
      element: <ProgressBar />,
    },
    {
      path: "/step-progress-bar",
      element: (
        <StepProgressBar
          steps={[
            {
              label: "Personal Info",
              content: (
                <PersonalForm
                  data={formData.personal}
                  onChange={(field, value) =>
                    handleFormChange("personal", field, value)
                  }
                />
              ),
            },
            {
              label: "Address",
              content: (
                <AddressForm
                  data={formData.address}
                  onChange={(field, value) =>
                    handleFormChange("address", field, value)
                  }
                />
              ),
            },
            {
              label: "Payment",
              content: (
                <PaymentForm
                  data={formData.payment}
                  onChange={(field, value) =>
                    handleFormChange("payment", field, value)
                  }
                />
              ),
            },
            {
              label: "Preferences",
              content: (
                <PreferencesForm
                  data={formData.preferences}
                  onChange={(field, value) =>
                    handleFormChange("preferences", field, value)
                  }
                />
              ),
            },
            {
              label: "Confirmation",
              content: (
                <ConfirmationForm
                  data={formData.confirmation}
                  onChange={(field, value) =>
                    handleFormChange("confirmation", field, value)
                  }
                />
              ),
            },
          ]}
          activeStep={currentStep}
          setActiveStep={setCurrentStep}
          colorComplete="bg-green-600"
          colorActive="bg-purple-600"
          validateStep={validateCurrentStep}
          onStepChange={(newStep) => console.log("Changed to step:", newStep)}
        />
      ),
    },
    {
      path: "/pdf-viewer",
      element: <PdfViewer />,
    },
    {
      path: "/accordian",
      element: <Accordion />,
    },
    {
      path: "/music-player",
      element: <MusicPlayer />
    },
    {
      path: "/image-slider",
      element: <ImageSlider />
    }
  ]);

  return elements;
}

function App() {
  return (
    <>
      <CustomRoutes />
    </>
  );
}

export default App;
