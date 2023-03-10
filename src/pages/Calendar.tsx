import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, toDate } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import styled from "styled-components";
import RenderHeader from "../components/calendar/RenderHeader";
import RenderDays from "../components/calendar/RenderDays";
import RenderTodos from "../components/calendar/RenderTodos";
import RenderDayTotal from "../components/calendar/RenderDayTotal";
import TodosModal from "../components/calendarModal/TodosModal";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import MoreBtnsModal from "../components/calendarModal/MoreBtnsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarTax, moreBtnsAtom, workplaceBtnsAtom } from "../atoms";
import WorkplaceBtnsModal from "../components/calendarModal/WorkplaceBtnsModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBonus, getMonthly, getTotal } from "../APIs/calendarApi";
import Footer from "../components/footer/Footer";
import comma from "../hooks/comma";
import RenderTotalWage from "../components/calendar/RenderTotalWage";
import LayOut from "../components/layout/LayOut";

type ICellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
  todosData: any;
  bonusData: any;
  isLoadingTodos: any;
  isLoadingBonus: any;
};

type IBonusProps = {
  day: Date;
  Month: string;
  bonus: IBonus[];
};

type IBonus = {
  year: string;
  month: string;
  date: string;
  bonus: string;
  color: string;
};

const RenderBonus = ({ day, Month, bonus }: IBonusProps) => {
  const dayYear = format(day, "Y");
  const dayMonth = format(day, "MM");
  const dayDate = format(day, "dd");

  // console.log(bonus);
  const bonusList = [];

  for (const b of bonus) {
    if (
      b.year === dayYear &&
      b.month === dayMonth &&
      dayMonth === Month &&
      b.date === dayDate
    ) {
      bonusList.push(
        <BonusWage>
          <div style={{ backgroundColor: `${b.color}` }}></div>
          <span>주휴수당</span>
        </BonusWage>
      );
    }
  }
  return <div>{bonusList}</div>;
};

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  todosData,
  bonusData,
  isLoadingTodos,
  isLoadingBonus,
}: ICellsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const navigate = useNavigate();

  // const YYYYMM = `${format(currentMonth, "Y")}${format(currentMonth, "MM")}`;
  // console.log(YYYYMM);

  // 근무달력 조회 (월별)
  // const { isLoading: isLoadingTodos, data: todosData } = useQuery(
  //   ["monthly"],
  //   () => getMonthly(YYYYMM)
  // );
  // console.log(todosData);

  // // 근무달력 조회 (주휴수당)
  // const { isLoading: isLoadingBonus, data: bonusData } = useQuery(
  //   ["bonus"],
  //   () => getBonus(YYYYMM)
  // );
  // console.log(bonusData);

  // 예시 데이터
  const todos = [
    {
      todoId: 1,
      year: "2023",
      month: "01",
      date: "05",
      placeName: "카페",
      workingTime: "03:30",
      startTime: "09:00",
      endTime: "12:30",
      hourlyWage: "9,620",
      dayWage: "33,670",
      dayTotalWage: "81,770",
      color: "#FFDD94",
    },
    {
      todoId: 2,
      year: "2023",
      month: "01",
      date: "05",
      placeName: "영화관",
      workingTime: "10:00",
      startTime: "13:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "48,100",
      dayTotalWage: "81,770",
      color: "#D0E6A5",
    },
    {
      todoId: 2,
      year: "2023",
      month: "01",
      date: "08",
      placeName: "영화관",
      workingTime: "05:05",
      startTime: "13:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "48,100",
      dayTotalWage: "81,770",
      color: "#D0E6A5",
    },
    {
      todoId: 3,
      year: "2023",
      month: "01",
      date: "18",
      placeName: "카페",
      workingTime: "04:00",
      startTime: "14:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "38,480",
      dayTotalWage: "38,480",
      color: "#FFDD94",
    },
    {
      todoId: 4,
      year: "2023",
      month: "02",
      date: "01",
      placeName: "카페",
      workingTime: "04:00",
      startTime: "14:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "38,480",
      dayTotalWage: "38,480",
      color: "#FFDD94",
    },
  ];

  const bonus = [
    {
      year: "2023",
      month: "01",
      date: "08",
      bonus: "33,000",
      color: "#FFDD94",
    },
    {
      year: "2023",
      month: "01",
      date: "08",
      bonus: "46,000",
      color: "#D0E6A5",
    },
    {
      year: "2023",
      month: "01",
      date: "22",
      bonus: "56,000",
      color: "#FFDD94",
    },
  ];

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let currentDay = new Date();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const dayMonth = format(day, "MM");
      const Month = format(currentMonth, "MM");

      const id = `${String(day).split(" ")[3]}${dayMonth}${
        String(day).split(" ")[2]
      }`;
      // console.log(id);

      days.push(
        <Cells
          key={String(day)}
          color={
            !isSameMonth(day, monthStart)
              ? "#adb5bd"
              : format(currentMonth, "M") !== format(day, "M")
              ? "#adb5bd"
              : "black"
          }
          backgroundColor={
            isSameDay(day, selectedDate)
              ? " rgba(207, 240, 217, 0.3)"
              : // isSameDay(day, currentDay)
                // ? "#EDE1E3"
                // :
                "transparent"
          }
          onClick={() => {
            onDateClick(toDate(cloneDay));
            navigate(`/calendar/${id}`);
          }}
        >
          <CellsNum
            color={
              format(currentMonth, "M") !== format(day, "M")
                ? "#adb5bd"
                : isSameDay(day, currentDay)
                ? "white"
                : "black"
            }
            backgroundColor={
              format(currentMonth, "M") !== format(day, "M")
                ? "transparent"
                : isSameDay(day, currentDay)
                ? "#5FCE80"
                : "transparent"
            }
          >
            <div>{formattedDate}</div>
          </CellsNum>

          {isLoadingTodos ? null : (
            <RenderTodos day={day} Month={Month} todos={todosData} />
          )}

          {isLoadingBonus ? null : (
            <RenderBonus day={day} Month={Month} bonus={bonusData} />
          )}

          {isLoadingTodos ? null : (
            <RenderDayTotal
              day={day}
              Month={Month}
              todos={todosData}
              bonus={bonusData}
            />
          )}
        </Cells>
      );
      day = addDays(day, 1);
    }
    // 아마도 여기다 key값을 주어야 warning이 사라질듯함...그런데 줄 방법이 없음ㅋ
    rows.push(<CellsRow>{days}</CellsRow>);
    days = [];
  }
  return <CellsBody>{rows}</CellsBody>;
};

