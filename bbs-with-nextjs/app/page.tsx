
import BBSCardList from "@/components/layout/BBSCardList";

export default async function Home() {
  const response =await fetch("http://localhost:3000/api/post",{
    cache: "no-store"
  })
  
  const bbsAlldata =await response.json();
  console.log(bbsAlldata)

  return (
    <main >

<BBSCardList />
    </main>
  );
}


// 45分のところまで
// https://www.youtube.com/watch?v=8b6iqmo_2Os