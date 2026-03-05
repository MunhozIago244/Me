import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary para capturar erros em componentes filhos.
 * Exibe uma UI de fallback em vez de quebrar toda a aplicação.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-bg-base flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-bg-secondary border border-accent-red/50 rounded-xl p-8 font-mono text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-accent-red" />
              <div className="w-3 h-3 rounded-full bg-accent-yellow" />
              <div className="w-3 h-3 rounded-full bg-accent-green opacity-50" />
            </div>

            <div className="text-4xl mb-4">💥</div>

            <h1 className="text-xl text-accent-red font-bold mb-2">
              SYSTEM_CRASH
            </h1>

            <p className="text-text-secondary text-sm mb-4">
              Algo deu errado. Por favor, tente novamente.
            </p>

            <pre className="text-xs text-accent-yellow bg-code p-3 rounded mb-6 overflow-auto text-left">
              {this.state.error?.message || "Unknown error"}
            </pre>

            <button
              onClick={this.handleRetry}
              className="px-6 py-2 bg-accent-green text-bg-base font-bold rounded hover:bg-accent-blue transition-colors text-sm"
            >
              Tentar Novamente
            </button>

            <p className="text-text-secondary text-xs mt-4">
              Se o problema persistir, entre em contato:{" "}
              <a
                href="mailto:iagomunhoz48@gmail.com"
                className="text-accent-blue hover:underline"
              >
                iagomunhoz48@gmail.com
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
