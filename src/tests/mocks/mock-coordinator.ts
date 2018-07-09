export function newMockCoordinator(): typeof window['extension-coordinator'] {
  let coordinator = {} as typeof window['extension-coordinator'];

  coordinator.ExtensionMode = {
    Viewer: 'viewer',
    Dashboard: 'dashboard',
    Config: 'config',
  } as typeof coordinator.ExtensionMode;

  coordinator.ExtensionPlatform = {
    Web: 'web',
    Mobile: 'mobile'
  } as typeof coordinator.ExtensionPlatform;

  coordinator.ExtensionAnchor = {
    Panel: 'panel',
    Overlay: 'video_overlay',
    Component: 'component',
  } as typeof coordinator.ExtensionAnchor;

  coordinator.getComponentPositionFromView = () => ({
    x: 20,
    y: 20,
  });

  coordinator.getComponentSizeFromView = () => ({
    width: 10,
    height: 10,
    zoomScale: 1024,
  })

  return coordinator;
}
