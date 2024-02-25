import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmptionItem";
import { DairyDispatchContext } from "../App";
import { emotionList, getStringDate } from "../util/data";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const { onCreate, onEdit, onRemove } = useContext(DairyDispatchContext);
  const handleSumbit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? "Modify Diary?" : "New Diary?")) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const handleRemove = () => {
    if (window.confirm("Delete?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "Modify Diary" : "Write a New Diary"}
        leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && <MyButton text={"Delete"} onClick={handleRemove} />
        }
      />
      <div>
        <section>
          <h4>What is today?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>Today's emotion</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>Today's Diary</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="How was your today"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"Cancle"} onClick={() => navigate(-1)} />
            <MyButton text={"Fin"} type={"positive"} onClick={handleSumbit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
