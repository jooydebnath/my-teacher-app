import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Onboarding from "./Onboarding";

const Index = () => {
  const navigate = useNavigate();
  const hasClass = localStorage.getItem("selectedClass");

  useEffect(() => {
    if (hasClass) {
      navigate("/subjects", { replace: true });
    }
  }, [hasClass, navigate]);

  if (hasClass) return null;
  return <Onboarding />;
};

export default Index;
