import React from "react";

export function withErrorBoundary(WrappedComponent: React.ComponentType<any>) {
    return class ErrorCatch extends React.Component {
        state = { hasError: false }

        constructor(props: any) {
            super(props)
        }

        static getDerivedStateFromError(error: Error) {
            console.log("getDerivedStateFromError捕获到错误", error);
            return { hasError: true }
        }

        componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
            console.log("componentDidCatch捕获到错误", error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return <div>Something went wrong.</div>
            }
            return <WrappedComponent {...this.props} />
        }
    }
}