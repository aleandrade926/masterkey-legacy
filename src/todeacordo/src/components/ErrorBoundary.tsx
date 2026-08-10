import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ToDeAcordo][ErrorBoundary] Erro de renderização capturado:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {this.props.fallbackTitle || 'Ocorreu um erro ao carregar esta página'}
            </h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {this.state.error?.message || 'Não foi possível renderizar os dados da reunião.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-md"
              >
                Recarregar Página
              </button>
              <button
                onClick={() => {
                  const urlParams = new URLSearchParams(window.location.search);
                  const isExt = window.location.protocol === 'chrome-extension:';
                  window.location.href = isExt ? 'index.html' : '/app';
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl text-sm transition-colors"
              >
                Ir para Início
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
