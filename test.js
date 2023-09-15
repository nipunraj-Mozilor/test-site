let cookies = document.cookie
  .split(";")
  .reduce(
    (ac, cv, i) => Object.assign(ac, { [cv.split("=")[0]]: cv.split("=")[1] }),
    {}
  );
const cookieYesConsent = cookies["cookieyes-consent"];
let analyticsConsent = false;
if (cookieYesConsent) {
  const cookiePairs = cookieYesConsent.split(",").map((pair) => pair.trim());
  const cookieObj = {};
  cookiePairs.forEach((pair) => {
    const [key, value] = pair.split(":");
    cookieObj[key] = value;
  });
  if (cookieObj.advertisement === "yes") {
    analyticsConsent = true;
  }
}
if (analyticsConsent) {
  waitForElement(".elementor-video", () => {
    addScript();
  });
} else {
  document.addEventListener("cookieyes_consent_update", function (eventData) {
    const data = eventData.detail;
    if (data.accepted.includes("advertisement")) {
      console.log("test");
      waitForElement(".elementor-video", () => {
        addScript();
      });
    }
  });
}
function addScript() {
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "video-placeholder-youtube");
  divElement.setAttribute("data-cky-tag", "video-placeholder");
  console.log(document.querySelector(".elementor-video"));
  document.querySelector(".elementor-video").appendChild(divElement);
  console.log("ad yes");
}
function waitForElement(selector, callback) {
  console.log("in wait");
  const element = document.querySelector(selector);
  if (element) return callback();
  checktimeout++;
  if (checktimeout < 120) {
    setTimeout(function () {
      waitForElement(selector, callback);
    }, 500);
  }
}
