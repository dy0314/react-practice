import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import { emotionList, getStringDate } from "../util/data";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Emotion Diary - ${id}`;
  }, []);

  useEffect(() => {
    if (diaryList.length < 1) return;

    const targetDiary = diaryList.find(
      (it) => parseInt(it.id) === parseInt(id)
    );

    if (targetDiary) {
      setData(targetDiary);
    } else {
      alert("N/A");
      navigate("/home", { replace: true });
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">Loading...</div>;
  } else {
    const currentEmtonData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 의 기록`}
          leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={"Modify"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>Emotion</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={currentEmtonData.emotion_img}></img>
              <div className="emotion_descript">
                {currentEmtonData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>Today's Diary</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
