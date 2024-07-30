import { sideMenu } from "./data";
import Index from "./Components/Nav";

function App() {
  return (
    <>
      <Index data={sideMenu} />
    </>
  );
}

export default App;
