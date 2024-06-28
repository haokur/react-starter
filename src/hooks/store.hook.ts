import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IStoreState } from "../stores/stores";

export const useTypedSelector: TypedUseSelectorHook<IStoreState> = useSelector;