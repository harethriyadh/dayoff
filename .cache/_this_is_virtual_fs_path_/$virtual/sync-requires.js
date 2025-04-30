
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-jsx": preferDefault(require("/home/harith/test/dayoff/src/pages/index.jsx")),
  "component---src-pages-login-jsx": preferDefault(require("/home/harith/test/dayoff/src/pages/login.jsx")),
  "component---src-pages-register-jsx": preferDefault(require("/home/harith/test/dayoff/src/pages/register.jsx"))
}

