document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("language") || 'br'; // 默认中文
  i18next.init({
    lng: savedLang,
    debug: false,
    resources: resources
  }, function () {
    updateContent();
    updateFlag(savedLang);
    updateWhitepaperLink(savedLang);
  });
});

function updateContent() {
  // 设置 innerText 的元素
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = i18next.t(key);
  });

  // 设置 placeholder 的元素
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = i18next.t(key);
  });

  // 设置 content 的元素
  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const key = el.getAttribute("data-i18n-content");
    el.content = i18next.t(key);
  });
}
function changeLanguage(lang) {
  localStorage.setItem("language", lang); // 存储语言
  i18next.changeLanguage(lang, () => {
    updateContent();
    updateFlag(lang);
    updateWhitepaperLink(lang);
  });
}
function updateFlag(lang) {
  const flagMap = {
    zh: "cn",
    en: "gb",
    br: "br",
    kr: "kr",
    jp: "jp",
    es: "es"
  };

  const flagElement = document.getElementById("lang-flag");
  if (flagElement) {
    flagElement.className = "fi fi-" + (flagMap[lang] || "br");
  }
}
function updateWhitepaperLink(lang) {
  const pdfMap = {
    zh: "Vxex Exchange-Whitepaper-zh.pdf",
    en: "Vxex Exchange-Whitepaper-en.pdf",
    br: "Vxex Exchange-Whitepaper-br.pdf",
    kr: "Vxex Exchange-Whitepaper-kr.pdf",
    jp: "Vxex Exchange-Whitepaper-jp.pdf",
    es: "Vxex Exchange-Whitepaper-es.pdf"
  };

  const link = document.getElementById("whitepaper-link");
  if (link) {
    link.href = "http://www.Vxex Exchange.cn/static/files/" + pdfMap[lang] || pdfMap["br"];
  }
}