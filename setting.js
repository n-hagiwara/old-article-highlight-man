const saveOptions = (e) => {
  e.preventDefault();

  const old1 = {year: document.getElementById('year-1').value, color: document.getElementById('color-1').value};
  const old2 = {year: document.getElementById('year-2').value, color: document.getElementById('color-2').value};

  if (Number(old1.year) < Number(old2.year)) {
    document.getElementById('error').textContent = "1番は2番より過去を入力してください";
    return
  }

  const hiddenOtherSearch = document.getElementById('hidden-other-search').checked;
  chrome.storage.sync.set({
    old1: old1,
    old2: old2,
    hiddenOtherSearch: hiddenOtherSearch
  }, () => {
    var status = document.getElementById('message');
    status.textContent = '保存しました。';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

const restoreOptions = () => {
  // デフォルト値の設定
  chrome.storage.sync.get({
    old1: {year: 5, color: "#ffb7b7"},
    old2: {year: 2, color: "#ffffb7"},
    hiddenOtherSearch: false
  }, (setting) => {
    document.getElementById('year-1').value = setting.old1["year"];
    document.getElementById('year-2').value = setting.old2["year"];
    document.getElementById('color-1').value = setting.old1["color"];
    document.getElementById('color-2').value = setting.old2["color"];
    document.getElementById('hidden-other-search').checked = setting.hiddenOtherSearch;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', (e) => saveOptions(e));
