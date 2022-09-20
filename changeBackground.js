const updateAt = (content) => {
  if (content.getElementsByClassName('MUxGbd wuQ4Ob WZ8Tjf').length < 1 ||
    content.getElementsByClassName('MUxGbd wuQ4Ob WZ8Tjf')[0].getElementsByTagName("span").length < 1){
    return null;
  }

  const span = content.getElementsByClassName('MUxGbd wuQ4Ob WZ8Tjf')[0].getElementsByTagName("span")[0];
  return span ? span.textContent : null;
}

const backgroundColor = (updateAt) => {
  if(!updateAt){
    return 'inherit';
  }

  const oldest = new Date;
  oldest.setFullYear(oldest.getFullYear() - 5);
  const older = new Date
  older.setFullYear(older.getFullYear() - 2);

  if(updateAt < oldest){
    return '#ffb7b7';
  }else if(updateAt < older){
    return '#ffffb7';
  }else{
    return 'inherit';
  }
}

const renderPage = () =>{
  const results = Array.prototype.slice.call(document.getElementsByClassName("g"));
  results.forEach((result)=>{
    const date = updateAt(result);
    if (date) {
      result.style.backgroundColor = backgroundColor(new Date(date));
    }
  })

  // レイアウトの都合上、「他の人はこちらも検索」欄を表示しない
  const others_also_search = Array.prototype.slice.call(document.querySelectorAll("[id^='eob_']"));
  others_also_search.forEach((item)=>{
    item.style.display = 'none';
  });
};

renderPage();
