import React, { createElement, useState } from 'react'
import reactDOM from 'react-dom/client'

const Hello = () => {
    const [count, setCount] = useState(0);

    return (
        <div className='test-hello' id="test-hello" onClick={() => setCount(10)}>{count}</div>
    )
}

console.log(Hello.toString());
console.log(createElement(Hello), "index.tsx::4行");

const App = <Hello />
console.log(App, "index.tsx::14行");

// @ts-ignore
// console.log(App === Hello, "index.tsx::14行");
// console.log(App, "index.tsx::13行");

// console.log(reactDOM.createRoot(document.getElementById('root')!), "index.tsx::12行");
reactDOM.createRoot(document.getElementById('root')!).render(App)