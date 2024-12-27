import React, { useState } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";   //for using react icons
import { PieChart } from '@mui/x-charts/PieChart';                 // for using pie charts


function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };
  const handleShowReport = () => {
    setShowReport(!showReport)
  }

  const handleShowEdit = () => {
    setShowEdit(!showEdit)
  }
  return (
    <div>
      <div className=" flex flex-col justify-center items-center mt-[2%] w-[80%] mr-[5%] ml-[5%]">
        <h1 className="text-3xl font-bold text-[#555]">Expense Tracker</h1>

        <div className="relative flex items-center justify-between mt-7 w-[60%] ">
          <div className="relative flex justify-between w-[300px]">
            <button
              onClick={handleAddExpense}
              className="bg-[#af8978] p-[10px] border-none rounded-sm outline-none text-white text-lg font-medium"
            >
              Add Expense
            </button>
            <button onClick={handleShowReport} className="bg-blue-300 p-[10px] border-none rounded-sm outline-none text-white text-lg font-medium">
              Expense Report
            </button>
          </div>
          {/* Add expense popup */}
          {showAddExpense && (
            <div className="absolute z-[999] bg-white flex flex-col p-[10px] top-[60px] left-0 h-[500px] w-[500px] shadow-xl gap-2 pl-[20px] pr-[20px]">
              <FaWindowClose
                onClick={handleAddExpense}
                className="text-red-600 flex justify-end items-end text-3xl cursor-pointer"
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Name
              </label>
              <input
                type="text"
                placeholder="Snacks"
                className=" rounded-md border-2 border-[#555] border-solid p-[10px] outline-none"
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Date
              </label>
              <input
                type="date"
                placeholder="16/03/2001"
                className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
              />

              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Amount
              </label>
              <input
                type="number"
                placeholder="100"
                className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
              />

              {/* Add expense button on popup*/}
              <button className="border rounded-lg bg-[#af8978]  p-[15px] border-none cursor-pointer my-[18px] text-xl font-bold">
                Add Expense
              </button>
            </div>
          )}
          {/* add Expense report popup */}
          {showReport && (
            <div className="absolute z-[999] bg-white flex flex-col p-[10px] top-[60px] left-[100px] h-[500px] w-[500px] shadow-xl">
              <FaWindowClose
                onClick={handleShowReport}
                className="text-red-600 flex justify-end items-end text-3xl cursor-pointer"
              />
              <PieChart
                series={[
                  {
                    data: [{ id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                  }
                ]}
              />



            </div>
          )}


          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-[10px] w-[200px] border rounded-lg border-slate-800 border-solid"
            />
          </div>
        </div>

        <div className="flex-flex-col">
          <div className="relative flex justify-between items-center w-[100vh] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] text-[#555] font-medium ">
              Snacks
            </h2>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              22/4/24
            </span>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              $20
            </span>

            <div className="m-[20px] text-xl">
              <FaTrash className="text-red-500 mb-[9px] cursor-pointer" />
              <FaEdit onClick={handleShowEdit} className="text-[#555] mb-[5px] cursor-pointer " />
            </div>
          </div>

          <div className="relative flex justify-between items-center w-[100vh] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] text-[#555] font-medium ">
              Electricity Bill
            </h2>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              22/4/24
            </span>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              $30
            </span>

            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[9px] cursor-pointer" />
              <FaEdit className="text-[#555] mb-[5px] cursor-pointer" />
            </div>
          </div>

          <div className="relative flex justify-between items-center w-[100vh] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] text-[#555] font-medium ">
              Russian Charge
            </h2>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              22/4/24
            </span>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              $120
            </span>

            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[9px] cursor-pointer" />
              <FaEdit className="text-[#555] mb-[5px] cursor-pointer" />
            </div>
          </div>

          <div className="relative flex justify-between items-center w-[100vh] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
            <h2 className="m-[20px] text-[18px] text-[#555] font-medium ">
              Lubricants
            </h2>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              22/4/24
            </span>
            <span className="m-[20px] text-[18px] text-[#555] font-medium ">
              $20
            </span>

            <div className="m-[20px]">
              <FaTrash className="text-red-500 mb-[9px] cursor-pointer" />
              <FaEdit className="text-[#555] mb-[5px] cursor-pointer" />
            </div>
          </div>
        </div>

        {/* //show popup on click of edit */}
        {showEdit && (
          <div className="absolute z-[999] bg-white flex flex-col p-[10px] top-[25%] right-[10%] h-[500px] w-[500px] shadow-xl gap-2">
            <FaWindowClose
              onClick={handleShowEdit}
              className="text-red-600 flex justify-end items-end text-3xl cursor-pointer"
            />

            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Name
            </label>
            <input
              type="text"
              placeholder="Snacks"
              className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
            />

            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Date
            </label>
            <input
              type="date"
              placeholder="16/03/2001"
              className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
            />

            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Amount
            </label>
            <input
              type="number"
              placeholder="100"
              className="border-2 rounded-md border-[#555] border-solid p-[10px] outline-none"
            />

            {/* Add expense button on popup*/}
            <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[15px] text-xl font-bold">
              Update Expense
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
