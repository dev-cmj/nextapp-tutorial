"use client";


import {useState} from "react";

function HelloWorld() {

    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Hello, World!!!</h1>
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
        </>
    );
}

function HomePage() {
    return (
        <div>
            <HelloWorld />
        </div>
    );
}

export default HomePage;