const Calendar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("is_login");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const YYYYMM = `${format(currentMonth, "Y")}${format(currentMonth, "MM")}`;
  const queryClient = useQueryClient();
  // console.log(YYYYMM);

  // 근무달력 조회 (월별)
  const {
    isLoading: isLoadingTodos,
    data: todosData,
    refetch: refetchTodos,
  } = useQuery(["monthly"], () => getMonthly(YYYYMM));

  // 근무달력 조회 (주휴수당)
  const {
    isLoading: isLoadingBonus,
    data: bonusData,
    refetch: refetchBonus,
  } = useQuery(["bonus"], () => getBonus(YYYYMM));

  // TotalWage get 요청
  const {
    isLoading,
    data,
    refetch: refetchTotalWage,
  } = useQuery(["totalWage"], () => getTotal(YYYYMM));

  const selectedMonth = (date: Date) => {
    setCurrentMonth(date);
    return currentMonth;
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    console.log("바뀐 이전 달", currentMonth);
    return currentMonth;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    return currentMonth;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    return selectedDate;
  };

  useEffect(() => {
    refetchTodos();
    refetchBonus();
    refetchTotalWage();
    // queryClient.invalidateQueries(["monthly"]);
    // queryClient.invalidateQueries(["bonus"]);
    // queryClient.invalidateQueries(["totalWage"]);
  }, [currentMonth]);

  /////// 모달창 기능
  const [isOpen, setIsOpen] = useState(false);
  const dayMatch = useMatch("/calendar/:id");
  const dayBtnMatch = useMatch("/calendar/:id/:todoId");
  // console.log(dayMatch);
  // console.log(dayBtnMatch);

  const isMoreBtns = useRecoilValue(moreBtnsAtom);
  const isWorkplaceBtns = useRecoilValue(workplaceBtnsAtom);
  const [isTax, setIsTax] = useRecoilState(calendarTax);
  // console.log(isMoreBtns);
  // console.log(isWorkplaceBtns);

  return (
    <>
      <LayOut height="100vh" font="null">
        <Total>
          <RenderHeader
            currentMonth={currentMonth}
            selectedMonth={selectedMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
          <RenderDays />
          <RenderCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            todosData={todosData}
            bonusData={bonusData}
            isLoadingTodos={isLoadingTodos}
            isLoadingBonus={isLoadingBonus}
          />
          <RenderTotalWage data={data} />
        </Total>
      </LayOut>
      {dayMatch || dayBtnMatch ? <TodosModal /> : null}
      {/* {isMoreBtns && <MoreBtnsModal />} */}
      {isWorkplaceBtns && <WorkplaceBtnsModal />}
    </>
  );
};

const Total = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CellsRow = styled.div`
  display: flex;
  &:last-child {
    border-bottom: 1px solid #d9d9d9;
  }
`;

const CellsBody = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Cells = styled.div<{ color: string; backgroundColor: string }>`
  width: 50px;
  height: 93px;
  border-top: 1px solid #d9d9d9;
  /* ${(props) => props.color} */
  background-color: ${(props) => props.backgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CellsNum = styled.div<{ color: string; backgroundColor: string }>`
  width: 20px;
  height: 20px;
  color: ${(props) => props.color};
  font-size: 11px;
  font-weight: 400;
  border-radius: 50%;
  margin: 2px 0px 2px 0px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    height: 14px;
  }
`;

const BonusWage = styled.div`
  font-size: 10px;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-bottom: 1px;

  div {
    width: 7px;
    height: 7px;
    margin-right: 2px;
    border-radius: 50%;
  }
`;

export default Calendar;
