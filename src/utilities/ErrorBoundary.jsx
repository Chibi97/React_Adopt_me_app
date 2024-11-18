import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  // Every time an error is thrown in a child component, this method is called
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  //! This method does not exist in Functional components, no hook covers it
  componentDidCatch(error, info) {
    // This is where we would log into: TrackJs, New Relic, Sentry, etc.
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    // Render children (normaly the flow) if there is no error
    return this.props.children; // like a slot mechanism in Vue!
  }
}

export default ErrorBoundary;
