declare const Plaid: {
  create: (options: {
    token: string;
    onSuccess: (public_token: string, metadata: any) => void;
    onExit?: (error: any, metadata: any) => void;
    onEvent?: (eventName: string, metadata: any) => void;
    receivedRedirectUri?: string;
  }) => {
    open: () => void;
    exit: (options?: { force: boolean }) => void;
  };
};
