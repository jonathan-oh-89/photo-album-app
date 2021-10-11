import { useState } from "react";

export default function useInputState(initialVal) {

    const [value, setValue] = useState(initialVal);

    function handleChange(e) {
        setValue(e.target.value);
    };

    function reset() {
        setValue("");
    };
    return [value, handleChange, reset];
};
