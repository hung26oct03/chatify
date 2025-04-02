import { ReactNode } from "react";
import Lottie from "lottie-react";
import styles from "./layout_default.module.scss";
import NotFound from "@/public/static/assets/animations/NotFound.json";

interface LayoutProps {
  children?: ReactNode;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={styles.container}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className={styles.animation_lotie}
        style={{
          width: "500px",
          height: "500px",
        }}
      >
        <Lottie animationData={NotFound} loop autoplay />
      </div>
      <div>
        <h2
          className={`${styles.title} text-center`}
          style={{ fontWeight: "600", color: "#1A2E35" }}
        >
          <span style={{ color: "#0D5EF4", fontSize: "40px" }}>OooPs!</span>
          &nbsp;&nbsp;Page Not Found
        </h2>
        <span
          className="d-flex align-center justify-center text-center"
          style={{ fontSize: "18px", fontStyle: "italic" }}
        >
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </span>
      </div>
      {children}
    </div>
  );
};

export default DefaultLayout;