const initializeExternalStylesheets = () => {
  const addStylesheet = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  addStylesheet('https://fonts.googleapis.com/icon?family=Material+Icons');
};

export default initializeExternalStylesheets;
