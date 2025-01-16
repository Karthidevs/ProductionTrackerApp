import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "../components/Button";
import { getUserData, insertData } from "../lib/database";
import { useUser } from "@clerk/clerk-react";
import { useStopwatch } from "react-timer-hook";

export const DetailsForm = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [timerStarted, setTimerStarted] = useState(false);
  const {
    seconds,
    minutes,
    hours,
    reset: timeReset,
    start,
    pause,
  } = useStopwatch();
  const { user, isSignedIn } = useUser();

  const review = watch("reviewID");
  const resetTime = useCallback(() => {
    pause();
    setTimerStarted(false);
  }, [pause]);
  useEffect(() => {
    if (review && !timerStarted) {
      setTimerStarted(true);
      timeReset();
      start();
    }

    if (!review && timerStarted) {
      if (confirm("Are you sure want to end the existing time")) {
        resetTime();
        resetTime();
      }
    }
  }, [review, timerStarted, start, resetTime, timeReset]);

  const onSubmit = (d) => {
    const time = `${hours}:${minutes}:${seconds}`;
    if (isSignedIn) {
      insertData(d, user, time);
      resetTime();
      reset();
    } else {
      alert("please Login In");
    }
  };

  const exportHandler = async () => {
    const userData = await getUserData(user.id);
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "productionTracker.xlsx");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-full bg-slate-200 p-2  w-full grid grid-cols-2    items-center"
      >
        <div className="space-y-4 ">
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg  w-36 " htmlFor="reviewID">
              Review ID
            </label>
            <input
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              type="number"
              id="reviewID"
              {...register("reviewID")}
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg   w-36" htmlFor="PartyID">
              Party ID
            </label>
            <input
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              type="number"
              id="PartyID"
              {...register("PartyID")}
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg   w-36 " htmlFor="AnalystName">
              Analyst Name
            </label>
            <input
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              type="text"
              id="AnalystName"
              {...register("AnalystName")}
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg   w-36 " htmlFor="PRName">
              PR Name
            </label>
            <input
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              type="text"
              id="PRName"
              {...register("PRName")}
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans   w-36 text-lg " htmlFor="workStream">
              WorkStream
            </label>
            <input
              type="text"
              id="workStream"
              {...register("workStream")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg   w-36" htmlFor="Queue">
              Queue
            </label>
            <input
              type="text"
              id="Queue"
              {...register("Queue")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg   w-36 " htmlFor="FinalRisk">
              Final Risk
            </label>
            <input
              type="text"
              id="FinalRisk"
              {...register("FinalRisk")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg   w-36" htmlFor="Status">
              Status
            </label>
            <input
              type="text"
              id="Status"
              {...register("Status")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg  w-36" htmlFor="AuditFactor">
              Audit Factor
            </label>
            <input
              type="text"
              id="AuditFactor"
              {...register("AuditFactor")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg w-36" htmlFor="ActivityType">
              Activity Type
            </label>
            <input
              type="text"
              id="ActivityType"
              {...register("ActivityType")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg  w-36" htmlFor="NoScreenings">
              No of Screenings
            </label>
            <input
              type="number"
              id="NoScreenings"
              {...register("NoScreenings")}
              className="block w-[400px] rounded-md bg-white px-1 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="flex w-full gap-x-11 justify-center items-center">
            <label className="font-sans text-lg w-36" htmlFor="comments">
              Comments
            </label>
            <textarea
              {...register("comments")}
              name="comments"
              id="comments"
              rows="3"
              className="block w-[400px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></textarea>
          </div>
        </div>

        <div className=" flex items-center justify-around">
          {/* <button
            className="bg-blue-600 w-20 h-11 p-2  text-white rounded-md"
            type="submit"
          >
            Submit
          </button> */}
          <Button
            className="bg-blue-600 w-20 h-11 p-2  text-white rounded-md"
            type="submit"
          >
            Submit
          </Button>
          <button
            onClick={exportHandler}
            className="flex space-x-1 bg-green-600 p-2 rounded-md hover:bg-green-800"
          >
            <img src="excel.png" className="w-6" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6  text-white"
            >
              <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          <div className="text-4xl w-56 font-bold text-center p-4 rounded-lg bg-gradient-to-br from-blue-900 to-blue-600 text-white shadow-md shadow-blue-900">
            <div className="flex items-center gap-2 justify-center">
              <p>{`${hours < 10 ? "0" + hours : hours}`} </p>
              <p className="mb-1">:</p>
              <p>{` ${minutes < 10 ? "0" + minutes : minutes}`}</p>
              <p className="mb-1">:</p>
              <p> {` ${seconds < 10 ? "0" + seconds : seconds}`}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
