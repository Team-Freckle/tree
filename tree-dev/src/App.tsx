import React from "react";
import "./App.css";
import { PcotGraph } from "./pcotGraph/PcotGraph";
import { Node } from "./pcotGraph/Node";

const data: Array<Node> = [
  { name: "top", key: "iubuc2", comment: "ds", time: "2023-10-10 10:09:10" },
  {
    name: "main",
    key: "asasddi2",
    comment: "init",
    time: "2023-10-10 10:10:10",
    parent: "iubuc2",
  },
  {
    name: "design",
    key: "asmdi2",
    comment: "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
    time: "2023-10-11 10:10:10",
    parent: "asasddi2",
  },
  {
    name: "color",
    key: "34rfs2",
    comment: "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
    time: "2023-10-12 10:10:10",
    parent: "asmdi2",
  },
  {
    name: "color2",
    key: "43erdg2",
    comment: "ㅇㄴㄹㅇㅇㅎ ㅈㅇㅁㄴㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅎㅊㄹ @test2@test.er",
    time: "2023-10-15 10:10:10",
    parent: "asmdi2",
  },
  {
    name: "design2",
    key: "oil34ed",
    comment: "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
    time: "2023-10-13 10:10:11",
    parent: "asasddi2",
  },

  {
    name: "bbbb",
    key: "aewfrdd",
    comment: "ㅇㄴㄹㅇㅇㅎ ㅈㅇㅁㄴㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅎㅊㄹ @test2@test.er",
    time: "2023-10-16 11:10:11",
    parent: "oil34ed",
  },

  {
    name: "design3",
    key: "sd455fd",
    comment: "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
    time: "2023-10-14 10:10:11",
    parent: "asasddi2",
  },
];

function App() {
  return (
    <div className="App">
      <PcotGraph tree={data} />
    </div>
  );
}

export default App;
