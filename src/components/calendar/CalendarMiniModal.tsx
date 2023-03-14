import { format, isSameDay, isSameMonth, toDate } from "date-fns";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { calendarDayList } from "../../atoms";
import RenderSelected from "./RenderSelected";

interface ITest {
  day: Date;
  monthStart: Date;
  currentMonth: Date;
  selectedDate: string;
  onDateClick: (day: Date) => string;
  cloneDay: Date;
  formattedDate: string;
  // dayList: string[];
}

const CalendarMiniModal = ({
  day,
  monthStart,
  currentMonth,
  selectedDate,
  onDateClick,
  cloneDay,
  formattedDate,
}: ITest) => {
  const [isActive, setIsActive] = useState(false);
  const [dayList, setDayList] = useRecoilState(calendarDayList);
  const Month = format(currentMonth, "MM");
  let currentDay = new Date();
  const [workDay, setWorkDay] = useState({ workday: "" });

  const onClickCellHandler = () => {
    onDateClick(toDate(cloneDay));
    setIsActive((pre) => !pre);

    if (isActive) {
      const copy = dayList.filter((days) => {
        return days !== `${format(day, "YMM")}${format(day, "dd")}`;
      });
      setDayList([...copy]);
    } else {
      const yyyymmdd = `${format(day, "YMM")}${format(day, "dd")}`;

      setDayList([...dayList, `${format(day, "YMM")}${format(day, "dd")}`]);
    }
  };

  return (
    <Cells
      key={String(day)}
      color={
        !isSameMonth(day, monthStart)
          ? "#adb5bd"
          : format(currentMonth, "M") !== format(day, "M")
          ? "#adb5bd"
          : "black"
      }
      onClick={onClickCellHandler}
      backgroundColor={
        // dayList와 같은 날이라면......skyblue로....

        // isActive
        //   ? "skyblue"
        //   :
        isSameDay(day, currentDay) ? "rgba(207, 240, 217, 0.3)" : "transparent"
      }
    >
      <CellsNum
        color={
          format(currentMonth, "M") !== format(day, "M") ? "#adb5bd" : "black"
        }
      >
        {formattedDate}
      </CellsNum>
      <RenderSelected day={day} Month={Month} setIsActive={setIsActive} />
    </Cells>
  );
};

const Cells = styled.div<{ color: string; backgroundColor: string }>`
  font-family: "Noto Sans KR";
  width: 40px;
  height: 40px;
  position: relative;
  padding-top: 3px;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CellsNum = styled.span<{ color: string }>`
  margin-bottom: 6px;
  margin-right: 1px;
  color: ${(props) => props.color};
`;

export default CalendarMiniModal;
