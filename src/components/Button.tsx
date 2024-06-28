import { useImperativeHandle, forwardRef } from 'react';

export interface IExposeFunction {
    doSomething: () => void,
}


interface IProps {
    config: Object,
    children?: React.ReactNode,
}

const RefChild = forwardRef<IExposeFunction, IProps>((props, ref) => {

    const doSomething = () => { };

    useImperativeHandle(ref, () => ({
        doSomething
    }));

    return <div></div>;
});

export default RefChild;



