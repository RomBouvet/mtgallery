import queryString from 'query-string';

function getPage(){
  if(window.location.search){
    return parseInt(queryString.parse(window.location.search).page ? queryString.parse(window.location.search).page : 1);
  }

  return 1
}

function previousPage(){
  navigateTo(getPage()-1);
}

function nextPage(){
  navigateTo(getPage()+1);
}

function navigateTo(page){
  let params = queryString.parse(window.location.search);
  params.page = page;
  window.location.href = window.location.pathname + "?" + queryString.stringify(params)
}

export default function Pagination() {
  let range = [];
  let page=getPage();

  for (let i = (page - 3 >= 1 ? page - 3 : 1); i <= page + 3; i++) {
    range.push(i);
  }


  return (
    <div className="w-full flex flex-row justify-center mb-2 mt-2">
      <div className="flex flex-row center cursor-pointer">
        <div onClick={() => navigateTo(1)} className="mt-2 mb-2 h-8 w-8 border text-center leading-7 hover:bg-red-200">&lt;&lt;</div>
        <div onClick={() => previousPage()} className="mt-2 mb-2 h-8 w-8 border text-center leading-7 hover:bg-red-200">&lt;</div>
        {range.map((i) => {
          return (<div onClick={() => navigateTo(i)} className={(i===page ? "bg-red-200 " : "") + "mt-2 mb-2 h-8 w-8 border text-center leading-7 hover:bg-red-200"} key={i}>{i}</div>);
        })}
        <div onClick={() => nextPage()} className="mt-2 mb-2 h-8 w-8 border text-center leading-7 hover:bg-red-200">&gt;</div>
      </div>
    </div>
  );
}