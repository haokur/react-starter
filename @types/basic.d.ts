/**联合children值,通常用于子组件中 */
type WithChildren<T> = T & { children?: React.ReactNode }

