import React from "react";
import "./App.css";
import { PcotGraph } from "./pcotGraph/PcotGraph";
import { RawNode } from "./pcotGraph/Node";

const data: RawNode = {
  name: "top",
  key: "iubuc2",
  comment: "ds",
  time: "sd",
  child: [
    {
      name: "main",
      key: "asasddi2",
      comment: "init",
      time: "2023-10-10 10:09:10",
      child: [
        {
          name: "design",
          key: "asmdi2",
          comment: "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
          time: "2023-10-10 10:10:10",
          child: [
            {
              name: "color",
              key: "34rfs2",
              comment:
                "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
              time: "2023-10-10 10:10:12",
              child: [],
            },
            {
              name: "aaaa",
              key: "43erdg2",
              comment:
                "ㅇㄴㄹㅇㅇㅎ ㅈㅇㅁㄴㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅎㅊㄹ @test2@test.er",
              time: "2023-10-10 11:10:11",
              child: [],
            },
          ],
        },
        {
          name: "design2",
          key: "oil34ed",
          comment: "전반적으로 노란색이고 발과 배, 그리고 꼬리부분만 흰색털",
          time: "2023-10-10 10:10:11",
          child: [
            {
              name: "bbbb",
              key: "aewfrdd",
              comment:
                "ㅇㄴㄹㅇㅇㅎ ㅈㅇㅁㄴㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅎㅊㄹ @test2@test.er",
              time: "2023-10-10 11:10:11",
              child: [],
            },
          ],
        },
      ],
    },
  ],
};

function App() {
  return (
    <div className="App">
      <PcotGraph tree={data} />
    </div>
  );
}

export default App;
