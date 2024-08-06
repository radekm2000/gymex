import { MemoizedLayout } from "./root/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <MemoizedLayout />
      <Toaster />
    </>
  );
}

export default App;
