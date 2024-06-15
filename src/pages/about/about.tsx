import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/store.hook"
import { commonSlice } from "../../stores/common.slice";

const AboutPage = function () {
    console.log("AboutPage render", "about.tsx::6行");
    const count = useTypedSelector(state => state.common.count)
    const count2 = useTypedSelector(state => state.test.count)

    const dispatch = useDispatch();

    const handleCommonIncrement = () => {
        dispatch(commonSlice.actions.increment())
    }

    return (
        <div>
            <h3>this is AboutPage-{count}-{count2}</h3>
            <button onClick={handleCommonIncrement}>redux-common-increment</button>
        </div>
    )
}

export default AboutPage