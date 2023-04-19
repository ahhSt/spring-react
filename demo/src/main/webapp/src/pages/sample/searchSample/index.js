import React, { useRef, useState, useEffect } from "react";

function Card({ id, name, email }) {   
  return (
    <div className='cardContainer'>
      <img src={`https://robohash.org/${id}?set=set2&size=180x180`} alt='' />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

export default function Main() {
  let list = [
    {id:1, name: 'fiona', type: 'human'},
    {id:2, name: 'orc', type: 'human'},
    {id:3, name: '대장', type: 'human'},
    {id:4, name: '보스몹', type: 'human'}
  ];
  
  const [userInput, setUserInput] = useState('');
  const [monsters, setMonsters] = useState([]); 
  
  useEffect(() => {
    setMonsters(list);
  },[])

  console.log('rrrr');
  
  const searched = monsters.filter((item) =>
   item.name.toLowerCase().includes(userInput)
 );
  // 입력값을 가져와서 소문자로변경
const getValue = (e) => {
 setUserInput(e.target.value.toLowerCase())};
  
return(
    <>
   <h1>컴포넌트 재사용 연습!</h1>
      <input onChange={getValue}/>
      {searched.map((item) => (
        <Card key={item.id} {...item} />  
      ))}
    </>)
}

