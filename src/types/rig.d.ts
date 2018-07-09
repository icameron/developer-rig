interface GlobalExtensionRig {
  history: Array<{
    frame: string;
    log: string;
  }>
  update: () => void;
}
