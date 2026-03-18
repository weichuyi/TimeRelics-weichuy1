(function () {
  // 建议先用 release 直链；以后你想固定路径再换 raw
  const UPDATE_JSON_URL =
    "https://github.com/weichuyi/htmlapp/releases/download/date/version.json";

  const PREFS_KEY = "hotupdate_versionCode";
  const ENTRY_PAGE = "index.html";

  function getStoredVersion() {
    const v = window.localStorage.getItem(PREFS_KEY);
    return v ? parseInt(v, 10) : 0;
  }
  function setStoredVersion(v) {
    window.localStorage.setItem(PREFS_KEY, String(v));
  }

  function updatedEntryUrl() {
    return cordova.file.dataDirectory + "www/" + ENTRY_PAGE;
  }

  function redirectToUpdatedIfExists() {
    window.resolveLocalFileSystemURL(
      updatedEntryUrl(),
      () => (window.location.href = updatedEntryUrl()),
      () => {}
    );
  }

  function downloadFile(fileUrl, targetPath) {
    return new Promise((resolve, reject) => {
      const ft = new FileTransfer();
      ft.download(encodeURI(fileUrl), targetPath, () => resolve(targetPath), reject, false);
    });
  }

  function readTextFile(filePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(
        filePath,
        (entry) => {
          entry.file(
            (file) => {
              const reader = new FileReader();
              reader.onloadend = function () {
                resolve(this.result);
              };
              reader.onerror = reject;
              reader.readAsText(file);
            },
            reject
          );
        },
        reject
      );
    });
  }

  function unzip(zipPath, destDir) {
    return new Promise((resolve, reject) => {
      zip.unzip(zipPath, destDir, (code) => (code === 0 ? resolve() : reject(code)));
    });
  }

  async function checkUpdateWithNativeDownload() {
    const current = getStoredVersion();

    try {
      // 1) 下载 version.json 到 cache
      const jsonPath = cordova.file.cacheDirectory + "version.json";
      await downloadFile(UPDATE_JSON_URL, jsonPath);

      // 2) 读取并解析
      const jsonText = await readTextFile(jsonPath);
      const info = JSON.parse(jsonText);

      const remoteVersion = parseInt(info.versionCode, 10) || 0;
      const zipUrl = info.zipUrl;

      if (!zipUrl) return;
      if (remoteVersion <= current) return;

      // 3) 下载 update.zip
      const zipTarget = cordova.file.cacheDirectory + "update.zip";
      await downloadFile(zipUrl, zipTarget);

      // 4) 解压到 dataDirectory（zip 内必须有 www/）
      await unzip(zipTarget, cordova.file.dataDirectory);

      // 5) 校验入口存在
      await new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(updatedEntryUrl(), resolve, reject);
      });

      setStoredVersion(remoteVersion);

      // 成功后跳转
      window.location.href = updatedEntryUrl();
    } catch (e) {
      // 测试阶段建议打开提示，确认卡在哪
      alert("更新失败: " + (e && e.message ? e.message : JSON.stringify(e)));
    }
  }

  document.addEventListener("deviceready", function () {
    redirectToUpdatedIfExists();
    checkUpdateWithNativeDownload();
  });
})();