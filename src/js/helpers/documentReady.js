export default (f) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', f);
  } else {
    f();
  }
};
