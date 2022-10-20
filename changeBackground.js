const updateAt = (content) => {
  if (content.getElementsByClassName('MUxGbd wuQ4Ob WZ8Tjf').length < 1 ||
    content.getElementsByClassName('MUxGbd wuQ4Ob WZ8Tjf')[0].getElementsByTagName("span").length < 1){
    return null;
  }

  const span = content.getElementsByClassName('MUxGbd wuQ4Ob WZ8Tjf')[0].getElementsByTagName("span")[0];
  return span ? span.textContent : null;
}

const backgroundColor = async(updateAt) => {
  if(!updateAt){
    return 'inherit';
  }

  return await new Promise(resolve => {chrome.storage.sync.get({
    old1: {year: 5, color: "#ffb7b7"},
    old2: {year: 2, color: "#ffffb7"},
  }, (setting) => {
    const oldest = new Date;
    oldest.setFullYear(oldest.getFullYear() - setting.old1["year"]);
    const older = new Date;
    older.setFullYear(older.getFullYear() - setting.old2["year"]);

    if(updateAt < oldest){
      resolve(setting.old1["color"]);
    }else if(updateAt < older){
      resolve(setting.old2["color"]);
    }else{
      resolve('inherit');
    }
  })});
}

const renderPage = async() =>{
  const results = Array.prototype.slice.call(document.getElementsByClassName("kvH3mc BToiNc UK95Uc"));
  for await (const result of results){
    const date = updateAt(result);
    if (date) {
      result.style.backgroundColor = await backgroundColor(new Date(date));
    }
  };

  renderOthersAlsoSearch();
};

const renderOthersAlsoSearch = () => {
  // 設定『他の人はこちらも検索」を非表示』にチェックをつけたら「他の人はこちらも検索」欄を表示しない
  chrome.storage.sync.get({
    hiddenOtherSearch: false
  }, (setting) => {
    if(setting.hiddenOtherSearch){
      const others_also_search = Array.prototype.slice.call(document.querySelectorAll("[id^='eob_']"));
      others_also_search.forEach((item)=>{
        item.style.display = 'none';
      });
    }
  });
}

renderPage();
