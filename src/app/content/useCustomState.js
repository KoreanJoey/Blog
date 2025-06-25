const useCustomState = (init) => {
  let a = init;

  const getState = () => {
    return a;
  };

  const setState = (newState) => {
    a = newState;
  };

  return [getState, setState];
};

const [value, setValue] = useCustomState("initial value");

setValue("updated value");

console.log("my custom useState!: ", value()); // "initial value"

// 변수 선언법
let var1;
const var2 = 1;

// 변수 할당법
var1 = 2;
const var3 = 1;

// 변수 선언 & 할당
const var4 = 3;
