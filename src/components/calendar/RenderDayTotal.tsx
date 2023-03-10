import { IDayTotalProps } from "../../types/calendar";
import { format } from "date-fns";
import styled from "styled-components";
import { useState } from "react";
import comma from "../../hooks/comma";

const RenderDayTotal = ({ day, Month, todos, bonus }: IDayTotalProps) => {
  const dayYear = format(day, "Y");
  const dayMonth = format(day, "MM");
  const dayDate = format(day, "dd");

  let num = 0;

  const result = todos.filter(
    (todo) =>
      todo.year === dayYear &&
      todo.month === dayMonth &&
      dayMonth === Month &&
      todo.date === dayDate
  );

  for (const r of result) {
    num = num + Number(r.dayWage);
  }

  if (bonus !== undefined) {
    const result2 = bonus.filter(
      (b) =>
        b.year === dayYear &&
        b.month === dayMonth &&
        dayMonth === Month &&
        b.date === dayDate
    );

    for (const r of result2) {
      num = num + Number(r.bonus);
    }
  }

  if (num === 0) return null;
  return <DayTotal>{comma(String(num))}</DayTotal>;
};

const DayTotal = styled.div`
  width: 100%;
  font-size: 10px;
  font-weight: 400;
  margin: 3px 0px 3px 0px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RenderDayTotal;
