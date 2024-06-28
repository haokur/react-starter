import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/store.hook";
import { otherSlice } from "../../stores/other.slice";

interface IProps {
    config: Object,
    children?: React.ReactNode,
}

const ClassVsFuncCopy: React.FC<IProps> = (props) => {

    const count = useTypedSelector(state => state.other.count)
    const dispatch = useDispatch();

    const handleCommonIncrement = () => {
        dispatch(otherSlice.actions.increment())
    }

    return <div>
        {count}
        <button onClick={handleCommonIncrement}>ClickMe</button>
    </div>
}

export default ClassVsFuncCopy;