import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { animated, useSpring, easings } from "@react-spring/web";

const listOfCities = [
  "Tokyo, Japan",
  "Ottawa, Canada",
  "Cairo, Egypt",
  "Buenos Aires, Argentina",
  "Lisbon, Portugal",
  "Bangkok, Thailand",
  "Nairobi, Kenya",
  "Dublin, Ireland",
  "Helsinki, Finland",
  "Santiago, Chile",
];
interface AnimatedTextProps {
  fromText?: string;
  toText: string;
}
const AnimatedText: React.FC<AnimatedTextProps> = (props) => {
  const [from, setFrom] = useState<number[]>([]);
  const [to, setTo] = useState<number[]>([]);
  const styles = useSpring({
    from: { text: from },
    to: { text: to },
    config: {
      easing: easings.steps(10),
    },
  });
  useEffect(() => {
    const maxLen = Math.max(props.fromText?.length || 0, props.toText.length);
    const newFrom = Array(maxLen)
      .fill(32)
      .map((v, i) => {
        return props.fromText?.charCodeAt(i) || v;
      });
    const newTo = Array(maxLen)
      .fill(32)
      .map((v, i) => {
        return props.toText.charCodeAt(i) || v;
      });
    setFrom(newFrom);
    setTo(newTo);
  }, [props.toText, props.fromText]);
  return (
    <animated.code>
      {styles.text.to((...v) =>
        String.fromCharCode(...v.map((va) => parseInt(va + ""))),
      )}
    </animated.code>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  const str = ["Kranoyarsk, Russia", "Belarus, Minsk"];

  return (
    <div className="App">
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => (count + 1) % listOfCities.length);
            setToggle(!toggle);
          }}
        >
          count is {count}
        </button>
      </div>
      <AnimatedText
        fromText={listOfCities[count - 1]}
        toText={listOfCities[count]}
      />
    </div>
  );
}

export default App;
