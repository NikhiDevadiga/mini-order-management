import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <AppRoutes />
      </main>
    </>
  );
};

export default App;
