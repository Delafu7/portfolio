import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import QATestStage from "./components/QATestStage";
import DeployStage from "./components/DeployStage";
import Footer from "./components/Footer";
import PipelineDivider from "./components/PipelineDivider";

export default function App() {
  return (
    <div className="min-h-screen bg-dracula-bg text-dracula-fg">
      <Navbar />
      <main>
        <Hero />
        <PipelineDivider stage="BUILD" />
        <About />
        <PipelineDivider stage="ARTIFACTS" />
        <Projects />
        <PipelineDivider stage="TEST" />
        <QATestStage />
        <PipelineDivider stage="DEPLOY" />
        <DeployStage />
      </main>
      <Footer />
    </div>
  );
}
