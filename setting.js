const save_options = () => {
  const old1 = {year: document.getElementById('year-1').value};
  const old2 = {year: document.getElementById('year-2').value};

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

const restore_options = () => {
  // デフォルト値の設定
  chrome.storage.sync.get({
    old1: {year: 5},
    old2: {year: 2},
    hiddenOtherSearch: false
  }, (setting) => {
    document.getElementById('year-1').value = setting.old1["year"];
    document.getElementById('year-2').value = setting.old2["year"];
    document.getElementById('hidden-other-search').checked = setting.hiddenOtherSearch;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);